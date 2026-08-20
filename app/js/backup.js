/* ═══════════════════════════════════════════════════════════
   ReviewApp · backup.js
   Offline ZIP backup/export/import service.
   No imported JavaScript is executed; certification material is restored
   through the existing content snapshot mechanism.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var App = window.ReviewApp;
  var utils = App.core.utils;
  var BACKUP_VERSION = 2;
  var LEGACY_BACKUP_VERSION = 1;
  var LEGACY_USER_KEYS = [
    'answers', 'streak', 'exams', 'labsDone', 'labStepsDone', 'leitner', 'cardReviews',
    'flashSessions', 'flashSession', 'personalNotes', 'timeOnTask'
  ];
  var USER_KEYS = [
    'currentCert', 'settings', 'answers', 'streak', 'exams', 'labsDone', 'labStepsDone', 'leitner', 'cardReviews',
    'flashSessions', 'flashSession', 'quizSession', 'examSession', 'personalNotes', 'timeOnTask'
  ];
  var USER_ARRAY_KEYS = ['answers', 'exams', 'cardReviews', 'flashSessions', 'personalNotes'];
  var MATERIAL_TYPES = ['questions', 'flashcards', 'labs', 'notes'];
  var MAX_ENTRIES = 5000;
  var MAX_UNCOMPRESSED = 100 * 1024 * 1024;

  function textBytes(value) {
    return new TextEncoder().encode(String(value));
  }

  function bytesToText(bytes) {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  }

  function asBytes(value) {
    if (value instanceof Uint8Array) return value;
    if (value instanceof ArrayBuffer) return new Uint8Array(value);
    if (typeof value === 'string') return textBytes(value);
    return textBytes(JSON.stringify(value));
  }

  function concatBytes(parts) {
    var size = parts.reduce(function (total, part) { return total + part.length; }, 0);
    var result = new Uint8Array(size);
    var offset = 0;
    parts.forEach(function (part) {
      result.set(part, offset);
      offset += part.length;
    });
    return result;
  }

  function clone(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function jsonBytes(value) {
    return textBytes(JSON.stringify(value, null, 2));
  }

  function safeId(id) {
    return typeof id === 'string' && /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(id);
  }

  function safeZipPath(path) {
    if (!path || path.charAt(0) === '/' || path.indexOf('\\') >= 0 || /^[A-Za-z]:/.test(path)) return false;
    return path.split('/').every(function (part) { return part && part !== '.' && part !== '..'; });
  }

  function unique(values) {
    var seen = {};
    return (values || []).filter(function (value) {
      if (seen[value]) return false;
      seen[value] = true;
      return true;
    });
  }

  function selectedCerts(ids) {
    var available = App.content.getCerts();
    var requested = unique(ids || available.map(function (cert) { return cert.id; }));
    return available.filter(function (cert) { return requested.indexOf(cert.id) >= 0; });
  }

  function certIdsFromUserData(data) {
    var ids = [];
    function add(value) { if (safeId(value)) ids.push(value); }
    function addArray(list, getter) {
      if (!Array.isArray(list)) return;
      list.forEach(function (item) { if (item) add(getter(item)); });
    }
    addArray(data.answers, function (item) { return item.cert || item._cert; });
    addArray(data.exams, function (item) { return item.cert || item._cert; });
    addArray(data.cardReviews, function (item) { return item.cert || item._cert; });
    addArray(data.flashSessions, function (item) { return item.cert || item._cert; });
    addArray(data.personalNotes, function (item) { return item.cert || item._cert; });
    Object.keys(data.labsDone || {}).forEach(function (key) { add(key.split(':')[0]); });
    Object.keys(data.labStepsDone || {}).forEach(function (key) { add(key.split(':')[0]); });
    Object.keys(data.leitner || {}).forEach(function (key) { add(key.split(':')[0]); });
    if (data.flashSession) add(data.flashSession.cert || data.flashSession._cert);
    if (data.quizSession) add(data.quizSession.cert || data.quizSession._cert);
    if (data.examSession) add(data.examSession.cert || data.examSession._cert);
    add(data.currentCert);
    return unique(ids);
  }

  function collectUserData() {
    var data = {};
    USER_KEYS.forEach(function (name) {
      var fallback;
      if (name === 'currentCert' || name === 'flashSession' || name === 'quizSession' || name === 'examSession') fallback = null;
      else if (name === 'settings') fallback = {};
      else if (name === 'labsDone' || name === 'labStepsDone' || name === 'leitner') fallback = {};
      else if (name === 'timeOnTask') fallback = 0;
      else fallback = [];
      data[name] = clone(App.store.get(name, fallback));
    });
    data.certifications = certIdsFromUserData(data);
    return data;
  }

  function registryForCerts(ids) {
    var current = App.content.getRegistry() || {};
    var allowed = {};
    ids.forEach(function (id) { allowed[id] = true; });
    var registry = { certs: [], questions: [], flashcards: [], labs: [], notes: [] };
    registry.certs = (current.certs || []).filter(function (cert) { return allowed[cert.id]; }).map(clone);
    MATERIAL_TYPES.forEach(function (type) {
      registry[type] = (current[type] || []).filter(function (item) { return allowed[item._cert]; }).map(clone);
    });
    return registry;
  }

  function sourcePathsForCerts(ids) {
    var manifest = App.content.getManifest ? App.content.getManifest() : null;
    var allowed = {};
    ids.forEach(function (id) { allowed[id] = true; });
    return (manifest && manifest.files ? manifest.files : []).filter(function (path) {
      var first = String(path).split('/')[0];
      return allowed[first];
    });
  }

  function sourceFileEntries(ids, report) {
    var paths = sourcePathsForCerts(ids);
    if (!paths.length || typeof fetch !== 'function') return Promise.resolve([]);
    var completed = 0;
    return Promise.all(paths.map(function (relativePath) {
      return fetch('certifications/' + relativePath, { cache: 'no-store' }).then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.arrayBuffer();
      }).then(function (buffer) {
        completed++;
        if (report) report('Collecting certification files (' + completed + '/' + paths.length + ')…');
        return { name: 'certifications/' + relativePath, data: new Uint8Array(buffer) };
      }).catch(function () {
        completed++;
        if (report) report('Collecting certification files (' + completed + '/' + paths.length + ')…');
        return null;
      });
    })).then(function (entries) { return entries.filter(Boolean); });
  }

  function localDateParts(date) {
    function pad(value) { return String(value).padStart(2, '0'); }
    return {
      date: date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()),
      time: pad(date.getHours()) + pad(date.getMinutes())
    };
  }

  function typeLabel(type) {
    return type === 'user' ? 'Statistics & Study Data' : type === 'material' ? 'Study Material' : 'Everything';
  }

  function filenameFor(type, date) {
    var parts = localDateParts(date);
    var prefix = type === 'user' ? 'ReviewApp_Stats' : type === 'material' ? 'ReviewApp_StudyMaterial' : 'ReviewApp_FullBackup';
    return prefix + '_' + parts.date + '_' + parts.time + '.zip';
  }

  /* ── Small ZIP implementation ──────────────────────────── */
  var crcTable = null;
  function makeCrcTable() {
    if (crcTable) return crcTable;
    crcTable = [];
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      crcTable[n] = c >>> 0;
    }
    return crcTable;
  }

  function crc32(bytes) {
    var table = makeCrcTable();
    var crc = 0xffffffff;
    for (var i = 0; i < bytes.length; i++) crc = table[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
  }

  function adler32(bytes) {
    var a = 1, b = 0;
    for (var i = 0; i < bytes.length; i++) {
      a = (a + bytes[i]) % 65521;
      b = (b + a) % 65521;
    }
    return (((b << 16) | a) >>> 0);
  }

  function put16(view, offset, value) { view.setUint16(offset, value & 0xffff, true); }
  function put32(view, offset, value) { view.setUint32(offset, value >>> 0, true); }

  function dosDateTime(date) {
    var year = Math.max(1980, date.getFullYear());
    return {
      time: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2),
      date: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate()
    };
  }

  function streamBytes(stream, bytes) {
    return new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer().then(function (buffer) {
      return new Uint8Array(buffer);
    });
  }

  function deflateRaw(bytes) {
    if (typeof CompressionStream !== 'function') return Promise.resolve({ method: 0, data: bytes });
    try {
      return streamBytes(new CompressionStream('deflate-raw'), bytes).then(function (compressed) {
        return { method: 8, data: compressed };
      }).catch(function () {
        return zlibDeflateFallback(bytes);
      });
    } catch (err) {
      return zlibDeflateFallback(bytes);
    }
  }

  // Some browsers expose zlib-wrapped "deflate" but not "deflate-raw".
  // Removing the zlib header/checksum yields the raw stream ZIP requires.
  function zlibDeflateFallback(bytes) {
    try {
      return streamBytes(new CompressionStream('deflate'), bytes).then(function (wrapped) {
        if (wrapped.length < 6) return { method: 0, data: bytes };
        return { method: 8, data: wrapped.slice(2, wrapped.length - 4) };
      }).catch(function () { return { method: 0, data: bytes }; });
    } catch (err) {
      return Promise.resolve({ method: 0, data: bytes });
    }
  }

  function makeZip(entries, report) {
    var now = new Date();
    var prepared = [];
    var seen = {};
    entries.forEach(function (entry) {
      if (!safeZipPath(entry.name) || seen[entry.name]) throw new Error('Unsafe or duplicate backup path: ' + entry.name);
      seen[entry.name] = true;
    });
    var chain = Promise.resolve();
    entries.forEach(function (entry) {
      chain = chain.then(function () {
        var raw = asBytes(entry.data);
        return deflateRaw(raw).then(function (result) {
          prepared.push({ name: entry.name, nameBytes: textBytes(entry.name), raw: raw, data: result.data, method: result.method, crc: crc32(raw), dos: dosDateTime(now) });
          if (report) report('Compressing backup (' + prepared.length + '/' + entries.length + ')…');
        });
      });
    });
    return chain.then(function () {
      var localParts = [];
      var centralParts = [];
      var offset = 0;
      prepared.forEach(function (entry) {
        var local = new Uint8Array(30 + entry.nameBytes.length);
        var localView = new DataView(local.buffer);
        put32(localView, 0, 0x04034b50);
        put16(localView, 4, 20);
        put16(localView, 6, 0x800);
        put16(localView, 8, entry.method);
        put16(localView, 10, entry.dos.time);
        put16(localView, 12, entry.dos.date);
        put32(localView, 14, entry.crc);
        put32(localView, 18, entry.data.length);
        put32(localView, 22, entry.raw.length);
        put16(localView, 26, entry.nameBytes.length);
        put16(localView, 28, 0);
        local.set(entry.nameBytes, 30);
        localParts.push(local, entry.data);

        var central = new Uint8Array(46 + entry.nameBytes.length);
        var centralView = new DataView(central.buffer);
        put32(centralView, 0, 0x02014b50);
        put16(centralView, 4, 20);
        put16(centralView, 6, 20);
        put16(centralView, 8, 0x800);
        put16(centralView, 10, entry.method);
        put16(centralView, 12, entry.dos.time);
        put16(centralView, 14, entry.dos.date);
        put32(centralView, 16, entry.crc);
        put32(centralView, 20, entry.data.length);
        put32(centralView, 24, entry.raw.length);
        put16(centralView, 28, entry.nameBytes.length);
        put16(centralView, 30, 0);
        put16(centralView, 32, 0);
        put16(centralView, 34, 0);
        put16(centralView, 36, 0);
        put32(centralView, 38, 0);
        put32(centralView, 42, offset);
        central.set(entry.nameBytes, 46);
        centralParts.push(central);
        offset += local.length + entry.data.length;
      });

      var central = concatBytes(centralParts);
      var end = new Uint8Array(22);
      var endView = new DataView(end.buffer);
      put32(endView, 0, 0x06054b50);
      put16(endView, 4, 0);
      put16(endView, 6, 0);
      put16(endView, 8, prepared.length);
      put16(endView, 10, prepared.length);
      put32(endView, 12, central.length);
      put32(endView, 16, offset);
      put16(endView, 20, 0);
      return new Blob([concatBytes(localParts), central, end], { type: 'application/zip' });
    });
  }

  function findEndRecord(bytes) {
    var start = Math.max(0, bytes.length - 22 - 0xffff);
    for (var i = bytes.length - 22; i >= start; i--) {
      if (bytes[i] === 0x50 && bytes[i + 1] === 0x4b && bytes[i + 2] === 0x05 && bytes[i + 3] === 0x06) return i;
    }
    return -1;
  }

  function inflateRaw(bytes) {
    if (typeof DecompressionStream !== 'function') return Promise.reject(new Error('This browser cannot decompress ZIP backups.'));
    try {
      return streamBytes(new DecompressionStream('deflate-raw'), bytes);
    } catch (err) {
      return Promise.reject(new Error('This browser cannot decompress ZIP backups.'));
    }
  }

  function readZip(file, report) {
    return file.arrayBuffer().then(function (buffer) {
      var bytes = new Uint8Array(buffer);
      if (bytes.length < 22) throw new Error('The selected file is not a valid ZIP archive.');
      var endOffset = findEndRecord(bytes);
      if (endOffset < 0) throw new Error('The selected file is not a valid ZIP archive.');
      var end = new DataView(buffer, endOffset, 22);
      var count = end.getUint16(8, true);
      var centralSize = end.getUint32(12, true);
      var centralOffset = end.getUint32(16, true);
      if (count > MAX_ENTRIES || centralOffset + centralSize > bytes.length) throw new Error('The ZIP directory is invalid or too large.');
      var entries = {};
      var offset = centralOffset;
      var totalSize = 0;
      var pending = Promise.resolve();
      for (var i = 0; i < count; i++) {
        if (offset + 46 > bytes.length || bytes[offset] !== 0x50 || bytes[offset + 1] !== 0x4b || bytes[offset + 2] !== 0x01 || bytes[offset + 3] !== 0x02) {
          throw new Error('The ZIP directory is malformed.');
        }
        var central = new DataView(buffer, offset, 46);
        var flags = central.getUint16(8, true);
        var method = central.getUint16(10, true);
        var crc = central.getUint32(16, true);
        var compressedSize = central.getUint32(20, true);
        var uncompressedSize = central.getUint32(24, true);
        var nameLength = central.getUint16(28, true);
        var extraLength = central.getUint16(30, true);
        var commentLength = central.getUint16(32, true);
        var localOffset = central.getUint32(42, true);
        if (flags & 1) throw new Error('Encrypted ZIP backups are not supported.');
        if (compressedSize === 0xffffffff || uncompressedSize === 0xffffffff || localOffset === 0xffffffff) throw new Error('ZIP64 backups are not supported.');
        var nameStart = offset + 46;
        var nameEnd = nameStart + nameLength;
        if (nameEnd + extraLength + commentLength > bytes.length) throw new Error('The ZIP directory is malformed.');
        var name;
        try { name = bytesToText(bytes.slice(nameStart, nameEnd)); } catch (err) { throw new Error('The ZIP contains an invalid filename.'); }
        if (!safeZipPath(name) || entries[name]) throw new Error('The ZIP contains an unsafe or duplicate path.');
        if (localOffset + 30 > bytes.length) throw new Error('The ZIP entry is outside the archive.');
        var local = new DataView(buffer, localOffset, 30);
        if (local.getUint32(0, true) !== 0x04034b50) throw new Error('The ZIP entry header is malformed.');
        var localNameLength = local.getUint16(26, true);
        var localExtraLength = local.getUint16(28, true);
        var dataStart = localOffset + 30 + localNameLength + localExtraLength;
        var dataEnd = dataStart + compressedSize;
        if (dataEnd > bytes.length) throw new Error('The ZIP entry is truncated.');
        totalSize += uncompressedSize;
        if (totalSize > MAX_UNCOMPRESSED) throw new Error('The backup is too large to process safely.');
        (function (entryName, entryMethod, entryCrc, entrySize, data) {
          pending = pending.then(function () {
            if (report) report('Reading backup (' + Object.keys(entries).length + '/' + count + ')…');
            var decoded = entryMethod === 0 ? Promise.resolve(data) : entryMethod === 8 ? inflateRaw(data) : Promise.reject(new Error('The ZIP uses an unsupported compression method.'));
            return decoded.then(function (raw) {
              if (raw.length !== entrySize || crc32(raw) !== entryCrc) throw new Error('The ZIP entry failed integrity validation.');
              entries[entryName] = raw;
            });
          });
        })(name, method, crc, uncompressedSize, bytes.slice(dataStart, dataEnd));
        offset = nameEnd + extraLength + commentLength;
      }
      return pending.then(function () { return entries; });
    });
  }

  /* ── Package creation and validation ───────────────────── */
  function buildPackage(type, certIds, report) {
    return App.store.flush().then(function () { return buildPackageNow(type, certIds, report); });
  }

  function buildPackageNow(type, certIds, report) {
    if (['user', 'material', 'everything'].indexOf(type) < 0) return Promise.reject(new Error('Choose a valid export type.'));
    var includeUser = type === 'user' || type === 'everything';
    var includeMaterial = type === 'material' || type === 'everything';
    var certs = includeMaterial ? selectedCerts(certIds) : [];
    if (includeMaterial && !certs.length) return Promise.reject(new Error('Select at least one certification to export.'));

    var created = new Date();
    var userData = includeUser ? collectUserData() : null;
    var registry = includeMaterial ? registryForCerts(certs.map(function (cert) { return cert.id; })) : null;
    var manifest = {
      format: 'reviewapp-backup',
      version: BACKUP_VERSION,
      createdAt: created.toISOString(),
      exportType: type,
      certifications: certs.map(function (cert) { return { id: cert.id, name: cert.name, color: cert.color || null }; }),
      includesUserData: includeUser,
      includesStudyMaterial: includeMaterial,
      userDataFiles: includeUser ? USER_KEYS.map(function (key) { return 'user-data/' + key + '.json'; }).concat(['user-data/index.json']) : [],
      materialFiles: includeMaterial ? ['certifications/content-snapshot.json', 'certifications/_manifest.json'] : []
    };
    var entries = [{ name: 'backup-manifest.json', data: jsonBytes(manifest) }];
    if (includeUser) {
      entries.push({ name: 'user-data/index.json', data: jsonBytes({ certifications: userData.certifications, keys: USER_KEYS }) });
      USER_KEYS.forEach(function (key) { entries.push({ name: 'user-data/' + key + '.json', data: jsonBytes(userData[key]) }); });
    }
    if (!includeMaterial) return makeZip(entries, report).then(function (blob) {
      return { blob: blob, filename: filenameFor(type, created), manifest: manifest };
    });

    var ids = certs.map(function (cert) { return cert.id; });
    var snapshot = {
      version: 1,
      registry: registry,
      manifest: { certs: registry.certs, files: [] },
      certifications: ids
    };
    entries.push({ name: 'certifications/_manifest.json', data: jsonBytes({ certs: registry.certs, files: [] }) });
    entries.push({ name: 'certifications/content-snapshot.json', data: jsonBytes(snapshot) });
    MATERIAL_TYPES.forEach(function (contentType) {
      var content = registry[contentType] || [];
      if (content.length) entries.push({ name: 'certifications/' + contentType + '/content.json', data: jsonBytes({ type: contentType, items: content }) });
    });
    manifest.materialFiles = entries.filter(function (entry) { return entry.name.indexOf('certifications/') === 0; }).map(function (entry) { return entry.name; });
    entries[0] = { name: 'backup-manifest.json', data: jsonBytes(manifest) };
    if (report) report('Collecting certification files…');
    return sourceFileEntries(ids, report).then(function (sourceEntries) {
      sourceEntries.forEach(function (entry) {
        if (entries.every(function (existing) { return existing.name !== entry.name; })) entries.push(entry);
      });
      manifest.materialFiles = entries.filter(function (entry) { return entry.name.indexOf('certifications/') === 0; }).map(function (entry) { return entry.name; });
      entries[0] = { name: 'backup-manifest.json', data: jsonBytes(manifest) };
      return makeZip(entries, report).then(function (blob) {

        return { blob: blob, filename: filenameFor(type, created), manifest: manifest };
      });
    });
  }

  function parseJSON(entries, path, required) {
    if (!entries[path]) {
      if (required) throw new Error('The backup is missing ' + path + '.');
      return null;
    }
    try { return JSON.parse(bytesToText(entries[path])); } catch (err) { throw new Error('The backup contains invalid JSON in ' + path + '.'); }
  }

  function validateManifest(manifest, entries) {
    if (!manifest || manifest.format !== 'reviewapp-backup' || [LEGACY_BACKUP_VERSION, BACKUP_VERSION].indexOf(manifest.version) < 0) {
      throw new Error('This is not a supported ReviewApp backup (format versions ' + LEGACY_BACKUP_VERSION + '–' + BACKUP_VERSION + ').');
    }
    if (['user', 'material', 'everything'].indexOf(manifest.exportType) < 0) throw new Error('The backup has an unknown export type.');
    if (typeof manifest.createdAt !== 'string' || isNaN(new Date(manifest.createdAt).getTime())) throw new Error('The backup date is invalid.');
    if (!!manifest.includesUserData !== (manifest.exportType === 'user' || manifest.exportType === 'everything')) throw new Error('The backup user-data declaration is invalid.');
    if (!!manifest.includesStudyMaterial !== (manifest.exportType === 'material' || manifest.exportType === 'everything')) throw new Error('The backup study-material declaration is invalid.');
    var certs = manifest.certifications || [];
    var ids = [];
    certs.forEach(function (cert) {
      if (!cert || !safeId(cert.id) || typeof cert.name !== 'string' || ids.indexOf(cert.id) >= 0) throw new Error('The backup contains invalid certification metadata.');
      ids.push(cert.id);
    });
    if (manifest.includesStudyMaterial && !ids.length) throw new Error('The backup contains no certifications.');
    if (manifest.includesUserData) {
      parseJSON(entries, 'user-data/index.json', true);
      var expectedUserKeys = manifest.version >= BACKUP_VERSION ? USER_KEYS : LEGACY_USER_KEYS;
      expectedUserKeys.forEach(function (key) { parseJSON(entries, 'user-data/' + key + '.json', true); });
    }
    var snapshot = null;
    if (manifest.includesStudyMaterial) {
      parseJSON(entries, 'certifications/_manifest.json', true);
      snapshot = parseJSON(entries, 'certifications/content-snapshot.json', true);
      if (!snapshot || !snapshot.registry || !Array.isArray(snapshot.registry.certs)) throw new Error('The backup certification snapshot is invalid.');
      var snapshotIds = snapshot.registry.certs.map(function (cert) { return cert && cert.id; });
      ids.forEach(function (id) { if (snapshotIds.indexOf(id) < 0) throw new Error('The backup is missing material for ' + id + '.'); });
      MATERIAL_TYPES.forEach(function (type) {
        if (!Array.isArray(snapshot.registry[type])) throw new Error('The backup certification snapshot is missing ' + type + '.');
        snapshot.registry[type].forEach(function (item) {
          if (!item || ids.indexOf(item._cert) < 0) throw new Error('The backup contains material for an unlisted certification.');
        });
      });
    }
    return { manifest: manifest, entries: entries, snapshot: snapshot, certifications: certs };
  }

  function inspect(file, report) {
    if (!file || !/\.zip$/i.test(file.name || '')) return Promise.reject(new Error('Choose a ReviewApp .zip backup.'));
    return readZip(file, report).then(function (entries) {
      var manifest = parseJSON(entries, 'backup-manifest.json', true);
      return validateManifest(manifest, entries);
    });
  }

  function itemCert(item) { return item && (item.cert || item._cert || item.certification); }

  function itemIdentity(item) {
    if (!item || typeof item !== 'object') return 'value:' + JSON.stringify(item);
    if (item.id != null) return 'id:' + String(item.id);
    if (item._id != null) return '_id:' + String(item._id);
    if (item._key != null) return '_key:' + String(item._key);
    return 'value:' + JSON.stringify(item);
  }

  function uniqueItems(items) {
    var seen = Object.create(null);
    return (items || []).filter(function (item) {
      var identity = itemIdentity(item);
      if (seen[identity]) return false;
      seen[identity] = true;
      return true;
    });
  }

  function mergeArray(key, backup, scope) {
    if (!Array.isArray(backup)) return;
    var local = App.store.get(key, []);
    if (!Array.isArray(local)) local = [];
    var merged = [];
    var positions = Object.create(null);

    // Replace records for certifications represented by the backup, while
    // retaining unrelated records. Stable IDs make a second import an update
    // instead of another copy, including for unscoped personal notes.
    uniqueItems(local).forEach(function (item) {
      if (scope.length && scope.indexOf(itemCert(item)) >= 0) return;
      var identity = itemIdentity(item);
      positions[identity] = merged.length;
      merged.push(item);
    });
    uniqueItems(backup).forEach(function (item) {
      var identity = itemIdentity(item);
      if (Object.prototype.hasOwnProperty.call(positions, identity)) {
        merged[positions[identity]] = clone(item);
      } else {
        positions[identity] = merged.length;
        merged.push(clone(item));
      }
    });
    App.store.set(key, merged);
  }

  function mergeObject(key, backup, scope) {
    if (!backup || typeof backup !== 'object' || Array.isArray(backup)) return;
    var local = App.store.get(key, {});
    var merged = {};
    Object.keys(local || {}).forEach(function (itemKey) {
      if (!scope.length || scope.indexOf(itemKey.split(':')[0]) < 0) merged[itemKey] = local[itemKey];
    });
    Object.keys(backup).forEach(function (itemKey) { merged[itemKey] = backup[itemKey]; });
    App.store.set(key, merged);
  }

  function applyUserData(pkg) {
    var index = parseJSON(pkg.entries, 'user-data/index.json', true) || {};
    var data = {};
    var expectedUserKeys = pkg.manifest.version >= BACKUP_VERSION ? USER_KEYS : LEGACY_USER_KEYS;
    expectedUserKeys.forEach(function (key) { data[key] = parseJSON(pkg.entries, 'user-data/' + key + '.json', true); });
    var scope = unique((index.certifications || []).filter(safeId));
    USER_ARRAY_KEYS.forEach(function (key) { mergeArray(key, data[key], scope); });
    mergeObject('labsDone', data.labsDone, scope);
    mergeObject('labStepsDone', data.labStepsDone, scope);
    mergeObject('leitner', data.leitner, scope);
    if (data.streak) App.store.set('streak', clone(data.streak));
    if (data.timeOnTask != null) App.store.set('timeOnTask', data.timeOnTask);
    if (data.currentCert !== undefined) App.store.set('currentCert', clone(data.currentCert));
    if (data.settings !== undefined) App.store.set('settings', clone(data.settings));
    // Version-2 backups always include active-session fields, including null
    // when no session was active. Legacy version-1 backups omit these fields;
    // both formats remain merge-safe for sessions outside the backup scope.
    ['flashSession', 'quizSession', 'examSession'].forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) return;
      var state = data[key];
      var existing = App.store.get(key, null);
      var sameScope = !scope.length || !existing || !existing.cert || scope.indexOf(existing.cert) >= 0;
      // A null session means the backup had no active session. Clear only a
      // session in the backup's scope; importing another certification's clean
      // backup must not discard an unrelated local session.
      if (state == null ? (scope.length && sameScope) : (!state.cert || scope.indexOf(state.cert) >= 0 || !scope.length)) {
        App.store.set(key, clone(state));
      }
    });
    return scope;
  }

  function importMaterial(pkg, choices, report) {
    if (!pkg.snapshot) return Promise.resolve({ imported: 0, replaced: 0, kept: 0 });
    var imported = pkg.snapshot.registry;
    var ids = pkg.certifications.map(function (cert) { return cert.id; });
    var current = clone(App.content.getRegistry() || { certs: [], questions: [], flashcards: [], labs: [], notes: [] });
    var replace = {};
    var kept = {};
    ids.forEach(function (id) {
      var decision = Object.prototype.hasOwnProperty.call(choices, id) ? choices[id] : 'replace';
      if (decision === 'replace') replace[id] = true;
      else kept[id] = true;
    });
    var registry = { certs: [], questions: [], flashcards: [], labs: [], notes: [] };
    registry.certs = (current.certs || []).filter(function (cert) { return !replace[cert.id]; }).map(clone);
    // Imported certifications replace conflicting material or append as new.
    ids.forEach(function (id) {
      if (kept[id]) return;
      registry.certs = registry.certs.filter(function (cert) { return cert.id !== id; });
      var incomingCert = (imported.certs || []).filter(function (cert) { return cert.id === id; })[0];
      if (incomingCert) registry.certs.push(clone(incomingCert));
    });
    MATERIAL_TYPES.forEach(function (type) {
      registry[type] = (current[type] || []).filter(function (item) {
        return !replace[item._cert] && ids.indexOf(item._cert) < 0;
      }).map(clone);
      // Preserve existing conflict material when the safe Keep choice is selected.
      (current[type] || []).filter(function (item) { return kept[item._cert]; }).forEach(function (item) { registry[type].push(clone(item)); });
      (imported[type] || []).filter(function (item) { return !kept[item._cert]; }).forEach(function (item) { registry[type].push(clone(item)); });
      // A malformed or previously imported snapshot must not multiply content
      // with the same stable content identity.
      registry[type] = uniqueItems(registry[type]);
    });
    registry.certs = uniqueItems(registry.certs);
    if (report) report('Rebuilding certification index…');
    App.store.saveContentSnapshot({ registry: registry, manifest: { certs: registry.certs, files: [] }, ts: Date.now() });
    return new Promise(function (resolve) {
      App.content.load(function () {
        if (App.core.updateCertSelector) App.core.updateCertSelector();
        resolve({ imported: ids.filter(function (id) { return !kept[id]; }).length, replaced: Object.keys(replace).length, kept: Object.keys(kept).length });
      });
    });
  }

  function importPackage(pkg, choices, report) {
    choices = choices || {};
    var userScope = pkg.manifest.includesUserData ? applyUserData(pkg) : [];
    return App.store.flush().then(function () {
      var materialPromise = pkg.manifest.includesStudyMaterial ? importMaterial(pkg, choices, report) : Promise.resolve({ imported: 0, replaced: 0, kept: 0 });
      return materialPromise.then(function (material) {
        // Import can change the persisted current certification. Reconcile the
        // core context after material loading so the picker and every scoped
        // view use the restored certification immediately, without requiring
        // a reload.
        if (App.core && App.core.restoreCurrentCert) App.core.restoreCurrentCert();
        if (App.core && App.core.updateCertSelector) App.core.updateCertSelector();
        return App.store.flush().then(function () {
          return { userCertifications: userScope, material: material, manifest: pkg.manifest };
        });
      });
    });
  }

  App.backup = {
    version: BACKUP_VERSION,
    getCertificationOptions: function () { return App.content.getCerts().map(clone); },
    exportZip: buildPackage,
    inspect: inspect,
    importPackage: importPackage,
    typeLabel: typeLabel
  };
})();
