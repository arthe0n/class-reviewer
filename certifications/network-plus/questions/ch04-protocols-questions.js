window.ReviewApp.content.register({
type: "questions",
cert: "network-plus",
chapter: "Chapter 4: Protocols",
items: [
{
type: "mcq",
q: "Which process adds headers to a message as it moves down the OSI layers on the sending host?",
options: ["Encapsulation", "Decapsulation", "Fragmentation", "Modulation", "Multiplexing"],
answer: 0,
explain: "Encapsulation adds each layer's header going down the stack; decapsulation strips them going up on the receiver.",
tags: ["encapsulation", "osi"]
},
{
type: "match",
q: "Match each OSI layer to the PDU name used at that layer.",
pairs: [
{ item: "Transport", match: "Segment or datagram" },
{ item: "Network", match: "Packet" },
{ item: "Data Link", match: "Frame" },
{ item: "Physical", match: "Bits on the wire" }
],
explain: "The PDU names are segment/datagram at Layer 4, packet at Layer 3, frame at Layer 2, and bits at Layer 1.",
tags: ["osi", "pdu"]
},
{
type: "mcq",
q: "Which header field identifies the sending and receiving applications at the Transport layer?",
options: ["IP addresses", "Port numbers", "Sequence numbers", "Checksums", "MAC addresses"],
answer: 1,
explain: "The TCP/UDP header carries source and destination ports, which select the applications on each host.",
tags: ["transport", "ports"]
},
{
type: "mcq",
q: "Which header field do routers use to forward a packet toward its destination?",
options: ["Source and destination IP addresses", "Sequence number", "Window size", "Source port", "Destination MAC address"],
answer: 0,
explain: "The IP header's source and destination addresses drive routing; ports and sequence numbers are transport-layer concerns.",
tags: ["ip", "routing"]
},
{
type: "mcq",
q: "A switch forwards frames but never inspects IP addresses or ports. Which layer is the highest it reads?",
options: ["Layer 4 - Transport", "Layer 7 - Application", "Layer 1 - Physical", "Layer 2 - Data Link", "Layer 3 - Network"],
answer: 3,
explain: "Switches read the data link header; routers go one layer deeper to the network header.",
tags: ["switching", "osi"]
},
{
type: "mcq",
q: "A firewall blocks traffic based on destination port. How deep into the message must it read?",
options: ["Layer 6 - Presentation", "Layer 2 - Data Link", "Layer 3 - Network", "Layer 4 - Transport", "Layer 5 - Session"],
answer: 3,
explain: "Ports live in the transport header, so a port-aware firewall must process through Layer 4.",
tags: ["firewall", "osi", "ports"]
},
{
type: "mcq",
q: "Which protocol is described as working like a phone call, confirming the other side is listening before talking?",
options: ["UDP", "TCP", "IP", "ICMP", "ARP"],
answer: 1,
explain: "TCP is connection-oriented and handshakes first; UDP is the connectionless radio-broadcast analogue.",
tags: ["tcp", "udp"]
},
{
type: "multi",
q: "Which mechanisms give TCP its reliable delivery?",
options: [
"Three-way handshake before data transfer",
"Sequence numbers for reordering",
"Checksums triggering retransmission",
"Flow control matching receiver capacity",
"Broadcast-based address discovery"
],
answer: [0, 1, 2, 3],
explain: "The handshake, sequencing, checksums, and flow control together make TCP reliable; broadcast discovery is ARP's job.",
tags: ["tcp", "reliability"]
},
{
type: "mcq",
q: "A receiver advertises it can accept 4,000 bytes before an acknowledgment. Which TCP feature is this?",
options: ["Flow control", "Error correction", "Address resolution", "Session multiplexing", "Sequencing"],
answer: 0,
explain: "The sliding-window size performs flow control by limiting how much the sender may issue before pausing.",
tags: ["tcp", "flow-control"]
},
{
type: "mcq",
q: "Which TCP header field tells the sender how many bytes it may issue before waiting?",
options: ["Sliding-window size", "Urgent pointer", "Padding", "Sequence number", "Acknowledgment number"],
answer: 0,
explain: "The 16-bit window field carries the receiver's current capacity, the core of TCP flow control.",
tags: ["tcp", "header"]
},
{
type: "mcq",
q: "Segments arrive out of order after taking different paths. Which TCP field lets the receiver rebuild the stream?",
options: ["Urgent pointer", "Header length", "Checksum", "Sequence number", "Window size"],
answer: 3,
explain: "The 32-bit sequence number marks each segment's chronological position so the receiver can reorder them.",
tags: ["tcp", "sequencing"]
},
{
type: "mcq",
q: "A received segment fails its checksum comparison. What happens next?",
options: ["It is decrypted with the session key", "It is accepted with a warning flag", "It is reassembled from fragments", "It is retransmitted", "It is forwarded to a default gateway"],
answer: 3,
explain: "A checksum mismatch means corruption in transit, so the destination triggers retransmission of the segment.",
tags: ["tcp", "checksum"]
},
{
type: "match",
q: "Match each TCP flag to the condition it signals.",
pairs: [
{ item: "SYN", match: "Request synchronization of sequence numbers" },
{ item: "ACK", match: "Acknowledgment field carries information" },
{ item: "FIN", match: "Last segment; close the connection" },
{ item: "RST", match: "Reset the connection" },
{ item: "PSH", match: "Deliver data to the application without buffering" }
],
explain: "SYN starts synchronization, ACK acknowledges, FIN ends the sequence, RST resets, and PSH pushes data upward immediately.",
tags: ["tcp", "flags"]
},
{
type: "mcq",
q: "Computer A sends its first handshake message with sequence number 937013558. What acknowledgment number comes back from B?",
options: ["937013557", "937013558", "937013559", "3043958669", "0"],
answer: 2,
explain: "The acknowledgment number is the received sequence number plus one, confirming receipt and naming the next expected number.",
tags: ["tcp", "handshake"]
},
{
type: "mcq",
q: "In the first message of the three-way handshake, which flags are set?",
options: ["ACK only", "SYN and ACK", "FIN and ACK", "RST only", "SYN only"],
answer: 4,
explain: "The opening SYN requests synchronization with ACK 0 since nothing has been received yet; B replies SYN/ACK.",
tags: ["tcp", "handshake"]
},
{
type: "mcq",
q: "The second handshake message carries SYN and ACK with no payload. What does the ACK confirm?",
options: ["Data transfer is complete", "The window size is zero", "The route is encrypted", "The session keys are ready", "A's SYN was received"],
answer: 4,
explain: "B's SYN/ACK acknowledges A's SYN (ack = A's sequence + 1) while offering B's own sequence number.",
tags: ["tcp", "handshake"]
},
{
type: "mcq",
q: "Why do the three handshake messages carry no payload?",
options: ["Payloads are fragmented separately", "The window size forbids it", "Payloads travel over UDP instead", "The session exists only to sync sequence numbers and confirm readiness", "Encryption keys occupy the data field"],
answer: 3,
explain: "The handshake's only job is establishing the session and synchronizing numbers; application data follows afterward.",
tags: ["tcp", "handshake"]
},
{
type: "mcq",
q: "An attacker predicts a host's Initial Sequence Numbers. What weakness is being exploited?",
options: ["Self-signed certificates", "Weak cipher suites", "Clock-based ISN algorithms that vary by OS", "Unencrypted DNS resolution", "Broadcast address resolution"],
answer: 2,
explain: "ISNs look random but come from clock-based per-OS algorithms whose predictability can undermine connection availability.",
tags: ["tcp", "security", "isn"]
},
{
type: "mcq",
q: "A Wireshark capture shows source port 80, destination port 1958, flags SYN and ACK set. Which side sent it?",
options: ["The web client opening the connection", "The web server responding to the opener", "A router forwarding the final ACK", "A DNS server answering a query", "A switch flooding the frame"],
answer: 1,
explain: "Port 80 is the HTTP server side and SYN/ACK is the second handshake message, so this is the server answering the client.",
tags: ["tcp", "wireshark", "handshake"]
},
{
type: "mcq",
q: "The captured TCP header is 24 bytes long. What does that reveal?",
options: ["Options or padding added 4 bytes past the 20-byte minimum", "The segment carries urgent data", "The connection uses jumbo frames", "The checksum failed", "No options or padding are present"],
answer: 0,
explain: "The minimum TCP header is 20 bytes, so 24 bytes means 4 bytes of options or padding were included.",
tags: ["tcp", "header", "wireshark"]
},
{
type: "mcq",
q: "The capture shows window size 5,840 and MSS 1,460. What was negotiated?",
options: ["Both sides use 5,840-byte segments", "The TTL is 5,840 with 1,460 hops left", "The checksum covers 5,840 bytes", "B accepts 5,840 bytes before an ack; segments up to 1,460 bytes", "A accepts 1,460 bytes before an ack; window is 5,840 segments"],
answer: 3,
explain: "Window size is the receiver's byte capacity before acknowledgment; MSS caps the transport message size to avoid fragmentation.",
tags: ["tcp", "wireshark", "mss"]
},
{
type: "mcq",
q: "Which transport protocol suits live video where speed matters more than perfect accuracy?",
options: ["ARP", "ICMP", "TCP", "UDP", "IPsec"],
answer: 3,
explain: "UDP skips handshakes, acknowledgments, and retransmission, making it faster for loss-tolerant real-time traffic.",
tags: ["udp", "tcp"]
},
{
type: "mcq",
q: "How many fields does a UDP header carry, compared with TCP's larger header?",
options: ["Ten", "Two", "Four", "Six", "Eight"],
answer: 2,
explain: "UDP needs only source port, destination port, length, and checksum — far leaner than TCP's header.",
tags: ["udp", "header"]
},
{
type: "mcq",
q: "A developer moves an application from IPv4 to IPv6 over UDP. Which header rule changes?",
options: ["Ports become 32-bit fields", "The checksum becomes required rather than optional", "A handshake becomes mandatory", "Sequence numbers are added", "The length field is removed"],
answer: 1,
explain: "UDP checksum is optional on IPv4 but required for IPv6, since IPv6 itself carries no checksum.",
tags: ["udp", "ipv6", "checksum"]
},
{
type: "mcq",
q: "RTP adds sequence numbers to media carried over UDP. Why is that useful?",
options: ["It lets the receiver order messages and detect loss", "It compresses the payload", "It resolves hostnames", "It fragments frames", "It encrypts the stream"],
answer: 0,
explain: "Application-layer RTP emulates TCP-like ordering and loss detection on top of connectionless UDP delivery.",
tags: ["udp", "rtp"]
},
{
type: "tf",
q: "UDP establishes a session with a three-way handshake before sending data.",
answer: false,
explain: "UDP is connectionless: no handshake, no acknowledgment, no sequencing — that is precisely why it is faster than TCP.",
tags: ["udp", "tcp"]
},
{
type: "mcq",
q: "IP packets in one message reach the destination by different routes. Which IP trait explains this?",
options: ["Guaranteed in-order delivery", "Built-in retransmission", "Port-based multiplexing", "Connection-oriented sessions", "Connectionless per-packet forwarding"],
answer: 4,
explain: "IP establishes no session, so each packet is forwarded independently and may travel a different path.",
tags: ["ip", "routing"]
},
{
type: "mcq",
q: "What does the 8-bit Protocol field in an IPv4 header identify?",
options: ["The number of remaining hops", "The header length in bytes", "The transport protocol in the payload, such as TCP or UDP", "The priority routers must apply", "The sender's port number"],
answer: 2,
explain: "The Protocol field names the encapsulated payload type (TCP, UDP, ICMP) so the receiver knows how to handle it.",
tags: ["ipv4", "header"]
},
{
type: "mcq",
q: "A router receives a packet with TTL 1. What does it do?",
options: ["Encrypts it with IPsec", "Forwards it with TTL 0", "Discards it and returns a TTL-expired message via ICMP", "Fragments it immediately", "Reassembles it with earlier fragments"],
answer: 2,
explain: "Each router decrements TTL; at zero the packet is discarded and the sender is notified through ICMP.",
tags: ["ipv4", "ttl", "icmp"]
},
{
type: "mcq",
q: "An IPv4 header shows Don't-fragment set and a 1,600-byte packet facing a 1,500-byte MTU. What happens?",
options: ["The packet is fragmented normally", "The packet is discarded since it cannot be fragmented", "The packet is compressed to fit", "The TTL is doubled", "The packet bypasses the router"],
answer: 1,
explain: "The DF bit forbids fragmentation, so an oversized packet for the MTU cannot be forwarded and is dropped.",
tags: ["ipv4", "fragmentation", "mtu"]
},
{
type: "mcq",
q: "Which IPv4 header field lets routers reassemble a fragmented message in the right order?",
options: ["Protocol", "Version", "Header checksum", "TTL", "Identification"],
answer: 4,
explain: "The 16-bit Identification field marks which message a fragment belongs to so fragments can be reassembled.",
tags: ["ipv4", "fragmentation"]
},
{
type: "mcq",
q: "A capture shows IPv4 version 4, header length 20 bytes, total length 44 bytes. What follows about options?",
options: ["The packet is fragmented", "The payload uses IPv6", "The checksum is invalid", "The packet carries maximum-size options", "No options or padding are present"],
answer: 4,
explain: "Twenty bytes is the minimum IPv4 header, so nothing beyond the fixed fields is included; the 24-byte remainder is the TCP segment.",
tags: ["ipv4", "header", "wireshark"]
},
{
type: "mcq",
q: "Which IPv6 field replaces the router-forwarding limit that TTL provides in IPv4?",
options: ["Payload length", "Traffic class", "Flow label", "Hop limit", "Next header"],
answer: 3,
explain: "Hop limit works like TTL, counting down each forward until the packet is discarded.",
tags: ["ipv6", "hop-limit"]
},
{
type: "mcq",
q: "An IPv6 packet carries a 64 KB payload. Why is no Fragment offset field needed?",
options: ["Flow labels replace fragments", "IPv6 forbids payloads over 1,500 bytes", "IPv6 hosts size packets to fit before sending", "Routers fragment IPv6 automatically", "IPv6 uses TCP sequencing instead"],
answer: 2,
explain: "IPv6 removed in-flight fragmentation; senders adjust packet sizes to the path requirements up front.",
tags: ["ipv6", "fragmentation"]
},
{
type: "multi",
q: "How does an IPv6 header differ from an IPv4 header?",
options: [
"No header checksum field",
"No Fragment offset field",
"Payload length covers only the payload, not the whole packet",
"Source and destination addresses are 128 bits each",
"Header length is fixed at 20 bytes"
],
answer: [0, 1, 2, 3],
explain: "IPv6 drops the checksum and fragmentation fields, measures only payload length, and quadruples address size; its header is a fixed 40 bytes.",
tags: ["ipv6", "ipv4"]
},
{
type: "mcq",
q: "A capture shows IPv6 next header ICMPv6. What does that indicate?",
options: ["A TCP segment follows", "A UDP datagram follows", "An ICMPv6 message follows", "An ARP request follows", "An Ethernet trailer follows"],
answer: 2,
explain: "Next header names the header immediately after IPv6, just as IPv4's Protocol field does.",
tags: ["ipv6", "icmpv6", "wireshark"]
},
{
type: "mcq",
q: "A router discards a packet with an expired TTL. Which protocol reports the failure to the sender?",
options: ["UDP", "ICMP", "ARP", "LLDP", "TCP"],
answer: 1,
explain: "ICMP reports delivery failures such as TTL expiry; it announces but never corrects errors.",
tags: ["icmp", "ttl"]
},
{
type: "tf",
q: "ICMP corrects transmission errors it detects, similar to TCP retransmission.",
answer: false,
explain: "ICMP only announces failures to the sender; correction is left to higher-layer protocols like TCP.",
tags: ["icmp", "tcp"]
},
{
type: "mcq",
q: "Which two functions does ICMPv6 absorb on IPv6 networks?",
options: ["Encryption and authentication", "Compression and encoding", "Port multiplexing and flow control", "Routing and switching", "Address resolution and host discovery"],
answer: 4,
explain: "ICMPv6 performs the error-reporting of ICMPv4 plus the discovery work ARP does on IPv4 networks.",
tags: ["icmpv6", "ndp", "arp"]
},
{
type: "mcq",
q: "A host needs the MAC address of a neighbor with a known IPv4 address on its LAN. How does it learn it?",
options: ["Issues an ICMP echo request", "Reads the switch's VLAN database", "Broadcasts an ARP request and waits for the owner's reply", "Queries its default gateway's routing table", "Sends a DNS lookup for the MAC"],
answer: 2,
explain: "ARP discovers local MACs by broadcast; the matching node replies with its physical address.",
tags: ["arp", "mac"]
},
{
type: "mcq",
q: "An ARP table entry was created automatically after a broadcast request. Which type is it?",
options: ["Loopback", "Static", "Dynamic", "Reserved", "Multicast"],
answer: 2,
explain: "Dynamic entries arise automatically from ARP traffic; static entries are entered manually with the ARP utility.",
tags: ["arp", "arp-table"]
},
{
type: "mcq",
q: "Connectivity is inconsistent and you suspect a stale mapping. Which command forces repopulation, then verifies?",
options: ["`arp -s` then `tracert`", "`arp -d` then `ping`", "`arp -a` then `nslookup`", "`netstat -r` then `arp -s`", "`ipconfig /flushdns` then `arp -a`"],
answer: 1,
explain: "`arp -d` flushes entries so the table rebuilds, and `ping` generates traffic that repopulates it.",
tags: ["arp", "troubleshooting"]
},
{
type: "mcq",
q: "Which command maps 192.168.1.15 to 00-11-22-AA-BB-CC permanently, and what privilege does it need?",
options: ["`arp -d`, no special privilege", "`arp -s`, administrator permissions", "`show arp`, administrator permissions", "`netstat -s`, administrator permissions", "`arp -a`, no special privilege"],
answer: 1,
explain: "`arp -s` writes a static entry and requires elevated permissions; `-a` only lists and `-d` deletes.",
tags: ["arp", "static"]
},
{
type: "mcq",
q: "A switch port database pairs MAC addresses with physical interfaces. How does this differ from an ARP table?",
options: ["It maps ports to IP addresses instead", "It maps VLANs to subnets instead", "There is no difference", "It maps IP addresses to hostnames instead", "It maps MAC addresses to interfaces, not IPs to MACs"],
answer: 4,
explain: "ARP tables map Layer 3 IPs to Layer 2 MACs; MAC address tables map Layer 2 MACs to Layer 1 interfaces.",
tags: ["arp", "mac-table", "switching"]
},
{
type: "match",
q: "Match each ICMPv6 NDP message to its purpose.",
pairs: [
{ item: "RA", match: "Router advertises prefix and limits periodically" },
{ item: "RS", match: "New host requests router info immediately" },
{ item: "NS", match: "Request a neighbor's link-layer address or check duplicates" },
{ item: "NA", match: "Reply carrying MAC address information" },
{ item: "Redirect", match: "Point hosts at a better gateway" }
],
explain: "RA advertises, RS solicits on arrival, NS/NA resolve neighbors and run DAD, and Redirect optimizes gateway choice.",
tags: ["ndp", "icmpv6"]
},
{
type: "mcq",
q: "Two IPv6 hosts must never share an address. Which NDP mechanism checks this?",
options: ["Flow label assignment", "Hop limit countdown", "Router solicitation", "Duplicate Address Detection via NS", "Redirect messaging"],
answer: 3,
explain: "Neighbor solicitation doubles as DAD, confirming no other device already uses the address.",
tags: ["ndp", "dad", "ipv6"]
},
{
type: "mcq",
q: "A mixed-vendor network needs neighbor discovery without proprietary protocols. Which should you use?",
options: ["RIP", "CDP", "LLDP", "NDP", "ARP"],
answer: 2,
explain: "LLDP is the vendor-neutral IEEE standard; CDP is Cisco-proprietary and NDP/ARP serve host discovery instead.",
tags: ["lldp", "cdp", "discovery"]
},
{
type: "mcq",
q: "Which Ethernet field names the upper-layer protocol, such as IP marked 0x0800?",
options: ["Preamble", "SFD", "Type field", "FCS", "Padding"],
answer: 2,
explain: "The 2-byte Type field identifies the carried protocol; it is Ethernet II's only LLC-sublayer component.",
tags: ["ethernet", "frame"]
},
{
type: "mcq",
q: "A receiver's clock must synchronize before a frame arrives. Which field provides that?",
options: ["Type field", "Preamble", "Data", "Padding", "FCS"],
answer: 1,
explain: "The 7-byte preamble synchronizes the receiver clock, and the 1-byte SFD marks the frame's start.",
tags: ["ethernet", "frame"]
},
{
type: "mcq",
q: "Which algorithm does the Ethernet FCS use to verify data arrived intact?",
options: ["MD5 with salt", "Diffie-Hellman", "Three-way handshake", "AES", "CRC"],
answer: 4,
explain: "The 4-byte frame check sequence applies a cyclic redundancy check comparing sent and received data.",
tags: ["ethernet", "fcs"]
},
{
type: "mcq",
q: "What are the minimum and maximum sizes of a standard Ethernet II frame?",
options: ["20 and 60 bytes", "1,500 and 9,000 bytes", "46 and 1,500 bytes", "64 and 1,518 bytes", "64 and 1,522 bytes"],
answer: 3,
explain: "The 18-byte header-plus-FCS wrapper around 46-1,500 bytes of data gives 64 minimum and 1,518 maximum.",
tags: ["ethernet", "mtu", "frame"]
},
{
type: "mcq",
q: "VLAN-tagged frames allow 1,522 bytes instead of 1,518. What accounts for the difference?",
options: ["A larger MTU negotiation", "A 4-byte VLAN field between Source address and Type", "Jumbo payload padding", "A doubled FCS trailer", "An extra preamble"],
answer: 1,
explain: "The VLAN tag inserts 4 bytes into the header, raising the maximum frame size by exactly that much.",
tags: ["ethernet", "vlan", "frame"]
},
{
type: "fill",
q: "What is the default maximum transmission unit for Ethernet, in bytes?",
answer: "1500",
accepts: ["1500 bytes", "1,500"],
explain: "Ethernet's default MTU is 1,500 bytes, the general Internet standard capping the Layer 2 payload.",
tags: ["ethernet", "mtu"]
},
{
type: "mcq",
q: "A path needs payloads above 9,000 bytes on a special-purpose network. Which option fits?",
options: ["Standard Ethernet II frames", "VLAN-tagged frames", "Jumbo frames", "Minimum-size frames", "Fragmented IPv6 packets"],
answer: 2,
explain: "Jumbo frames raise the MTU above 9,000 bytes on architectures built for them, cutting per-frame overhead.",
tags: ["ethernet", "jumbo-frames", "mtu"]
},
{
type: "mcq",
q: "TCP negotiates an MSS at session start. What problem does this avoid?",
options: ["Fragmentation from oversized packets", "Broadcast storms", "Weak cipher negotiation", "ARP spoofing", "Duplicate IP addresses"],
answer: 0,
explain: "Agreeing on a maximum segment size keeps transport messages within the path MTU so routers need not fragment.",
tags: ["tcp", "mss", "fragmentation"]
},
{
type: "match",
q: "Match each data state to its protection approach.",
pairs: [
{ item: "At rest", match: "Firewall, anti-malware, physical security, split storage" },
{ item: "In use", match: "Tight access control and reliable authentication" },
{ item: "In transit", match: "Security that travels with the data, such as encryption" }
],
explain: "Stored data relies on perimeter and physical controls, accessed data on authentication, and moving data on traveling protection.",
tags: ["encryption", "data-states"]
},
{
type: "mcq",
q: "Data crossing the Internet faces interception on weak links. In which state is data most vulnerable?",
options: ["In transit across networks", "Archived on offline media", "Cached in CPU registers", "At rest on an isolated drive", "In use in open files"],
answer: 0,
explain: "In-transit data leaves the trusted network and needs protection that travels with it; wireless legs are especially exposed.",
tags: ["encryption", "data-states"]
},
{
type: "match",
q: "Match each CIA triad principle to its meaning.",
pairs: [
{ item: "Confidentiality", match: "Only the intended recipient can view the data" },
{ item: "Integrity", match: "Data is unmodified between sender and receiver" },
{ item: "Availability", match: "Data is accessible when the recipient needs it" }
],
explain: "Confidentiality hides, integrity preserves, and availability delivers the data to its intended recipient.",
tags: ["cia-triad", "encryption"]
},
{
type: "mcq",
q: "An attacker bypasses firewalls and strips frames from a transmission but still cannot read the payload. Which defense held?",
options: ["MAC address filtering", "Traffic shaping", "Packet filtering", "Physical security", "Encryption as the last layer of defense"],
answer: 4,
explain: "Encryption scrambles data with a cipher so it stays unreadable even after perimeter defenses fall.",
tags: ["encryption", "defense"]
},
{
type: "mcq",
q: "Both sides share one secret key that encrypts and decrypts. Which category is this?",
options: ["Quantum keyless encoding", "Asymmetric encryption", "Symmetric encryption", "Hash-only verification", "Steganographic hiding"],
answer: 2,
explain: "A single shared key defines symmetric (private-key) encryption; its hard problem is sharing that key safely.",
tags: ["encryption", "symmetric"]
},
{
type: "mcq",
q: "Alice encrypts with Bob's public key so only Bob's private key decrypts it. Which property is ensured?",
options: ["Integrity", "Availability", "Confidentiality", "Non-repudiation of receipt", "Anonymity of the sender"],
answer: 2,
explain: "Public-key encryption limits decryption to the private-key owner, keeping the message private in transit.",
tags: ["encryption", "confidentiality", "pki"]
},
{
type: "mcq",
q: "Data encrypted with the sender's private key decrypts cleanly with the matching public key. Which property does this prove?",
options: ["Availability", "Integrity", "Redundancy", "Portability", "Confidentiality"],
answer: 1,
explain: "Successful public-key decryption proves the data was not tampered with, ensuring integrity rather than secrecy.",
tags: ["encryption", "integrity", "pki"]
},
{
type: "mcq",
q: "How does a recipient verify that a published public key truly belongs to its claimed owner?",
options: ["By encrypting a test message", "Through reverse DNS lookup", "By comparing MAC addresses", "By checking the key length", "Through a digital certificate issued by a CA"],
answer: 4,
explain: "A CA-signed certificate binds the identity to the public key; that binding service is PKI.",
tags: ["pki", "certificates", "ca"]
},
{
type: "mcq",
q: "A certificate decrypts correctly with the entity's own public key. What does that still fail to guarantee?",
options: ["Compatibility with TLS 1.3", "Support for revocation", "Integrity of the identity data", "Authenticity, since the whole certificate could be counterfeit", "Expiry of the key pair"],
answer: 3,
explain: "Self-signed certificates prove internal consistency but not authenticity, so browsers do not trust them and they cannot be revoked.",
tags: ["certificates", "self-signed", "pki"]
},
{
type: "multi",
q: "Which practices belong to proper key management?",
options: [
"Rotating keys on a schedule and re-encrypting data",
"Deleting retired keys immediately to save space",
"Revoking compromised or expired keys",
"Storing keys in code and documents for availability",
"Guarding key stores with HSMs and minimal access"
],
answer: [0, 2, 4],
explain: "Managed keys rotate, revoke on compromise, and live in HSM-backed stores — retired keys are archived because old data may still need them, never deleted outright or stored in code.",
tags: ["key-management", "hsm"]
},
{
type: "mcq",
q: "SSL operates at the application layer while TLS was standardized by the IETF for which layer?",
options: ["Session", "Physical", "Data Link", "Network", "Transport"],
answer: 4,
explain: "TLS is the transport-layer successor to Netscape's application-layer SSL, using updated algorithms.",
tags: ["ssl", "tls", "osi"]
},
{
type: "mcq",
q: "A hardening checklist says to disable SSL entirely and keep only TLS. Why?",
options: ["SSL uses too much bandwidth", "SSL is deprecated with known weaknesses", "SSL cannot use port 443", "SSL conflicts with IPsec", "SSL requires static IP addresses"],
answer: 1,
explain: "SSL is deprecated and should be disabled; the two coexist only for backward compatibility and the names are used interchangeably.",
tags: ["ssl", "tls", "hardening"]
},
{
type: "match",
q: "Match each plaintext protocol to its encrypted variant and port change.",
pairs: [
{ item: "FTP 20/21", match: "FTPS 989/990" },
{ item: "SMTP 25", match: "SMTPS 587" },
{ item: "IMAP 143", match: "IMAPS 993" },
{ item: "POP3 110", match: "POP3S 995" },
{ item: "LDAP 389", match: "LDAPS 636" }
],
explain: "Each family keeps its purpose while moving to an SSL/TLS-secured variant on its own secure port.",
tags: ["ports", "ssl", "tls"]
},
{
type: "mcq",
q: "DNS queries must be secured yet easily identified and managed on a trusted network. Which method fits?",
options: ["DoT over port 853", "Plain DNS over port 53", "DNS over port 80", "DNS over port 22", "DoH over port 443"],
answer: 0,
explain: "DoT applies TLS directly on its own port 853, keeping secure DNS traffic distinct and manageable.",
tags: ["dns", "dot", "tls"]
},
{
type: "mcq",
q: "On public Wi-Fi, DNS lookups should blend into normal web traffic. Which method fits?",
options: ["Plain DNS over UDP 53", "DNS over Telnet port 23", "DNS over SNMP port 161", "DoT over port 853", "DoH over port 443"],
answer: 4,
explain: "DoH routes DNS inside HTTPS on port 443, masking it among ordinary web traffic on untrusted networks.",
tags: ["dns", "doh", "tls"]
},
{
type: "tf",
q: "Visiting an HTTPS website automatically encrypts the DNS lookups needed to reach it.",
answer: false,
explain: "HTTPS protects the site traffic, but the resolution requests themselves stay exposed unless DoT or DoH secures them.",
tags: ["dns", "https", "doh"]
},
{
type: "mcq",
q: "In the TLS handshake, the server sends its digital certificate right after ServerHello. What is the client checking next?",
options: ["The client's own routing table", "Whether port 80 is open", "Whether the cipher suite supports compression", "Certificate validity, hostname, signature, and trust chain", "The server's ARP table entries"],
answer: 3,
explain: "Certificate validation answers whether the server can be trusted before any key exchange proceeds.",
tags: ["tls", "handshake", "certificates"]
},
{
type: "mcq",
q: "After certificate validation, client and server run (EC)DHE and derive matching keys. Which handshake phases are these?",
options: ["Authentication then authorization", "ClientHello and ServerHello", "Key exchange then session keys", "Finished then encrypted data", "Compression then fragmentation"],
answer: 2,
explain: "Key exchange establishes the shared secret and both sides derive symmetric session keys that encrypt the session.",
tags: ["tls", "handshake"]
},
{
type: "mcq",
q: "TLS 1.3 usually completes a fresh handshake in one round trip and can resume sessions with zero. How does 1.2 compare?",
options: ["1.2 is also 0-RTT always", "1.2 needs more messages and multiple round trips", "1.2 skips certificates", "1.2 forbids symmetric session keys", "1.2 runs below the network layer"],
answer: 1,
explain: "TLS 1.3 simplified the exchange to 1-RTT with 0-RTT resumption and dropped older weak crypto that 1.2 still carried.",
tags: ["tls", "tls-1.3"]
},
{
type: "mcq",
q: "IPsec protects TCP/IP traffic at which OSI layer?",
options: ["Layer 3 - Network", "Layer 4 - Transport", "Layer 5 - Session", "Layer 7 - Application", "Layer 2 - Data Link"],
answer: 0,
explain: "IPsec adds security information at the network layer, protecting IP packets and their payloads.",
tags: ["ipsec", "osi"]
},
{
type: "mcq",
q: "An IPv6 deployment assumes every connection is automatically IPsec-protected. What is wrong with this?",
options: ["IPsec only works on IPv4", "IPv6 already encrypts everything natively", "IPsec requires TLS certificates first", "IPv6 forbids IPsec entirely", "IPsec support is built in but not automatically used"],
answer: 4,
explain: "IPv6 includes IPsec support in its specification, yet connections use it only when actually configured.",
tags: ["ipsec", "ipv6"]
},
{
type: "mcq",
q: "Which IPsec component negotiates parameters and establishes keys, currently at version 2?",
options: ["ISAKMP alone", "L2TP", "AH", "ESP", "IKEv2"],
answer: 4,
explain: "IKE negotiates the security parameters and keys; ISAKMP supplies the framework it builds on.",
tags: ["ipsec", "ike"]
},
{
type: "mcq",
q: "Traffic must be authenticated with integrity but must remain readable for inspection. Which IPsec protocol fits?",
options: ["OpenVPN", "ESP", "AH", "IKE", "GRE"],
answer: 2,
explain: "AH provides authentication and integrity without encryption; ESP is the choice when confidentiality is required.",
tags: ["ipsec", "ah", "esp"]
},
{
type: "mcq",
q: "Two hosts need encrypted host-to-host protection with original IP headers visible. Which mode fits?",
options: ["Tunnel mode", "Transport mode", "Full tunnel VPN", "Split tunnel VPN", "Promiscuous mode"],
answer: 1,
explain: "Transport mode protects the payload while leaving the original header visible; tunnel mode encapsulates the whole packet for VPNs.",
tags: ["ipsec", "transport-mode", "tunnel-mode"]
},
{
type: "mcq",
q: "What triggers the IPsec process to begin protecting traffic?",
options: ["Traffic matching a predefined security policy", "A failed DNS lookup", "An ARP broadcast", "A DHCP lease renewal", "Every packet is protected automatically"],
answer: 0,
explain: "Noteworthy traffic matching policy initiates IPsec; afterwards keys and security associations are negotiated before data transfer.",
tags: ["ipsec", "policy"]
},
{
type: "mcq",
q: "FTP sends credentials and files across the network. What is its core security flaw?",
options: ["It requires static IP addresses", "It only works on IPv6", "It depends on DNSSEC", "It encrypts with weak ciphers", "It transmits in plaintext"],
answer: 4,
explain: "FTP has no encryption at all, which is why FTPS, SFTP, or TFTP alternatives exist for safer transfers.",
tags: ["ftp", "plaintext"]
},
{
type: "match",
q: "Match each file-transfer protocol to its defining trait.",
pairs: [
{ item: "FTPS", match: "FTP with SSL/TLS over control and data channels" },
{ item: "SFTP", match: "SSH extension using a single connection on port 22" },
{ item: "TFTP", match: "No authentication, UDP-based, tiny memory footprint" }
],
explain: "FTPS layers TLS onto FTP, SFTP extends SSH rather than FTP, and TFTP trades all security for simplicity.",
tags: ["ftps", "sftp", "tftp"]
},
{
type: "mcq",
q: "Which statement about SFTP is accurate?",
options: ["It transmits credentials in plaintext", "It requires port 443", "It is FTP running over an SSH tunnel", "It is an extension of SSH, incompatible with FTP/FTPS", "It uses UDP port 69"],
answer: 3,
explain: "Despite the name, SFTP extends the SSH protocol and cannot interoperate with FTP or FTPS clients.",
tags: ["sftp", "ssh"]
},
{
type: "mcq",
q: "A switch needs its configuration backed up with minimal memory overhead on an isolated LAN. Which fits?",
options: ["SCP over the Internet", "SFTP", "FTPS", "TFTP with a local TFTP server", "HTTPS"],
answer: 3,
explain: "TFTP's tiny footprint suits device config transfers on trusted networks, though it is unsafe over the Internet.",
tags: ["tftp", "scenario"]
},
{
type: "mcq",
q: "Why is TFTP unsuitable for transfers across the Internet?",
options: ["It requires too much memory", "It has no authentication or security", "It cannot transfer binary files", "It only supports IPv6", "It conflicts with DHCP"],
answer: 1,
explain: "TFTP offers neither authentication nor encryption, limits transfers to 4 GB, and grants no directory access.",
tags: ["tftp", "security"]
},
{
type: "mcq",
q: "Telnet is installed by default yet discouraged for remote administration. Why?",
options: ["It offers poor authentication and no encryption", "It only runs on Linux", "It requires a VPN headend", "It cannot close sessions cleanly", "It cannot address hosts by name"],
answer: 0,
explain: "Telnet sends everything, including passwords, unprotected — SSH is the encrypted replacement.",
tags: ["telnet", "ssh"]
},
{
type: "mcq",
q: "Which impersonation attacks does SSH's encryption guard against?",
options: ["Rogue DHCP and STP manipulation", "Bluejacking and evil twins", "War-driving and wardialing", "IP spoofing and DNS spoofing", "ARP flooding and VLAN hopping"],
answer: 3,
explain: "By encrypting the whole session, SSH defeats header forgery and forged name records aimed at impersonation.",
tags: ["ssh", "spoofing"]
},
{
type: "mcq",
q: "A Windows administrator needs a free SSH client supporting both SSH and Telnet sessions. Which fits?",
options: ["VNC viewer", "Telnet daemon", "OpenSSH server", "PuTTY", "Remote Desktop"],
answer: 3,
explain: "PuTTY is the freeware Windows client for SSH and Telnet; OpenSSH ships with UNIX-like systems and macOS.",
tags: ["ssh", "putty", "tools"]
},
{
type: "mcq",
q: "What is the correct order for passwordless SSH key authentication?",
options: ["Disable authentication, then connect", "Copy password to host, then run ssh-keygen", "Generate keys on client, place public key on host, exchange and verify on connect", "Generate keys on host, place private key on client", "Exchange private keys over Telnet first"],
answer: 2,
explain: "Keys originate on the client, the public half is installed on the host, and both halves authenticate at connect time.",
tags: ["ssh", "ssh-keygen", "authentication"]
},
{
type: "fill",
q: "Which port does SSH listen on by default?",
answer: "22",
accepts: ["port 22", "TCP 22"],
explain: "SSH defaults to port 22, which SFTP also crosses as an SSH extension.",
tags: ["ssh", "ports"]
},
{
type: "mcq",
q: "A user needs a full Windows desktop with icons, menus, and sound from home. Which protocol fits?",
options: ["SSH", "Telnet", "RDP", "TFTP", "ICMP"],
answer: 2,
explain: "Microsoft's RDP delivers a complete GUI desktop, unlike the CLI-only sessions of SSH and Telnet.",
tags: ["rdp", "remote-access"]
},
{
type: "mcq",
q: "A server is down and its OS will not boot. Why can't SSH or RDP help?",
options: ["They are in-band and need a running OS with configuration software", "They only work over dial-up", "They cannot cross routers", "They need IPv6 exclusively", "They require licenses per boot"],
answer: 0,
explain: "In-band tools ride the existing network and OS; out-of-band management uses dedicated paths to reach dead devices.",
tags: ["oobm", "in-band", "troubleshooting"]
},
{
type: "multi",
q: "Which tasks can out-of-band management perform on an unreachable device?",
options: [
"Power the device up remotely",
"Reinstall the operating system",
"Monitor hardware sensors",
"Troubleshoot boot problems",
"Sniff encrypted application payloads"
],
answer: [0, 1, 2, 3],
explain: "The dedicated OOBM path handles power, firmware, OS installs, sensors, and boot issues — not breaking encryption.",
tags: ["oobm", "management"]
},
{
type: "mcq",
q: "Three branch offices must communicate as one private network over the Internet without leased lines. Which fits?",
options: ["Clientless browser session", "Dial-up modem bank", "VLAN trunk", "Host-to-host VPN", "Site-to-site VPN"],
answer: 4,
explain: "Site-to-site VPNs join whole LANs through gateway-to-gateway tunnels so sites act like one private network.",
tags: ["vpn", "site-to-site", "scenario"]
},
{
type: "mcq",
q: "In a site-to-site VPN, which devices hold the tunnel endpoints and what addresses do they need?",
options: ["Switches with link-local addresses", "DNS servers with anycast addresses", "Client PCs with dynamic addresses", "VPN gateways at each LAN edge with static public IPs", "ISP routers with private addresses"],
answer: 3,
explain: "Each site's gateway encrypts and encapsulates at the LAN edge; static public IPs let gateways find each other.",
tags: ["vpn", "site-to-site", "gateway"]
},
{
type: "mcq",
q: "Do LAN hosts behind a site-to-site VPN gateway need VPN software?",
options: ["Only the DNS servers do", "Yes, every host needs a client", "No, the gateway handles the tunnel for them", "Only the file servers do", "Only wireless clients do"],
answer: 2,
explain: "Hosts communicate through their local gateway, which owns the tunnel — no per-host software required.",
tags: ["vpn", "site-to-site", "gateway"]
},
{
type: "mcq",
q: "A traveling employee tunnels from a laptop into headquarters. Which model is this and what manages the tunnels?",
options: ["Site-to-site via VPN gateways", "Client-to-site via the VPN headend", "Host-to-host via peer software", "Full mesh via every switch", "Dial-up via modem bank"],
answer: 1,
explain: "Client-to-site links one remote client to the LAN through the headend, which terminates many individual tunnels.",
tags: ["vpn", "client-to-site", "headend"]
},
{
type: "mcq",
q: "Only one side of a client-to-site VPN strictly needs a static public IP. Which side?",
options: ["The VPN headend", "Both sides equally", "Neither side", "The client's ISP", "The remote client"],
answer: 0,
explain: "The headend must be reachable at a fixed address; roaming clients connect outbound to it.",
tags: ["vpn", "client-to-site", "headend"]
},
{
type: "mcq",
q: "A contractor needs limited VPN access but cannot install software. Which option works?",
options: ["Host-to-host tunnel", "Full tunnel client", "Dial-in modem", "Site-to-site gateway", "Clientless SSL/TLS VPN through a browser"],
answer: 4,
explain: "Clientless VPNs run inside the browser over SSL/TLS with no dedicated client, trading some capability for convenience.",
tags: ["vpn", "clientless", "ssl"]
},
{
type: "mcq",
q: "Two laptops encrypt traffic directly between themselves with neither acting as a gateway. Which model is this?",
options: ["Full tunnel", "Hub-and-spoke", "Site-to-site", "Client-to-site", "Host-to-host"],
answer: 4,
explain: "Host-to-host joins exactly two computers; both run the software and neither gateways other resources.",
tags: ["vpn", "host-to-host"]
},
{
type: "mcq",
q: "A remote worker accesses the file server and office desktop while streaming music. Which setup avoids hauling music through headquarters?",
options: ["Clientless VPN with full capture", "Full tunnel VPN", "Split tunnel VPN", "Host-to-host VPN", "Site-to-site VPN"],
answer: 2,
explain: "Split tunneling sends only corporate-bound traffic through the VPN while Internet traffic goes direct, cutting latency and load.",
tags: ["vpn", "split-tunnel", "scenario"]
},
{
type: "mcq",
q: "A strict auditor requires that no local-network traffic escape the encrypted path. Which setup complies?",
options: ["Split tunnel VPN", "Full tunnel VPN", "Clientless VPN", "Host-to-host VPN", "Direct Internet access"],
answer: 1,
explain: "Full tunnel captures all traffic into the corporate path and assigns a corporate address, denying local-network access.",
tags: ["vpn", "full-tunnel"]
},
{
type: "match",
q: "Match each VPN protocol to its layer and trait.",
pairs: [
{ item: "L2TP", match: "Layer 2, multi-vendor, paired with IPsec" },
{ item: "GRE", match: "Layer 3 Cisco tunneling, paired with IPsec" },
{ item: "OpenVPN", match: "Open source, OpenSSL encryption, crosses firewalls well" },
{ item: "IKEv2", match: "IPsec component, fast and stable across hotspots" }
],
explain: "L2TP and GRE tunnel at layers 2 and 3 with IPsec for security, while OpenVPN and IKEv2 bring their own strengths.",
tags: ["vpn", "l2tp", "gre", "openvpn", "ikev2"]
},
{
type: "mcq",
q: "A VPN must join a Juniper router to a Cisco router. Which protocol choice handles mixed vendors?",
options: ["L2TP, standardized by the IETF", "Proprietary CDP tunneling", "APIPA linking", "LLDP encapsulation", "GRE alone"],
answer: 0,
explain: "L2TP's IETF standard status lets it bridge equipment types, typically secured as L2TP/IPsec.",
tags: ["vpn", "l2tp", "scenario"]
},
{
type: "tf",
q: "VPN tunneling protocols always include their own encryption, so IPsec is never needed alongside them.",
answer: false,
explain: "Most tunneling protocols encapsulate without securing, so they rely on an added encryption protocol such as IPsec.",
tags: ["vpn", "tunneling", "ipsec"]
},
{
type: "mcq",
q: "Inside a VPN frame, where does the original payload travel?",
options: ["In the VPN trailer only", "Across a separate leased line", "In DNS TXT records", "As the outer IP header", "Encrypted as payload inside another frame"],
answer: 4,
explain: "Tunneling encrypts the complete inner frame and carries it as payload, unloading it unchanged at the far end.",
tags: ["vpn", "tunneling"]
},
{
type: "mcq",
q: "A web server suddenly responds twice as slowly despite healthy memory and software. Which tool reveals a NIC imbalance?",
options: ["`ssh-keygen`, rotating host keys", "`ipconfig /flushdns`, clearing the cache", "`netstat`, showing per-interface traffic and errors", "`arp -s`, adding static entries", "`telnet`, opening a terminal session"],
answer: 2,
explain: "`netstat` reports connections, per-interface message counts, and errors — exposing one NIC starved of traffic.",
tags: ["netstat", "troubleshooting", "scenario"]
},
{
type: "mcq",
q: "Which `netstat` flag lists connections with numeric IPs and ports instead of resolving names?",
options: ["`netstat -e`", "`netstat -f`", "`netstat -n`", "`netstat -a`", "`netstat -s`"],
answer: 2,
explain: "`-n` skips name resolution for speed; `-f` adds FQDNs, `-a` shows all listening ports, `-s` breaks down by protocol.",
tags: ["netstat", "flags"]
},
{
type: "mcq",
q: "You need per-protocol transmission statistics for TCP, UDP, IP, and ICMP on a host. Which flag fits?",
options: ["`netstat -r`", "`netstat -e`", "`netstat -s`", "`netstat -a`", "`netstat -f`"],
answer: 2,
explain: "`-s` groups message statistics by protocol type, while `-e` reports interface-level errors and discards.",
tags: ["netstat", "flags"]
},
{
type: "mcq",
q: "Which `netstat` flag displays the routing table?",
options: ["`netstat -e`", "`netstat -s`", "`netstat -r`", "`netstat -n`", "`netstat -a`"],
answer: 2,
explain: "`-r` prints routing information; the other flags cover connections, errors, statistics, and numeric output.",
tags: ["netstat", "routing"]
},
{
type: "mcq",
q: "A Linux administrator finds `netstat` missing on a fresh distribution. What is the expected replacement?",
options: ["`arp`", "`ftp`", "`tracert`", "`telnet`", "`ss` (socket statistics)"],
answer: 4,
explain: "`netstat` is deprecated on most Linux distributions in favor of `ss`, though the exam still tests `netstat` usage.",
tags: ["netstat", "ss", "linux"]
},
{
type: "tf",
q: "Because `netstat` is deprecated on Linux, the Network+ exam no longer tests it.",
answer: false,
explain: "Despite deprecation and the `ss` replacement, the exam still expects `netstat` knowledge since both share parameters.",
tags: ["netstat", "exam"]
},
{
type: "fill",
q: "Which command lists all current ARP table entries with their static or dynamic types?",
answer: "arp -a",
accepts: ["arp -a on Windows and Linux", "arp –a"],
explain: "`arp -a` displays every current mapping plus its record type; `-d` deletes and `-s` adds static entries.",
tags: ["arp", "commands"]
},
{
type: "mcq",
q: "As networks grow larger and distances increase, what happens to TCP/IP troubleshooting?",
options: ["Encryption becomes unnecessary", "Routing tables shrink automatically", "Failures vanish with scale", "Potential failure points multiply, so built-in utilities matter more", "Only hardware analyzers can help"],
answer: 3,
explain: "More distance and size mean more failure points, which is why TCP/IP ships discovery and diagnostic utilities.",
tags: ["troubleshooting", "tcp-ip"]
},
{
type: "multi",
q: "Which statements about static public IP needs in VPN models are correct?",
options: [
"Each site-to-site gateway needs one to find its peers",
"Only the client-to-site headend strictly needs one",
"Every remote client needs its own static address",
"No VPN device ever needs a static address",
"Host-to-host needs depend on the configuration"
],
answer: [0, 1, 4],
explain: "Gateways and headends must be reachable at fixed addresses; roaming clients dial out, and host-to-host pairs vary.",
tags: ["vpn", "static-ip"]
},
{
type: "multi",
q: "Which two NDP messages handle router discovery for a newly connected IPv6 host?",
options: [
"RA",
"RS",
"NS",
"NA",
"Redirect"
],
answer: [0, 1],
explain: "The host solicits with RS and the router advertises with RA; NS/NA resolve neighbors and Redirect optimizes gateways.",
tags: ["ndp", "router-discovery"]
}
]
});
