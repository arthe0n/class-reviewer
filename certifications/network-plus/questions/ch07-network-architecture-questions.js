window.ReviewApp.content.register({
type: "questions",
cert: "network-plus",
chapter: "Chapter 7: Network Architecture",
items: [
{
type: "mcq",
q: "What does network architecture describe?",
options: ["Only the cabling vendor chosen for a LAN", "The devices, their configuration, supporting services, and how devices connect", "Only the public IP addresses leased by a company", "The office floor plan where racks are installed", "Only the applications installed on user PCs"],
answer: 1,
explain: "Architecture is the overall design: devices, configuration, services, and interconnection.",
tags: ["architecture"]
},
{
type: "mcq",
q: "What is network abstraction?",
options: ["Removing all switches from a LAN", "Replacing fiber with copper cable", "Separating decision-making from hardware so control can live elsewhere", "Disabling every unused switch port", "Assigning static IPs to all hosts"],
answer: 2,
explain: "Abstraction moves prioritization, direction, filtering, and repair decisions off the forwarding hardware to controllers, VMs, or logical constructs.",
tags: ["abstraction"]
},
{
type: "mcq",
q: "Which switch type has no IP address and offers plug-and-play simplicity?",
options: ["Layer 3 switch", "Managed switch", "Unmanaged switch", "Layer 4 switch", "Multilayer core switch"],
answer: 2,
explain: "Unmanaged switches are inexpensive port expanders for SOHO networks with minimal options and no management address.",
tags: ["switch", "unmanaged"]
},
{
type: "mcq",
q: "Which switch can make routing decisions with routing protocols on a large LAN?",
options: ["Unmanaged switch", "Hub", "Layer 3 switch", "Patch panel", "Media converter"],
answer: 2,
explain: "Layer 3 switches read Layer 3 data and route much like routers, optimized for fast in-LAN Layer 3 handling.",
tags: ["switch", "layer-3"]
},
{
type: "mcq",
q: "A device reads Layer 4-7 data for content filtering and per-application statistics. What is it?",
options: ["Unmanaged switch", "Layer 4 switch", "Repeater", "Patch panel", "Toner probe"],
answer: 1,
explain: "Layer 4 (content/application) switches interpret transport through application data for filtering, statistics, and security.",
tags: ["switch", "layer-4"]
},
{
type: "mcq",
q: "What is CAM on a switch?",
options: ["A backup power supply", "High-speed memory holding the MAC-to-port table", "A routing protocol for WANs", "A fiber connector type", "A cloud billing meter"],
answer: 1,
explain: "Content addressable memory stores the MAC address (CAM) table mapping MACs to physical ports for fast lookup.",
tags: ["cam"]
},
{
type: "mcq",
q: "In a MAC flooding attack, what does the attacker do?",
options: ["Encrypts the switch firmware", "Sends frames with many spoofed MACs to fill the CAM table", "Cuts power to redundant switches", "Changes every host to DHCP", "Replaces copper with fiber"],
answer: 1,
explain: "Flooding CAM space blocks legitimate learning, forcing fail-open broadcast that the attacker captures.",
tags: ["mac-flooding"]
},
{
type: "match",
q: "Match each switch port status to its meaning.",
pairs: [
{ item: "Administratively down", match: "Disabled by admin config" },
{ item: "Error disabled", match: "Auto-shutdown from a fault" },
{ item: "Suspended", match: "Mismatched aggregation config" }
],
explain: "Admin action, automatic fault shutdown, and group incompatibility produce the three statuses.",
tags: ["port-status"]
},
{
type: "mcq",
q: "A port shut itself down after a duplex mismatch. What status is it?",
options: ["Administratively down", "Forwarding", "Suspended", "Error disabled", "Designated"],
answer: 3,
explain: "Error disabled is the automatic shutdown for loopback errors, duplex mismatches, or violations.",
tags: ["port-status", "error-disabled"]
},
{
type: "mcq",
q: "Which Cisco commands disable and re-enable a switch port?",
options: ["disable / enable", "shutdown / no shutdown", "block / unblock", "deny / permit", "down / up"],
answer: 1,
explain: "Cisco and Arista use shutdown and no shutdown; Juniper uses disable and enable.",
tags: ["cisco", "shutdown"]
},
{
type: "mcq",
q: "What does switchport port-security provide?",
options: ["Faster routing between VLANs", "MAC filtering that also guards against MAC flooding", "Longer cable distances", "Wireless encryption keys", "Cloud auto-scaling"],
answer: 1,
explain: "It caps allowed MACs per access port, making it a MAC filter and flood guard.",
tags: ["port-security"]
},
{
type: "mcq",
q: "By default, how many MAC addresses does switchport port-security allow per port?",
options: ["Unlimited", "1", "2", "10", "254"],
answer: 1,
explain: "The default is one; raise it for phones, servers, APs, uplinks, or virtualization hosts.",
tags: ["port-security"]
},
{
type: "mcq",
q: "A port serves an IP phone with a PC behind it. How many MACs should it allow?",
options: ["1", "2", "0", "100", "Unlimited with security off"],
answer: 1,
explain: "Voice plus data needs two: one for the phone, one for the PC.",
tags: ["port-security"]
},
{
type: "match",
q: "Match each Juniper command to its port-security role.",
pairs: [
{ item: "mac-limit", match: "Caps MAC count in the table" },
{ item: "allowed-mac", match: "Sets approved addresses" }
],
explain: "mac-limit bounds quantity; allowed-mac names the permitted addresses.",
tags: ["juniper", "port-security"]
},
{
type: "mcq",
q: "On a port-security violation, what is the default switch reaction?",
options: ["It shuts the port down", "It reboots the switch", "It deletes all VLANs", "It does nothing", "It speeds up the port"],
answer: 0,
explain: "Default is shutdown; alternatively restrict only rogue data. Both log a notification.",
tags: ["port-security", "violation"]
},
{
type: "tf",
q: "Port security alone stops a skilled attacker who can spoof MAC addresses.",
answer: false,
explain: "It is only one deterrent layer; learning the approved MAC makes spoofing easy, so defense in depth is required.",
tags: ["defense-in-depth"]
},
{
type: "mcq",
q: "Why does redundancy between switches risk a broadcast storm?",
options: ["Redundant links always halve bandwidth", "Parallel paths can loop broadcasts endlessly", "Extra switches remove the need for STP", "Redundancy disables storm control", "Backup switches use different voltages"],
answer: 1,
explain: "A broadcast circling A-B-C-D-A is reissued at every hop, flooding the LAN.",
tags: ["loops", "broadcast-storm"]
},
{
type: "mcq",
q: "What does storm control do?",
options: ["Blocks looped topology in advance", "Samples traffic each second and drops over-threshold traffic for the interval", "Elects the root bridge", "Assigns VLANs to ports", "Encrypts management traffic"],
answer: 1,
explain: "storm-control is a reactive flood guard for broadcast and multicast excess.",
tags: ["storm-control"]
},
{
type: "match",
q: "Match each loop defense to its strategy.",
pairs: [
{ item: "STP", match: "Prevent loops by blocking ports" },
{ item: "Storm control", match: "Limit damage by dropping excess" }
],
explain: "STP acts on topology before storms; storm control acts on volume during storms.",
tags: ["stp", "storm-control"]
},
{
type: "mcq",
q: "Who developed STP and which standard first defined it?",
options: ["Radia Perlman, IEEE 802.1D", "Vint Cerf, IEEE 802.3", "Bob Kahn, IEEE 802.11", "Tim Berners-Lee, IEEE 802.1Q", "Linus Torvalds, IEEE 802.1AX"],
answer: 0,
explain: "Perlman created it at DEC in 1985; IEEE adopted it as 802.1D in 1990 at Layer 2.",
tags: ["stp"]
},
{
type: "mcq",
q: "How is the STP root bridge chosen?",
options: ["Highest IP address wins", "Lowest BID wins: priority plus MAC", "Random election each minute", "Most ports wins", "Newest switch always wins"],
answer: 1,
explain: "The 2-byte admin priority plus MAC forms the BID; lowest wins, so with default priorities the lowest MAC is root.",
tags: ["stp", "root-bridge"]
},
{
type: "mcq",
q: "How many root bridges exist on one STP network?",
options: ["One", "One per switch", "One per host", "Two", "Unlimited"],
answer: 0,
explain: "Exactly one root anchors every path calculation.",
tags: ["stp", "root-bridge"]
},
{
type: "match",
q: "Match each STP port role to its definition.",
pairs: [
{ item: "Root port", match: "One per bridge, toward the root" },
{ item: "Designated port", match: "One per link, away from the root" },
{ item: "Blocked port", match: "Neither role, no data forwarding" }
],
explain: "RP is my way home; DP is the boss of its highway; the rest block.",
tags: ["stp", "ports"]
},
{
type: "mcq",
q: "What are BPDUs?",
options: ["Power cables for PoE", "STP messages exchanged between switches", "Fiber transceiver types", "Cloud billing records", "Wireless beacons"],
answer: 1,
explain: "Bridge Protocol Data Units carry the STP information used to elect roles and detect changes.",
tags: ["stp", "bpdu"]
},
{
type: "match",
q: "Match each STP state to its behavior.",
pairs: [
{ item: "Blocking", match: "Receives BPDUs, 20 s" },
{ item: "Listening", match: "Sends BPDUs, 15 s" },
{ item: "Learning", match: "Learns MACs, 15 s" },
{ item: "Forwarding", match: "Forwards data, permanent" }
],
explain: "Blocking 20 s, Listening 15 s, Learning 15 s, then Forwarding; Disabled is manual.",
tags: ["stp", "port-states"]
},
{
type: "mcq",
q: "Which is the only STP port state that forwards user data?",
options: ["Blocking", "Listening", "Learning", "Forwarding", "Disabled"],
answer: 3,
explain: "Only Forwarding transmits for delivery while continuing to learn MACs.",
tags: ["stp", "forwarding"]
},
{
type: "mcq",
q: "Which STP successor detects and heals link failures in milliseconds?",
options: ["Original 802.1D STP", "RSTP (802.1w)", "Hub", "Repeater", "Patch panel"],
answer: 1,
explain: "Rapid Spanning Tree Protocol (and MSTP) replaced the up-to-two-minute original convergence.",
tags: ["rstp"]
},
{
type: "match",
q: "Match each modern path technology to its trait.",
pairs: [
{ item: "MSTP", match: "Multiple trees, fast heal" },
{ item: "TRILL", match: "IETF multipath link-state" },
{ item: "SPB", match: "All paths active, 802.1aq" },
{ item: "Rapid PVST+", match: "Cisco per-VLAN STP" }
],
explain: "MSTP 802.1s, TRILL multipath, SPB 802.1aq load-sharing, Rapid PVST+ Cisco proprietary.",
tags: ["stp", "spb", "trill"]
},
{
type: "mcq",
q: "What is a VLAN?",
options: ["A subnet at Layer 3", "A virtual LAN at Layer 2", "A WAN routing protocol", "A fiber connector", "A cloud billing tier"],
answer: 1,
explain: "VLANs segment like subnets but function at OSI Layer 2.",
tags: ["vlan"]
},
{
type: "match",
q: "Match each hierarchy layer to its job.",
pairs: [
{ item: "Access (edge)", match: "Host connections, Layer 2" },
{ item: "Distribution (aggregation)", match: "Routing, filtering, WAN, Layer 3" },
{ item: "Core", match: "Fast backbone, minimal filtering" }
],
explain: "Edge touches hosts, aggregation routes and filters, core passes backbone traffic fast.",
tags: ["three-tier"]
},
{
type: "mcq",
q: "Which switches connect directly to servers, printers, and workstations?",
options: ["Core switches", "Access switches", "WAN routers only", "Firewalls only", "Spine switches alone"],
answer: 1,
explain: "Access (edge) switches are the host layer; other blocks should not bypass them.",
tags: ["access-layer"]
},
{
type: "match",
q: "Match each traffic direction to its example.",
pairs: [
{ item: "East-west", match: "Web server to database" },
{ item: "North-south", match: "Internet client to web server" }
],
explain: "East-west stays between local peers; north-south enters or leaves the segment.",
tags: ["east-west", "north-south"]
},
{
type: "mcq",
q: "What is spine-and-leaf architecture?",
options: ["Three layers with a WAN core", "Two layers: spine mesh plus host-facing leaves", "One hub with spokes", "Bus topology with taps", "Ring of repeaters"],
answer: 1,
explain: "Core and distribution collapse into the spine; each leaf meshes to every spine for fewer hops. Also called collapsed core.",
tags: ["spine-leaf"]
},
{
type: "mcq",
q: "In spine-and-leaf, which layer typically routes at Layer 3?",
options: ["Leaf only", "Spine", "Hosts", "Patch panels", "Modems"],
answer: 1,
explain: "Spine organizes segments at Layer 3 while leaves handle Layer 2 or 3 to hosts.",
tags: ["spine-leaf"]
},
{
type: "multi",
q: "Which are documented spine-and-leaf advantages?",
options: [
"Improved redundancy",
"Decreased latency",
"Increased performance via multipath protocols",
"Improved scalability",
"Increased inspection of east-west traffic",
"Mandatory use of original 802.1D STP"
],
answer: [0, 1, 2, 3, 4],
explain: "All except clinging to slow original STP are benefits; spine-leaf drops it for TRILL/SPB-class paths, and usually costs less.",
tags: ["spine-leaf", "benefits"]
},
{
type: "mcq",
q: "A leaf switch serves every device in its own rack. What is this?",
options: ["EoR switching", "ToR switching", "Core routing", "Bus tapping", "Ring healing"],
answer: 1,
explain: "Top-of-rack places the leaf in the same rack it serves; EoR/MoR share switches across rows.",
tags: ["tor"]
},
{
type: "mcq",
q: "What does 99.999% uptime allow per year?",
options: ["About 87 hours", "About 8 hours 46 minutes", "About 52 minutes 35 seconds", "About 5 minutes 15 seconds", "Zero downtime"],
answer: 3,
explain: "Five nines is ~5:15/year; four nines is ~52:35; each extra nine cuts downtime roughly 10x.",
tags: ["availability"]
},
{
type: "mcq",
q: "Where is uptime viewed on Linux and on Windows?",
options: ["uptime command on Linux; Task Manager Performance on Windows", "Task Manager on Linux; uptime on Windows", "BIOS on both", "Cloud console only", "Switch CLI only"],
answer: 0,
explain: "Linux/UNIX uptime prints run time; Windows exposes it under Task Manager Performance.",
tags: ["uptime"]
},
{
type: "match",
q: "Match each resilience term to its meaning.",
pairs: [
{ item: "Fault", match: "One bad component" },
{ item: "Failure", match: "Missed performance level" },
{ item: "Fault tolerance", match: "Keeps serving via alternates" }
],
explain: "The pump leak is the fault; the highway breakdown is the failure; alternate paths give tolerance.",
tags: ["fault-tolerance"]
},
{
type: "mcq",
q: "What is link aggregation also called on Cisco and on Windows?",
options: ["Port aggregation on Cisco; NIC teaming on Windows", "EtherChannel on Windows; teaming on Cisco", "Bonding banned on both", "VLAN on Cisco; VPN on Windows", "Trunking on Windows; tagging on Cisco"],
answer: 0,
explain: "Same concept: one logical link (LAG/bundle/team) from many physical links, with bonding/bundling as generic names.",
tags: ["lag"]
},
{
type: "multi",
q: "Which three gains does a LAG provide?",
options: [
"Increased total throughput",
"Automatic failover",
"Load balancing",
"Single-session speedup",
"Longer max cable distance"
],
answer: [0, 1, 2],
explain: "LAG raises aggregate bandwidth with failover and balancing; one session still rides one member at its own speed.",
tags: ["lag", "benefits"]
},
{
type: "tf",
q: "Link aggregation doubles the speed of a single file transfer.",
answer: false,
explain: "It raises total bandwidth for parallel sessions, not per-session speed, since sessions are not split across members.",
tags: ["lag"]
},
{
type: "mcq",
q: "What must match on every LAG member interface?",
options: ["Hostname only", "Full duplex, speed, VLAN, and MTU", "SSID and passphrase", "Cloud region", "Font size"],
answer: 1,
explain: "Mismatched members get suspended; LACP (802.3ad/802.1AX) coordinates the bundle like DHCP coordinates addressing.",
tags: ["lacp"]
},
{
type: "mcq",
q: "What protocol dynamically coordinates aggregated links?",
options: ["STP", "LACP", "ARP", "DNS", "DHCP"],
answer: 1,
explain: "Link Aggregation Control Protocol negotiates and maintains the bundle.",
tags: ["lacp"]
},
{
type: "mcq",
q: "What does a load balancer do with a VIP?",
options: ["Prints shipping labels", "Accepts traffic for the cluster address and picks a real server", "Assigns DHCP leases", "Encrypts backups", "Extends cable length"],
answer: 1,
explain: "Clients target one VIP; the balancer distributes by algorithm (round-robin, least connections, least response time, weighted).",
tags: ["load-balancer", "vip"]
},
{
type: "match",
q: "Match each balancing algorithm type to its behavior.",
pairs: [
{ item: "Static (round-robin)", match: "Fixed turn order" },
{ item: "Dynamic (least connections)", match: "React to live load" }
],
explain: "Static ignores current load; dynamic (least connections/response time, weighted) follows it.",
tags: ["load-balancing"]
},
{
type: "mcq",
q: "What is clustering?",
options: ["Grouping redundant resources to appear as one device", "Stacking cables neatly", "Encrypting all traffic", "Dividing one server into VMs", "Measuring signal loss"],
answer: 0,
explain: "Server, router, or app clusters front a VIP and usually pair with load balancing and autoscaling groups.",
tags: ["clustering"]
},
{
type: "mcq",
q: "What is a hypervisor?",
options: ["A cable tester", "Software creating and managing VMs and allocating hardware", "A fiber connector", "A routing protocol", "A backup tape"],
answer: 1,
explain: "It partitions CPU, disk, memory, and NICs among guests that each run their own OS.",
tags: ["hypervisor"]
},
{
type: "match",
q: "Match each hypervisor example to its type.",
pairs: [
{ item: "VMware ESXi", match: "Type 1" },
{ item: "Proxmox VE", match: "Type 1" },
{ item: "VirtualBox", match: "Type 2" },
{ item: "VMware Player", match: "Type 2" }
],
explain: "Type 1 runs before/below any general OS; Type 2 runs as an app inside a host OS.",
tags: ["hypervisor"]
},
{
type: "tf",
q: "Type 2 hypervisors are faster and more secure than Type 1 hypervisors.",
answer: false,
explain: "Type 2 depends on the host OS for resources, so it is slower and less isolated than Type 1.",
tags: ["hypervisor"]
},
{
type: "mcq",
q: "Why are Hyper-V and KVM special?",
options: ["They cannot run VMs", "Hyper-V hides a Type 1 layer under Windows; KVM converts Linux into Type 1", "They are only games", "They replace DNS", "They are cable types"],
answer: 1,
explain: "Both look hosted but actually virtualize beneath the existing OS with privileged host access.",
tags: ["hyper-v", "kvm"]
},
{
type: "mcq",
q: "What are vNICs and vSwitches?",
options: ["Physical WAN links", "Virtual NICs per VM and hypervisor Layer 2 software joining them", "Cloud bills", "Fiber tools", "Routing protocols"],
answer: 1,
explain: "Each VM can hold several auto-MACed vNICs (VirtualBox allows eight); the vSwitch/bridge links them to LANs.",
tags: ["vnic", "vswitch"]
},
{
type: "mcq",
q: "In bridged mode, where does the VM get its IP?",
options: ["From the physical LAN DHCP server as its own address", "Hardcoded to 127.0.0.1", "From the host private pool only", "It gets no IP", "From a VPN tunnel"],
answer: 0,
explain: "Bridged vNICs ride the host NIC but address independently (e.g. host .131, guests .132, .133), visible as LAN peers.",
tags: ["bridged"]
},
{
type: "mcq",
q: "Which VM mode is default in VirtualBox and VMware Player?",
options: ["Bridged", "NAT", "Host-only", "Disabled", "Trunk"],
answer: 1,
explain: "NAT hides guests behind the host (e.g. 10.1.1.x behind 192.168.1.131); Hyper-V builds it as an internal NAT switch.",
tags: ["nat"]
},
{
type: "mcq",
q: "Which VM mode isolates guests from the whole physical LAN?",
options: ["Bridged", "NAT with port forward", "Host-only", "Trunk", "Mirror"],
answer: 2,
explain: "Host-only reaches other guests and the host via host DHCP, never beyond; VirtualBox Internal goes further and hides guests even from the host.",
tags: ["host-only"]
},
{
type: "match",
q: "Match each VM mode to its best use.",
pairs: [
{ item: "Bridged", match: "Reachable servers at static IPs" },
{ item: "NAT", match: "Hidden test workstations" },
{ item: "Host-only", match: "Isolated labs, untrusted images" }
],
explain: "Expose servers bridged, hide test beds behind NAT, fully isolate risky or OS-mismatch work host-only.",
tags: ["vm-modes"]
},
{
type: "multi",
q: "Which are virtualization benefits?",
options: [
"Efficient resource use",
"Cost and energy savings",
"Fault and threat isolation",
"Simple backup, recovery, and cloning",
"Increased complexity",
"Single point of failure"
],
answer: [0, 1, 2, 3],
explain: "The first four help; the last two are complications, alongside contention, overhead, and licensing costs.",
tags: ["virtualization", "benefits"]
},
{
type: "multi",
q: "Which are virtualization complications?",
options: [
"Contended performance and overhead",
"Management complexity and VM sprawl",
"Per-VM licensing cost",
"Host failure kills all guests",
"Free unlimited licenses"
],
answer: [0, 1, 2, 3],
explain: "Critical real-time systems (hospital, factory controls) should not share; design with clustering and failover.",
tags: ["virtualization", "drawbacks"]
},
{
type: "mcq",
q: "What is NFV?",
options: ["A new fiber type", "Replacing physical appliances with virtual ones on shared servers", "A Wi-Fi standard", "A backup tape format", "A cable tester"],
answer: 1,
explain: "Virtual firewall plus virtual router on one cheap Type 1 host replaces two expensive boxes, with fast migration and scaling.",
tags: ["nfv"]
},
{
type: "mcq",
q: "Which is a virtual firewall example?",
options: ["pfSense by Netgate", "Unshielded twisted pair", "Spanning tree", "Thin client", "Patch panel"],
answer: 0,
explain: "pfSense and Barracuda CloudGen emulate hardware firewalls under a (usually Type 1) hypervisor; software firewalls like Windows Firewall are single-client apps.",
tags: ["nfv", "firewall"]
},
{
type: "mcq",
q: "What is the core of SDN?",
options: ["Each device decides alone", "A controller centralizes decisions in software", "Remove all virtualization", "Use only unmanaged switches", "Disable all APIs"],
answer: 1,
explain: "The SDN controller sees the whole net, pushes policy to physical and virtual gear from one dashboard, even adapting via DPI insight.",
tags: ["sdn"]
},
{
type: "match",
q: "Match each SDN plane to its role.",
pairs: [
{ item: "Infrastructure (data)", match: "Forwards frames, the brawn" },
{ item: "Control", match: "Decides paths, the brain" },
{ item: "Application", match: "Apps talk via APIs" },
{ item: "Management", match: "Admin monitor via SSH/SNMP" }
],
explain: "Data moves bits; control (MAC tables, STP) moves to the controller; apps use APIs; management uses SSH, Telnet, SNMP, HTTP.",
tags: ["sdn", "planes"]
},
{
type: "match",
q: "Match each SDN interface to what it joins.",
pairs: [
{ item: "Southbound (SBI)", match: "Controller to devices" },
{ item: "Northbound (NBI)", match: "Controller to apps" }
],
explain: "SBI (e.g. OpenFlow) programs gear; NBI APIs serve browsers, VoIP, DNS, and analytics.",
tags: ["sdn", "sbi", "nbi"]
},
{
type: "mcq",
q: "What are white-box switches in SDN?",
options: ["Low-intelligence cheap devices under central control", "Switches painted white", "Core fiber tools", "Encrypted USB keys", "Paper manuals"],
answer: 0,
explain: "Central smarts let plain hardware forward while the controller writes complex conditional rules across vendors.",
tags: ["sdn", "white-box"]
},
{
type: "multi",
q: "Which are the five NIST cloud characteristics?",
options: [
"On-demand self-service",
"Broad network access",
"Resource pooling",
"Measured service",
"Rapid elasticity",
"Unlimited free hardware"
],
answer: [0, 1, 2, 3, 4],
explain: "Anytime service, any device or OS, pooled multitenant resources, metered billing, and fast auto scaling define cloud.",
tags: ["cloud", "characteristics"]
},
{
type: "mcq",
q: "A site auto-adds VMs at a traffic burst then removes them after. What is this?",
options: ["Multitenancy", "Elasticity", "Uptime", "Attenuation", "Crosstalk"],
answer: 1,
explain: "Elasticity is rapid dynamic scaling; scalability is the underlying ability to grow without breaking.",
tags: ["elasticity"]
},
{
type: "match",
q: "Match each service model to who manages the OS.",
pairs: [
{ item: "IaaS (EC2)", match: "Customer manages OS" },
{ item: "PaaS (Lambda/containers)", match: "Vendor manages OS" },
{ item: "SaaS (Gmail, Office 365)", match: "Vendor manages all but data" }
],
explain: "Responsibility shifts upward: IaaS keeps OS/apps/data with you; PaaS keeps apps/data; SaaS keeps only data and access with you.",
tags: ["iaas", "paas", "saas"]
},
{
type: "mcq",
q: "Developers run code without building server environments. Which model?",
options: ["On-prem", "IaaS", "PaaS", "Coax", "STP"],
answer: 2,
explain: "PaaS/FaaS (GCP, Lambda) supplies OS, runtimes, containers, and serverless execution for build and test.",
tags: ["paas"]
},
{
type: "mcq",
q: "What are DaaS and XaaS?",
options: ["Cable categories", "DaaS is browser virtual desktops; XaaS is any mix the client needs", "Routing protocols", "Switch port states", "STP timers"],
answer: 1,
explain: "DaaS extends VDI from the CSP; XaaS generalizes to monitoring, storage, apps, and desktops.",
tags: ["daas", "xaas"]
},
{
type: "mcq",
q: "Which deployment model shares resources among hospitals but not the public?",
options: ["Public cloud", "Private cloud", "Community cloud", "On-prem only", "Multicloud tunnel"],
answer: 2,
explain: "Community clouds serve orgs with common needs (e.g. regional medical data), hosted internally or by a third party.",
tags: ["community-cloud"]
},
{
type: "mcq",
q: "A firm keeps data private but uses public email, integrated across two CSPs. What models?",
options: ["Hybrid and multicloud", "Only public", "Only private", "Only community", "No cloud"],
answer: 0,
explain: "Public plus private is hybrid; integrated best-of-breed across providers is multicloud (mere separate accounts do not count).",
tags: ["hybrid", "multicloud"]
},
{
type: "match",
q: "Match each cloud access method to its user.",
pairs: [
{ item: "GUI portal", match: "Beginners clicking" },
{ item: "CLI", match: "Admins typing" },
{ item: "SDK", match: "Developers coding" },
{ item: "API", match: "Apps calling" }
],
explain: "Portal wizards, Terminal/PowerShell commands, language SDKs, and machine-to-machine APIs cover every audience.",
tags: ["cloud", "management"]
},
{
type: "match",
q: "Match each cloud service category to its example.",
pairs: [
{ item: "Compute", match: "VMs, Lambda" },
{ item: "Networking", match: "Routing, DNS, firewalls" },
{ item: "Storage", match: "Tiered durable data" },
{ item: "Security", match: "Protection services" }
],
explain: "Azure/AWS organize dozens of services under these purpose groups.",
tags: ["cloud", "services"]
},
{
type: "mcq",
q: "S3 lists eleven nines durability but four nines availability. What does that mean?",
options: ["Data is lost often but reachable", "Data almost never lost, yet briefly unreachable ~52.6 min/year", "Both mean the same outage", "Durability counts speed", "Availability counts storage size"],
answer: 1,
explain: "Durability is continued existence via multi-device multi-site copies; availability is current reachability. Reliability is error-free running; resiliency is recovery.",
tags: ["durability", "availability"]
},
{
type: "mcq",
q: "What is IaC?",
options: ["A cable type", "Managing infrastructure through code files in JSON, Python, or YAML", "A routing protocol", "A switch vendor", "A Wi-Fi band"],
answer: 1,
explain: "Scripts replace one-off CLI typing, tracking who changed what and allowing reverts and event-driven automation.",
tags: ["iac"]
},
{
type: "mcq",
q: "What is orchestration and what defines its task order?",
options: [" Single commands; DNS defines order", "Chained automated workflows; a playbook/template defines order", "Manual clicks; email defines order", "Cable runs; floor plans define order", "Backups; tapes define order"],
answer: 1,
explain: "Example: a CloudFormation JSON template deploying web server, database, and security for a WordPress blog in sequence.",
tags: ["orchestration", "playbook"]
},
{
type: "multi",
q: "Which are automation and orchestration benefits?",
options: [
"Responsiveness and agility",
"Control over configuration drift",
"Lower cost and less staff time",
"Higher security via fewer errors",
"Repeatability from reusable code"
],
answer: [0, 1, 2, 3, 4],
explain: "All five: fast adaptation, enforced baselines, savings, fewer misconfigurations, and contractor-grade reusable templates.",
tags: ["automation", "benefits"]
},
{
type: "match",
q: "Match each source-control term to its meaning.",
pairs: [
{ item: "Central repository", match: "Authoritative code, esp. production" },
{ item: "Branch", match: "Dev/test copy" },
{ item: "Commit", match: "Upload into your branch" },
{ item: "Merge", match: "Fold approved work to production" }
],
explain: "Git/GitHub manage concurrent branches; merges create new documented versions for audit and rollback.",
tags: ["source-control"]
},
{
type: "tf",
q: "Developers should merge unfinished work straight to production before lunch.",
answer: false,
explain: "Commit early and often into your branch, test it, then merge only after approval; merging raw work invites conflicts.",
tags: ["source-control", "commit"]
},
{
type: "mcq",
q: "What blocks a merge until fixed in source control?",
options: ["Conflict markers on same-code edits", "Long file names", "Large monitors", "Fast networks", "Clean tests"],
answer: 0,
explain: "The VCS flags overlapping edits or deletions; frequent small commits, self-testing, and communication prevent them.",
tags: ["source-control", "conflicts"]
}
]
});
