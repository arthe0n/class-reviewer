window.ReviewApp.content.register({
type: "flashcards",
cert: "network-plus",
chapter: "Chapter 7: Network Architecture",
items: [
{
front: "What is network architecture?",
back: "The overall network design: the devices involved, how they are configured, the services implemented to support the network, and how devices are connected.",
tags: ["network-plus", "architecture"]
},
{
front: "What is network abstraction?",
back: "Separating decision-making from hardware, so control can live on another device, in a VM, or as a logical construct rather than on the forwarding hardware itself.",
tags: ["network-plus", "abstraction"]
},
{
front: "What is an unmanaged switch?",
back: "A plug-and-play switch with minimal configuration options and no IP address; inexpensive, limited, used to expand Ethernet ports on a SOHO network.",
tags: ["network-plus", "switch", "unmanaged"]
},
{
front: "What is a managed switch?",
back: "A switch configurable via CLI or web GUI, sometimes in groups, and sometimes assigned an IP address for ongoing management.",
tags: ["network-plus", "switch", "managed"]
},
{
front: "What is a Layer 3 switch?",
back: "A switch that interprets Layer 3 data and routes much like a router, supporting routing protocols; cheaper than routers, built for fast Layer 3 handling on large LANs and backbones.",
tags: ["network-plus", "switch", "layer-3"]
},
{
front: "What is a Layer 4 switch?",
back: "A switch operating at Layers 4 to 7, also called a content or application switch; enables advanced filtering, statistics, and security by reading higher-layer data.",
tags: ["network-plus", "switch", "layer-4"]
},
{
front: "What is CAM and what does the CAM table store?",
back: "Content addressable memory: high-speed memory holding the MAC address table, mapping each MAC address to a physical switch port.",
tags: ["network-plus", "cam", "mac-table"]
},
{
front: "What is a MAC flooding attack?",
back: "The attacker sends many frames with different MAC addresses, filling CAM space so the switch fails open and broadcasts all traffic, which the attacker can then capture.",
tags: ["network-plus", "mac-flooding", "attack"]
},
{
front: "What does administratively down mean on a switch port?",
back: "The port was disabled by an admin or admin configuration and sends nothing until its status is changed.",
tags: ["network-plus", "port-status", "administratively-down"]
},
{
front: "What does error disabled mean on a switch port?",
back: "The port shut itself down automatically due to a problem such as a loopback error, duplex mismatch, or port-security violation.",
tags: ["network-plus", "port-status", "error-disabled"]
},
{
front: "What does suspended mean on a switch port?",
back: "The port is misconfigured relative to its aggregation group; grouped ports must match in speed, duplex, VLAN, and MTU or the odd port is suspended.",
tags: ["network-plus", "port-status", "suspended"]
},
{
front: "Which Cisco commands disable and re-enable a switch port?",
back: "shutdown disables it; no shutdown re-enables it. On Juniper the equivalents are disable and enable.",
tags: ["network-plus", "cisco", "shutdown"]
},
{
front: "What does switchport port-security do?",
back: "A MAC-filtering flood guard on Cisco and Arista access ports; it caps how many MAC addresses may use the port and reacts when a rogue device exceeds the limit.",
tags: ["network-plus", "port-security"]
},
{
front: "What is the default MAC limit with switchport port-security?",
back: "One MAC address per port; the admin can raise it for phones, servers, APs, uplinks, or virtualized hosts.",
tags: ["network-plus", "port-security", "mac-limit"]
},
{
front: "How many MACs should user, phone-plus-PC, server, and uplink ports allow?",
back: "User port 1, phone plus PC 2, server 5 to 10 or more, uplink or AP disabled or a high limit.",
tags: ["network-plus", "port-security", "mac-limit"]
},
{
front: "What are the Juniper equivalents of Cisco port security?",
back: "mac-limit restricts how many MACs the table holds; allowed-mac sets the approved addresses.",
tags: ["network-plus", "juniper", "port-security"]
},
{
front: "What happens on a port-security violation?",
back: "By default the switch shuts the port down; it can instead restrict only the rogue data. Either way it notifies the administrator.",
tags: ["network-plus", "port-security", "violation"]
},
{
front: "What is defense in depth for switch ports?",
back: "Security in layers: port security alone is only a deterrent because MAC spoofing is easy once the approved address is learned.",
tags: ["network-plus", "defense-in-depth"]
},
{
front: "Why add redundant switches, and what risk do they create?",
back: "Redundancy reroutes around failures such as a dead power supply, but parallel paths can form traffic loops.",
tags: ["network-plus", "redundancy", "loops"]
},
{
front: "What is a broadcast storm?",
back: "Unbounded looping broadcasts that flood the network and can cripple or disable it.",
tags: ["network-plus", "broadcast-storm"]
},
{
front: "What is storm control?",
back: "A flood guard on Arista, Juniper, Cisco, and similar devices (storm-control) that samples traffic each second and drops everything over threshold for the rest of the interval.",
tags: ["network-plus", "storm-control"]
},
{
front: "STP vs storm control: preventive or reactive?",
back: "STP is preventive: it blocks looped topology before storms start. Storm control is reactive: it drops excess traffic while a storm is happening.",
tags: ["network-plus", "stp", "storm-control"]
},
{
front: "What is STP and who created it?",
back: "Spanning Tree Protocol, created by Radia Perlman at DEC in 1985 and adopted in IEEE 802.1D (1990); a Layer 2 protocol that blocks loop-forming links.",
tags: ["network-plus", "stp"]
},
{
front: "How does STP pick the root bridge?",
back: "Lowest BID wins: a 2-byte admin-set priority plus the bridge MAC. With equal default priorities, the lowest MAC becomes root. Only one root exists.",
tags: ["network-plus", "stp", "root-bridge"]
},
{
front: "What are root port and designated port in STP?",
back: "Root port (RP): each non-root bridge's one port closest to the root, forwarding upward; its way home. Designated port (DP): the one lowest-cost port per link, forwarding downstream; the boss of that highway.",
tags: ["network-plus", "stp", "root-port", "designated-port"]
},
{
front: "What is the least cost path in STP?",
back: "The most efficient path between a bridge and the root bridge; each bridge keeps exactly one root port on it.",
tags: ["network-plus", "stp", "least-cost-path"]
},
{
front: "What are BPDUs?",
back: "Bridge Protocol Data Units: the messages switches exchange to share STP information and elect roles.",
tags: ["network-plus", "stp", "bpdu"]
},
{
front: "List the five STP port states and their wait times.",
back: "Blocking (20 s, receives BPDUs only), Listening (15 s, sends and receives BPDUs), Learning (15 s, adds MAC learning), Forwarding (permanent, forwards data), Disabled (manual, no participation).",
tags: ["network-plus", "stp", "port-states"]
},
{
front: "Which STP state is the only one that forwards data?",
back: "Forwarding; Learning learns MACs but still does not forward.",
tags: ["network-plus", "stp", "forwarding"]
},
{
front: "What are RSTP, MSTP, TRILL, SPB, and Rapid PVST+?",
back: "RSTP (802.1w) and MSTP (802.1s) fix link failures in milliseconds; TRILL is an IETF multipath link-state protocol; SPB (802.1aq) keeps all paths active and load-shares; Rapid PVST+ is Cisco proprietary per-VLAN STP.",
tags: ["network-plus", "stp", "rstp", "spb"]
},
{
front: "What is a VLAN in one sentence?",
back: "A virtual LAN: like a subnet but operating at Layer 2 instead of Layer 3.",
tags: ["network-plus", "vlan"]
},
{
front: "What are the access, distribution, and core layers?",
back: "Access (edge): workgroup switches to hosts, mostly Layer 2. Distribution (aggregation): redundant multilayer mesh for routing, filtering, and WAN links, mostly Layer 3. Core: fast backbone multilayer switches or routers, minimal filtering, mostly Layer 3.",
tags: ["network-plus", "three-tier", "hierarchical"]
},
{
front: "What is east-west vs north-south traffic?",
back: "East-west stays between peers inside the segment (web server to database). North-south leaves the segment (Internet client to web server).",
tags: ["network-plus", "east-west", "north-south"]
},
{
front: "What is spine-and-leaf (collapsed core) architecture?",
back: "A two-layer design collapsing core and distribution into a spine; every leaf switch meshes to every spine switch, leaves connect hosts. Spine routes at Layer 3, leaves switch at Layer 2 or 3.",
tags: ["network-plus", "spine-leaf"]
},
{
front: "What are ToR, EoR, and MoR switching?",
back: "Top of rack: one leaf switch per rack. End of row: shared leaf switches at the row end. Middle of row: shared switches mid-row. EoR and MoR use fewer switches but more cabling.",
tags: ["network-plus", "tor", "eor"]
},
{
front: "Name five spine-and-leaf benefits over three-tier.",
back: "Better redundancy, lower latency (fewer hops), higher performance via modern multipath protocols, greater scalability, easier inspection of all traffic, and lower hardware cost.",
tags: ["network-plus", "spine-leaf", "benefits"]
},
{
front: "What are availability, high availability, and uptime?",
back: "Availability: how reliably authorized users can reach a resource, as a percentage. High availability: nearly-always-up systems (four nines, five nines). Uptime: duration or percentage of normal operation between failures.",
tags: ["network-plus", "availability", "uptime"]
},
{
front: "What downtime do five nines and four nines allow per year?",
back: "Five nines (99.999%) about 5 minutes 15 seconds; four nines (99.99%) about 52 minutes 35 seconds. Each extra nine divides downtime by roughly ten.",
tags: ["network-plus", "availability", "nines"]
},
{
front: "Which command shows uptime on Linux and where is it on Windows?",
back: "Linux and UNIX: the uptime command. Windows: Task Manager Performance tab.",
tags: ["network-plus", "uptime"]
},
{
front: "What is fault tolerance, and fault vs failure?",
back: "Fault tolerance keeps serving through hardware or software faults via alternate paths. A fault is one bad component (leaking water pump); a failure is the resulting missed performance level (car dead on the highway).",
tags: ["network-plus", "fault-tolerance"]
},
{
front: "What is link aggregation (LAG) and its other names?",
back: "Combining physical links into one logical link: port aggregation on Cisco, NIC teaming on Windows, also bonding, bundling, or EtherChannel. The group is a LAG, bundle, or team.",
tags: ["network-plus", "lag", "link-aggregation"]
},
{
front: "What three benefits does link aggregation provide?",
back: "Higher total throughput, automatic failover between members, and load balancing across them.",
tags: ["network-plus", "lag", "benefits"]
},
{
front: "Does link aggregation make one session faster?",
back: "No: it raises total bandwidth, not single-session speed, since each session normally rides one member link; gains appear when sessions run in parallel on busy networks.",
tags: ["network-plus", "lag"]
},
{
front: "What must match across LAG members, and what coordinates them?",
back: "Full duplex, same speed, VLAN, and MTU on every interface; LACP (802.3ad, now 802.1AX) dynamically coordinates the bundle.",
tags: ["network-plus", "lacp"]
},
{
front: "What is a load balancer and what is clustering?",
back: "A load balancer spreads requests intelligently across a server pool by health and load. Clustering groups redundant servers, routers, or apps so they look like one device, often behind one VIP.",
tags: ["network-plus", "load-balancer", "clustering"]
},
{
front: "What is a VIP?",
back: "A virtual IP address representing a whole cluster; clients target the VIP while the load balancer picks the real server.",
tags: ["network-plus", "vip"]
},
{
front: "What are static vs dynamic load-balancing algorithms?",
back: "Static follows fixed rules such as round-robin regardless of load. Dynamic reacts to conditions, e.g. least connections or least response time, optionally weighted toward stronger servers.",
tags: ["network-plus", "load-balancing"]
},
{
front: "What is virtualization, host, and guest?",
back: "Virtualization is a logical rather than physical version of a resource. The host is the physical machine; each guest is a logical VM that believes it owns its hardware.",
tags: ["network-plus", "virtualization"]
},
{
front: "What is a hypervisor?",
back: "Software that creates and manages VMs and allocates host CPU, disk, memory, and NICs among them.",
tags: ["network-plus", "hypervisor"]
},
{
front: "What is a Type 1 vs Type 2 hypervisor, with examples?",
back: "Type 1 installs before any OS as a minimal OS (VMware ESXi, Hyper-V enabled, Proxmox VE, Citrix Hypervisor, KVM): faster and more secure. Type 2 installs as an app inside a host OS (VirtualBox, VMware Player/Workstation): slower and host-dependent.",
tags: ["network-plus", "hypervisor"]
},
{
front: "Why are Hyper-V and KVM special hypervisor cases?",
back: "Hyper-V looks like an app but drops a virtualization layer under Windows, making it Type 1. KVM turns the host Linux OS itself into a Type 1 hypervisor.",
tags: ["network-plus", "hyper-v", "kvm"]
},
{
front: "What is a vNIC and a vSwitch?",
back: "A vNIC is a VM virtual NIC at the data link layer, auto-assigned a MAC, with several allowed per VM. A vSwitch (bridge) is hypervisor-controlled Layer 2 software joining vNICs to each other and the physical LAN.",
tags: ["network-plus", "vnic", "vswitch"]
},
{
front: "Who uses the vSwitch on Type 1 vs Type 2 hypervisors?",
back: "Type 1: host and guests share the vSwitch. Type 2: only guests use it; the host stays directly on the physical network.",
tags: ["network-plus", "vswitch"]
},
{
front: "What is bridged networking mode?",
back: "The vNIC bridges through the host NIC and gets its own LAN IP, gateway, and mask from the physical DHCP server, appearing as another physical node. Best for servers needing static reachable addresses; most common on Type 1.",
tags: ["network-plus", "bridged"]
},
{
front: "What is NAT networking mode?",
back: "Default in VMware Player, VirtualBox, and KVM (Hyper-V uses an internal NAT switch): VMs take private addresses from the host DHCP pool (e.g. 10.1.1.x behind a 192.168.1.x host) and share the host IP outward. Good for test beds and workstations nobody must reach directly.",
tags: ["network-plus", "nat"]
},
{
front: "What is host-only networking mode?",
back: "VMs talk to each other and the host only, never the physical LAN; addresses come from host virtualization DHCP. Good for isolated test networks or incompatible-OS apps. VirtualBox Internal Network goes further and isolates VMs even from the host.",
tags: ["network-plus", "host-only"]
},
{
front: "Which VM mode gets a LAN IP, and which hides the VM?",
back: "Bridged gets a real LAN IP and is visible. NAT and host-only use hypervisor-private IPs; NAT still reaches out via the host while host-only stays isolated.",
tags: ["network-plus", "vm-modes"]
},
{
front: "Name four virtualization benefits.",
back: "Efficient resource use, cost and energy savings (fewer boxes, thin clients), fault and threat isolation between guests, and easy backup, recovery, replication, and cloning.",
tags: ["network-plus", "virtualization", "benefits"]
},
{
front: "Name four virtualization complications.",
back: "Contended performance plus hypervisor overhead, extra management complexity and VM sprawl, per-VM licensing costs, and one host failure killing all its guests.",
tags: ["network-plus", "virtualization", "drawbacks"]
},
{
front: "What is NFV?",
back: "Network functions virtualization: replacing dedicated appliances (firewall, router, load balancer) with virtual appliances on a cheap Type 1-hosted server, gaining fast migration, efficiency, and easy scaling at the cost of licenses, slight latency, and maintenance-downtime risk.",
tags: ["network-plus", "nfv"]
},
{
front: "What is the core idea of SDN?",
back: "Centralize decisions in software: strip per-device control and hand it to an SDN controller with a bird's-eye view, managed from one dashboard, even auto-adjusting to conditions and app needs.",
tags: ["network-plus", "sdn"]
},
{
front: "What is disaggregation in SDN?",
back: "Splitting device functions into separate planes handled by different layers, so control can move off the box into the controller.",
tags: ["network-plus", "sdn", "disaggregation"]
},
{
front: "What is the infrastructure (data) plane?",
back: "The brawn: physical or virtual switches, routers, firewalls, and balancers that forward frames, matching MACs, NATing, and re-encapsulating. Speaks IP and Ethernet.",
tags: ["network-plus", "sdn", "data-plane"]
},
{
front: "What is the control plane in SDN vs traditional networks?",
back: "The brain: builds MAC tables and optimizes STP paths. Traditionally on each device; in SDN abstracted to the controller, which pushes tables and policies down and analyzes unmatched traffic via APIs like OpenFlow.",
tags: ["network-plus", "sdn", "control-plane"]
},
{
front: "What are the application and management planes?",
back: "Application plane: apps (browser, VoIP, DNS, analytics) talking to the controller via APIs; equals the OSI application layer. Management plane: admin remote control and monitoring via SSH, Telnet, SNMP, HTTP; often counted inside the control plane.",
tags: ["network-plus", "sdn", "application-plane", "management-plane"]
},
{
front: "What are the SDN southbound and northbound interfaces?",
back: "Southbound (SBI): controller to network devices. Northbound (NBI): controller to applications via APIs.",
tags: ["network-plus", "sdn", "sbi", "nbi"]
},
{
front: "Name SDN controller vendors and SDN advantages.",
back: "Commercial VMware, Cisco, HP, IBM, Juniper; open source ODL, ONOS, OpenKilda. Advantages: performance and efficiency, multivendor control from one console, cheap white-box switches, and rich conditional rules, extended to virtual and cloud resources.",
tags: ["network-plus", "sdn", "controller"]
},
{
front: "What are the five NIST cloud characteristics?",
back: "On-demand self-service, broad network access from any device or OS, resource pooling with multitenancy, measured service billing, and rapid elasticity (fast auto scale-out and scale-in).",
tags: ["network-plus", "cloud", "characteristics"]
},
{
front: "What are scalability vs elasticity?",
back: "Scalability: capacity can grow without breaking the workload. Elasticity: it grows and shrinks quickly and automatically with demand.",
tags: ["network-plus", "cloud", "scalability", "elasticity"]
},
{
front: "What is multitenancy and cloud-native?",
back: "Multitenancy: several customers share the same hardware. Cloud-native: designing apps around cloud services such as serverless code and infinitely scalable storage.",
tags: ["network-plus", "cloud", "multitenancy"]
},
{
front: "Who manages what in on-prem, IaaS, PaaS, SaaS?",
back: "On-prem: customer runs everything. IaaS: vendor runs virtualization down through networking; customer owns OS up through data (e.g. EC2). PaaS: vendor adds the OS and runtime; customer owns apps and data (containers, serverless). SaaS: vendor runs everything but user data and access (Gmail, Office 365, Salesforce).",
tags: ["network-plus", "iaas", "paas", "saas"]
},
{
front: "What is XaaS and DaaS?",
back: "XaaS (Anything as a Service): any mix the client needs. DaaS (Desktop as a Service): a SaaS virtual desktop in the browser with OS and apps included.",
tags: ["network-plus", "xaas", "daas"]
},
{
front: "What is the shared responsibility model?",
back: "Provider secures the physical data center while the customer always owns its data; everything between shifts with the service: SaaS needs the least customer skill, PaaS suits developers, IaaS needs skilled architects.",
tags: ["network-plus", "shared-responsibility"]
},
{
front: "What are public, private, community, hybrid, and multicloud?",
back: "Public: open over the Internet. Private: one org, on-prem or dedicated remote. Community: several orgs with shared interests, not public. Hybrid: public plus private for one org. Multicloud: integrated services from multiple CSPs, not merely independent accounts.",
tags: ["network-plus", "cloud", "deployment"]
},
{
front: "How are cloud resources managed: GUI, CLI, SDK, API?",
back: "GUI: browser console for beginners. CLI: typed commands for admins. SDK: language libraries for developers. API: machine-to-machine calls letting apps use cloud resources.",
tags: ["network-plus", "cloud", "management"]
},
{
front: "What are cloud Compute, Networking, Storage, Security categories?",
back: "Compute: VMs, containers, serverless such as Lambda. Networking: virtual routing, subnets, DHCP, DNS, firewalls plus cloud-native constructs. Storage: durable tiered access-controlled data. Security: mature protections for cloud data and services.",
tags: ["network-plus", "cloud", "services"]
},
{
front: "What are availability vs durability (plus reliability and resiliency)?",
back: "Availability: can you reach it now (S3 Standard four nines, ~52.6 min/year down). Durability: does it still exist (S3 eleven nines). Reliability: works without errors. Resiliency: recovers after an outage.",
tags: ["network-plus", "availability", "durability"]
},
{
front: "What are static vs dynamic inventory and pipelines?",
back: "Static inventory never changes; dynamic inventory constantly adapts to scaling and builds. A pipeline is the sequenced path (entries, transitions, exits) for software or data; IaC scripts in JSON, Python, or YAML define cloud resources as code so changes are tracked and reversible.",
tags: ["network-plus", "pipeline", "iac"]
},
{
front: "What are orchestration, playbooks, and automation benefits?",
back: "Orchestration chains automated tasks into long workflows. A playbook (template, e.g. CloudFormation JSON) lists the tasks, resources, and order. Benefits: responsiveness and agility, control over configuration drift, lower cost, better security via fewer errors, and repeatability from reusable code.",
tags: ["network-plus", "orchestration", "playbook"]
},
{
front: "What are central repository, branch, commit, and merge?",
back: "Central repository: authoritative code, especially production. Branch: a dev/test copy. Commit: uploading changes into your branch, often and tested. Merge: folding approved branch changes into production as a new documented version.",
tags: ["network-plus", "source-control", "git"]
},
{
front: "How are source-control conflicts handled?",
back: "The VCS flags same-code edits or deletions with conflict markers blocking the merge; minimize them with small frequent commits, self-testing, and team communication.",
tags: ["network-plus", "source-control", "conflicts"]
},
{
front: "Which Cisco IOS commands secure a switch access port?",
back: "interface selection, switchport mode access, switchport access vlan, switchport port-security with maximum, violation, and sticky options, shutdown and no shutdown, plus show mac address-table, show vlan, show interfaces trunk, show ip interface brief, copy run start, and do show from config mode.",
tags: ["network-plus", "cisco", "port-security"]
}
]
});
