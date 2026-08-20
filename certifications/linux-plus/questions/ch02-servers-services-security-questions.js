window.ReviewApp.content.register({
  type: "questions",
  cert: "linux-plus",
  chapter: "Ch 02 · Linux Servers, Services & Security",
  items: [
    {
      q: "What is the primary functional difference between a Linux desktop and a Linux server?",
      type: "mcq",
      options: [
        "Servers cannot run a GUI at all, while desktops are built around direct graphical interaction with users.",
        "Servers provide network services for other systems with little direct interaction, while desktops support interactive local use.",
        "Servers use a different kernel and process model from desktops, even on the same Linux distribution.",
        "Servers cannot be managed remotely, while desktops rely on local administration through graphical tools.",
        "Desktop systems always require a separate kernel from the server edition of a distribution."
      ],
      answer: 1,
      explain: "Both use the same kernel and shell; the distinction is usage — servers provide network services with minimal direct interaction, while desktops are used interactively.",
      tags: ["overview", "desktop", "server"]
    },
    {
      q: "A background process that runs continually and listens for client requests is called a __________.",
      type: "fill",
      answer: "daemon",
      explain: "Daemon programs run in the background and typically have names ending in 'd' (e.g., mysqld, sshd).",
      tags: ["daemon"]
    },
    {
      q: "Which command would you use to confirm that the MySQL daemon (mysqld) is running?",
      type: "mcq",
      options: [
        "ps ax | grep mysql",
        "ps ax | grep apache",
        "grep mysql /etc/services",
        "ls /var/log/mysql",
        "systemctl status apache2"
      ],
      answer: 0,
      explain: "ps ax | grep mysql lists running processes and filters for mysqld; the other options don't reliably show whether the daemon process is running.",
      tags: ["daemon", "ps", "commands"]
    },
    {
      q: "The term 'daemon' originates from Greek mythology, referring to demonic or malicious spirits.",
      type: "tf",
      answer: false,
      explain: "Daemons in Greek mythology were supernatural beings that helped humans — the term is unrelated to 'demon' despite the similar spelling.",
      tags: ["daemon", "trivia"]
    },
    {
      q: "What is the main advantage of using a super-server like inetd or xinetd instead of running many individual daemons?",
      type: "mcq",
      options: [
        "It reduces memory use by launching each service only when a matching request arrives.",
        "It encrypts each service connection before handing the request to the target daemon.",
        "It replaces firewall rules by filtering each packet before a service receives it.",
        "It converts every network service into a Systemd unit before starting it.",
        "It consolidates every service into a single executable permanently."
      ],
      answer: 0,
      explain: "Super-servers reduce the number of daemons that must sit resident in memory by launching service programs on demand when requests come in.",
      tags: ["super-server", "inetd", "xinetd"]
    },
    {
      q: "Which configuration file does the original inetd super-server use?",
      type: "fill",
      answer: "/etc/inetd.conf",
      explain: "inetd.conf defines the network services inetd listens for and how it responds to each.",
      tags: ["inetd", "config-files"]
    },
    {
      q: "Which features does xinetd add over the original inetd? (Select all that apply.)",
      type: "multi",
      options: [
        "Automatic load balancing across multiple service instances",
        "Access-control rules that restrict which clients may use a service",
        "Detailed logging of service requests and connection activity",
        "Automatic certificate generation for each network service",
        "Scheduling rules that enable or disable services at selected times"
      ],
      answer: [1, 2, 4],
      explain: "xinetd adds ACLs, advanced logging, and service scheduling over inetd. It does not handle certificate generation — that's a CA/OpenSSL function.",
      tags: ["xinetd", "super-server"]
    },
    {
      q: "On a modern Systemd-based Linux distribution, what typically replaces the functionality of inetd/xinetd?",
      type: "mcq",
      options: [
        "systemd unit files",
        "cron jobs",
        "GRUB configuration",
        "the /etc/services file",
        "a standalone DNS resolver"
      ],
      answer: 0,
      explain: "Systemd uses unit files to manage service activation, replacing the role previously played by inetd/xinetd super-servers.",
      tags: ["systemd", "super-server"]
    },
    {
      q: "Which file on a Linux server lists all known/defined network ports and their associated service names?",
      type: "fill",
      answer: "/etc/services",
      explain: "/etc/services maps port numbers and protocols to service names on the local system.",
      tags: ["ports", "files"]
    },
    {
      q: "A user calls a company's main phone number, then dials an extension to reach a specific employee. Which network concept does this best illustrate?",
      type: "mcq",
      options: [
        "IP address for the main number, port number for the extension",
        "MAC address for the main number, IP address for the extension",
        "Subnet mask for the main number, gateway for the extension",
        "DNS name for the main number, IP address for the extension",
        "TCP port for the main number, MAC address for the extension"
      ],
      answer: 0,
      explain: "The notes use this exact analogy: clients connect via IP address (the main number), then specify a port number (the extension) to reach a specific service.",
      tags: ["ports", "analogy"]
    },
    {
      q: "Match the port to its correct default service — Port 443:",
      type: "mcq",
      options: ["HTTP", "HTTPS", "SMTP", "DNS", "IMAP"],
      answer: 1,
      explain: "Port 443 is used by HTTPS, the encrypted version of HTTP.",
      tags: ["ports", "https"]
    },
    {
      q: "Which port is associated with the DHCP service?",
      type: "mcq",
      options: ["53", "67", "80", "110", "443"],
      answer: 1,
      explain: "Port 67 is the well-known port for DHCP, which automatically assigns IP addresses to clients.",
      tags: ["ports", "dhcp"]
    },
    {
      q: "Which of the following port/protocol pairs is INCORRECT?",
      type: "mcq",
      options: [
        "22 – SSH",
        "23 – Telnet",
        "389 – LDAP",
        "2049 – SMB",
        "161 – SNMP"
      ],
      answer: 3,
      explain: "Port 2049 is used by NFS, not SMB. SMB uses ports 137-139. The other three pairings are correct per the notes.",
      tags: ["ports", "nfs", "smb"]
    },
    {
      q: "A firewall must permit standard unencrypted HTTP requests to a web server. Which destination port should it allow?",
      type: "mcq",
      options: ["80", "22", "53", "110", "443"],
      answer: 0,
      explain: "Port 80 is the traditional well-known port for unencrypted HTTP. Port 443 is used for HTTPS, while the other choices serve different protocols.",
      tags: ["ports", "http", "firewalls"]
    },
    {
      q: "Which organization is responsible for publishing standardized service protocols as RFC documents?",
      type: "mcq",
      options: ["ISO", "IETF", "ICANN", "W3C", "IEEE"],
      answer: 1,
      explain: "The Internet Engineering Task Force (IETF) publishes protocol standards as Requests for Comments (RFCs).",
      tags: ["ietf", "rfc"]
    },
    {
      q: "Which three services are standard Internet services Linux servers excel at?",
      type: "multi",
      options: ["Print services", "Web services", "Directory services", "Email services", "Database services"],
      answer: [1, 3, 4],
      explain: "The notes specifically call out web, database, and email services as the three core Internet services; print services are covered separately as a local network service.",
      tags: ["overview", "services"]
    },
    {
      q: "Apache HTTP Server's key architectural advantage is its:",
      type: "mcq",
      options: [
        "An event-driven core that handles connections without blocking.",
        "A modular core that adds advanced features through loadable modules.",
        "A built-in database engine that stores application data.",
        "A monolithic core that requires every feature to be compiled in.",
        "A database-backed core that stores website data internally."
      ],
      answer: 1,
      explain: "Apache relies on a modular design where advanced functionality (SSL/TLS, PHP, etc.) is added via loadable modules, unlike Nginx's event-driven core design.",
      tags: ["apache", "web-server"]
    },
    {
      q: "What is Apache's default DocumentRoot on many Linux distributions?",
      type: "fill",
      answer: "/var/www/html",
      explain: "This [var/www/html] is the default directory Apache serves website files from on many distributions.",
      tags: ["apache", "documentroot"]
    },
    {
      q: "Which file is the primary Apache configuration file?",
      type: "mcq",
      options: [
        "/etc/httpd/httpd.conf",
        "/etc/apache2/apache.ini",
        "/etc/nginx/nginx.conf",
        "/var/www/html/httpd.conf",
        "/etc/httpd/httpd.ini"
      ],
      answer: 0,
      explain: "/etc/httpd/httpd.conf is the primary Apache configuration file per the notes; /etc/nginx/nginx.conf belongs to Nginx, not Apache.",
      tags: ["apache", "config-files"]
    },
    {
      q: "Which file is the primary Nginx configuration file on a typical Linux installation?",
      type: "mcq",
      options: ["/etc/nginx/nginx.conf", "/etc/httpd/httpd.conf", "/var/www/html/nginx.conf", "/etc/nginx/nginx.ini", "/usr/share/nginx/config"],
      answer: 0,
      explain: "`/etc/nginx/nginx.conf` is the primary Nginx configuration file. The other paths are Apache paths, incorrect file names, or document/data locations.",
      tags: ["nginx", "config-files"]
    },
    {
      q: "Which of the following are features built into Nginx's core rather than added via external modules? (Select all that apply.)",
      type: "multi",
      options: ["SQL query optimization", "Reverse proxy", "Database transaction management", "Web content caching", "Load balancing"],
      answer: [1, 3, 4],
      explain: "Nginx natively includes reverse proxy, load balancing, and caching capabilities. SQL query optimization is not a web server function.",
      tags: ["nginx", "features"]
    },
    {
      q: "A company deploys Nginx in front of several Apache servers. What is the most likely reason for this architecture?",
      type: "mcq",
      options: [
        "Nginx handles many incoming connections and load balancing, while Apache serves dynamic content through its modules.",
        "Nginx serves static content and Apache handles connections, while a database provides the load-balancing layer.",
        "Nginx requires Apache to serve any content, because it cannot operate as a standalone web server.",
        "The two servers replace a database service by sharing all application state through their web modules.",
        "Apache handles TLS termination while Nginx only stores database records."
      ],
      answer: 0,
      explain: "This combines Nginx's efficient handling of high connection volume with Apache's flexibility and rich module ecosystem for dynamic content.",
      tags: ["nginx", "apache", "architecture"]
    },
    {
      q: "Which year was Nginx first released?",
      type: "fill",
      answer: "2004",
      explain: "Nginx was first released in 2004 as a high-performance alternative to Apache.",
      tags: ["nginx", "history"]
    },
    {
      q: "Which lightweight web server is best suited for embedded systems and IoT devices due to low memory and CPU usage?",
      type: "mcq",
      options: ["Apache", "Nginx", "lighttpd", "IIS", "Caddy"],
      answer: 2,
      explain: "lighttpd is specifically designed for resource-constrained environments like embedded systems and IoT devices.",
      tags: ["lighttpd"]
    },
    {
      q: "lighttpd includes its own built-in database engine for storing application data.",
      type: "tf",
      answer: false,
      explain: "lighttpd does not include a built-in database; it integrates with external databases like SQLite, MySQL, or PostgreSQL via PHP, FastCGI, or CGI.",
      tags: ["lighttpd", "database"]
    },
    {
      q: "Clients communicate with a relational database server primarily using which language?",
      type: "fill",
      answer: "SQL",
      accepts: ["Structured Query Language"],
      explain: "Structured Query Language (SQL) is the standard language for interacting with relational databases.",
      tags: ["database", "sql"]
    },
    {
      q: "Which acronym describes PostgreSQL's guarantee of reliable transaction processing?",
      type: "mcq",
      options: ["ACID", "CRUD", "REST", "SOAP", "BSON"],
      answer: 0,
      explain: "PostgreSQL adheres to ACID (Atomicity, Consistency, Isolation, Durability) principles for transaction integrity.",
      tags: ["postgresql", "acid"]
    },
    {
      q: "In what year was PostgreSQL released to the public as open source?",
      type: "fill",
      answer: "1996",
      explain: "PostgreSQL began as a university research project and was released as open source in 1996.",
      tags: ["postgresql", "history"]
    },
    {
      q: "Which of the following are features of PostgreSQL? (Select all that apply.)",
      type: "multi",
      options: [
        "Document-oriented BSON storage",
        "Stored procedures",
        "Built-in SMTP mail delivery",
        "Full transaction support",
        "Updatable views"
      ],
      answer: [1, 3, 4],
      explain: "PostgreSQL supports transactions, updatable views, and stored procedures. BSON document storage is a MongoDB feature, not PostgreSQL's.",
      tags: ["postgresql", "features"]
    },
    {
      q: "MySQL, combined with Linux, Apache, and PHP, forms which well-known software stack?",
      type: "fill",
      answer: "LAMP",
      accepts: ["LAMP stack", "Linux Apache MySQL PHP"],
      explain: "LAMP stands for Linux, Apache, MySQL, PHP — a widely used open-source web application stack.",
      tags: ["mysql", "lamp"]
    },
    {
      q: "What was MySQL's original core design focus?",
      type: "mcq",
      options: [
        "Maximum extensibility through user-defined data types, plugins, and custom storage engines.",
        "Lightweight, high-performance operation with an emphasis on speed, simplicity, and easy administration.",
        "Full compliance with NoSQL document standards, flexible schemas, and document-based storage models.",
        "Built-in load balancing across database nodes without external tools or a separate proxy layer.",
        "A design centered on kernel-level packet filtering."
      ],
      answer: 1,
      explain: "MySQL was originally built for speed, simplicity, and ease of use, though it has since added advanced features like transactions and stored procedures.",
      tags: ["mysql", "history"]
    },
    {
      q: "Which type of database is MongoDB?",
      type: "mcq",
      options: [
        "A relational database that stores application records in SQL tables.",
        "A document-oriented NoSQL database that stores data as JSON-like BSON documents.",
        "A hierarchical database that stores application data as directory-style records.",
        "An in-memory key-value cache intended only for temporary application data.",
        "A time-series database that stores only timestamped metrics."
      ],
      answer: 1,
      explain: "MongoDB stores data as BSON (Binary JSON) documents rather than in relational tables, making it a document-oriented NoSQL database.",
      tags: ["mongodb", "nosql"]
    },
    {
      q: "In what year was MongoDB first released?",
      type: "fill",
      answer: "2009",
      explain: "MongoDB was first released in 2009 as a document-oriented NoSQL database.",
      tags: ["mongodb", "history"]
    },
    {
      q: "An administrator installs an old version of MongoDB and notices anyone on the network can connect and read/modify data without a password. What is the most likely cause?",
      type: "mcq",
      options: [
        "MongoDB has never provided an authentication mechanism, so every release accepts unauthenticated connections.",
        "Older versions shipped with authentication disabled by default, so administrators had to enable it.",
        "The firewall permits MongoDB traffic and therefore makes database authentication unnecessary for clients.",
        "MongoDB requires Kerberos authentication before any database instance can start or accept connections.",
        "The server is using a read-only replica mode that skips access checks."
      ],
      answer: 1,
      explain: "The notes specifically caution that older MongoDB versions shipped with authentication disabled by default, a known security risk that must be manually remediated.",
      tags: ["mongodb", "security"]
    },
    {
      q: "NoSQL stands for 'No Structured Query Language,' meaning these databases never support any query language.",
      type: "tf",
      answer: false,
      explain: "NoSQL actually stands for 'Not Only SQL' — these databases offer flexible query capabilities beyond traditional SQL, not a total absence of querying.",
      tags: ["nosql"]
    },
    {
      q: "Which three components make up the modular Linux email system?",
      type: "multi",
      options: ["Mail Caching Agent (MCA)", "Mail Transfer Agent (MTA)", "Mail Archive Agent (MAA)", "Mail Delivery Agent (MDA)", "Mail User Agent (MUA)"],
      answer: [1, 3, 4],
      explain: "The Linux email architecture consists of MUA, MTA, and MDA; there is no 'Mail Caching Agent' component described in the notes.",
      tags: ["email", "mua", "mta", "mda"]
    },
    {
      q: "Which component is responsible for routing email between mail servers using SMTP?",
      type: "mcq",
      options: ["MUA", "MTA", "MDA", "DNS resolver", "SMTP relay"],
      answer: 1,
      explain: "The Mail Transfer Agent (MTA) handles sending, receiving, and routing mail between servers using SMTP.",
      tags: ["mta", "email"]
    },
    {
      q: "Where does the Mail User Agent (MUA) typically run?",
      type: "mcq",
      options: [
        "On the mail server, alongside the MTA, because users connect there directly to read messages.",
        "On the client machine, because users interact with it directly to read and compose messages.",
        "Inside the DNS server, where messages are converted into delivery records before routing.",
        "As a kernel module, where it can intercept messages before network delivery begins.",
        "As a DNS resolver plugin that delivers messages after lookup."
      ],
      answer: 1,
      explain: "Because users interact with the MUA directly to read/compose mail, it typically runs on the client machine rather than the server.",
      tags: ["mua", "email"]
    },
    {
      q: "Which three MTA packages does the Linux+ exam focus on?",
      type: "multi",
      options: ["Dovecot", "Postfix", "Cyrus IMAP", "Exim", "sendmail"],
      answer: [1, 3, 4],
      explain: "sendmail, Postfix, and Exim are the three MTA packages the exam covers; Dovecot is an IMAP server (MUA-facing), not an MTA.",
      tags: ["mta", "exam"]
    },
    {
      q: "An administrator needs to change sendmail's behavior. What is the correct procedure?",
      type: "mcq",
      options: [
        "Edit /etc/mail/sendmail.cf directly, then reload the service to apply the configuration.",
        "Edit /etc/mail/sendmail.mc, then restart sendmail so sendmail.cf is regenerated.",
        "Edit /etc/postfix/main.cf and restart sendmail to import the Postfix settings.",
        "Use a package-manager command because sendmail has no editable configuration file.",
        "Edit /etc/mail/aliases and regenerate sendmail.cf without restarting the service."
      ],
      answer: 1,
      explain: "sendmail.cf should not be edited directly; instead, admins edit the shorthand sendmail.mc file and restart the service so sendmail.cf regenerates automatically.",
      tags: ["sendmail", "config-files"]
    },
    {
      q: "Which mail transfer agent is known for a modular design using several small programs and just two plaintext config files?",
      type: "mcq",
      options: ["sendmail", "Postfix", "Exim", "Dovecot", "OpenSMTPD"],
      answer: 1,
      explain: "Postfix uses main.cf and master.cf as its two plaintext config files and is composed of several small, modular programs, contrasting with sendmail's single large program design.",
      tags: ["postfix", "config-files"]
    },
    {
      q: "Which Postfix configuration file defines how the various Postfix daemons run?",
      type: "fill",
      answer: "master.cf",
      explain: "master.cf defines Postfix daemon behavior, while main.cf defines basic parameters.",
      tags: ["postfix", "config-files"]
    },
    {
      q: "Which MTA favors immediate delivery over queuing messages in most environments?",
      type: "mcq",
      options: ["sendmail", "Postfix", "Exim", "Procmail", "qmail"],
      answer: 2,
      explain: "Exim, though architecturally similar to sendmail (a single large program), is distinguished by its preference for immediate delivery rather than queuing.",
      tags: ["exim"]
    },
    {
      q: "Which MDA program is the most popular in Linux and stores mail by default in /var/spool/mail?",
      type: "mcq",
      options: ["Postfix", "Binmail", "Procmail", "Dovecot", "Maildrop"],
      answer: 1,
      explain: "Binmail (/bin/mail) is the most popular MDA and stores mail in /var/spool/mail by default.",
      tags: ["mda", "binmail"]
    },
    {
      q: "What kind of file does a user create in their home directory to configure Procmail filtering rules?",
      type: "fill",
      answer: ".procmailrc",
      explain: "A personal .procmailrc file lets users define recipes for filtering, routing, forwarding, or discarding incoming mail.",
      tags: ["procmail", "email"]
    },
    {
      q: "Which protocol do most remote Mail User Agents use to communicate with a mail server, and what is the most popular Linux server implementing it?",
      type: "mcq",
      options: [
        "POP3, using sendmail",
        "IMAP4, using Dovecot",
        "SMTP, using Postfix",
        "FTP, using vsftpd",
        "LDAP, using OpenLDAP"
      ],
      answer: 1,
      explain: "IMAP4 is the protocol most remote MUAs use, and Dovecot is cited as the most popular Linux IMAP4 server implementation.",
      tags: ["imap4", "dovecot"]
    },
    {
      q: "Which two file-sharing packages are commonly used on Linux local networks?",
      type: "multi",
      options: ["CUPS", "NFS", "vsftpd", "BIND", "Samba"],
      answer: [1, 4],
      explain: "NFS and Samba are the two file-sharing packages discussed; CUPS is for printing and BIND is for DNS.",
      tags: ["nfs", "samba", "file-server"]
    },
    {
      q: "Which package implements the client and server software/drivers for NFS on Linux?",
      type: "fill",
      answer: "nfs-utils",
      explain: "nfs-utils provides the drivers plus client/server software needed to implement NFS on Linux.",
      tags: ["nfs", "nfs-utils"]
    },
    {
      q: "A Linux admin needs the server to share files with, and access shares from, Windows workstations. Which package should be used?",
      type: "mcq",
      options: ["NFS", "Samba", "CUPS", "BIND", "vsftpd"],
      answer: 1,
      explain: "Samba implements Microsoft's SMB protocol, enabling Linux to act as both an SMB client and server for Windows interoperability.",
      tags: ["samba", "smb"]
    },
    {
      q: "What protocol does CUPS use to connect to network printers?",
      type: "fill",
      answer: "IPP",
      accepts: ["Internet Printing Protocol"],
      explain: "CUPS uses the Internet Printing Protocol (IPP) to connect Linux systems to network printers.",
      tags: ["cups", "ipp"]
    },
    {
      q: "Which service centrally tracks and assigns unique IP addresses to clients on a network?",
      type: "mcq",
      options: ["DNS", "DHCP", "NTP", "SNMP", "ARP"],
      answer: 1,
      explain: "DHCP (Dynamic Host Configuration Protocol) centrally manages IP address assignment to prevent duplicate addresses.",
      tags: ["dhcp"]
    },
    {
      q: "Which of the following are common Linux DHCP client packages? (Select all that apply.)",
      type: "multi",
      options: ["named", "pump", "dhcpd", "dhclient", "dhcpcd"],
      answer: [1, 3, 4],
      explain: "dhclient, dhcpcd, and pump are DHCP client packages. named is the BIND DNS server daemon, unrelated to DHCP.",
      tags: ["dhcp", "dhcp-client"]
    },
    {
      q: "Which file does the DHCPd package use to define IP subnets for address distribution?",
      type: "fill",
      answer: "/etc/dhcp/dhcp.conf",
      explain: "This file [/etc/dhcp/dhcp.conf] defines subnets and parameters passed to clients, such as the default router, subnet mask, and DNS servers.",
      tags: ["dhcp", "config-files"]
    },
    {
      q: "Which logging daemon is used on Systemd-based systems and can handle both local and remote logging?",
      type: "mcq",
      options: ["rsyslogd", "journald", "syslogd", "auditd", "logrotate"],
      answer: 1,
      explain: "journald is the logging daemon associated with Systemd systems, whereas rsyslogd is used by SysVinit/Upstart systems.",
      tags: ["logging", "journald"]
    },
    {
      q: "Where are Linux log files normally stored locally?",
      type: "fill",
      answer: "/var/log",
      explain: "/var/log is the standard local directory for Linux system log files.",
      tags: ["logging", "var-log"]
    },
    {
      q: "Which software package implements DNS on Linux, and what is its daemon named?",
      type: "mcq",
      options: [
        "BIND, daemon named 'named'",
        "Dovecot, daemon named 'imapd'",
        "Postfix, daemon named 'master'",
        "CUPS, daemon named 'cupsd'",
        "Unbound, daemon named 'unbound'"
      ],
      answer: 0,
      explain: "BIND implements DNS on Linux, and its server daemon is literally called 'named'.",
      tags: ["dns", "bind", "named"]
    },
    {
      q: "What replaces the 'named' daemon on Systemd-based distributions?",
      type: "fill",
      answer: "systemd-resolved",
      explain: "systemd-resolved provides similar DNS resolution features as part of the Systemd package.",
      tags: ["dns", "systemd-resolved"]
    },
    {
      q: "Which technology adds an encryption layer to standard DNS packets to prevent hostname spoofing?",
      type: "mcq",
      options: ["DNSSEC", "SSL", "IPSec", "Kerberos", "SSH"],
      answer: 0,
      explain: "DNSSEC secures the DNS lookup process against spoofing attacks by adding cryptographic protection to DNS responses.",
      tags: ["dns", "dnssec", "security"]
    },
    {
      q: "Which UDP ports does SNMP use?",
      type: "fill",
      answer: "161-162",
      explain: "SNMP uses UDP ports 161 and 162 for management queries and traps respectively.",
      tags: ["snmp", "ports"]
    },
    {
      q: "Which version of SNMP introduced strong authentication and data encryption?",
      type: "mcq",
      options: ["SNMPv1", "SNMPv2", "SNMPv3", "None of them support encryption", "SNMPv4"],
      answer: 2,
      explain: "SNMPv3 added strong authentication and encryption, a major security improvement over the plaintext-only SNMPv1 and the basic security of SNMPv2.",
      tags: ["snmp", "versions"]
    },
    {
      q: "What is the most popular open-source, SNMPv3-compatible Linux SNMP package?",
      type: "fill",
      answer: "net-snmp",
      explain: "net-snmp allows secure remote monitoring of all aspects of a Linux server and supports SNMPv3.",
      tags: ["snmp", "net-snmp"]
    },
    {
      q: "Which two daemons are used on Linux to synchronize system clocks via NTP?",
      type: "multi",
      options: ["ntpdate", "chronyd", "named", "ntpd", "syslogd"],
      answer: [1, 3],
      explain: "ntpd and chronyd are the two daemons used to sync Linux system clocks against remote NTP time servers.",
      tags: ["ntp", "ntpd", "chronyd"]
    },
    {
      q: "Which configuration file does chrony use to define NTP servers?",
      type: "fill",
      answer: "/etc/chrony.conf",
      explain: "chrony reads its list of NTP servers and settings from /etc/chrony.conf.",
      tags: ["ntp", "config-files"]
    },
    {
      q: "Where are basic Linux user credentials stored (in the more secure, modern approach)?",
      type: "mcq",
      options: ["/etc/passwd only", "/etc/shadow", "/etc/security", "/etc/users.conf", "/etc/login.defs"],
      answer: 1,
      explain: "/etc/shadow securely stores password hashes, whereas /etc/passwd is the older, non-secure legacy location for user account info.",
      tags: ["authentication", "shadow"]
    },
    {
      q: "What was NIS originally called before being renamed due to a trademark issue?",
      type: "fill",
      answer: "Yellow Pages",
      explain: "NIS was developed at Sun Microsystems and originally called Yellow Pages (YP) before being renamed due to trademark infringement.",
      tags: ["nis", "history"]
    },
    {
      q: "Which package implements NIS on most Linux distributions?",
      type: "mcq",
      options: ["nis-utils", "openldap", "krb5-libs", "openssl", "ypbind"],
      answer: 0,
      explain: "nis-utils is the open-source package implementing NIS, included in most Linux distro repositories.",
      tags: ["nis", "nis-utils"]
    },
    {
      q: "Which authentication protocol, developed at MIT, uses symmetric-key cryptography to authenticate users against a centralized encrypted database?",
      type: "mcq",
      options: ["LDAP", "Kerberos", "NIS", "SNMP", "RADIUS"],
      answer: 1,
      explain: "Kerberos, developed at MIT, uses symmetric-key cryptography and encrypts the entire authentication process against a centralized database.",
      tags: ["kerberos", "authentication"]
    },
    {
      q: "Which directory protocol, created at the University of Michigan, is most popularly implemented on Linux as OpenLDAP?",
      type: "fill",
      answer: "LDAP",
      accepts: ["Lightweight Directory Access Protocol"],
      explain: "LDAP (Lightweight Directory Access Protocol) provides network authentication services, with OpenLDAP as its most popular Linux implementation.",
      tags: ["ldap", "openldap"]
    },
    {
      q: "OpenLDAP organizes network objects using which structural model?",
      type: "mcq",
      options: [
        "A flat, unordered list",
        "A hierarchical, treelike structure",
        "A relational table-based schema only",
        "A circular ring topology",
        "A flat key-value store with no parent-child relationships"
      ],
      answer: 1,
      explain: "OpenLDAP uses a hierarchical database, letting admins design a treelike directory structure to organize users, servers, and other objects.",
      tags: ["ldap", "openldap"]
    },
    {
      q: "Certificate-based authentication is considered a two-factor method because it requires which two things?",
      type: "multi",
      options: ["Something you are (a fingerprint)", "Something you configure (a security policy)", "Something you possess (the certificate file)", "Something you inherit (a group membership)", "Something you know (a PIN)"],
      answer: [2, 4],
      explain: "The notes describe certificate authentication as requiring possession of the certificate file plus knowledge of a PIN — not biometrics or inherited attributes.",
      tags: ["certificates", "authentication", "2fa"]
    },
    {
      q: "What must a server have in order to trust a certificate presented by a client?",
      type: "fill",
      answer: "Certificate Authority (CA)",
      accepts: ["a certificate authority"],
      explain: "A Certificate Authority (CA) is required so the server can validate and trust presented certificates.",
      tags: ["certificates", "ca"]
    },
    {
      q: "Which software provides standard certificate functions for both servers and clients on Linux?",
      type: "mcq",
      options: ["OpenSSL", "OpenSSH", "OpenVPN", "OpenLDAP", "OpenSC"],
      answer: 0,
      explain: "OpenSSL provides the standard certificate creation and management functions used to set up Linux certificate-based authentication.",
      tags: ["openssl", "certificates"]
    },
    {
      q: "Which protocol/software is the most popular Linux implementation for secure, encrypted remote shell access?",
      type: "mcq",
      options: ["Telnet", "OpenSSH", "FTP", "rsyslogd", "rlogin"],
      answer: 1,
      explain: "OpenSSH is the most popular SSH implementation on Linux, providing encrypted remote access and secure alternatives to Telnet/FTP.",
      tags: ["ssh", "openssh"]
    },
    {
      q: "OpenSSH's tunneling feature allows administrators to wrap any type of network transaction in an encryption layer, even for applications that don't natively support encryption.",
      type: "tf",
      answer: true,
      explain: "SSH tunneling can encapsulate arbitrary network traffic inside an encrypted SSH connection, protecting non-encrypted applications.",
      tags: ["ssh", "tunneling"]
    },
    {
      q: "Which solution creates a secure point-to-point tunnel allowing remote users full access to a local network's resources over the Internet?",
      type: "mcq",
      options: ["OpenVPN", "OpenLDAP", "OpenSSL", "CUPS", "BIND"],
      answer: 0,
      explain: "OpenVPN is the popular Linux VPN solution that establishes a secure tunnel between remote clients and the local network.",
      tags: ["vpn", "openvpn"]
    },
    {
      q: "Which historical clustering project relied on the PVM (Parallel Virtual Machine) library to distribute application calls across multiple Linux servers?",
      type: "fill",
      answer: "Beowulf",
      explain: "The Beowulf cluster is the historical example cited that used PVM for parallel processing across nodes.",
      tags: ["clustering", "beowulf", "pvm"]
    },
    {
      q: "Which newer technologies are modern clustering solutions? (Select all that apply.)",
      type: "multi",
      options: ["Kerberos", "Linux Virtual Server (LVS)", "Samba", "Apache Hadoop", "OpenLDAP"],
      answer: [1, 3],
      explain: "Apache Hadoop and LVS are cited as newer clustering technologies; Kerberos and OpenLDAP are authentication technologies, unrelated to clustering.",
      tags: ["clustering", "hadoop", "lvs"]
    },
    {
      q: "Why might clustering actually reduce performance for a database application?",
      type: "mcq",
      options: [
        "They cannot run database software because clustering supports only stateless services and web workloads.",
        "Concurrent instances need coordination and locking, which can reduce throughput and increase response time.",
        "They disable SQL support when more than one database node is active, forcing applications to use key-value APIs.",
        "They always use slower hardware than a standalone database server because traffic crosses multiple cluster nodes.",
        "They force every database query through a single unencrypted channel before execution."
      ],
      answer: 1,
      explain: "The notes caution that database clustering can introduce locking overhead when multiple instances execute queries concurrently, sometimes reducing performance.",
      tags: ["clustering", "database"]
    },
    {
      q: "How does load balancing differ from general clustering?",
      type: "mcq",
      options: [
        "It routes each client request to one server while distributing total demand across the cluster.",
        "It applies only to database clusters and cannot be used with web services.",
        "It removes the need for multiple servers by concentrating all requests on one host.",
        "It is unrelated to clustering because it operates only at the network perimeter.",
        "It sends every client request to every server so each node keeps an identical copy."
      ],
      answer: 0,
      explain: "Load balancing is described as a special application of clustering, where a load balancer directs each full client request to a specific server while distributing overall load.",
      tags: ["load-balancing", "clustering"]
    },
    {
      q: "Which of the following are named as common Linux load-balancing packages? (Select all that apply.)",
      type: "multi",
      options: ["Dovecot", "Nginx", "OpenLDAP", "HAProxy", "LVS"],
      answer: [1, 3, 4],
      explain: "HAProxy, LVS, and Nginx are all cited as load-balancing solutions; Dovecot is an IMAP mail server, unrelated to load balancing.",
      tags: ["load-balancing", "haproxy", "lvs", "nginx"]
    },
    {
      q: "What key problem do Linux containers solve for application developers?",
      type: "mcq",
      options: [
        "They remove the need for a host operating system by running applications directly on hardware.",
        "They bundle application files, libraries, and dependencies so behavior stays consistent across environments.",
        "They replace network services by keeping every application on one isolated local machine.",
        "They encrypt application data automatically without requiring application or host configuration.",
        "They replace application dependencies with a single shared system library set."
      ],
      answer: 1,
      explain: "Containers bundle everything an application needs so it behaves the same whether run on a developer workstation, physical server, VM, or in the cloud.",
      tags: ["containers"]
    },
    {
      q: "Which two platforms are named as the most popular Linux container technologies?",
      type: "multi",
      options: ["OpenVPN", "Kubernetes", "OpenStack", "Docker", "Beowulf"],
      answer: [1, 3],
      explain: "Docker and Kubernetes are cited as the two most popular Linux container platforms.",
      tags: ["containers", "docker", "kubernetes"]
    },
    {
      q: "A mail server accepts traditional SMTP traffic from other mail systems. Which well-known destination port identifies that service?",
      type: "mcq",
      options: ["25", "22", "53", "143", "389"],
      answer: 0,
      explain: "Port 25 is the traditional SMTP port used for mail transfer between servers. The other ports identify SSH, DNS, IMAP, and LDAP.",
      tags: ["ports", "smtp", "email"]
    },
    {
      q: "A Windows client needs to print to a printer physically attached to a Linux workstation. Which two Linux packages together make this possible?",
      type: "multi",
      options: ["NFS", "CUPS", "Dovecot", "Samba", "BIND"],
      answer: [1, 3],
      explain: "CUPS manages print sharing while Samba enables interoperability with Windows systems, together allowing a Windows client to use a Linux-attached printer.",
      tags: ["cups", "samba", "printing"]
    },
    {
      q: "Every daemon running on a Linux server consumes zero memory until it actually receives a client request.",
      type: "tf",
      answer: false,
      explain: "The notes state each daemon requires memory resources even while just listening for client requests, contrary to this claim.",
      tags: ["daemon", "memory"]
    },
    {
      q: "A database team wants to select among multiple storage engines for different workload requirements. Which database is associated with that design emphasis?",
      type: "mcq",
      options: ["MySQL", "PostgreSQL", "MongoDB", "Dovecot", "BIND"],
      answer: 0,
      explain: "MySQL is known for supporting multiple storage engines, allowing installations to choose behavior suited to different workloads. PostgreSQL and MongoDB use different database designs, while Dovecot and BIND are not database servers.",
      tags: ["mysql", "database", "storage-engines"]
    },
    {
      q: "A legacy SysVinit server must forward local messages to a remote log collector. Which logging daemon is the relevant choice?",
      type: "mcq",
      options: ["rsyslogd", "journald", "auditd", "logrotate", "named"],
      answer: 0,
      explain: "rsyslogd is the traditional logging daemon associated with SysVinit or Upstart and can handle remote logging. journald is associated with systemd, while the other choices have different roles.",
      tags: ["logging", "rsyslog", "remote-logging"]
    }
  ]
});
