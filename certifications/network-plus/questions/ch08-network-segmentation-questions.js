window.ReviewApp.content.register({
type: "questions",
cert: "network-plus",
chapter: "Chapter 8: Network Segmentation",
items: [
{
type: "mcq",
q: "What is network segmentation?",
options: ["Adding more Internet bandwidth", "Dividing a large broadcast domain into smaller managed segments", "Removing all routers", "Assigning one IP to every host", "Disabling all switches"],
answer: 1,
explain: "Physical multi-LAN splits or logical VLANs plus subdivided IP space raise performance and security.",
tags: ["segmentation"]
},
{
type: "match",
q: "Match each construct to its layer and grouping.",
pairs: [
{ item: "Subnet", match: "Layer 3, groups IP addresses" },
{ item: "VLAN", match: "Layer 2, groups switch ports" }
],
explain: "Subnets organize address space; VLANs carve broadcast domains. Ideal: 1 domain = 1 VLAN = 1 subnet.",
tags: ["subnet", "vlan"]
},
{
type: "mcq",
q: "Which technique expands a broadcast domain?",
options: ["Adding more routers", "Adding more Layer 2 switches", "Adding more VLANs", "Adding a SAN", "Adding subnet masks"],
answer: 1,
explain: "Switches flood broadcasts to all ports; routers, VLANs, and subnets divide domains, and SANs carry no LAN broadcasts.",
tags: ["broadcast-domain"]
},
{
type: "multi",
q: "Which three goals does segmentation accomplish?",
options: [
"Enhance security",
"Improve performance",
"Simplify troubleshooting",
"Remove the need for IP addresses",
"Eliminate all broadcast traffic"
],
answer: [0, 1, 2],
explain: "Isolation, smaller domains, and fault localization help; addressing stays and local broadcasts remain by design.",
tags: ["segmentation", "benefits"]
},
{
type: "mcq",
q: "A studio keeps automation audio off the office Internet LAN with VLANs and ACLs. Which benefit is this?",
options: ["Enhance security", "Improve performance for latency-sensitive traffic", "Simplify cable colors", "Remove routers", "Add Internet bandwidth"],
answer: 1,
explain: "Isolating timely studio packets (VLANs 101-401 for transmitter, studio, office, phones) protects delivery from unrelated traffic.",
tags: ["segmentation", "performance"]
},
{
type: "mcq",
q: "What best describes OT?",
options: ["Office word processors", "Hardware and software monitoring and controlling physical infrastructure", "A routing protocol", "A cable type", "A cloud billing tier"],
answer: 1,
explain: "OT covers SCADA, HVAC, traffic, transit, and irrigation control systems.",
tags: ["ot"]
},
{
type: "match",
q: "Match each environment to its security focus.",
pairs: [
{ item: "IT", match: "Business and data-access risk" },
{ item: "OT", match: "Physical interruption risk" }
],
explain: "A compromised web server inconveniences; a compromised irrigation system floods.",
tags: ["it", "ot"]
},
{
type: "mcq",
q: "Which statement describes a SCADA system?",
options: ["Decentralized Internet-exposed design", "Massive open data collection", "Centralized control in a closed environment", "Purely wireless with no security", "A cloud billing meter"],
answer: 2,
explain: "SCADA stays closed and centralized; decentralization, exposure, and bulk analytics define IIoT.",
tags: ["scada"]
},
{
type: "mcq",
q: "Why do firewalls struggle inside OT segments?",
options: ["OT uses no traffic", "OT leans on east-west traffic firewalls cannot reach", "Firewalls only block wireless", "OT has no IP addresses", "Firewalls add storage"],
answer: 1,
explain: "Edge filtering governs north-south crossings, not intra-segment peer flows.",
tags: ["ot", "east-west"]
},
{
type: "match",
q: "Match each zone to its trust and traffic.",
pairs: [
{ item: "Untrusted (public/WAN)", match: "No trust, outside control" },
{ item: "Trusted (private)", match: "Strictest rules, proxy-only Internet" },
{ item: "Screened subnet (DMZ)", match: "Exposed buffer, direct Internet" }
],
explain: "Internet, locked interior, and deliberate buffer tier trust and access.",
tags: ["zones", "dmz"]
},
{
type: "mcq",
q: "What is a proxy server in zone design?",
options: ["A cable tester", "An intermediary giving filtered protected Internet access", "A DHCP scope", "A VLAN tag", "A storage array"],
answer: 1,
explain: "Trusted hosts reach out only through the intermediary.",
tags: ["proxy"]
},
{
type: "mcq",
q: "What is micro-segmentation?",
options: ["Cutting cables shorter", "Granular object-level zoning inside segments", "Removing all firewalls", "Merging all VLANs", "Disabling encryption"],
answer: 1,
explain: "Per-resource controls (interface filters, peer encryption, authorization) protect must-be-exposed IIoT beyond perimeter thinking.",
tags: ["micro-segmentation"]
},
{
type: "match",
q: "Match each storage option to its description.",
pairs: [
{ item: "DAS", match: "Disks inside each server" },
{ item: "NAS", match: "Shared appliance over the LAN" },
{ item: "SAN", match: "Separate high-speed storage network" }
],
explain: "Local, LAN-shared, and dedicated-fabric tiers scale from one box to VM farms.",
tags: ["das", "nas", "san"]
},
{
type: "mcq",
q: "Which protocols serve NAS file access on Windows and Linux?",
options: ["CIFS/SMB and NFS", "BGP and OSPF", "FC and IB", "HDMI and USB", "SMTP and POP3"],
answer: 0,
explain: "Common Internet File System / Server Message Block for Windows, Network File System for UNIX/Linux, often over RAID for SMB buyers.",
tags: ["nas"]
},
{
type: "mcq",
q: "Which SAN connection technology runs over ordinary Ethernet NICs?",
options: ["FC", "iSCSI", "SATA", "InfiniBand"],
answer: 1,
explain: "Internet SCSI rides TCP with initiator software; FC and IB demand special hardware, SATA is an internal drive cable.",
tags: ["iscsi"]
},
{
type: "match",
q: "Match each SAN fabric to its trait.",
pairs: [
{ item: "FC", match: "Dedicated fabric, HBAs, fastest mature" },
{ item: "FCoE", match: "FC in Ethernet via CNAs" },
{ item: "iSCSI", match: "Cheap TCP on plain NICs" },
{ item: "InfiniBand", match: "Niche ultra-fast, complex" }
],
explain: "Cost, hardware, and speed separate the four: FC/FCoE near the top (~10+ Gbps to 128+ GFC), iSCSI near 10 Gbps, IB beyond for HPC.",
tags: ["san"]
},
{
type: "mcq",
q: "What is multipathing?",
options: ["Running two operating systems", "Parallel SAN links giving failover plus load balance", "Bonding audio cables", "Splitting one VLAN", "Caching web pages"],
answer: 1,
explain: "Dead links shed load to surviving paths while demand spreads evenly.",
tags: ["multipathing"]
},
{
type: "mcq",
q: "Do switches create LANs?",
options: ["Yes, every switch port is a LAN", "No, only router interfaces delimit LANs", "Yes, with any cable", "No, only firewalls do", "Only on wireless"],
answer: 1,
explain: "Daisy-chained switches share one LAN; per-interface router links make new ones.",
tags: ["router", "lan"]
},
{
type: "tf",
q: "Routers forward broadcast traffic between their interfaces.",
answer: false,
explain: "Routers block broadcasts, which is exactly why each interface anchors its own domain.",
tags: ["router", "broadcast"]
},
{
type: "mcq",
q: "How many host bits does a class A address provide?",
options: ["8 bits", "16 bits", "24 bits", "32 bits"],
answer: 2,
explain: "Class A: 8 network bits (first octet 0-126) and 24 host bits.",
tags: ["classful"]
},
{
type: "match",
q: "Match each class to its first-octet range.",
pairs: [
{ item: "Class A", match: "0-126" },
{ item: "Class B", match: "128-191" },
{ item: "Class C", match: "192-223" }
],
explain: "Binary prefixes 0, 10, and 110 mark the three unicast classes; D and E are reserved.",
tags: ["classful"]
},
{
type: "match",
q: "Match each class to its default mask.",
pairs: [
{ item: "Class A", match: "255.0.0.0 (/8)" },
{ item: "Class B", match: "255.255.0.0 (/16)" },
{ item: "Class C", match: "255.255.255.0 (/24)" }
],
explain: "Whole-octet defaults seed modern classless math.",
tags: ["subnet-mask"]
},
{
type: "mcq",
q: "A mask of 255.255.255.224 leaves how many host bits?",
options: ["27 bits", "8 bits", "30 bits", "5 bits"],
answer: 3,
explain: "/27 takes 27 network bits, leaving 32-27 = 5 host bits.",
tags: ["cidr"]
},
{
type: "mcq",
q: "Using Table 8-4, what is the most host bits a class B can borrow while keeping at least 130 hosts per subnet?",
options: ["0 bits", "8 bits", "9 bits", "10 bits"],
answer: 1,
explain: "Borrowing 8 (/24) leaves 254 hosts; borrowing 9 (/25) leaves only 126, too few.",
tags: ["subnetting"]
},
{
type: "mcq",
q: "What is the network ID of 192.168.72.149/16?",
options: ["0.0.0.149", "192.168.0.0", "0.0.72.149", "192.168.72.0"],
answer: 1,
explain: "/16 keeps two octets: 192.168.0.0, host 0.0.72.149. A /24 would make .72.0 the net.",
tags: ["network-id"]
},
{
type: "mcq",
q: "Subnet 5 of eight /27s in 192.168.89.0/24 spans which usable hosts?",
options: ["192.168.89.1-.30", "192.168.89.129-.158", "192.168.89.161-.190", "192.168.89.225-.254"],
answer: 1,
explain: "ID .128, broadcast .159 (next ID .160 minus 1), hosts .129-.158: 30 usable.",
tags: ["host-range"]
},
{
type: "tf",
q: "Overlapping subnets on a router own interfaces route accurately.",
answer: false,
explain: "Overlap blinds the router; non-overlapping binary-related spaces route efficiently with tidier docs and faster fault-finding.",
tags: ["subnetting"]
},
{
type: "mcq",
q: "What is an extended network prefix?",
options: ["A longer cable", "Original net ID plus borrowed subnet bits", "A bigger router", "An IPv6-only header", "A wireless band"],
answer: 1,
explain: "It names each carved subnet, e.g. the bold bits of the eight /27s.",
tags: ["extended-prefix"]
},
{
type: "match",
q: "Match each UDP-forwarding party to its job.",
pairs: [
{ item: "Relay agent", match: "Catches subnet broadcasts" },
{ item: "IP helper address", match: "Target server or services subnet" },
{ item: "Central server", match: "Answers with the agent subnet in mind" }
],
explain: "Router, firewall, or Layer 3 switch repackages DHCP/DNS/NTP/TFTP (DHCP port 67, NTP 123) across domains and routes replies home.",
tags: ["udp-forwarding"]
},
{
type: "mcq",
q: "Why forward UDP broadcasts across subnets?",
options: ["To need a DHCP server per subnet", "To centralize DHCP, DNS, NTP, and TFTP", "To block all broadcasts", "To remove routers", "To slow the network"],
answer: 1,
explain: "One services subnet serves all LANs instead of duplicating servers everywhere.",
tags: ["udp-forwarding"]
},
{
type: "mcq",
q: "Sales needs 120 hosts from 192.168.10.0/24 under VLSM. Which block fits first?",
options: ["192.168.10.0/25 (126 hosts)", "192.168.10.0/26 (62 hosts)", "192.168.10.0/29 (6 hosts)", "192.168.10.0/30 (2 hosts)"],
answer: 0,
explain: "Largest-first carving: /25 for Sales, then /26 Accounting (62), /27 HR (30), /29s for IT and Exec (6 each), /30s for WAN links (2 each).",
tags: ["vlsm"]
},
{
type: "mcq",
q: "What is the main VLSM caution?",
options: ["It wastes nothing ever", "Tight packing risks address pool exhaustion", "It forbids routers", "It only works on IPv6", "It removes broadcast addresses"],
answer: 1,
explain: "Leave growth room: start from /23 or /22, or migrate to IPv6.",
tags: ["vlsm"]
},
{
type: "match",
q: "Match each IPv6 site prefix to its subnet count.",
pairs: [
{ item: "/48", match: "65,536 subnets" },
{ item: "/56", match: "256 subnets" },
{ item: "/64", match: "1 subnet" }
],
explain: "16, 8, or 0 controllable Subnet ID bits; every subnet still holds 18 quintillion interfaces.",
tags: ["ipv6"]
},
{
type: "mcq",
q: "Which IPv6 hex block carries the Subnet ID?",
options: ["The first", "The third", "The fourth", "The eighth"],
answer: 2,
explain: "Inside the site prefix, block four varies to mint subnets (optionally split 8+8 into subsite plus subnet).",
tags: ["ipv6", "subnet-id"]
},
{
type: "mcq",
q: "What is the IPv6 interface ID length and a common source?",
options: ["32 bits from IPv4", "64 bits, often EUI-64 from the MAC", "8 bits random", "128 bits from DNS", "16 bits from the port"],
answer: 1,
explain: "Last 64 bits identify the host (72:50FF:FE2B:E708 style); first 64 are the network/global routing prefix.",
tags: ["ipv6"]
},
{
type: "mcq",
q: "At which layers do subnets and VLANs operate?",
options: ["Physical and data link", "Network and data link", "Network and physical", "Network and application"],
answer: 1,
explain: "Layer 3 organizes address space; Layer 2 segments traffic.",
tags: ["subnet", "vlan"]
},
{
type: "mcq",
q: "On which device do you configure VLANs?",
options: ["Router", "Switch", "Endpoint", "Wi-Fi access point"],
answer: 1,
explain: "Managed-switch ports are assigned per VLAN; only managed switches support them.",
tags: ["vlan"]
},
{
type: "mcq",
q: "Same-VLAN PCs on one switch exchange files. Which device handles it?",
options: ["The router", "The switch alone", "The firewall only", "The modem", "The proxy"],
answer: 1,
explain: "Intra-VLAN stays switched; cross-VLAN, off-net, and inbound flows need the router.",
tags: ["vlan"]
},
{
type: "mcq",
q: "One router feeds a multi-VLAN switch for cross-VLAN traffic. What is this called?",
options: ["Router-on-a-stick", "Switch spoofing", "Double tagging", "Trunk mismatch", "VLAN hopping"],
answer: 0,
explain: "A single physical link fans subinterfaces per VLAN for inter-VLAN routing.",
tags: ["inter-vlan-routing"]
},
{
type: "match",
q: "Match each VLAN port to its wiring.",
pairs: [
{ item: "Access port", match: "One host, one VLAN" },
{ item: "Trunk port", match: "Router or switch, many VLANs" },
{ item: "Trunk line", match: "Link between two trunk ports" }
],
explain: "Endpoints stay blind on access links; network gear multiplexes on trunks (a telephony-borrowed term).",
tags: ["access-port", "trunk"]
},
{
type: "mcq",
q: "Which port mode carries multiple VLANs?",
options: ["Private", "Community", "Access", "Trunk"],
answer: 3,
explain: "Trunks multiplex tagged VLANs; access carries one untagged host VLAN.",
tags: ["trunk"]
},
{
type: "mcq",
q: "Which standard defines VLAN tagging (dot1q)?",
options: ["802.1X", "802.11", "802.3af", "802.1Q"],
answer: 3,
explain: "802.1Q inserts the 4-byte tag after the source address and tells switches how to read it.",
tags: ["802-1q"]
},
{
type: "tf",
q: "VLAN ports for one VLAN must sit next to each other on the switch.",
answer: false,
explain: "Any ports configure into any VLAN individually; tags, not adjacency, define membership and strip at delivery.",
tags: ["vlan"]
},
{
type: "mcq",
q: "What is VTP and the stack master?",
options: ["A cable tester", "Cisco protocol syncing the VLAN database domain-wide from one master", "An IPv6 address", "A Wi-Fi band", "A storage array"],
answer: 1,
explain: "One edit propagates to every switch; members can also announce new VLANs.",
tags: ["vtp"]
},
{
type: "match",
q: "Match each subinterface-style construct to its platform.",
pairs: [
{ item: "Router subinterface", match: "fastEthernet0/0.1 per VLAN" },
{ item: "SVI", match: "interface vlan 10 with its own IP" }
],
explain: "Routers fan logical gateways per VLAN; Layer 3 switches host one SVI gateway per routed VLAN and route internally.",
tags: ["subinterface", "svi"]
},
{
type: "mcq",
q: "Three VLANs need switch-local routing on a Layer 3 switch. How many SVIs?",
options: ["One total", "Three, one per VLAN", "Zero", "One per host", "One per cable"],
answer: 1,
explain: "Each SVI takes its VLAN pool gateway (e.g. 192.168.10.1/24 for VLAN 10) after interface vlan plus no shutdown.",
tags: ["svi"]
},
{
type: "match",
q: "Match each Cisco mode exit to its behavior.",
pairs: [
{ item: "exit", match: "Step back one mode" },
{ item: "end (Ctrl+Z)", match: "Jump straight to # " }
],
explain: "Climb out gradually versus leap to privileged EXEC for saves and shows.",
tags: ["cisco"]
},
{
type: "match",
q: "Match each VLAN type to its note.",
pairs: [
{ item: "Default VLAN", match: "All ports, never renamed or deleted" },
{ item: "Native VLAN", match: "Untagged frames, move off default" },
{ item: "Management VLAN", match: "Switch admin, move off default" },
{ item: "Voice VLAN", match: "Prioritized low-latency VoIP" },
{ item: "Data VLAN", match: "Mail, web, database traffic" }
],
explain: "Defaults persist; native and management sharing the default invites abuse; voice wants bandwidth and priority.",
tags: ["vlan-types"]
},
{
type: "mcq",
q: "Which VLAN cannot be renamed or deleted?",
options: ["Native VLAN", "Management VLAN", "Default VLAN", "Data VLAN"],
answer: 2,
explain: "It arrives with every port and stays; reassign ports instead. Relatives like native and management should move off it.",
tags: ["default-vlan"]
},
{
type: "mcq",
q: "Trunk ends disagree on native VLAN. What happens?",
options: ["Faster throughput", "Native VLAN mismatch error", "Free extra subnets", "Automatic encryption", "Longer cable reach"],
answer: 1,
explain: "Each trunk side must name the same untagged VLAN or log the mismatch.",
tags: ["native-vlan"]
},
{
type: "mcq",
q: "What does show vlan reveal on Cisco?",
options: ["Cable lengths", "VLAN numbers, names, status, and ports", "Wi-Fi passwords", "Cloud bills", "CPU temperature only"],
answer: 1,
explain: "E.g. VLAN 18 active on Gi1/3 and Gi2/3; defaults 1 plus 1002-1005; enet type for live Ethernet VLANs.",
tags: ["show-vlan"]
},
{
type: "multi",
q: "Which three misconfigs top VLAN troubleshooting?",
options: [
"Wrong VLAN assignment",
"Wrong port mode",
"Unintended isolation",
"Too much bandwidth",
"Too many antennas"
],
answer: [0, 1, 2],
explain: "Check docs, then ports: bad mappings, access-versus-trunk flips, and orphaned VLANs needing a router or SVI.",
tags: ["troubleshooting", "vlan"]
},
{
type: "match",
q: "Match each VLAN hopping method to its trick.",
pairs: [
{ item: "Double tagging", match: "Stacked tags, inner revealed after strip" },
{ item: "Switch spoofing", match: "Fake trunk negotiation, free-roam VLANs" }
],
explain: "Both forge into protected domains to steal data or plant malware.",
tags: ["vlan-hopping"]
},
{
type: "multi",
q: "Which mitigations blunt VLAN hopping?",
options: [
"Avoid the default VLAN",
"Park native on an unused ID",
"Disable auto-trunking",
"Default ports to access",
"Prune trunk VLAN lists",
"Lock equipment rooms"
],
answer: [0, 1, 2, 3, 4, 5],
explain: "Shrink tag attack surface at config plus physical layers.",
tags: ["vlan-hopping", "mitigation"]
},
{
type: "mcq",
q: "An attacker stacks two VLAN tags to slip into a restricted VLAN. What attack is this?",
options: ["Port tagging", "Switch spoofing", "VLAN isolation", "VLAN hopping"],
answer: 3,
explain: "Double tagging is one VLAN-hopping arm; spoofed trunks are the other.",
tags: ["vlan-hopping"]
},
{
type: "multi",
q: "Why do VLANs fail giant multi-site clouds?",
options: [
"Tags cannot cross Layer 3 cleanly",
"Only 4,096 subnets",
"WAN broadcasts burn bandwidth"
],
answer: [0, 1, 2],
explain: "Layer 2 scope, small ID space, and broadcast cost break DCI-scale multitenancy.",
tags: ["vlan", "limitations"]
},
{
type: "mcq",
q: "What does VXLAN encapsulate and at which layer?",
options: ["Layer 2 frames inside UDP at Layer 4", "IP inside fiber", "VLANs inside MPLS labels", "DNS inside DHCP", "Voice inside video"],
answer: 0,
explain: "MAC-in-UDP (Layer 2 encapsulation) builds a Layer 2 overlay on the Layer 3 underlay between VTEP endpoints.",
tags: ["vxlan"]
},
{
type: "match",
q: "Match each VXLAN construct to its role.",
pairs: [
{ item: "Underlay", match: "Physical Layer 3 routed net" },
{ item: "Overlay", match: "Virtual Layer 2 VXLAN net" },
{ item: "VTEP", match: "Tunnel endpoint per site" },
{ item: "VNI", match: "3-byte ID, 16 million VXLANs" }
],
explain: "Nashville and Tallahassee VMs share VXLAN1 over Internet routing with ARP-tracked MACs.",
tags: ["vxlan"]
},
{
type: "mcq",
q: "Why do VXLAN nets need MTU above 1,500?",
options: ["Faster CPUs", "Enlarged headers exceed standard frames", "More VLANs", "Longer cables", "Brighter LEDs"],
answer: 1,
explain: "Outer MAC, IP, UDP, and VXLAN headers bloat packets toward 1,600 bytes; multicast BUM delivery separately saves WAN bandwidth.",
tags: ["vxlan", "mtu"]
},
{
type: "mcq",
q: "A VPC is most similar in concept to what?",
options: ["VLAN", "Router", "LAN", "Switch"],
answer: 2,
explain: "AWS VPCs (Azure Virtual Networks) are customer-managed software LAN spaces with addressing, routing, and layered firewalling for EC2 instances in subnets.",
tags: ["vpc"]
},
{
type: "match",
q: "Match each cloud subnet to its Internet posture.",
pairs: [
{ item: "Private subnet", match: "No public IP, no direct Internet" },
{ item: "Public subnet", match: "Public IP plus IG route" }
],
explain: "Databases hide inside; web servers face out through the Internet Gateway with route-table paths.",
tags: ["vpc"]
},
{
type: "mcq",
q: "Which AWS space blocks direct Internet access for its hosts?",
options: ["VPC", "Private subnet", "Public subnet", "IG"],
answer: 1,
explain: "VPCs contain both kinds; IGs open the door; only private subnets bar it.",
tags: ["private-subnet"]
},
{
type: "mcq",
q: "A private DB needs patch downloads without inbound exposure. What fits?",
options: ["Public IP on the DB", "NAT gateway in the public subnet with a private route", "Delete the VPC", "Disable all routes", "Open all firewall ports"],
answer: 1,
explain: "Outbound-only filtered NAT serves updates while outsiders cannot initiate in.",
tags: ["nat-gateway"]
},
{
type: "mcq",
q: "You need shell access to a private database from home. What do you use?",
options: ["Edge device", "Jump box (bastion host)", "NAT gateway", "CDN"],
answer: 1,
explain: "A public EC2 bastion bridges privileged admin sessions into the private net.",
tags: ["bastion-host"]
},
{
type: "match",
q: "Match each edge resource to its job.",
pairs: [
{ item: "CDN", match: "Cache data near users" },
{ item: "Edge device", match: "Compute near users" }
],
explain: "Oregon video cached for Colombia versus smart cars braking locally; both add segmentation complexity.",
tags: ["cdn", "edge-computing"]
},
{
type: "mcq",
q: "Which resource performs computing at the user location?",
options: ["Edge device", "Jump box", "NAT gateway", "CDN"],
answer: 0,
explain: "Endpoints compute locally; jump boxes bridge, NAT gateways filter outbound, CDNs only stage data.",
tags: ["edge-computing"]
},
{
type: "mcq",
q: "A web server plus a private database serve three countries. What must only the web server route to?",
options: ["Private subnet", "Internet Gateway", "Public subnet", "Jump box"],
answer: 1,
explain: "Public web tier holds the IG route; the database tier stays private and reachable only via controlled paths.",
tags: ["vpc", "ig"]
},
{
type: "tf",
q: "Multiple subnets may share one VLAN, but life is easier at 1:1.",
answer: true,
explain: "Allowed yet confusing; one broadcast domain, one VLAN, one subnet keeps mapping sane with per-subinterface DHCP or relay.",
tags: ["vlan", "subnet"]
},
{
type: "tf",
q: "A /30 subnet provides exactly two usable host addresses.",
answer: true,
explain: "32 minus network ID minus broadcast leaves 2, the standard WAN-link size.",
tags: ["subnetting", "cidr"]
},
{
type: "mcq",
q: "What is decimal 131 in binary?",
options: ["10000011", "11111111", "10000000", "00000131", "11010001"],
answer: 0,
explain: "131 converts to 0b10000011; all-ones 11111111 is 255 instead.",
tags: ["binary"]
},
{
type: "mcq",
q: "Which device links FC storage to its fabric?",
options: ["Ordinary Ethernet NIC", "HBA through an FC switch", "Cable modem", "Wi-Fi adapter", "Patch panel"],
answer: 1,
explain: "Host bus adapters feed FC switches; FCoE equivalents are CNAs, while iSCSI alone runs on plain NICs.",
tags: ["hba", "fibre-channel"]
},
{
type: "mcq",
q: "Which address usually becomes a subnet default gateway?",
options: ["The network ID", "The broadcast address", "The first or last usable host address", "A random public IP", "The AP MAC address"],
answer: 2,
explain: "Router interfaces take an edge usable host per convention; ID and broadcast can never serve hosts.",
tags: ["default-gateway"]
},
{
type: "tf",
q: "Switches create new LANs wherever they are installed.",
answer: false,
explain: "Only router interfaces delimit LANs; same-interface switches share one broadcast domain.",
tags: ["router", "lan"]
},
{
type: "mcq",
q: "What is WPS most vulnerable to?",
options: ["Brute-forcing its short setup PIN", "Fiber cuts", "BGP hijacks", "VLAN pruning", "IPv6 exhaustion"],
answer: 0,
explain: "Wi-Fi Protected Setup trades convenience for a guessable PIN attacked systematically.",
tags: ["wps"]
},
{
type: "mcq",
q: "What is EUI-64?",
options: ["A Wi-Fi band", "An IPv6 interface ID built from the device MAC", "A SAN switch", "A VLAN tag size", "A routing protocol"],
answer: 1,
explain: "Some IPv6 nets derive the 64-bit host half directly from MAC bits.",
tags: ["ipv6", "eui-64"]
}
]
});
