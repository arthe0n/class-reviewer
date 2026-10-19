window.ReviewApp.content.register({
type: "flashcards",
cert: "network-plus",
chapter: "Chapter 8: Network Segmentation",
items: [
{
front: "What is network segmentation?",
back: "Divide-and-conquer network management: splitting a large broadcast domain into smaller segments, physically with multiple LANs or logically with VLANs, plus subdividing the IP space. It raises performance and security.",
tags: ["network-plus", "segmentation"]
},
{
front: "What is the difference between a subnet and a VLAN?",
back: "A subnet groups IP addresses (Layer 3); a VLAN groups switch ports on one or more switches (Layer 2). They usually work together, ideally 1 broadcast domain = 1 VLAN = 1 subnet.",
tags: ["network-plus", "subnet", "vlan"]
},
{
front: "What is a broadcast domain?",
back: "All the nodes a broadcast message can reach. Segmentation shrinks each domain so broadcasts stay local.",
tags: ["network-plus", "broadcast-domain"]
},
{
front: "Name three goals of segmentation.",
back: "Enhance security (isolate sensitive nets, expose only screened subnets), improve performance (smaller domains, less broadcast waste), and simplify troubleshooting (faults pinned to one segment).",
tags: ["network-plus", "segmentation", "benefits"]
},
{
front: "What groupings are networks commonly segmented by?",
back: "Geographic locations (floors, buildings), departmental boundaries (Accounting, HR, Sales), and device types (printers, desktops, IP phones).",
tags: ["network-plus", "segmentation"]
},
{
front: "What device expands vs divides a broadcast domain?",
back: "Adding Layer 2 switches expands it (broadcasts flood all ports). Adding routers, VLANs, or subnets divides it; a router is a broadcast boundary.",
tags: ["network-plus", "broadcast-domain"]
},
{
front: "What is OT and how does its risk view differ from IT?",
back: "Operational technology: hardware and software monitoring and controlling physical infrastructure (SCADA, HVAC, traffic, irrigation). OT fears physical interruption; IT fears data exposure and lost business activity. A dead web server is tolerable; a failed irrigation system floods.",
tags: ["network-plus", "ot", "it"]
},
{
front: "How does OT traffic differ from IT traffic for firewalls?",
back: "OT leans on east-west traffic inside segments, which firewalls cannot reach or control. IT north-south traffic crossing segment edges filters cleanly.",
tags: ["network-plus", "ot", "east-west"]
},
{
front: "SCADA vs IIoT architecture?",
back: "SCADA: centralized control in a closed physically-segmented environment. IIoT (Internet-connected OT): decentralized, distributed, Internet-exposed, harvesting massive data for analysis, pulling IT teams into OT security.",
tags: ["network-plus", "scada", "iiot"]
},
{
front: "What are untrusted, trusted, and screened-subnet zones?",
back: "Untrusted (public/WAN): the Internet, outside control, heavily filtered. Trusted (private): strictest firewall and ACL rules, Internet only via proxy, with tiered trust inside. Screened subnet (DMZ): deliberately Internet-exposed buffer with looser rules and direct access. Extras: guest zones and voice zones.",
tags: ["network-plus", "zones", "dmz"]
},
{
front: "What is a proxy server in zone design?",
back: "An intermediary between internal and external networks giving filtered, protected Internet communication for trusted-zone hosts.",
tags: ["network-plus", "proxy"]
},
{
front: "What is micro-segmentation?",
back: "Granular zoning with object-level security on individual resources instead of only perimeter defense; vital for must-be-exposed IIoT, e.g. filtering at device interfaces and encrypting peer traffic inside a segment via virtual and cloud controls.",
tags: ["network-plus", "micro-segmentation"]
},
{
front: "What is DAS?",
back: "Direct-attached storage: disks inside each server. Bulky across racks, hard to manage at scale, and awkward for access control.",
tags: ["network-plus", "das"]
},
{
front: "What is NAS and which protocols and buyers fit it?",
back: "Network attached storage: a multi-disk appliance on a switch serving files over the LAN via CIFS/SMB (Windows) or NFS (Linux/UNIX), often with RAID. Fits SMBs needing shared data without SAN cost.",
tags: ["network-plus", "nas"]
},
{
front: "What is a SAN?",
back: "Storage area network: a distinct high-speed network of clustered RAID storage devices abstracted from compute servers, possibly off-site at an ISP, offering scale, massive capacity, and fast always-on access — ideal for VM farms. Isolated yet IP-connected, so it still needs segmentation and hardening.",
tags: ["network-plus", "san"]
},
{
front: "What is multipathing in a SAN?",
back: "Parallel connections so a failed link fails over instantly while load spreads evenly across storage devices.",
tags: ["network-plus", "multipathing"]
},
{
front: "What is Fibre Channel (FC)?",
back: "Dedicated storage fabric separate from Ethernet (usually fiber, HBAs not NICs, FC switches), up to 128 GFC per lane and near 512 GFC quad-lane via QSFP, heading to 1 TFC. Fast and mature but costly and training-heavy.",
tags: ["network-plus", "fibre-channel"]
},
{
front: "What is FCoE and what does it need?",
back: "Fibre Channel over Ethernet: FC frames encapsulated in FCoE inside Ethernet, keeping FC speed on cheaper Ethernet plant via CNAs (converged network adapters) and FCoE switches serving LAN and SAN together.",
tags: ["network-plus", "fcoe"]
},
{
front: "What is iSCSI and when does it win?",
back: "Internet SCSI (i-scuzzy): SCSI over TCP on plain twisted-pair Ethernet with ordinary NICs plus initiator software, around 10 Gbps with jumbo frames optional. Wins on cost and simplicity for small and medium SANs; loses peak benchmarks to FC.",
tags: ["network-plus", "iscsi"]
},
{
front: "What is InfiniBand?",
back: "Ultra-fast niche fabric needing specialized hardware; hard to install and costly, confined to high-performance computing.",
tags: ["network-plus", "infiniband"]
},
{
front: "How does a router create subnets from one LAN?",
back: "Daisy-chained switches on one router interface share one broadcast domain; rehoming each switch to its own router interface makes each port a new LAN, since routers never forward broadcasts between interfaces.",
tags: ["network-plus", "subnetting", "router"]
},
{
front: "Do switches create LANs?",
back: "No: only router interfaces delimit LANs. Same-interface switches share one LAN; different-interface switches form separate LANs.",
tags: ["network-plus", "router", "lan"]
},
{
front: "What is subnetting and what four benefits does it bring?",
back: "Splitting one IP pool into per-LAN groups (e.g. 192.168.89.0/24 across floors). Benefits: tidier documentation, faster fault location, non-overlapping router-friendly spaces, and efficient binary-related routing. Cost: each new subnet burns a network ID plus a broadcast address.",
tags: ["network-plus", "subnetting"]
},
{
front: "How does a host decide if a destination is local?",
back: "It compares its network ID bits to the destination network ID bits under the subnet mask. Match: send directly. Mismatch: send to the default gateway. Example: 192.168.123.x versus 192.168.30.140 goes to the gateway.",
tags: ["network-plus", "subnet-mask"]
},
{
front: "What are classful A, B, and C ranges and splits?",
back: "A: first octet 0-126 (binary 0...), 8 network bits, 24 host bits. B: 128-191 (10...), 16 and 16. C: 192-223 (110...), 24 and 8. D and E are special-purpose. Classful network IDs end in 0; hosts never take the ID or broadcast; no octet exceeds 255.",
tags: ["network-plus", "classful"]
},
{
front: "What are the default subnet masks for classes A, B, and C?",
back: "A: 255.0.0.0 (/8). B: 255.255.0.0 (/16). C: 255.255.255.0 (/24). Modern nets are classless but use these as calculation starting points.",
tags: ["network-plus", "subnet-mask"]
},
{
front: "Why does a /24 hold 254 hosts, not 256?",
back: "The first address is the network ID and the last is the broadcast address; neither goes on a host.",
tags: ["network-plus", "hosts", "broadcast"]
},
{
front: "A class B is subnetted to /24. How many subnets and hosts each?",
back: "256 subnets with 254 hosts each (Table 8-4).",
tags: ["network-plus", "subnetting"]
},
{
front: "What is an extended network prefix?",
back: "The original network ID plus borrowed subnet bits, e.g. the bold prefix marking each of eight /27 subnets inside 192.168.89.0/24.",
tags: ["network-plus", "extended-prefix"]
},
{
front: "How do you derive broadcast and host ranges for a subnet?",
back: "Broadcast is the address just before the next subnet network ID (subnet 5 at .128 runs to .159 before .160). Usable hosts run from ID+1 to broadcast-1 (.129-.158: 30 hosts of 32).",
tags: ["network-plus", "broadcast", "host-range"]
},
{
front: "How are subnets implemented on router and hosts?",
back: "Program each router interface with its subnet IP and mask (often the first or last usable host as gateway), then point hosts there statically or via DHCP.",
tags: ["network-plus", "default-gateway"]
},
{
front: "How does UDP forwarding share central services across subnets?",
back: "Broadcast-bound UDP (DHCP 67, NTP 123, DNS, TFTP) is caught by a relay agent (router, firewall, or Layer 3 switch), repackaged to an IP helper address (one server or a services-subnet broadcast), answered with the agent interface subnet in mind, and routed back. Without it each subnet would need its own servers.",
tags: ["network-plus", "udp-forwarding", "ip-helper"]
},
{
front: "What is VLSM and how do you build it?",
back: "Variable Length Subnet Mask: subnetting subnets into right-sized pieces (pizza slices: Sales 126, Accounting 62, HR 30, IT 6, Exec 6, WAN links 2 each from 192.168.10.0/24). Carve largest first (/25, /26, /27, /29s, /30s) and always leave growth headroom against pool exhaustion; start from /23 or /22, or move to IPv6.",
tags: ["network-plus", "vlsm"]
},
{
front: "How does IPv6 subnetting differ from IPv4?",
back: "No classes, no masks: 128-bit space with effectively endless addresses (one /64 holds 18 quintillion). Split is network prefix (first 64, site/global routing prefix, sometimes EUI-64 from MACs) plus interface ID (last 64). The fourth hex block of the site prefix becomes the Subnet ID.",
tags: ["network-plus", "ipv6", "subnetting"]
},
{
front: "How many subnets do IPv6 /48, /56, and /64 site prefixes allow?",
back: "/48 controls 16 Subnet ID bits: 65,536 subnets. /56 controls 8: 256 subnets. /64 controls none: exactly one subnet. Chain: RIR /12 to ISP /32 to large org /48 to small org /56 or /64 to /128 interfaces; optionally split Subnet ID into 8-bit subsite plus 8-bit subnet (256x256).",
tags: ["network-plus", "ipv6", "subnet-id"]
},
{
front: "What is a VLAN and why use one instead of new routers?",
back: "A virtual LAN: ports grouped across switches into isolated broadcast domains at Layer 2, like VMs abstracting compute. Uses: prioritize executives or ICS, quarantine heavy VoIP, fence legacy SCADA, carve guest or project nets, and add departments without new hardware.",
tags: ["network-plus", "vlan"]
},
{
front: "What is inter-VLAN routing and router-on-a-stick?",
back: "Same-VLAN traffic switches normally; cross-VLAN traffic must climb to the router and back. One router feeding a multi-VLAN switch is called router-on-a-stick. VLAN ports need not sit together; hosts inherit their port VLAN and usually never know it exists.",
tags: ["network-plus", "inter-vlan-routing"]
},
{
front: "What is an 802.1Q tag (dot1q)?",
back: "A 4-byte VLAN field inserted after the Ethernet source address. It rides to the destination switch port or routing router, is stripped there, and is re-added on cross-VLAN routes.",
tags: ["network-plus", "802-1q", "tag"]
},
{
front: "Can one VLAN span several switches, and who needs the router?",
back: "Yes: same-VLAN devices on different switches talk locally without routing, while different-VLAN devices on one switch still need the router.",
tags: ["network-plus", "vlan"]
},
{
front: "Access port vs trunk port vs trunk line?",
back: "Access: to one host (PC, server, printer), one VLAN, host blind to VLANs. Trunk: to a router, switch, or server, carrying many VLANs. Trunk line (trunk): the link between two trunk ports. Term comes from telephony cable aggregation.",
tags: ["network-plus", "access-port", "trunk"]
},
{
front: "What is VTP and the stack master?",
back: "VLAN Trunk Protocol (Cisco): assigns and interprets tags across trunks so one stack-master VLAN database edit propagates domain-wide; members can also announce additions.",
tags: ["network-plus", "vtp"]
},
{
front: "How do VLANs map to subnets and router subinterfaces?",
back: "Normally one VLAN owns one Layer 3 subnet (VLAN 1 = Subnet 1, etc.), though multiples per VLAN are possible. One physical router port fans into logical subinterfaces (fastEthernet0/0.1, .2, .3), each the gateway of its VLAN/subnet/broadcast domain. DHCP comes per-subinterface or via relay.",
tags: ["network-plus", "subinterface"]
},
{
front: "What is an SVI?",
back: "Switch virtual interface: a logical Layer 3 interface on a multilayer switch (interface vlan 10, no shutdown, plus IP) acting as that VLAN gateway. One SVI per routed VLAN lets the switch itself route between VLANs with no external router.",
tags: ["network-plus", "svi"]
},
{
front: "Cisco exit vs end (Ctrl+Z)?",
back: "exit steps back one mode (config-if to config to # to logout). end (or Ctrl+Z) jumps straight to privileged EXEC # from anywhere for saving and show commands.",
tags: ["network-plus", "cisco", "cli"]
},
{
front: "What are the five VLAN types and their risks?",
back: "Default: preconfigured, all ports, never renamed or deleted. Native: carries untagged frames (defaults to default VLAN; move to a dead-end unused VLAN or risk injection). Data (user): mail, web, databases. Management: switch admin (move off default or risk it). Voice: high-bandwidth prioritized low-latency VoIP. Trunk ends must agree on native VLAN or log mismatch errors.",
tags: ["network-plus", "vlan-types", "native-vlan"]
},
{
front: "How do you inspect VLANs and what three misconfigs top the list?",
back: "show vlan (numbers, names, status, ports like Gi1/3; defaults 1 and 1002-1005; enet type). Misconfigs: wrong assignment (bad port or pre-auth mapping), wrong port mode (endpoints want access, multi-VLAN links want trunk), and accidental isolation (cut-off VLANs need a router or Layer 3 SVI to escape).",
tags: ["network-plus", "show-vlan", "troubleshooting"]
},
{
front: "What is VLAN hopping and how do you stop it?",
back: "Forging into protected VLANs via double tagging (stacked tags, inner revealed after outer strip) or switch spoofing (fake trunk negotiation, then free-roam VLAN traffic). Stop it: avoid default VLANs, park native on an unused ID, disable auto-trunking, default ports to access, prune trunk VLAN lists, and lock equipment rooms.",
tags: ["network-plus", "vlan-hopping"]
},
{
front: "Why do VLANs fail giant multi-site data centers?",
back: "Layer 2 tags cannot cross Layer 3 (Internet) cleanly, the 4,096-subnet ceiling starves multitenant clouds, and WAN-borne broadcasts burn bandwidth. DCI links between sites need better.",
tags: ["network-plus", "vlan", "limitations"]
},
{
front: "What is VXLAN (MAC-in-UDP) and what are VTEPs?",
back: "Virtual extensible LAN: a Layer 2 overlay on the Layer 3 underlay, wrapping original frames after the UDP header (Layer 2 encapsulation) so Nashville and Tallahassee VMs share a LAN over the Internet. VTEP endpoints terminate the tunnels at each site.",
tags: ["network-plus", "vxlan", "vtep"]
},
{
front: "What do VNI, BUM-over-multicast, and bigger MTU do for VXLAN?",
back: "VNI (3-byte network ID): 16 million VXLANs for multitenant VM scale. Multicast (not broadcast) delivery of BUM (broadcast, unknown-unicast, multicast) saves WAN bandwidth and ARP tables. Jumbo headers need MTU above 1,500 (e.g. 1,600). Deployed by CSPs and big private clouds.",
tags: ["network-plus", "vxlan", "vni", "mtu"]
},
{
front: "What is a VPC and how does it mirror a LAN?",
back: "Virtual private cloud (AWS VPC, Azure Virtual Networks): a customer-managed software-defined slice of cloud with subnets, load balancers, gateways, and security. Like an on-prem LAN plus EC2 instances in subnets, with layered firewalling at interface, subnet, and VPC. Same functions as routers, switches, and firewalls, configured logically.",
tags: ["network-plus", "vpc"]
},
{
front: "Private vs public cloud subnet, IG, route tables, NAT gateway?",
back: "Private: no public IPs, no direct Internet (trusted-zone analogue for DBs). Public: public IPs plus an IG (Internet Gateway, the cloud modem/proxy to the outside) plus a route-table path (screened-subnet analogue for web servers). NAT gateway in the public subnet lets private hosts pull updates outbound while blocking inbound initiation.",
tags: ["network-plus", "vpc", "subnet", "nat-gateway"]
},
{
front: "What is a bastion host (jump box)?",
back: "A public-subnet EC2 instance bridging admins to locked private resources for management and repair.",
tags: ["network-plus", "bastion-host"]
},
{
front: "CDN vs edge computing?",
back: "CDN caches data near users over global plus ISP infrastructure (Oregon video served from Ecuador cache to Colombia) for delivery latency. Edge computing runs compute near users on edge devices (smart cars braking locally, still phoning home for weather). Both complicate segmentation and security.",
tags: ["network-plus", "cdn", "edge-computing"]
},
{
front: "How many usable hosts do /30, /29, /28, and /27 subnets provide?",
back: "/30: 2 (WAN links). /29: 6 (small teams). /28: 14. /27: 30 (e.g. HR). Each loses two addresses to network ID plus broadcast.",
tags: ["network-plus", "subnetting", "hosts"]
},
{
front: "How many subnets and hosts do /26, /25, /23, and /22 give on a class B?",
back: "/26: 1,024 subnets of 62. /25: 512 of 126. /23: 128 of 510. /22: 64 of 1,022 (Table 8-4).",
tags: ["network-plus", "subnetting"]
},
{
front: "What is decimal 131 in binary, and all-ones 11111111 in decimal?",
back: "131 = 10000011 (Calculator Programmer mode, or google 131 in binary with 0b prefix). 11111111 = 255. No calculator is allowed on the exam, so drill these conversions.",
tags: ["network-plus", "binary"]
},
{
front: "What is the eighth /27 subnet of 192.168.89.0/24?",
back: "Network ID 192.168.89.224, hosts .225-.254, broadcast .255. Each /27 steps 32 addresses past the previous ID.",
tags: ["network-plus", "subnetting"]
},
{
front: "Which host address usually becomes the subnet default gateway?",
back: "The first (or, by some admins, the last) usable host address, programmed on the router interface for that subnet.",
tags: ["network-plus", "default-gateway"]
},
{
front: "Should a wireless AP run DHCP when another DHCP server exists?",
back: "No: a second DHCP server causes addressing conflicts. Most admins leave AP DHCP off.",
tags: ["network-plus", "dhcp"]
},
{
front: "What are guest and voice zones?",
back: "Guest zone: temporary limited access for visitors. Voice zone: isolated voice traffic. Both keep special flows off the trusted core.",
tags: ["network-plus", "zones"]
},
{
front: "What is a brute force attack and what beats it?",
back: "Trying every password or key combo until one works. Long complex keys win because each added character multiplies the search time.",
tags: ["network-plus", "brute-force"]
},
{
front: "Why is WPS dangerous?",
back: "Wi-Fi Protected Setup simplifies joins with a short PIN that attackers brute-force systematically to gain access.",
tags: ["network-plus", "wps"]
},
{
front: "What is an EMV chip and does it stop RFID theft?",
back: "Europay-Mastercard-Visa chips mint a unique transaction number per tap, killing replay. But EMV cards with contactless RFID still broadcast to nearby snoopers.",
tags: ["network-plus", "emv", "rfid"]
},
{
front: "A guest portal will not load over HTTPS with custom DNS. What helps?",
back: "First visit a plain HTTP page such as neverssl.com so the portal can intercept; check blockers, autofill, and custom DNS too.",
tags: ["network-plus", "captive-portal"]
},
{
front: "What five IoT hardening steps does the chapter recommend?",
back: "Rename defaults with strong passwords, use the strongest crypto plus 2FA, isolate IoT on its own network, patch firmware, and never manage devices over public Wi-Fi.",
tags: ["network-plus", "iot", "hardening"]
},
{
front: "What is a DCI?",
back: "Data center interconnect: a high-bandwidth link joining data centers for sharing, backup, load balancing, and failover.",
tags: ["network-plus", "dci"]
},
{
front: "What is BUM traffic?",
back: "Broadcast, unknown-unicast, and multicast: messages to many or unknown destinations, often maintaining ARP tables. VXLANs multicast instead of broadcast it to save WAN bandwidth.",
tags: ["network-plus", "vxlan", "bum"]
},
{
front: "What connects FC devices to the fabric instead of NICs?",
back: "HBAs (host bus adapters) through FC switches; FCoE uses CNAs into converged switches.",
tags: ["network-plus", "hba", "fibre-channel"]
},
{
front: "What role does RAID play in NAS and SANs?",
back: "Redundant array of inexpensive disks: clustered drives keep data available when disks fail, forming the fault-tolerant base of both.",
tags: ["network-plus", "raid"]
},
{
front: "What is EUI-64 in IPv6?",
back: "Building the 64-bit interface ID from the device MAC address, used on some IPv6 networks for the host half.",
tags: ["network-plus", "ipv6", "eui-64"]
},
{
front: "What is a site (global routing) prefix in IPv6?",
back: "The first 64 bits identifying the network (e.g. 2608:FE10:1:AA in 2608:FE10:1:AA:72:50FF:FE2B:E708), written like 2608:FE10:1:AA::/64.",
tags: ["network-plus", "ipv6", "site-prefix"]
},
{
front: "How can the 16-bit IPv6 Subnet ID split hierarchically?",
back: "Into 8-bit subsite plus 8-bit subnet: 256 sites times 256 subnets keeps 65,536 total, organized by city then floor or department.",
tags: ["network-plus", "ipv6", "subnet-id"]
},
{
front: "Which ports stay open the long way: FC, FCoE, iSCSI speeds?",
back: "FC to 128 GFC per lane (~512 quad via QSFP, toward 1 TFC). FCoE 10 Gbps+. iSCSI ~10 Gbps. IB 100+ Gbps niche.",
tags: ["network-plus", "san", "speed"]
},
{
front: "Why do overlapping router-interface subnets break routing?",
back: "The router cannot tell which LAN owns an address, so messages misroute. Well-chosen subnets never overlap and stay binary-related.",
tags: ["network-plus", "subnetting", "overlap"]
}
]
});
