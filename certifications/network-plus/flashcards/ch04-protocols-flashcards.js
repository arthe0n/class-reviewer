window.ReviewApp.content.register({
type: "flashcards",
cert: "network-plus",
chapter: "Chapter 4: Protocols",
items: [
{
front: "What is encapsulation?",
back: "The process of adding headers to a message as it moves down the OSI layers on the sending host.",
tags: ["network-plus", "encapsulation", "osi"]
},
{
front: "What is decapsulation?",
back: "The process of stripping headers off a message as it moves up the OSI layers on the receiving host.",
tags: ["network-plus", "decapsulation", "osi"]
},
{
front: "What is the PDU at the Transport layer?",
back: "Segment for TCP, datagram for UDP.",
tags: ["network-plus", "pdu", "transport"]
},
{
front: "What is the PDU at the Network layer?",
back: "Packet.",
tags: ["network-plus", "pdu", "network"]
},
{
front: "What is the PDU at the Data Link layer?",
back: "Frame, consisting of a header, payload, and trailer.",
tags: ["network-plus", "pdu", "data-link"]
},
{
front: "What does the Transport header add?",
back: "Source and destination ports identifying the applications on each host.",
tags: ["network-plus", "transport", "ports"]
},
{
front: "What does the Network header add?",
back: "Source and destination IP addresses used for routing.",
tags: ["network-plus", "network", "ip"]
},
{
front: "What does the Data Link header and trailer add?",
back: "Source and destination MAC addresses plus a trailer for error detection.",
tags: ["network-plus", "data-link", "mac"]
},
{
front: "Which device is known by Layer 2, and what does it read?",
back: "A switch; it reads the data link header without inspecting higher-layer headers.",
tags: ["network-plus", "switching", "osi"]
},
{
front: "Which device is known by Layer 3, and what does it read?",
back: "A router; it reads the network layer header and leaves the transport header alone.",
tags: ["network-plus", "routing", "osi"]
},
{
front: "How deep does a port-filtering firewall read, and how deep does a DPI firewall read?",
back: "A transport-aware firewall reads to Layer 4 for ports; a deep packet inspection firewall reads through Layer 7 checking for malware.",
tags: ["network-plus", "firewall", "osi"]
},
{
front: "What analogy describes TCP versus UDP delivery?",
back: "TCP is like a phone call confirming the listener first; UDP is like a radio broadcast sent whether anyone listens or not.",
tags: ["network-plus", "tcp", "udp"]
},
{
front: "What makes TCP connection-oriented?",
back: "It establishes a session with the three-way handshake before transmitting application data.",
tags: ["network-plus", "tcp", "handshake"]
},
{
front: "What do TCP sequence numbers do?",
back: "They mark each segment's chronological position so the receiver can reorder segments that arrive out of order.",
tags: ["network-plus", "tcp", "sequencing"]
},
{
front: "What does a TCP checksum mismatch trigger?",
back: "Retransmission of the corrupted segment.",
tags: ["network-plus", "tcp", "checksum"]
},
{
front: "What is TCP flow control?",
back: "The sender limits its rate to what the receiver can accept, issuing only up to the advertised window before pausing for acknowledgment.",
tags: ["network-plus", "tcp", "flow-control"]
},
{
front: "Which TCP field performs flow control, and how large is it?",
back: "The sliding-window size field, 16 bits, stating how many bytes may be sent before an acknowledgment.",
tags: ["network-plus", "tcp", "window"]
},
{
front: "How large are TCP port fields and sequence fields?",
back: "Source and destination ports are 16 bits each; sequence and acknowledgment numbers are 32 bits each.",
tags: ["network-plus", "tcp", "header"]
},
{
front: "What is the size range of a TCP header?",
back: "20 to 60 bytes in 4-byte increments; a 24-byte header means 4 bytes of options or padding.",
tags: ["network-plus", "tcp", "header"]
},
{
front: "What does the TCP SYN flag request?",
back: "Synchronization of sequence numbers between the two nodes, with no payload included.",
tags: ["network-plus", "tcp", "syn"]
},
{
front: "What does the TCP ACK flag indicate?",
back: "The acknowledgment field carries information for the receiver.",
tags: ["network-plus", "tcp", "ack"]
},
{
front: "What do the TCP FIN and RST flags signal?",
back: "FIN marks the last segment and closes the connection; RST requests an immediate reset.",
tags: ["network-plus", "tcp", "flags"]
},
{
front: "What do the TCP PSH and URG flags signal?",
back: "PSH sends data to the application without buffering; URG points to urgent data via the urgent pointer.",
tags: ["network-plus", "tcp", "flags"]
},
{
front: "What are the three steps of the TCP three-way handshake?",
back: "SYN from A, SYN/ACK from B, then ACK from A — after which data can flow.",
tags: ["network-plus", "tcp", "handshake"]
},
{
front: "In a handshake opening with sequence 937013558, what acknowledgment comes back?",
back: "937013559 — the received sequence number plus one.",
tags: ["network-plus", "tcp", "handshake"]
},
{
front: "What does the acknowledgment number tell the sender?",
back: "Everything up to that point was received, and this is the next sequence number expected.",
tags: ["network-plus", "tcp", "handshake"]
},
{
front: "Do handshake messages carry payloads?",
back: "No; they only establish the session and synchronize numbers before data transfer.",
tags: ["network-plus", "tcp", "handshake"]
},
{
front: "What is the ISN security concern?",
back: "Initial Sequence Numbers come from clock-based per-OS algorithms whose predictability hackers can exploit against connection availability.",
tags: ["network-plus", "tcp", "isn", "security"]
},
{
front: "A capture shows SYN and ACK set with source port 80. Which handshake step is it?",
back: "The second step: the web server answering the opener with SYN/ACK.",
tags: ["network-plus", "tcp", "wireshark"]
},
{
front: "How many fields are in a UDP header?",
back: "Four: source port, destination port, length, and checksum.",
tags: ["network-plus", "udp", "header"]
},
{
front: "When is the UDP checksum required instead of optional?",
back: "It is optional on IPv4 but required for IPv6, which has no checksum of its own.",
tags: ["network-plus", "udp", "checksum", "ipv6"]
},
{
front: "What does the UDP Length field measure?",
back: "The total length of the UDP segment, header plus data.",
tags: ["network-plus", "udp", "header"]
},
{
front: "What is RTP and how does it relate to UDP?",
back: "Real-time Transport Protocol at the application layer; it adds its own sequence numbers over UDP to order media and detect loss.",
tags: ["network-plus", "rtp", "udp"]
},
{
front: "Which traffic suits UDP best?",
back: "High-volume, speed-sensitive traffic like live audio/video, small requests like DNS, or gaming where speed beats perfect accuracy.",
tags: ["network-plus", "udp", "use-cases"]
},
{
front: "What does IP contribute that TCP and UDP do not?",
back: "Source and destination addresses for internetwork routing across LAN segments through routers.",
tags: ["network-plus", "ip", "routing"]
},
{
front: "Why can IP packets of one message take different routes?",
back: "IP is connectionless with no session, so each packet is forwarded independently.",
tags: ["network-plus", "ip", "connectionless"]
},
{
front: "What does the IPv4 Protocol field identify?",
back: "The payload type encapsulated inside, such as TCP, UDP, or ICMP.",
tags: ["network-plus", "ipv4", "header"]
},
{
front: "What does IPv4 TTL do, and what happens at zero?",
back: "It caps remaining router hops, decrementing each hop; at zero the router discards the packet and returns a TTL-expired message via ICMP.",
tags: ["network-plus", "ipv4", "ttl"]
},
{
front: "What do the IPv4 Identification and Fragment offset fields do?",
back: "Identification marks which message a fragment belongs to; fragment offset places it within the fragment series for reassembly.",
tags: ["network-plus", "ipv4", "fragmentation"]
},
{
front: "What is the maximum size of an IPv4 packet?",
back: "65,535 bytes total, header plus data, per the 16-bit Total length field.",
tags: ["network-plus", "ipv4", "mtu"]
},
{
front: "What does the IPv4 DiffServ field do?",
back: "It sets precedence levels, up to 64 values, telling routers how to prioritize the packet.",
tags: ["network-plus", "ipv4", "diffserv"]
},
{
front: "A header shows 20-byte length and Don't-fragment set. What can you conclude?",
back: "No options or padding are present, and the packet cannot be fragmented to fit a smaller MTU.",
tags: ["network-plus", "ipv4", "wireshark"]
},
{
front: "Why do IPv6 packets have no Fragment offset field?",
back: "IPv6 hosts size packets to fit path requirements before sending instead of fragmenting in flight.",
tags: ["network-plus", "ipv6", "fragmentation"]
},
{
front: "What is the IPv6 Hop limit?",
back: "The IPv6 equivalent of TTL: how many times routers may forward the packet before discard.",
tags: ["network-plus", "ipv6", "hop-limit"]
},
{
front: "How does IPv6 Payload length differ from IPv4 Total length?",
back: "It measures only the payload, not the whole packet as IPv4's Total length does.",
tags: ["network-plus", "ipv6", "header"]
},
{
front: "What does the IPv6 Next header field name?",
back: "The header immediately following IPv6, usually TCP, UDP, or ICMPv6.",
tags: ["network-plus", "ipv6", "header"]
},
{
front: "What are the IPv6 Traffic class and Flow label for?",
back: "Traffic class sets priority like DiffServ; flow label groups a sequence of packets so routers keep them together.",
tags: ["network-plus", "ipv6", "header"]
},
{
front: "How do IPv6 source and destination fields compare with IPv4?",
back: "128 bits each instead of 32 bits each.",
tags: ["network-plus", "ipv6", "addressing"]
},
{
front: "What does ICMP do, and what does it never do?",
back: "It reports delivery failures such as congestion or TTL expiry; it never corrects errors — TCP handles that.",
tags: ["network-plus", "icmp"]
},
{
front: "What do ICMP Type and Code fields carry?",
back: "Type names the message kind such as Destination Unreachable; code gives the subtype such as host unknown.",
tags: ["network-plus", "icmp", "header"]
},
{
front: "What does ICMPv6 take over on IPv6 networks?",
back: "ICMPv4-style error reporting plus ARP-style address resolution, node discovery, and multicast management.",
tags: ["network-plus", "icmpv6", "ndp"]
},
{
front: "How does ARP learn a MAC address?",
back: "By broadcasting a request for the owner of an IPv4 address, which replies with its physical address.",
tags: ["network-plus", "arp"]
},
{
front: "What is an ARP table?",
back: "A local database mapping IPv4 addresses to MAC addresses on the local network.",
tags: ["network-plus", "arp", "arp-table"]
},
{
front: "What distinguishes dynamic from static ARP entries?",
back: "Dynamic entries form automatically from ARP traffic; static entries are entered manually with the ARP utility.",
tags: ["network-plus", "arp", "arp-table"]
},
{
front: "What does `arp -a` show, and what do `arp -d` and `arp -s` do?",
back: "`-a` lists entries with their static/dynamic type; `-d` flushes entries to force repopulation; `-s` adds a static entry with admin rights.",
tags: ["network-plus", "arp", "commands"]
},
{
front: "How does an ARP table differ from a MAC address table?",
back: "ARP maps Layer 3 IPs to Layer 2 MACs; a switch MAC table maps Layer 2 MACs to Layer 1 physical interfaces.",
tags: ["network-plus", "arp", "mac-table"]
},
{
front: "What is NDP and why does IPv6 use it instead of ARP?",
back: "Neighbor Discovery Protocol over ICMPv6 detects neighbors and adapts to failures, replacing ARP with better hacking resistance.",
tags: ["network-plus", "ndp", "ipv6"]
},
{
front: "What do RA and RS messages do?",
back: "Routers periodically advertise prefixes and limits with RA; new hosts solicit that info immediately with RS.",
tags: ["network-plus", "ndp", "ra", "rs"]
},
{
front: "What do NS and NA messages do?",
back: "NS requests a neighbor's link-layer address and runs Duplicate Address Detection; NA replies with MAC information.",
tags: ["network-plus", "ndp", "ns", "na"]
},
{
front: "What is an NDP Redirect message for?",
back: "A router telling hosts that another router is a better gateway for a destination.",
tags: ["network-plus", "ndp", "redirect"]
},
{
front: "When should you choose LLDP over CDP?",
back: "On mixed-vendor networks: LLDP is the vendor-neutral IEEE standard while CDP is Cisco-proprietary.",
tags: ["network-plus", "lldp", "cdp"]
},
{
front: "What are the LLC and MAC sublayers of Ethernet?",
back: "LLC identifies the protocol message type; MAC holds addresses, the message, and the trailer checksum.",
tags: ["network-plus", "ethernet", "llc"]
},
{
front: "What does the Ethernet Type field carry?",
back: "The upper-layer protocol identifier, such as 0x0800 for an IP packet.",
tags: ["network-plus", "ethernet", "frame"]
},
{
front: "What do the Preamble and SFD do?",
back: "The 7-byte preamble synchronizes the receiver clock; the 1-byte SFD marks the frame's start.",
tags: ["network-plus", "ethernet", "frame"]
},
{
front: "What algorithm protects the Ethernet FCS?",
back: "CRC, the cyclic redundancy check, verifying received data matches what was sent.",
tags: ["network-plus", "ethernet", "fcs"]
},
{
front: "What are the standard Ethernet II frame sizes?",
back: "64 bytes minimum and 1,518 maximum: the 18-byte wrapper around 46 to 1,500 bytes of data.",
tags: ["network-plus", "ethernet", "frame"]
},
{
front: "What is the default Ethernet MTU?",
back: "1,500 bytes, the general Internet standard for the Layer 2 payload.",
tags: ["network-plus", "ethernet", "mtu"]
},
{
front: "Why can VLAN frames reach 1,522 bytes?",
back: "A 4-byte VLAN field sits between Source address and Type, raising the maximum by exactly that much.",
tags: ["network-plus", "ethernet", "vlan"]
},
{
front: "What are jumbo frames?",
back: "Frames on special-purpose networks with MTU set above 9,000 bytes for less per-frame overhead.",
tags: ["network-plus", "ethernet", "jumbo-frames"]
},
{
front: "What is MSS and why negotiate it?",
back: "Maximum segment size agreed at session start so transport messages fit the path MTU and avoid fragmentation.",
tags: ["network-plus", "tcp", "mss"]
},
{
front: "What three states can data exist in?",
back: "At rest (stored), in use (being accessed), and in transit (being moved).",
tags: ["network-plus", "encryption", "data-states"]
},
{
front: "In which data state is information most vulnerable?",
back: "In transit, exposed to interception once it leaves the trusted network — wireless legs especially.",
tags: ["network-plus", "encryption", "data-states"]
},
{
front: "What are the three CIA triad principles?",
back: "Confidentiality (only intended recipients view), integrity (unmodified in transit), availability (accessible when needed).",
tags: ["network-plus", "cia-triad"]
},
{
front: "Why is encryption called the last layer of defense?",
back: "It keeps data unreadable even after physical and network-design security, like firewalls, have been bypassed.",
tags: ["network-plus", "encryption"]
},
{
front: "How does symmetric encryption work and what is its hard problem?",
back: "One shared key encrypts and decrypts; the challenge is sharing that key without interception.",
tags: ["network-plus", "encryption", "symmetric"]
},
{
front: "Encrypting with a public key ensures what? Encrypting with a private key proves what?",
back: "Public-key encryption ensures confidentiality since only the private owner decrypts; private-key encryption proves integrity since clean decryption means no tampering.",
tags: ["network-plus", "encryption", "pki"]
},
{
front: "What problem does PKI solve?",
back: "Verifying that a published public key truly belongs to its claimed owner, via CA-issued digital certificates.",
tags: ["network-plus", "pki", "certificates"]
},
{
front: "Why don't browsers trust self-signed certificates?",
back: "They prove internal consistency but not authenticity since the whole certificate could be counterfeit — and they cannot be revoked.",
tags: ["network-plus", "certificates", "self-signed"]
},
{
front: "What does key rotation involve, and what happens to retired keys?",
back: "Old keys are replaced and data re-encrypted; retired keys are archived since old data may still need them.",
tags: ["network-plus", "key-management"]
},
{
front: "Where should keys live, and where must they never appear?",
back: "In HSM-protected stores with minimal logged access; never in code, documents, or scripts.",
tags: ["network-plus", "key-management", "hsm"]
},
{
front: "Which OSI layers do SSL and TLS operate at?",
back: "SSL at the application layer; TLS, the IETF-standardized successor, at the transport layer.",
tags: ["network-plus", "ssl", "tls"]
},
{
front: "Should SSL stay enabled for compatibility?",
back: "No — SSL is deprecated and should be disabled, leaving TLS; they coexist only for backward compatibility.",
tags: ["network-plus", "ssl", "tls"]
},
{
front: "Which ports do HTTPS, SMTPS, IMAPS, POP3S, and LDAPS use?",
back: "443, 587, 993, 995, and 636.",
tags: ["network-plus", "ports", "tls"]
},
{
front: "When should you choose DoT versus DoH?",
back: "DoT on port 853 for identifiable, manageable secure DNS on trusted networks; DoH on port 443 to blend DNS into web traffic on untrusted networks.",
tags: ["network-plus", "dns", "dot", "doh"]
},
{
front: "Does HTTPS encrypt the DNS lookups needed to reach the site?",
back: "No — site traffic is protected but resolution requests need DoT or DoH for cover.",
tags: ["network-plus", "dns", "https", "doh"]
},
{
front: "What happens between ServerHello and key exchange in TLS?",
back: "The server sends its certificate and the client validates its validity, hostname, signature, and trust chain.",
tags: ["network-plus", "tls", "handshake"]
},
{
front: "How does TLS 1.3 improve on 1.2 handshakes?",
back: "Fresh connections finish in 1-RTT with 0-RTT resumption, dropping older weak crypto that 1.2 still carried.",
tags: ["network-plus", "tls", "tls-1.3"]
},
{
front: "At which layer does IPsec operate?",
back: "Layer 3, adding security information to IP packets and protecting payloads.",
tags: ["network-plus", "ipsec"]
},
{
front: "Does IPv6 use IPsec automatically?",
back: "No — support is built into the IPv6 specification but connections use it only when configured.",
tags: ["network-plus", "ipsec", "ipv6"]
},
{
front: "What do IKE and ISAKMP each contribute to IPsec?",
back: "IKE negotiates parameters and establishes keys (currently IKEv2); ISAKMP provides the framework it builds on.",
tags: ["network-plus", "ipsec", "ike"]
},
{
front: "When should you choose AH versus ESP?",
back: "AH for authentication and integrity without encryption; ESP when confidentiality is also required.",
tags: ["network-plus", "ipsec", "ah", "esp"]
},
{
front: "When should you choose IPsec transport versus tunnel mode?",
back: "Transport mode for host-to-host with the original header visible; tunnel mode encapsulating whole packets for VPNs.",
tags: ["network-plus", "ipsec", "modes"]
},
{
front: "What triggers the IPsec process?",
back: "Traffic matching a predefined security policy; keys and security associations are negotiated before data transfer.",
tags: ["network-plus", "ipsec", "policy"]
},
{
front: "What is FTP's core security flaw?",
back: "It transmits data and credentials in plaintext.",
tags: ["network-plus", "ftp"]
},
{
front: "How do FTPS, SFTP, and TFTP differ?",
back: "FTPS adds SSL/TLS to FTP; SFTP is an SSH extension on one port-22 connection; TFTP is unauthenticated UDP for tiny trusted transfers.",
tags: ["network-plus", "ftps", "sftp", "tftp"]
},
{
front: "Is SFTP just FTP over SSH?",
back: "No — it extends the SSH protocol and is incompatible with FTP/FTPS.",
tags: ["network-plus", "sftp", "ssh"]
},
{
front: "What is a TFTP server typically used for?",
back: "Booting diskless devices and backing up or updating network device configurations on trusted LANs.",
tags: ["network-plus", "tftp"]
},
{
front: "Why avoid Telnet for administration?",
back: "Poor authentication and zero encryption — SSH is the secure replacement.",
tags: ["network-plus", "telnet", "ssh"]
},
{
front: "Which spoofing attacks does SSH defeat?",
back: "IP spoofing and DNS spoofing, by encrypting the whole session against header forgery and forged records.",
tags: ["network-plus", "ssh", "spoofing"]
},
{
front: "What is PuTTY and what is OpenSSH?",
back: "PuTTY is the freeware Windows SSH/Telnet client; OpenSSH ships with UNIX-like systems and macOS.",
tags: ["network-plus", "ssh", "putty"]
},
{
front: "How is passwordless SSH authentication set up?",
back: "Generate keys on the client with ssh-keygen, install the public key on the host, and let both halves authenticate at connect.",
tags: ["network-plus", "ssh", "ssh-keygen"]
},
{
front: "Which port does SSH listen on?",
back: "Port 22, which SFTP also crosses as an SSH extension.",
tags: ["network-plus", "ssh", "ports"]
},
{
front: "When should you choose RDP over SSH?",
back: "For a full Microsoft GUI desktop with icons, menus, and sound instead of a CLI-only session.",
tags: ["network-plus", "rdp"]
},
{
front: "Why can't SSH or RDP fix a server whose OS won't boot?",
back: "They are in-band tools needing a running OS; out-of-band management uses dedicated paths to reach dead devices.",
tags: ["network-plus", "oobm"]
},
{
front: "What can out-of-band management do?",
back: "Remotely power devices, change firmware, reinstall operating systems, monitor sensors, and troubleshoot boot problems.",
tags: ["network-plus", "oobm"]
},
{
front: "When should you choose a site-to-site VPN?",
back: "To join whole LANs as one private network over the Internet, with a VPN gateway at each edge holding a static public IP.",
tags: ["network-plus", "vpn", "site-to-site"]
},
{
front: "Do LAN hosts need VPN software in site-to-site or client-to-site setups?",
back: "No — the gateway or headend owns the tunnel; only remote clients and host-to-host peers run VPN software.",
tags: ["network-plus", "vpn", "gateway"]
},
{
front: "What is the VPN headend and which side needs the static IP?",
back: "The gateway terminating many client-to-site tunnels at the LAN edge; only the headend needs a static public IP.",
tags: ["network-plus", "vpn", "headend"]
},
{
front: "When should you choose a clientless VPN?",
back: "For limited browser-based SSL/TLS access with no dedicated client software to install.",
tags: ["network-plus", "vpn", "clientless"]
},
{
front: "When should you choose split tunnel versus full tunnel?",
back: "Split tunnel to keep Internet traffic direct and cut latency and corporate load; full tunnel when every packet must take the corporate path.",
tags: ["network-plus", "vpn", "split-tunnel"]
},
{
front: "How do L2TP, GRE, OpenVPN, and IKEv2 differ?",
back: "L2TP tunnels at Layer 2 across vendors with IPsec; GRE tunnels at Layer 3; OpenVPN uses OpenSSL and crosses firewalls well; IKEv2 is fast and stable across hotspots.",
tags: ["network-plus", "vpn", "tunneling"]
},
{
front: "Do VPN tunneling protocols encrypt on their own?",
back: "Usually not — most encapsulate only and rely on an added protocol such as IPsec for security.",
tags: ["network-plus", "vpn", "ipsec"]
},
{
front: "What does `netstat` reveal that helps troubleshooting?",
back: "Active connections, service ports, per-interface message counts, and data errors — such as one NIC starved of traffic.",
tags: ["network-plus", "netstat"]
},
{
front: "What do `netstat -n`, `-f`, `-a`, `-s`, and `-r` each show?",
back: "Numeric IPs/ports, FQDNs included, all connections and listening ports, per-protocol statistics, and the routing table.",
tags: ["network-plus", "netstat"]
},
{
front: "What replaces `netstat` on modern Linux, and does the exam still test it?",
back: "The `ss` utility replaces it, but the exam still expects `netstat` knowledge since both share parameters.",
tags: ["network-plus", "netstat", "ss"]
}
]
});
