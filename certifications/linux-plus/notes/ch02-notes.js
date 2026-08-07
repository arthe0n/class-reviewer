window.ReviewApp.content.register({
  type: "notes",
  cert: "linux-plus",
  chapter: "Ch 02 · Linux Server Services & Configuration",
  items: [
    {
      title: "Server Architecture, Ports & Core Internet Services",
      body: `## Server Models

- **Daemon**: Background process (often ending in \`d\`) that listens for client requests, such as \`mysqld\`.
- **Super-server**: Listens on behalf of multiple services and starts an application on demand. Legacy \`inetd\` and \`xinetd\` are replaced by **systemd** unit files.

## Well-Known Ports

| Port | Protocol | Service |
|------|----------|---------|
| 20/21 | FTP | File transfer |
| 22 | SSH | Secure Shell |
| 23 | Telnet | Unsecured remote shell |
| 25 | SMTP | Mail transport |
| 53 | DNS | Name resolution |
| 67 | DHCP | IP address assignment |
| 80 | HTTP | Web traffic |
| 109/110 | POP | Mail retrieval |
| 137–139 | SMB | Windows file and print sharing |
| 143, 220 | IMAP | Advanced mail access |
| 389 | LDAP | Directory services |
| 443 | HTTPS | Encrypted web traffic |
| 2049 | NFS | Linux/Unix file sharing |

## Web Servers

| Server | Config File | Extra Config Directory | Default Document Root |
|--------|-------------|------------------------|-----------------------|
| **Apache** | \`/etc/httpd/httpd.conf\` | \`/etc/httpd/conf.d/\` | \`/var/www/html\` |
| **Nginx** | \`/etc/nginx/nginx.conf\` | \`/etc/nginx/conf.d/\` | \`/usr/share/nginx/html\` |
| **lighthttpd** | Lightweight and low-resource | — | Useful for embedded and IoT systems |

- **Apache** is modular: load only required modules such as SSL, PHP, or rewrite.
- **Nginx** is event-driven, uses fewer resources, and includes reverse-proxy, load-balancing, and caching features. It is often placed in front of Apache.

## Database Servers

| Database | Type | Key Traits |
|----------|------|------------|
| **PostgreSQL** | Relational (ORDBMS) | ACID, transactions, stored procedures, extensible |
| **MySQL** | Relational (RDBMS) | LAMP stack, performance-focused, multiple storage engines |
| **MongoDB** | NoSQL document database | JSON-like BSON documents, flexible schema, sharding, replication |

## Mail Architecture

1. **MUA** (Mail User Agent): Client application such as Evolution, Thunderbird, or KMail.
2. **MTA** (Mail Transfer Agent): Routes and sends mail using SMTP.
3. **MDA** (Mail Delivery Agent): Delivers mail to the local mailbox.

### MTA Packages

| MTA | Model | Configuration | Notes |
|-----|-------|---------------|-------|
| **sendmail** | Monolithic | \`/etc/mail/sendmail.cf\` (generated from \`sendmail.mc\`) | Complex and powerful |
| **Postfix** | Modular | \`/etc/postfix/main.cf\`, \`/etc/postfix/master.cf\` | Simple, two plain-text files |
| **Exim** | Monolithic | \`/etc/exim.conf\` | Favors immediate delivery |

### MDA and Mailbox

- **Binmail** (\`/bin/mail\`): Default spool at \`/var/spool/mail\`.
- **Procmail**: User-defined filtering through \`~/.procmailrc\` and regular-expression recipes.
- **Dovecot**: IMAP4 server. Configuration: \`/etc/dovecot/dovecot.conf\` and \`/etc/dovecot/conf.d/\`.`,
      tags: ["daemon", "ports", "web-server", "database", "mail", "mta", "mda", "apache", "nginx", "lamp"]
    },
    {
      title: "Local Network Services, Security & Performance",
      body: `## File and Print Sharing

- **NFS** (\`nfs-utils\`): Linux/Unix folder sharing. Mount remote folders like local partitions. Port **2049**.
- **Samba**: Implements the Microsoft **SMB** protocol for Linux-to-Windows file and print sharing.
- **CUPS**: Standard Linux printing service. Uses **IPP** (Internet Printing Protocol).

## Network Infrastructure

| Service | Package/Daemon | Config File | Purpose |
|---------|----------------|-------------|---------|
| **DHCP** | \`dhcpd\` (ISC) | \`/etc/dhcp/dhcpd.conf\` | Automatic IP assignment |
| **DNS** | BIND (\`named\`) | \`named.conf\` | Hostname-to-IP resolution |
| **DNS** (systemd) | \`systemd-resolved\` | \`/etc/systemd/network/*.network\` | Modern DNS service |
| **NTP** | \`ntpd\` | \`/etc/ntpd.conf\` | Time synchronization |
| **NTP** | \`chronyd\` | \`/etc/chrony.conf\` | Modern time synchronization |
| **Logging** | \`rsyslogd\` | — | Remote logging for SysVinit/Upstart |
| **Logging** | \`journald\` | — | Remote logging for systemd |

- **SNMP** (\`net-snmp\`, UDP **161–162**): Remote monitoring. Version 3 provides strong authentication and encryption.

## Security Layers

| Technology | Purpose |
|------------|---------|
| **NIS** (YP) | Shared naming directory for user accounts and hostnames |
| **Kerberos** | Symmetric-key encrypted authentication (MIT) |
| **LDAP** (OpenLDAP) | Hierarchical directory authentication |
| **OpenSSL** | Certificate Authority support and certificate-plus-PIN authentication |
| **OpenSSH** | Encrypted remote access; replaces Telnet and FTP and supports tunneling |
| **OpenVPN** | Secure point-to-point VPN tunnel for remote access |

## Performance

- **Clustering**: Multiple nodes share a workload, such as Hadoop or LVS. It is not ideal for every database application because of locking overhead.
- **Load balancing**: Distributes client requests across a cluster. Common tools include **HAProxy**, **LVS**, and **Nginx**.
- **Containers**: Portable application bundles managed by tools such as Docker and Kubernetes. They reduce environment differences between systems.`,
      tags: ["nfs", "samba", "cups", "dhcp", "dns", "ntp", "snmp", "security", "ssh", "vpn", "ldap", "kerberos", "clustering", "load-balancing", "containers", "docker"]
    }
  ]
});
