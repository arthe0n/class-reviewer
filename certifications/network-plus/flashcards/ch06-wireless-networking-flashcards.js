window.ReviewApp.content.register({
type: "flashcards",
cert: "network-plus",
chapter: "Chapter 6: Wireless Networking",
items: [
{
front: "What is a WLAN?",
back: "A wireless local area network: a LAN that transmits signals through the air via RF (radio frequency) waves instead of cables.",
tags: ["network-plus", "wlan"]
},
{
front: "At which OSI layer do wired and wireless networks start sharing the same protocols?",
back: "Layer 3: both use the same Layer 3 and higher protocols (IP, TCP, UDP); they differ at Layers 1 and 2.",
tags: ["network-plus", "osi", "wireless"]
},
{
front: "What is the wireless spectrum (airwaves) per the FCC?",
back: "The frequency range of electromagnetic waves for data and voice communication, spanning 9 kHz to 300 GHz in the United States.",
tags: ["network-plus", "spectrum", "fcc"]
},
{
front: "Which Wi-Fi bands do 802.11b/g/n, 802.11a/n/ac, and 802.11ax use?",
back: "2.4 GHz (802.11b/g/n/ax), 5 GHz (802.11a/n/ac/ax), and 6 GHz (802.11ax as Wi-Fi 6E, plus 802.11be).",
tags: ["network-plus", "bands"]
},
{
front: "What is a fixed frequency?",
back: "A band consisting of only a single frequency rather than a range.",
tags: ["network-plus", "frequency"]
},
{
front: "What is a collision on a wireless network?",
back: "Two or more devices transmitting at the same time on the same frequency so signals interfere; the damaged transmissions must be resent, lowering performance.",
tags: ["network-plus", "collision"]
},
{
front: "What is RFID and what does a tag hold?",
back: "Radio Frequency Identification: electromagnetic-field tags holding 1-8 KB (serial numbers, payment or medical data) read at close range without precise positioning; used for inventory and contactless payment.",
tags: ["network-plus", "rfid"]
},
{
front: "Which bands need an FCC license and which are license-free?",
back: "TV, FM, AM, and ham bands need licenses; Wi-Fi and CB bands are license-free as long as devices respect transmission-strength limits.",
tags: ["network-plus", "fcc", "spectrum"]
},
{
front: "What is a channel within a wireless band?",
back: "A subdivision of a band (further split into narrowband channels) so multiple devices can share the band; the US defines 11 channels in 2.4 GHz (20 MHz each), 24 in 5 GHz, and 59 in 6 GHz.",
tags: ["network-plus", "channel"]
},
{
front: "What is FHSS?",
back: "Frequency hopping spread spectrum: short data bursts hop from frequency to frequency hundreds of times per second. Cheaper than DSSS and better in crowded indoor spaces; used by Bluetooth (79 channels, piconet with a master clock).",
tags: ["network-plus", "fhss"]
},
{
front: "What is DSSS?",
back: "Direct sequence spread spectrum: data is divided into chips by a unique chipping code and spread across all available frequencies at once. Uses bandwidth more efficiently with higher throughput; used by Wi-Fi.",
tags: ["network-plus", "dsss"]
},
{
front: "What is channel bonding and which band suits it best?",
back: "Fusing adjacent channels (two 20 MHz into 40 MHz, up to 80, 160, or 320 MHz) for more than double the throughput since guard buffers become data carriers. The roomy 5 GHz band suits it best.",
tags: ["network-plus", "channel-bonding"]
},
{
front: "What is OFDMA?",
back: "Orthogonal Frequency Division Multiple Access: the AP subdivides each channel (e.g. 2 or 4 MHz slices of a 20 MHz channel) and sends small frames to many clients simultaneously.",
tags: ["network-plus", "ofdma"]
},
{
front: "What do 802.11h DFS and TPC do?",
back: "DFS (Dynamic Frequency Selection) watches 5 GHz channels and moves the AP off channels needed by priority users, notifying clients. TPC (Transmit Power Control) lowers AP power to limit interference and tells clients the power cap.",
tags: ["network-plus", "802-11h", "dfs", "tpc"]
},
{
front: "How does a wireless signal get from transmitter to receiver?",
back: "Current flows to an antenna, which radiates electromagnetic waves; a distant tuned antenna detects them and its receiver converts them back to current. Both ends must share the frequency (channel).",
tags: ["network-plus", "antenna"]
},
{
front: "What is an antenna radiation pattern?",
back: "The 3D map of relative strength of all electromagnetic energy an antenna sends or receives.",
tags: ["network-plus", "radiation-pattern"]
},
{
front: "Directional vs omnidirectional antenna?",
back: "Directional (unidirectional): energy along one path, e.g. satellite downlinks and point-to-point LAN links up to 1,000 feet. Omnidirectional: roughly equal in all directions (never perfect), e.g. TV, radio, cell towers, and mobile devices.",
tags: ["network-plus", "antenna"]
},
{
front: "What is wireless range?",
back: "The geographical area an antenna or system reaches; clients must stay inside it, and even inside it obstacles can degrade or block the signal.",
tags: ["network-plus", "range"]
},
{
front: "Why must a separate AP antenna sit very close to the AP?",
back: "Wi-Fi signals attenuate fast over coax cable, so extra cable feet between AP and antenna destroy signal strength.",
tags: ["network-plus", "attenuation", "antenna"]
},
{
front: "What three things shape received signal power besides the AP?",
back: "The client own antenna, the distance to the client, and environmental noise.",
tags: ["network-plus", "signal"]
},
{
front: "What is RSSI and what do its levels mean?",
back: "Received signal strength indicator: received power in dBm (negative, closer to 0 is better). About -30 excellent (next to AP), -50 good (VoIP/video), -70 acceptable minimum for data, -80 bare connectivity, -90 unusable. Check on Linux with iw dev.",
tags: ["network-plus", "rssi"]
},
{
front: "What is signal propagation and line of sight?",
back: "Propagation is how a wave travels point to point. Line of sight (straight unobstructed path) is ideal for distance and clarity, but obstacles usually prevent it; satellite and infrared require clear LOS, and even energy-efficient window film can block satellite.",
tags: ["network-plus", "propagation", "los"]
},
{
front: "What is attenuation in wireless?",
back: "Signal weakening with distance from the source; counter with more transmit power or a repeater (wireless range extender).",
tags: ["network-plus", "attenuation"]
},
{
front: "What is fading?",
back: "Gradual energy loss as a signal meets obstacles, arriving weaker; severe fading drops connections or slows throughput.",
tags: ["network-plus", "fading"]
},
{
front: "What are interference and SNR?",
back: "Interference is disruption by outside electromagnetic waves (wireless is more exposed than wired, no conduit or shielding). SNR (signal-to-noise ratio) is signal strength versus noise: high SNR is good, low SNR is poor; crowded metro areas suffer most.",
tags: ["network-plus", "interference", "snr"]
},
{
front: "What are refraction, reflection, scattering, and diffraction?",
back: "Refraction: direction, speed, and wavelength change crossing media (glass, solids). Reflection: bouncing off large flat conductive surfaces (walls, floors, metal). Scattering: diffusion in many directions off small or rough objects (chairs, books, plants, rain). Diffraction: splitting into secondary waves bending around sharp edges (wall and desk corners).",
tags: ["network-plus", "propagation"]
},
{
front: "What are multipath signals and why are they mixed news?",
back: "Signals reaching the receiver over many bounced paths. Good: more chances to arrive. Bad: copies arrive at different times, get misread, trigger error correction and retransmits, and slow throughput.",
tags: ["network-plus", "multipath"]
},
{
front: "What Wi-Fi generations map to which 802.11 standards?",
back: "Wi-Fi 1: 802.11b (1999, 2.4 GHz, 11 Mbps). Wi-Fi 2: 802.11a (1999, 5 GHz, 54 Mbps). Wi-Fi 3: 802.11g (2003, 2.4 GHz, 54 Mbps). Wi-Fi 4: 802.11n (2009, both bands, 600 Mbps). Wi-Fi 5: 802.11ac (2013, 5 GHz, to 6.9 Gbps). Wi-Fi 6/6E: 802.11ax (2019/2021, adds 6 GHz, 9.6 Gbps). Wi-Fi 7: 802.11be (2024, 46 Gbps).",
tags: ["network-plus", "802-11", "wifi-generations"]
},
{
front: "What are the ranges of the common 802.11 standards?",
back: "802.11b/g: 100 m. 802.11a: 50 m. 802.11n/ac: 70 m indoor, 250 m outdoor. 802.11ax: same 70/250 m. 802.11be: 30 m indoor, 120 m outdoor. Actual reach varies with antenna power, barriers, and interference.",
tags: ["network-plus", "802-11", "range"]
},
{
front: "Why did 802.11a lose to 802.11b/g despite higher speed?",
back: "5 GHz gave speed and clean air but shorter reach and higher cost, needing denser APs; the cheap compatible 2.4 GHz line won on price and coverage.",
tags: ["network-plus", "802-11a"]
},
{
front: "What made 802.11n, ac, and ax each a step change?",
back: "802.11n: both bands plus 600 Mbps, viable for voice and video. 802.11ac: 5 GHz Gigabit-class waves with multi-transmission APs acting more like switches. 802.11ax: better modulation, multiuser, BSS coloring against neighbor interference, many more simultaneous clients for IoT, stadiums, and campuses.",
tags: ["network-plus", "802-11n", "802-11ac", "802-11ax"]
},
{
front: "What do Wi-Fi 6E and Wi-Fi 7 add?",
back: "6E opens the 1,200 MHz-wide 6 GHz band: far more channels and speed at shorter range. Wi-Fi 7 (802.11be) exploits 6 GHz fully with higher power for farther reach and better penetration.",
tags: ["network-plus", "wifi-6e", "wifi-7"]
},
{
front: "What matters more than rated range when judging an AP?",
back: "Saturation: how strong and fast the signal stays across its range. Newer standards beat older ones at the same distance (e.g. ac outperforms n at 75 m).",
tags: ["network-plus", "saturation"]
},
{
front: "What are the three 802.11 frame groups?",
back: "Management frames (association and reassociation: probes, beacons), control frames (medium access and delivery: ACK, RTS/CTS), and data frames (payload between nodes).",
tags: ["network-plus", "802-11", "frames"]
},
{
front: "How does an 802.11 data frame differ from an 802.3 Ethernet II frame?",
back: "802.11 carries four 6-byte addresses (source, transmitter, receiver, destination) plus Frame control, Duration, and Sequence control fields with up to 2,312 data bytes; Ethernet II has two addresses (source, destination) plus Preamble and Type with 46-1,500 data bytes.",
tags: ["network-plus", "frames"]
},
{
front: "What is the Sequence Control field for?",
back: "It records how a large packet is fragmented into smaller packets for reliable delivery.",
tags: ["network-plus", "sequence-control"]
},
{
front: "Where do error checking and fragmentation live in 802.11 vs wired TCP/IP?",
back: "In 802.11 both happen at the MAC sublayer (data link), transparent to higher layers for easy 802.3 integration. In wired TCP/IP, error checking sits at transport and fragmentation at network.",
tags: ["network-plus", "mac-sublayer"]
},
{
front: "What are the MAC and LLC sublayers?",
back: "The data link layer split: MAC (lower) manages MAC addresses in frames; LLC (upper) handles multiplexing, flow and error control, and reliability.",
tags: ["network-plus", "mac", "llc"]
},
{
front: "What access method does 802.11 use and why?",
back: "CSMA/CA (Collision Avoidance): radios cannot send and receive at once and cannot even detect their own collisions, so they listen first, wait a random gap, send, and require an ACK. Ethernet uses CSMA/CD (Collision Detection), now mostly moot behind switches.",
tags: ["network-plus", "csma-ca"]
},
{
front: "Walk through basic CSMA/CA.",
back: "Check for transmissions. Silent: pause randomly, then send; the receiver verifies and returns an ACK, and a received ACK means success. Busy: pause, recheck. No ACK after sending: assume loss and restart the process.",
tags: ["network-plus", "csma-ca"]
},
{
front: "Why is Wi-Fi throughput below its rated speed versus wired?",
back: "Every transmission needs ACK overhead, so a 1 Gbps Wi-Fi link moves less user data than a 1 Gbps Ethernet link.",
tags: ["network-plus", "ack", "throughput"]
},
{
front: "What are the hidden node problem and RTS/CTS?",
back: "Hidden nodes are distant clients that cannot hear each other at the AP and collide blindly. RTS/CTS reserves the medium: source sends Request to Send, the AP answers Clear to Send and silences others until the transmission finishes. Costly overhead, but worth it for large collision-prone packets.",
tags: ["network-plus", "rts-cts", "hidden-node"]
},
{
front: "What are active vs passive scanning in Wi-Fi association?",
back: "Active: the client probes every channel; APs answer with probe responses (status code plus station ID) and the client, usually with user consent and password, joins on the named channel. Passive: the client listens for AP beacon frames (rate plus SSID) and then, with consent, joins.",
tags: ["network-plus", "scanning", "association"]
},
{
front: "What SSID naming practices help security and management?",
back: "Change the factory default (which advertises vendor and model), disguise the network purpose (never Acctg for Accounting), and pick recognizable-but-uncommon names so traveling clients do not auto-join same-named foreign networks.",
tags: ["network-plus", "ssid"]
},
{
front: "What are IBSS, BSS, and ESS topologies?",
back: "IBSS (ad hoc): a few close nodes talk directly, no AP. BSS (infrastructure): nodes share one autonomous AP (identifier: BSSID). ESS (mesh): several APs peer across a wide area, coordinated by a WLC over lightweight APs (identifier: ESSID, usually just called the SSID).",
tags: ["network-plus", "ibss", "bss", "ess"]
},
{
front: "Autonomous AP vs lightweight AP (LAP) vs WLC?",
back: "Autonomous APs self-manage for small networks. LAPs depend on a Wireless LAN Controller for central config and management across big multi-AP estates. The WLC also centralizes authentication, load balancing, channel planning, failover to surviving APs, and rogue AP detection. Never mix the two types on one network.",
tags: ["network-plus", "ap", "wlc"]
},
{
front: "What are roaming and reassociation?",
back: "Roaming is moving AP to AP inside one ESS without losing service. Reassociation is the automatic re-join to the new AP when the device leaves range or the old AP errors; managers exploit scanning to balance load across APs.",
tags: ["network-plus", "roaming"]
},
{
front: "What is a rogue access point?",
back: "An unauthorized AP on the network, which the WLC can spot when it tries to join.",
tags: ["network-plus", "rogue-ap"]
},
{
front: "What is band steering, passive vs active?",
back: "Steering close-in clients to 5 GHz (short waves, top throughput) over 2.4 GHz (long waves, top range) even when 2.4 looks stronger, vital when 2.4 is crowded. Passive steering answers initial probes with only a 5 GHz offer; active steering also migrates already-associated 2.4 GHz clients upward.",
tags: ["network-plus", "band-steering"]
},
{
front: "What is a SOHO router in a home WLAN?",
back: "One box combining AP, switching, routing, and gateway: ISP signal enters a cable/DSL modem, then an RJ-45 patch lead feeds the router WAN (Internet) port, with extra LAN ports for wired clients.",
tags: ["network-plus", "soho"]
},
{
front: "Where should a SOHO AP go, especially with IoT?",
back: "Weigh distance (middle floor for three floors), obstacles (concrete may demand an AP per floor; long buildings want one per end), height (shelf, rack, or drop ceiling), and interference (away from cordless phones, fluorescents, microwaves).",
tags: ["network-plus", "ap-placement"]
},
{
front: "What goes into a wireless site survey?",
back: "Blueprint study for obstacles, distances, and per-floor demand; bridge-throughput planning; multi-AP floor decisions; neighboring signal measurement; dummy-AP walk tests; far-corner access tests for hidden EMI; stocked-inventory materials; and wired-integration planning, using NetSpot, VisiWave, iBwave, or inSSIDer, with heat maps exposing dead zones.",
tags: ["network-plus", "site-survey"]
},
{
front: "What is a wireless bridge?",
back: "An AP-to-AP link joining two networks or two remote parts of one network; it needs far more throughput than any single client.",
tags: ["network-plus", "wireless-bridge"]
},
{
front: "How must enterprise APs share identity for roaming?",
back: "All APs join one ESS under one ESSID so clients glide between coverage cells.",
tags: ["network-plus", "essid"]
},
{
front: "What do you configure on a SOHO router, and what about DHCP?",
back: "Admin password (not the Wi-Fi password), SSID and broadcast choice, security type and credentials, and DHCP options. Do not run DHCP on the AP when another DHCP server already serves the LAN. Botched configs reset via the pinhole button (unplug, hold 30 s while repowering).",
tags: ["network-plus", "soho", "configuration"]
},
{
front: "What are onboarding and offboarding (BYOD)?",
back: "Onboarding installs an agent granting trusted access to mail, files, and admin features while checking OS, security settings, and malware. Offboarding removes it, including remote wipe (erase or brick a lost device remotely). Both are critical for BYOD: minimum OS versions, password and timeout rules, and monitoring or wipe consent.",
tags: ["network-plus", "byod", "onboarding"]
},
{
front: "Why are open SSIDs insecure, and what are the two fixes?",
back: "802.11 has no built-in security: knowing a broadcast SSID (or probing a hidden one) is enough to join. Fix with authentication (SSID password or server credentials, optionally MAC filtering, which is tedious and spoofable) and encryption (scrambling over-the-air data).",
tags: ["network-plus", "authentication", "encryption"]
},
{
front: "What are WEP OSA vs SKA, and why is WEP dead?",
back: "OSA (Open System Authentication): no key, a single-use code, no encryption, no real authentication. SKA (Shared Key Authentication): one static network key (passphrase) for auth and encryption across all clients. 64/128/256-bit keys still fall in minutes, keys never rotate, and there is no end-to-end protection.",
tags: ["network-plus", "wep"]
},
{
front: "What did WPA and TKIP fix, and what stayed weak?",
back: "WPA (802.11i subset) gave every transmission its own key via TKIP: per-packet key distribution, RC4 encryption, and Michael message-integrity codes. But TKIP only wrapped WEP-era RC4 (still insecure), surviving today just for legacy clients.",
tags: ["network-plus", "wpa", "tkip"]
},
{
front: "What are stream vs block ciphers?",
back: "Stream ciphers encrypt a byte or bit at a time; block ciphers encrypt large blocks per calculation.",
tags: ["network-plus", "ciphers"]
},
{
front: "What does WPA2 with CCMP and AES provide?",
back: "Future-focused confidentiality: CBC-MAC integrity plus AES encryption, much faster and stronger than TKIP, standard on consumer APs.",
tags: ["network-plus", "wpa2", "ccmp", "aes"]
},
{
front: "What does WPA3 add over WPA2?",
back: "Released 2018, mandatory on certified gear since mid-2020: no legacy protocols, user-chosen passwords, SAE mutual handshake (both sides authenticate, closing the WPA2 capture-and-crack flaw), 128-bit AES minimum and stronger management-frame protection in Enterprise. Flaws are already emerging, so expect another round.",
tags: ["network-plus", "wpa3", "sae"]
},
{
front: "What is SAE?",
back: "Simultaneous Authentication of Equals: client and AP authenticate each other, so sniffed traffic from another device no longer yields an offline-crackable password hash, protecting even simple passwords.",
tags: ["network-plus", "sae"]
},
{
front: "WPA-Personal (PSK) vs WPA-Enterprise?",
back: "Personal (WPA-PSK): one shared passphrase for all, no server; passphrase plus SSID derives per-device keys; home use. Enterprise: per-user credentials via 802.1X/EAP against a RADIUS server; business and campus use. WPA3 Personal adds SAE; WPA3 Enterprise adds stronger protections plus mandatory PMF (Protected Management Frames).",
tags: ["network-plus", "psk", "enterprise"]
},
{
front: "What are authentication vs authorization?",
back: "Authentication signs you in (correct credentials admit you). Authorization sets what you may do inside (only admins edit accounts).",
tags: ["network-plus", "authentication", "authorization"]
},
{
front: "What are RADIUS, EAP, EAPoL, 802.1X, and PNAC?",
back: "RADIUS (Remote Authentication Dial-In User Service, e.g. FreeRADIUS, Microsoft NPS) is the central auth server. EAP is only the auth framework (no crypto itself), flexible across passwords and biometrics. EAPoL carries EAP over LANs under 802.1X (network access control). PNAC (port-based access control) admits only EAPoL on a port until auth succeeds. Flow: supplicant to authenticator (AP/switch) to RADIUS, encapsulated EAP inside RADIUS, with 802.11 association (WPA2/3) as the precursor.",
tags: ["network-plus", "radius", "eap", "802-1x"]
},
{
front: "What are the three EAP entities?",
back: "Supplicant (device requesting auth), authenticator (AP or switch starting it), authentication server (RADIUS deciding it).",
tags: ["network-plus", "eap"]
},
{
front: "What extra Wi-Fi security options should you configure?",
back: "Center the AP (not on an outside wall) with tuned power; geofencing for location-based access; an isolated guest network with its own SSID, passphrase, and rules; a captive portal with terms (warn: open, unencrypted, traceable); wireless client isolation (gateway-only); hardened IoT (renamed, strong passwords, best crypto, 2FA, separate network, patched, never managed over public Wi-Fi). Captive portals can jam on custom DNS, blockers, autofill, or HTTPS: fall back to a plain HTTP page like neverssl.com.",
tags: ["network-plus", "guest-network", "captive-portal"]
},
{
front: "What are war driving, war chalking, evil twin, WPA attacks, and WPS attacks?",
back: "War driving: hunting open nets by car with a sniffer (once lifted cleartext card data from a retailer lot). War chalking: chalk symbols marking open nets. Evil twin: rogue AP cloning a legit SSID to harvest logins. WPA attacks: exploiting handshake flaws (WPA2 capture-and-crack, answered by WPA3 SAE). WPS attacks: brute-forcing the simple Wi-Fi Protected Setup PIN.",
tags: ["network-plus", "threats", "evil-twin"]
},
{
front: "What are skimming and electronic pickpocketing, and how do you stop them?",
back: "Skimming: a reader planted on a pump or ATM harvesting magnetic-strip or RFID data for later pickup. Electronic pickpocketing: brushing an RFID reader past your pocket or bag. Defenses: inspect and tug terminals, watch neighbors, use RFID-blocking wallets or foil; EMV chips help with unique per-transaction numbers but contactless RFID variants still leak.",
tags: ["network-plus", "skimming", "rfid"]
},
{
front: "Spectrum analyzer vs Wi-Fi analyzer?",
back: "Spectrum analyzer: hardware scanning a whole band for any signals and noise (finds non-Wi-Fi interference). Wi-Fi analyzer: software rating Wi-Fi availability, tuning settings, and flagging Wi-Fi threats and channel use. Both map coverage and hunt rogues; heat maps expose dead zones. Keep neighboring 2.4 GHz nets on non-overlapping 1, 6, 11 (or 1-5-9-13 where 14 channels exist).",
tags: ["network-plus", "spectrum-analyzer", "wifi-analyzer"]
},
{
front: "No Wi-Fi connection at all: what eight pitfalls block association?",
back: "Wrong case-sensitive SSID (worse when hidden); encryption-protocol mismatch; wrong passphrase; client pinned to the wrong static channel; wrong RF band (e.g. 2.4-only camera vs 5 GHz AP); wrong 802.11 standard; stalled association at range edge or during frequent re-roams; roaming misconfig with mismatched SSIDs or credentials across APs.",
tags: ["network-plus", "troubleshooting", "association"]
},
{
front: "Slow Wi-Fi: what twelve culprits should you check?",
back: "Too far or blocked (verify RSSI, raise the AP); wrong power (too low drops roamers, maxed overlaps cells, start at 50 percent, watch near-far asymmetry); EMI (lights, machinery, phones, microwaves); channel overlap (re-scan and move, possibly switch bands); outdated standard for the workload; wired-plus-wireless conflict (disable one); untested firmware; wrong antenna type (unidirectional dome beats omnidirectional sphere from a 30-foot ceiling); mismatched polarization (align per vendor, often vertical); AP overcapacity (SOHO 10-15 clients, Wi-Fi 5+ multiplexes better); disassociation on fat bonded channels or interference (narrow to 20/40 MHz).",
tags: ["network-plus", "troubleshooting", "slow-wifi"]
},
{
front: "What is antenna polarization?",
back: "Whether waves leave along the antenna vertical or horizontal axis; align AP and client antennas (usually vertical, multi-antenna kits splayed per vendor) or suffer. Laptop lid antennas suffer most when the lid tilts oddly.",
tags: ["network-plus", "polarization"]
},
{
front: "What is the near-far effect?",
back: "A high-power AP reaches the client, but the weak client return cannot reach back, so the link fails despite great bars on the client.",
tags: ["network-plus", "near-far"]
},
{
front: "Overlapping same-channel APs under one ESSID slow to a crawl: what is wrong?",
back: "Same-channel overlap: neighbors on one channel force endless CSMA/CA deferrals, collisions, and retransmits. Spread overlapping APs across non-overlapping channels (1, 6, 11) while keeping the shared ESSID for roaming.",
tags: ["network-plus", "channel-overlap", "ess"]
},
{
front: "Which measurement maps a dead-zone edge, and which tool sees non-Wi-Fi noise?",
back: "RSSI walk-tests map dead-zone edges (falling dBm marks the boundary). A spectrum analyzer (not a Wi-Fi analyzer) reveals all frequencies present, including non-Wi-Fi interference.",
tags: ["network-plus", "rssi", "spectrum-analyzer"]
}
]
});
