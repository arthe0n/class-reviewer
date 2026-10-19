window.ReviewApp.content.register({
type: "questions",
cert: "network-plus",
chapter: "Chapter 6: Wireless Networking",
items: [
{
type: "mcq",
q: "At which OSI layer do wired and wireless networks begin sharing the same protocols?",
options: ["Layer 1", "Layer 2", "Layer 3", "Layer 5", "Layer 7"],
answer: 2,
explain: "Both use the same Layer 3 and higher protocols such as IP, TCP, and UDP; the atmosphere forces divergence at Layers 1 and 2.",
tags: ["osi", "wireless"]
},
{
type: "mcq",
q: "What frequency span does the FCC define as the wireless spectrum?",
options: ["9 kHz to 300 GHz", "2.4 GHz to 5 GHz only", "88 MHz to 108 MHz only", "1 Hz to 9 kHz", "300 GHz to 3 THz"],
answer: 0,
explain: "The airwaves run from 9 kHz to 300 GHz, with Wi-Fi living in slices of that range.",
tags: ["spectrum", "fcc"]
},
{
type: "match",
q: "Match each Wi-Fi generation to its standard.",
pairs: [
{ item: "Wi-Fi 4", match: "802.11n" },
{ item: "Wi-Fi 5", match: "802.11ac" },
{ item: "Wi-Fi 6/6E", match: "802.11ax" },
{ item: "Wi-Fi 7", match: "802.11be" }
],
explain: "n is 4, ac is 5, ax is 6/6E, be is 7.",
tags: ["wifi-generations"]
},
{
type: "mcq",
q: "Which 802.11 standard was first to use the 6 GHz band?",
options: ["802.11g", "802.11ac", "802.11ax as Wi-Fi 6E", "802.11b", "802.11a"],
answer: 2,
explain: "Wi-Fi 6E extends 802.11ax into the 1,200 MHz-wide 6 GHz range; older standards stop at 2.4 and 5 GHz.",
tags: ["wifi-6e"]
},
{
type: "mcq",
q: "Which standard operates in 2.4 GHz, 5 GHz, and 6 GHz?",
options: ["802.11b", "802.11g", "802.11ac", "802.11ax", "802.11a"],
answer: 3,
explain: "802.11ax spans 2.4 and 5 GHz, plus 6 GHz in its Wi-Fi 6E form.",
tags: ["802-11ax"]
},
{
type: "mcq",
q: "What happens when two wireless devices transmit at once on one frequency?",
options: ["Throughput doubles", "A collision forces retransmission", "Both signals merge cleanly", "The AP shuts down", "Encryption strengthens"],
answer: 1,
explain: "Simultaneous same-frequency transmissions interfere and must be resent, cutting performance.",
tags: ["collision"]
},
{
type: "match",
q: "Match each spread-spectrum technology to its method.",
pairs: [
{ item: "FHSS", match: "Bursts hop frequency to frequency" },
{ item: "DSSS", match: "Chips spread over all frequencies at once" }
],
explain: "Hopping versus spreading: Bluetooth hops, Wi-Fi spreads.",
tags: ["fhss", "dsss"]
},
{
type: "mcq",
q: "Which technology uses FHSS with 79 channels coordinated by a master clock in a piconet?",
options: ["Wi-Fi", "Bluetooth", "Ethernet", "GPS over DSSS", "CDMA"],
answer: 1,
explain: "Bluetooth hops across its 79 channels under the piconet master clock, dodging interference and Wi-Fi collisions.",
tags: ["bluetooth", "fhss"]
},
{
type: "mcq",
q: "What is channel bonding?",
options: ["Fusing adjacent channels into a wider one", "Encrypting the SSID", "Assigning static IPs", "Disabling all but one antenna", "Grounding the AP chassis"],
answer: 0,
explain: "Two 20 MHz channels fuse into 40 MHz (up to 80, 160, or 320 MHz), gaining more than double the throughput by reclaiming guard buffers.",
tags: ["channel-bonding"]
},
{
type: "mcq",
q: "Why is the 5 GHz band better suited to channel bonding than 2.4 GHz?",
options: ["It has more channels and less crowding", "It travels farther", "It needs no antennas", "It ignores all interference", "It uses FHSS"],
answer: 0,
explain: "Roomier and quieter spectrum leaves space to fuse wide channels.",
tags: ["channel-bonding"]
},
{
type: "mcq",
q: "What does OFDMA let an AP do?",
options: ["Slice a channel into per-client slices and serve many at once", "Double the legal transmit power", "Remove the need for antennas", "Encrypt without keys", "Bond all bands into one"],
answer: 0,
explain: "OFDMA carves 20 MHz channels into small allocations such as 2 or 4 MHz and transmits small frames to multiple clients together.",
tags: ["ofdma"]
},
{
type: "match",
q: "Match each 802.11h feature to its job.",
pairs: [
{ item: "DFS", match: "Vacate channels needed by priority users" },
{ item: "TPC", match: "Lower transmit power to limit interference" }
],
explain: "Dynamic Frequency Selection moves channels and notifies clients; Transmit Power Control caps power and announces the limit.",
tags: ["802-11h", "dfs", "tpc"]
},
{
type: "mcq",
q: "To exchange information, two antennas must be tuned to the same what?",
options: ["Radiation pattern", "Frequency", "Range", "Owner", "Color"],
answer: 1,
explain: "Shared frequency (channel) is the precondition; pattern, range, and propagation describe the rest.",
tags: ["antenna", "frequency"]
},
{
type: "match",
q: "Match each antenna type to its use.",
pairs: [
{ item: "Directional", match: "One destination, point-to-point" },
{ item: "Omnidirectional", match: "Many or mobile receivers, all directions" }
],
explain: "Satellite downlinks aim one way; TV, radio, cell towers, and phones spray everywhere.",
tags: ["antenna"]
},
{
type: "mcq",
q: "Two WLANs need a fixed high-volume link 800 feet apart. Which antenna fits?",
options: ["Omnidirectional on both ends", "Directional on both ends", "No antenna", "Random orientation", "Disconnected antenna"],
answer: 1,
explain: "Focused unidirectional energy spans point-to-point gaps up to about 1,000 feet.",
tags: ["antenna", "point-to-point"]
},
{
type: "mcq",
q: "What does an RSSI of -50 dBm indicate?",
options: ["Unusable", "Bare connectivity", "Good, reliable for VoIP and video", "No signal at all", "Hardware failure"],
answer: 2,
explain: "The scale runs -30 excellent, -50 good, -70 acceptable data minimum, -80 basic connectivity, -90 unusable.",
tags: ["rssi"]
},
{
type: "mcq",
q: "Which Linux command checks wireless signal details?",
options: ["iw dev", "format C:", "del ssid", "ping forever", "shutdown now"],
answer: 0,
explain: "iw dev exposes the wireless interface state including signal readings.",
tags: ["rssi", "linux"]
},
{
type: "match",
q: "Match each propagation effect to its cause.",
pairs: [
{ item: "Attenuation", match: "Weakening with distance" },
{ item: "Fading", match: "Energy loss into obstacles" },
{ item: "Interference", match: "Outside electromagnetic noise" },
{ item: "Reflection", match: "Bounce off large flat surfaces" },
{ item: "Scattering", match: "Diffusion off small or rough objects" },
{ item: "Diffraction", match: "Bending around sharp edges" },
{ item: "Refraction", match: "Direction change across media" }
],
explain: "Distance, obstacles, noise, big flats, small roughs, sharp edges, and media crossings cover all seven.",
tags: ["propagation"]
},
{
type: "mcq",
q: "A signal bounces off a metal wall back toward its source. What is this?",
options: ["Refraction", "Reflection", "Diffraction", "Attenuation", "Bonding"],
answer: 1,
explain: "Large flat conductive surfaces reflect wavelengths shorter than their dimensions.",
tags: ["reflection"]
},
{
type: "mcq",
q: "A signal bends around the corner of a wall as secondary waves. What is this?",
options: ["Scattering", "Diffraction", "Reflection", "Fading", "Bonding"],
answer: 1,
explain: "Sharp edges split the wave into secondaries that continue past the obstruction.",
tags: ["diffraction"]
},
{
type: "mcq",
q: "A fish tank weakens a passing Wi-Fi signal through water and glass. What is this?",
options: ["Reflection", "Refraction", "Bonding", "Jamming", "Spoofing"],
answer: 1,
explain: "Crossing media of different densities alters direction, speed, and wavelength.",
tags: ["refraction"]
},
{
type: "tf",
q: "Multipath signals always improve throughput because more copies arrive.",
answer: false,
explain: "Extra paths raise arrival odds but staggered copies misread, forcing correction and retransmits that slow throughput.",
tags: ["multipath"]
},
{
type: "match",
q: "Match each standard to its top speed.",
pairs: [
{ item: "802.11b", match: "11 Mbps" },
{ item: "802.11a/g", match: "54 Mbps" },
{ item: "802.11n", match: "600 Mbps" },
{ item: "802.11ac", match: "About 6.9 Gbps" },
{ item: "802.11ax", match: "About 9.6 Gbps" },
{ item: "802.11be", match: "About 46 Gbps" }
],
explain: "11, 54, 600 Mbps, then 6.9, 9.6, and 46 Gbps across the generations.",
tags: ["802-11", "throughput"]
},
{
type: "mcq",
q: "An old network runs 802.11b and needs cheap compatible speed. Which upgrade fits?",
options: ["802.11a only", "802.11g", "802.11ac only", "Remove all APs", "Switch to token ring"],
answer: 1,
explain: "802.11g stays in affordable 2.4 GHz, lifts speed to 54 Mbps, and keeps 802.11b clients working.",
tags: ["802-11g"]
},
{
type: "mcq",
q: "A stadium needs top speed for thousands of simultaneous clients and IoT devices. Which standard fits?",
options: ["802.11b", "802.11a", "802.11g", "802.11ax", "802.11 dial-up"],
answer: 3,
explain: "Wi-Fi 6 brings better modulation, multiuser handling, BSS coloring, and dense-client capacity; 6E adds 6 GHz room.",
tags: ["802-11ax"]
},
{
type: "tf",
q: "Rated range guarantees the same reach in every building.",
answer: false,
explain: "Antenna power, barriers, and interference move real reach above or below the rating, so saturation matters more.",
tags: ["range"]
},
{
type: "match",
q: "Match each 802.11 frame group to its example.",
pairs: [
{ item: "Management", match: "Probe and beacon" },
{ item: "Control", match: "ACK and RTS/CTS" },
{ item: "Data", match: "Payload between nodes" }
],
explain: "Association, medium access, and carriage split the three groups.",
tags: ["frames"]
},
{
type: "mcq",
q: "What addresses does an 802.11 frame carry that an 802.3 frame does not?",
options: ["Source and destination", "Transmitter and receiver", "IP source and IP destination", "VLAN tags only", "No addresses at all"],
answer: 1,
explain: "802.11 holds four addresses (source, transmitter, receiver, destination); Ethernet II holds two (source, destination).",
tags: ["frames"]
},
{
type: "mcq",
q: "What is the Sequence Control field for?",
options: ["Encrypting the payload", "Showing how a large packet is fragmented", "Assigning IP addresses", "Choosing the SSID", "Setting transmit power"],
answer: 1,
explain: "It subdivides big packets into smaller ones for reliable delivery.",
tags: ["sequence-control"]
},
{
type: "match",
q: "Match each job to its layer in 802.11 versus wired TCP/IP.",
pairs: [
{ item: "Error checking in 802.11", match: "MAC sublayer" },
{ item: "Fragmentation in 802.11", match: "MAC sublayer" },
{ item: "Error checking in wired TCP/IP", match: "Transport layer" },
{ item: "Fragmentation in wired TCP/IP", match: "Network layer" }
],
explain: "Wireless keeps both at data-link MAC for transparent 802.3 integration; wired splits them higher.",
tags: ["mac-sublayer"]
},
{
type: "mcq",
q: "Which access method do 802.11 networks use?",
options: ["CSMA/CD", "CSMA/CA", "Token passing", "Round robin switching", "Pure ALOHA"],
answer: 1,
explain: "Collision Avoidance: radios cannot duplex or detect their own collisions, so they avoid, send, and demand ACKs.",
tags: ["csma-ca"]
},
{
type: "mcq",
q: "A source hears silence, pauses randomly, sends, and gets an ACK. What just happened?",
options: ["A failed CSMA/CA round", "A successful CSMA/CA exchange", "An RTS storm", "A DHCP lease", "A VLAN trunk"],
answer: 1,
explain: "Listen, random wait, transmit, ACK: the textbook success path; missing ACKs restart the cycle.",
tags: ["csma-ca"]
},
{
type: "mcq",
q: "Why does a 1 Gbps Wi-Fi link move less data than a 1 Gbps Ethernet link?",
options: ["Wi-Fi frames are shorter", "ACK overhead consumes airtime", "Ethernet has more addresses", "Wi-Fi scans constantly", "Ethernet ignores errors"],
answer: 1,
explain: "Per-transmission acknowledgments tax throughput that wired full-duplex switching keeps.",
tags: ["ack", "throughput"]
},
{
type: "mcq",
q: "Two distant clients cannot hear each other and keep colliding at the AP. What is this, and what helps large packets?",
options: ["Near-far effect; raise power", "Hidden node problem; RTS/CTS", "Rogue AP; WPS", "Band steering; OFDMA", "Diffraction; bonding"],
answer: 1,
explain: "Hidden nodes need reservation: RTS asks, CTS silences the cell, and the big packet goes through alone.",
tags: ["hidden-node", "rts-cts"]
},
{
type: "match",
q: "Match each scanning mode to who starts it.",
pairs: [
{ item: "Active scanning", match: "Client sends probes" },
{ item: "Passive scanning", match: "Client listens for beacons" }
],
explain: "Probes go out versus beacons come in; both end in user-consented association with password if set.",
tags: ["scanning"]
},
{
type: "mcq",
q: "What does a beacon frame carry that a client needs to join?",
options: ["Transmission rate and SSID", "DHCP lease", "Web password in cleartext", "VLAN trunk list", "Firmware image"],
answer: 0,
explain: "Beacons advertise rate and the service set identifier; probe responses add status and station ID.",
tags: ["beacon", "ssid"]
},
{
type: "mcq",
q: "Which SSID choice is safest for the Accounting AP?",
options: ["Acctg", "Accounting-Dept-Floor3", "Cisco-WRT300N-default", "River-Conference-Guest", "Finance-password-is-1234"],
answer: 3,
explain: "Disguise purpose, drop vendor and model giveaways, and stay recognizable-but-uncommon so roamers do not misjoin.",
tags: ["ssid"]
},
{
type: "match",
q: "Match each service set to its topology.",
pairs: [
{ item: "IBSS", match: "Ad hoc, no AP" },
{ item: "BSS", match: "Infrastructure, one AP" },
{ item: "ESS", match: "Mesh, multiple APs" }
],
explain: "Independent, basic, and extended sets scale from zero to one to many APs.",
tags: ["ibss", "bss", "ess"]
},
{
type: "match",
q: "Match each identifier to its scope.",
pairs: [
{ item: "BSSID", match: "One AP cell" },
{ item: "ESSID (SSID)", match: "Whole multi-AP ESS" }
],
explain: "One cell versus the roamable whole; practitioners usually just say SSID for both.",
tags: ["bssid", "essid"]
},
{
type: "match",
q: "Match each AP type to its management.",
pairs: [
{ item: "Autonomous AP", match: "Self-managed, small nets" },
{ item: "Lightweight AP", match: "WLC-managed, large nets" }
],
explain: "Standalone versus controller-driven; never mix them on one network.",
tags: ["ap", "wlc"]
},
{
type: "multi",
q: "Which jobs can a wireless LAN controller centralize?",
options: [
"Client authentication",
"Load balancing",
"Channel planning",
"AP failover",
"Rogue AP detection",
"Replacing all cabling"
],
answer: [0, 1, 2, 3, 4],
explain: "Auth, balancing, channels, redundancy, and rogue hunting are WLC work; cable plant stays.",
tags: ["wlc"]
},
{
type: "mcq",
q: "A phone walks between APs under one ESSID without dropping service. What allows this?",
options: ["Roaming with reassociation", "Channel bonding", "WPS PIN", "Static IP", "Disabling the SSID"],
answer: 0,
explain: "Same-ESSID cells plus automatic reassociation (on range exit or error bursts) keep the session alive.",
tags: ["roaming"]
},
{
type: "mcq",
q: "What is band steering?",
options: ["Forcing all clients to 2.4 GHz", "Directing close clients to 5 GHz for speed", "Disabling the 5 GHz radio", "Bonding every channel", "Removing all passwords"],
answer: 1,
explain: "Short-wave 5 GHz wins throughput nearby while long-wave 2.4 GHz wins range; steering answers probes with only the 5 GHz offer, passively at join or actively after.",
tags: ["band-steering"]
},
{
type: "mcq",
q: "A SOHO router links a modem WAN port to wireless clients plus wired LAN ports. What is it?",
options: ["A pure modem", "A wireless router combining AP, switch, routing, and gateway", "A spectrum analyzer", "A RADIUS server", "A patch panel"],
answer: 1,
explain: "The SOHO box fronts the ISP modem on its WAN/Internet port and serves both media inside.",
tags: ["soho"]
},
{
type: "multi",
q: "Which factors guide SOHO AP placement with IoT devices?",
options: [
"Distance to clients and standard limits",
"Obstacle type and count",
"High mounting spots",
"Distance from interference sources"
],
answer: [0, 1, 2, 3],
explain: "Reach, concrete and layout, elevation, and EMI from phones, fluorescents, and microwaves all matter.",
tags: ["ap-placement"]
},
{
type: "mcq",
q: "A three-story concrete bunker needs reliable coverage on every floor. What fits?",
options: ["One low AP in the basement", "One AP per floor", "No APs at all", "Maximum power from one corner", "An outdoor antenna only"],
answer: 1,
explain: "Massive floors block vertical propagation, so each floor gets its own cell.",
tags: ["ap-placement"]
},
{
type: "multi",
q: "Which activities belong in a wireless site survey?",
options: [
"Blueprint study for obstacles and demand",
"Bridging throughput planning",
"Neighbor signal measurement",
"Dummy-AP walk tests",
"Far-corner EMI checks",
"Heat-map dead-zone mapping"
],
answer: [0, 1, 2, 3, 4, 5],
explain: "All six feed the report that sets AP count and placement, built with NetSpot, VisiWave, iBwave, or inSSIDer.",
tags: ["site-survey"]
},
{
type: "mcq",
q: "Which device needs the most throughput: smart doorbell, camera, WLC, or wireless bridge?",
options: ["Smart doorbell", "Security camera", "Wireless LAN controller", "Wireless bridge"],
answer: 3,
explain: "A bridge hauls whole remote segments, dwarfing single IoT streams and thin controller management traffic.",
tags: ["wireless-bridge"]
},
{
type: "mcq",
q: "Why must all enterprise APs share one ESSID?",
options: ["To raise transmit power", "To let clients roam seamlessly", "To disable security", "To use one channel", "To block all guests"],
answer: 1,
explain: "One ESS identity across cells is what makes movement lossless; channels still differ per cell.",
tags: ["essid"]
},
{
type: "match",
q: "Match each SOHO router setting to its note.",
pairs: [
{ item: "Admin password", match: "Guards setup, not the Wi-Fi join" },
{ item: "SSID broadcast", match: "Convenience, not real security" },
{ item: "DHCP on the AP", match: "Skip when another server serves" },
{ item: "Botched config", match: "Pinhole reset to defaults" }
],
explain: "Separate the two passwords, leave beacons on, avoid double DHCP, and know the 30-second reset.",
tags: ["soho"]
},
{
type: "match",
q: "Match each client-management action to its meaning.",
pairs: [
{ item: "Onboarding", match: "Install agent, grant trusted access" },
{ item: "Offboarding", match: "Remove agent, optionally remote wipe" }
],
explain: "Agents gate mail, files, and admin rights with OS and malware checks; wipes erase or brick lost BYOD gear.",
tags: ["byod"]
},
{
type: "mcq",
q: "A lost phone holds schematics. Which offboarding action protects them?",
options: ["Remote wipe", "Trusted access", "OS update scan", "Site survey", "Channel bonding"],
answer: 0,
explain: "Remote wipe clears data, permissions, and apps without touching the device."
tags: ["remote-wipe"]
},
{
type: "mcq",
q: "Why does hiding the SSID fail as real security?",
options: ["Clients cannot use hidden nets", "Probes and sniffers still reveal it", "It disables encryption", "It doubles throughput", "It removes all APs"],
answer: 1,
explain: "Non-broadcast SSIDs still leak in probes and captures; pair real authentication with encryption instead.",
tags: ["ssid"]
},
{
type: "match",
q: "Match each WEP auth mode to its flaw.",
pairs: [
{ item: "OSA", match: "No key, no real auth" },
{ item: "SKA", match: "One static shared key for all" }
],
explain: "Open System Authenticates nothing; Shared Key shares one crackable secret for auth and crypto.",
tags: ["wep"]
},
{
type: "tf",
q: "WEP with a 128-bit key is safe because the key is long.",
answer: false,
explain: "Static shared-key design falls in minutes at any length with no rotation or end-to-end protection.",
tags: ["wep"]
},
{
type: "match",
q: "Match each TKIP improvement to its meaning.",
pairs: [
{ item: "Key distribution", match: "Fresh key per transmission" },
{ item: "Encryption", match: "RC4 wrapping" },
{ item: "Message integrity", match: "Michael packet authentication" }
],
explain: "TKIP was a quick WEP Band-Aid: rotate keys, reuse RC4, add integrity codes; kept only for legacy clients.",
tags: ["tkip"]
},
{
type: "mcq",
q: "Which WPA2 protocol replaced TKIP, and with what cipher?",
options: ["CCMP with AES", "RC4 with WEP", "TKIP with Michael", "PPPoE with CHAP", "IPsec with DES"],
answer: 0,
explain: "Counter Mode with CBC-MAC brings AES speed and strength plus packet authentication.",
tags: ["wpa2", "ccmp"]
},
{
type: "mcq",
q: "Which Wi-Fi encryption standard was designed around AES?",
options: ["WPA", "WPA2", "WEP", "WEP2", "OSA"],
answer: 1,
explain: "CCMP/AES is the WPA2 design; WPA centers on TKIP/RC4 and WEP has no AES.",
tags: ["wpa2", "aes"]
},
{
type: "multi",
q: "Which are touted WPA3 improvements?",
options: [
"No legacy protocols",
"User-chosen passwords",
"SAE mutual handshake",
"128-bit AES minimum in Enterprise",
"Stronger management-frame protection"
],
answer: [0, 1, 2, 3, 4],
explain: "2018 release, mandatory on certified gear since mid-2020, closes the WPA2 capture-and-crack flaw while hardening enterprise auth.",
tags: ["wpa3"]
},
{
type: "mcq",
q: "How does SAE stop WPA2-style password cracking?",
options: ["By removing all passwords", "Both sides authenticate so captures yield no offline-crackable hash", "By broadcasting keys openly", "By shortening all keys", "By disabling the handshake"],
answer: 1,
explain: "Simultaneous Authentication of Equals makes each session mutual, shielding even simple passwords.",
tags: ["sae"]
},
{
type: "match",
q: "Match each WPA login to its style.",
pairs: [
{ item: "Home Wi-Fi password", match: "WPA-Personal (PSK)" },
{ item: "College username plus password", match: "WPA-Enterprise (802.1X/EAP)" }
],
explain: "Shared passphrase versus per-user server credentials; passphrase plus SSID derives per-device keys.",
tags: ["psk", "enterprise"]
},
{
type: "mcq",
q: "What is the core implementation difference between WPA-Personal and WPA-Enterprise?",
options: ["Enterprise needs an authentication server", "Personal needs a RADIUS server", "Enterprise uses no encryption", "Personal uses per-user certificates", "There is no difference"],
answer: 0,
explain: "Enterprise pairs WPA with RADIUS-hosted 802.1X/EAP; Personal shares one PSK with no server.",
tags: ["enterprise", "radius"]
},
{
type: "match",
q: "Match each EAP-era term to its role.",
pairs: [
{ item: "EAP", match: "Auth framework, no crypto itself" },
{ item: "EAPoL", match: "EAP over LANs" },
{ item: "802.1X", match: "Network access-control standard" },
{ item: "PNAC", match: "Port gating until auth passes" },
{ item: "RADIUS", match: "Server deciding auth" }
],
explain: "Framework, transport, standard, gate, and decider stack from client to server.",
tags: ["eap", "radius", "802-1x"]
},
{
type: "mcq",
q: "Which standard adapted EAP to WLANs?",
options: ["802.11g", "802.11i", "802.1X", "802.3", "802.15"],
answer: 2,
explain: "802.1X brought point-to-point EAP onto wired and wireless LANs as EAPoL, now mostly a WLAN control.",
tags: ["802-1x"]
},
{
type: "match",
q: "Match each EAP party to its job.",
pairs: [
{ item: "Supplicant", match: "Requests authentication" },
{ item: "Authenticator", match: "AP or switch starting it" },
{ item: "Authentication server", match: "RADIUS deciding it" }
],
explain: "Client asks, edge device forwards, server judges across repeated challenge rounds after WPA2/3 association.",
tags: ["eap"]
},
{
type: "mcq",
q: "What is the difference between authentication and authorization?",
options: ["Auth signs you in; authz sets what you may do", "They are identical", "Authz signs you in; auth sets permissions", "Neither uses credentials", "Both delete accounts"],
answer: 0,
explain: "All staff may authenticate to the LAN while only admins are authorized to edit accounts.",
tags: ["authentication", "authorization"]
},
{
type: "multi",
q: "Which extra Wi-Fi hardening options are worth enabling?",
options: [
"Centered AP with tuned power",
"Guest network with own SSID",
"Captive portal with terms",
"Client isolation to gateway-only",
"Separate hardened IoT network"
],
answer: [0, 1, 2, 3, 4],
explain: "Placement, isolation, portals, and IoT hygiene layer onto WPA; geofencing adds location gating where available.",
tags: ["hardening"]
},
{
type: "mcq",
q: "A neighbor wants waiting parents online without exposing her files. What fits?",
options: ["WPA3-PSK only", "CSMA/CA", "Guest network", "Band steering", "Higher power"],
answer: 2,
explain: "An isolated guest SSID with its own passphrase and rules serves Internet only, often fronted by a captive portal.",
tags: ["guest-network"]
},
{
type: "mcq",
q: "A guest portal fails on HTTPS with custom DNS and blockers. What workaround helps?",
options: ["First visit a plain HTTP page such as neverssl.com", "Disable all encryption", "Delete the SSID", "Raise power to maximum", "Bond all channels"],
answer: 0,
explain: "Plain HTTP lets the portal intercept and present terms before secure traffic flows.",
tags: ["captive-portal"]
},
{
type: "match",
q: "Match each Wi-Fi threat to its method.",
pairs: [
{ item: "War driving", match: "Hunting open nets by car" },
{ item: "War chalking", match: "Chalk marks flagging open nets" },
{ item: "Evil twin", match: "Rogue AP cloning a legit SSID" },
{ item: "WPS attack", match: "Brute-forcing the setup PIN" }
],
explain: "Drive, mark, impersonate, and guess cover the classic quartet plus WPA handshake capture-and-crack.",
tags: ["threats"]
},
{
type: "mcq",
q: "You almost joined Free Coffee and Internet at a cafe. What trap was it?",
options: ["Interference", "Captive portal", "Brute force", "Evil twin"],
answer: 3,
explain: "Enticing lookalike SSIDs harvest credentials once victims associate.",
tags: ["evil-twin"]
},
{
type: "mcq",
q: "A strong mystery AP broadcasting a phone model sits mid-campus. What do you report?",
options: ["Skimming", "War driving", "Rogue AP", "Hidden node"],
answer: 2,
explain: "Unauthorized APs, which WLCs hunt automatically, are rogue infrastructure regardless of SSID cuteness.",
tags: ["rogue-ap"]
},
{
type: "mcq",
q: "What is skimming?",
options: ["Tuning an antenna", "Planting a reader on a terminal to steal card data", "Bonding channels", "Scanning for dead zones", "Updating firmware"],
answer: 1,
explain: "Skimmers sip magnetic-strip or RFID data for later pickup; RFID variants read inches away, and pocket brushing is electronic pickpocketing.",
tags: ["skimming"]
},
{
type: "match",
q: "Match each analyzer to its view.",
pairs: [
{ item: "Spectrum analyzer", match: "Every frequency present, any source" },
{ item: "Wi-Fi analyzer", match: "Wi-Fi availability, settings, threats" }
],
explain: "Full-band noise hunting versus Wi-Fi tuning; both guide channel picks such as 1, 6, 11.",
tags: ["analyzers"]
},
{
type: "mcq",
q: "Which tool sees non-Wi-Fi interference across a band?",
options: ["Wi-Fi analyzer", "Captive portal", "WLC", "Spectrum analyzer"],
answer: 3,
explain: "Only full-spectrum scans reveal microwaves, phones, and machinery noise behind flaky links.",
tags: ["spectrum-analyzer"]
},
{
type: "multi",
q: "Which faults stop association entirely?",
options: [
"Wrong case-sensitive SSID",
"Encryption mismatch",
"Wrong passphrase",
"Wrong band or standard",
"Roaming credential mismatch"
],
answer: [0, 1, 2, 3, 4],
explain: "Identity, crypto, secret, radio, and roam config each veto the join; edge-of-cell stalls add timing failures.",
tags: ["troubleshooting"]
},
{
type: "mcq",
q: "A client at range edge never finishes joining. What is likely?",
options: ["Stalled association from weak signal", "Correct passphrase", "Perfect roaming", "Strong RSSI", "Idle spectrum"],
answer: 0,
explain: "Missed packets mid-handshake abort association when signal cannot sustain the exchange.",
tags: ["association"]
},
{
type: "mcq",
q: "Low RSSI at the client points to what?",
options: ["Mismatched standards", "Insufficient wireless coverage", "Wrong passphrase", "Crypto mismatch", "VLAN error"],
answer: 1,
explain: "Falling dBm marks distance, blockage, or dead zones; mismatches and secrets fail differently.",
tags: ["rssi"]
},
{
type: "mcq",
q: "A dead zone sits near the AP. Which reading maps its edge?",
options: ["RSSI", "Channel number", "SNR only", "Band label", "SSID length"],
answer: 0,
explain: "Walk the dBm gradient: the falloff line is the dead-zone boundary.",
tags: ["rssi", "dead-zone"]
},
{
type: "multi",
q: "Which faults slow Wi-Fi without killing the join?",
options: [
"Thin coverage with errors",
"Wrong power balance",
"EMI and channel overlap",
"Antenna type or polarization errors",
"AP overcapacity"
],
answer: [0, 1, 2, 3, 4],
explain: "Errors, overlap, misaimed energy, and crowds all tax airtime while association limps along.",
tags: ["troubleshooting"]
},
{
type: "mcq",
q: "Three same-ESSID APs share one channel with overlap and crawl. What fixes it?",
options: ["Add more same-channel APs", "Spread overlapping APs across 1, 6, 11", "Share one channel everywhere", "Disable all SSIDs", "Max all power levels"],
answer: 1,
explain: "One channel means endless deferrals and collisions; non-overlapping channels keep the shared ESSID fast.",
tags: ["channel-overlap"]
},
{
type: "mcq",
q: "A ceiling omnidirectional AP starves floor devices. What helps?",
options: ["Raise it higher", "Swap to aimed unidirectional coverage", "Remove all antennas", "Bond every channel", "Disable security"],
answer: 1,
explain: "Spheres waste energy above the workspace; aimed domes concentrate it on the floor.",
tags: ["antenna"]
},
{
type: "mcq",
q: "A client shows full bars from a far loud AP but cannot send back. What is this?",
options: ["Near-far effect", "Evil twin", "WPS attack", "Diffraction", "Bonding"],
answer: 0,
explain: "Downlink arrives while the weak uplink dies; lower far-AP power or add a nearer cell.",
tags: ["near-far"]
},
{
type: "tf",
q: "A workstation should use wired and wireless simultaneously for double speed.",
answer: false,
explain: "Dual-homing conflicts rather than combines; disable Wi-Fi or unplug Ethernet when troubleshooting.",
tags: ["troubleshooting"]
}
]
});
