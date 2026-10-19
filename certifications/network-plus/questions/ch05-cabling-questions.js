window.ReviewApp.content.register({
type: "questions",
cert: "network-plus",
chapter: "Chapter 5: Cabling",
items: [
{
type: "mcq",
q: "What does frequency measure on network cabling?",
options: ["The number of data bits actually received each second", "The change in signal strength between transmission and arrival", "The delay between data leaving the source and arriving", "The number of channels squeezed into one transceiver", "The number of times per second a signal can change states"],
answer: 4,
explain: "Frequency in MHz or GHz counts signal state changes per second, and a cable maximum frequency affects how quickly data can transfer.",
tags: ["frequency", "transmission"]
},
{
type: "mcq",
q: "What does bandwidth mean when discussing data rates?",
options: ["The relative loss of signal strength during transmission", "The round trip time of a packet to its destination and back", "The theoretical maximum data transmissible per unit of time", "The actual number of bits received across a connection per second", "The oscillation rate of the electromagnetic signal"],
answer: 2,
explain: "Data-rate bandwidth in Mbps or Gbps is the theoretical maximum, considering frequency, distance, and signal-to-noise ratio.",
tags: ["bandwidth", "throughput"]
},
{
type: "mcq",
q: "What does bandwidth mean when discussing frequencies?",
options: ["The full range of available frequencies for an application", "The actual payload delivered after subtracting overhead", "The number of light pulses accepted per second", "The opposition to current flow through a cable", "The variation in packet arrival delay"],
answer: 0,
explain: "Frequency-context bandwidth in Hz, MHz, or GHz is the width of the band up to the maximum frequency.",
tags: ["bandwidth", "frequency"]
},
{
type: "mcq",
q: "What does throughput measure?",
options: ["The range of frequencies available to a signal", "The number of signal state changes per second", "The relative gain applied by an amplifier", "The number of data bits actually received per second", "The theoretical maximum transmittable per unit of time"],
answer: 3,
explain: "Throughput, also called payload rate or effective data rate, counts bits actually received, reflecting real-world delays, noise, and errors.",
tags: ["throughput", "bandwidth"]
},
{
type: "match",
q: "Match each transmission concept to what it describes.",
pairs: [
{ item: "Frequency", match: "How fast the signal oscillates" },
{ item: "Bandwidth", match: "The width of the road" },
{ item: "Throughput", match: "Traffic actually reaching the destination" }
],
explain: "Frequency is the signal rhythm in Hz, bandwidth is the available width, and throughput is the data actually arriving per second.",
tags: ["frequency", "bandwidth", "throughput"]
},
{
type: "mcq",
q: "A connection rated at 3 Mbps consistently delivers less. What best explains the gap?",
options: ["Decibels accumulate and halve the frequency each mile", "Throughput reflects interface delays, noise, errors, and overhead", "Bandwidth counts only successfully acknowledged packets", "Frequency drops whenever more than one user connects", "Modulation strips headers from every transmitted frame"],
answer: 1,
explain: "Advertised bandwidth is a theoretical maximum, while throughput subtracts the realities of interfaces, noise, errors, and frame overhead.",
tags: ["throughput", "bandwidth"]
},
{
type: "mcq",
q: "What does a small b versus a capital B denote in data quantities?",
options: ["Small b means bytes and capital B means bits", "Small b means binary and capital B means broadband", "Small b means bandwidth and capital B means throughput", "Small b means base-10 and capital B means base-2", "Small b means bits and capital B means bytes"],
answer: 4,
explain: "Throughput uses bits per second such as 1 Gbps, while storage uses bytes such as a 1 GB file.",
tags: ["bits", "bytes"]
},
{
type: "mcq",
q: "How does the prefix kilo differ between storage and throughput?",
options: ["Both use 1,024 under IEEE 802.3 standards", "Both use 1,000 under TIA/EIA-568", "Storage uses 1,024 while throughput uses 1,000", "Storage uses 1,000 while throughput uses 1,024", "Storage uses 100 while throughput uses 1,000"],
answer: 2,
explain: "Storage kilo is 2 to the 10th power, or 1,024, while throughput kilo is 10 to the 3rd power, or 1,000.",
tags: ["bits", "throughput"]
},
{
type: "mcq",
q: "How do modulation and encoding raise throughput at the same frequency?",
options: ["By packing more bits into each signal state change", "By widening the cable core to carry more current", "By removing noise from the surrounding environment", "By shortening the cable to reduce propagation delay", "By converting digital signals into light pulses"],
answer: 0,
explain: "Modulation sends data over analog signals and encoding converts data to digital signals, fitting more bits per change, such as 1000 Mbps over a 250 MHz cable.",
tags: ["modulation", "encoding"]
},
{
type: "multi",
q: "Which traffic types require significant throughput?",
options: [
"Videoconferencing",
"Telephone signaling",
"Multimedia streaming",
"Instant messaging",
"Email"
],
answer: [0, 1, 2],
explain: "Videoconferencing, telephone signaling, and multimedia streaming demand significant throughput, while messaging and email need much less.",
tags: ["throughput", "applications"]
},
{
type: "mcq",
q: "Which three factors cause signal degradation?",
options: ["Modulation, encoding, and multiplexing", "Resistance, voltage, and impedance", "Crosstalk, jitter, and reflection", "Noise, attenuation, and latency", "Frequency, bandwidth, and throughput"],
answer: 3,
explain: "Signal degradation is the reduction of signal quality or strength from noise, attenuation, and latency.",
tags: ["signal-degradation", "noise"]
},
{
type: "mcq",
q: "What is a decibel?",
options: ["The count of twisted pairs used for transmission", "A relative measure of signal loss or gain versus transmission", "An absolute measure of data delivered per second", "The number of lanes available on a transmission path", "The time for a packet to travel to a host and back"],
answer: 1,
explain: "Decibels compare signal strength at arrival to strength at transmission, negative for loss and positive for gain.",
tags: ["decibel", "noise"]
},
{
type: "mcq",
q: "A 1,000-watt signal suffers 6 dB of loss. At what power does it arrive?",
options: ["500 watts", "750 watts", "250 watts", "125 watts", "1,000 watts"],
answer: 2,
explain: "Each 3 dB halves power, so 6 dB quarters it: 1,000 to 500 to 250 watts.",
tags: ["decibel", "attenuation"]
},
{
type: "mcq",
q: "Which device is a common source of EMI?",
options: ["Twisted-pair rip cord", "Ceramic ferrule tips", "Fluorescent lights", "Fiber-optic cladding", "Plastic cable sheath"],
answer: 2,
explain: "EMI comes from electrical activity such as motors, power lines, televisions, copiers, fluorescent lights, microwaves, machinery, and thunderstorms.",
tags: ["emi", "noise"]
},
{
type: "mcq",
q: "What is RFI?",
options: ["Electromagnetic interference caused by radio waves", "Crosstalk measured at the far end of a cable", "Loss of signal strength with distance traveled", "Variation in packet arrival delay on a stream", "Resistance to current flow through copper wire"],
answer: 0,
explain: "RFI is radio frequency interference, one type of EMI, such as strong broadcast signals from radio or TV antennas.",
tags: ["rfi", "emi"]
},
{
type: "match",
q: "Match each crosstalk type to where it occurs.",
pairs: [
{ item: "Alien crosstalk", match: "Between two cables" },
{ item: "NEXT", match: "Between pairs near the signal source" },
{ item: "FEXT", match: "Measured at the far end from the source" }
],
explain: "Alien crosses cables, NEXT stays near the source, and FEXT is read at the far end.",
tags: ["crosstalk", "next", "fext"]
},
{
type: "mcq",
q: "What is attenuation, and how is it compensated?",
options: ["Varying packet delay, fixed by prioritizing voice traffic", "Frequency drift over time, fixed by recalibrating oscillators", "Impedance growth with heat, fixed by cooling the cable plant", "Signal strength loss with distance, fixed by regenerating repeaters", "Signal distortion from noise, fixed by adding shielding"],
answer: 3,
explain: "Attenuation is strength loss away from the source, and a repeater regenerates the digital signal in original form without accumulated noise.",
tags: ["attenuation", "repeater"]
},
{
type: "mcq",
q: "What is latency, and how is it commonly measured?",
options: ["Frequency range width, measured in megahertz", "Brief source-to-destination delay, measured as RTT in milliseconds", "Loss of signal strength, measured in decibels", "Varying packet delay, measured as packet delay variation", "Signal interference, measured as signal-to-noise ratio"],
answer: 1,
explain: "Latency is the delay between data leaving and arriving, commonly measured as round trip time for sender to receiver and back.",
tags: ["latency", "rtt"]
},
{
type: "mcq",
q: "Why do modems increase latency far more than switches do?",
options: ["Modems regenerate signals at every port", "Modems operate only at Layer 2 forwarding", "Modems bypass firewall and DNS processing", "Modems eliminate conversion between media types", "Modems modulate both incoming and outgoing signals"],
answer: 4,
explain: "Modems convert signals in both directions, while switches simply repeat them.",
tags: ["latency", "modem"]
},
{
type: "mcq",
q: "What is jitter, and what does it disrupt?",
options: ["Crosstalk between cables that mixes conversations", "Duplicate MAC entries that confuse switch forwarding", "Varying packet delay that stalls streaming voice and video", "Steady signal loss that dims fiber light over distance", "Constant frequency drift that detunes wireless radios"],
answer: 2,
explain: "Jitter, precisely PDV, delivers packets out of order with varying delay, pausing or stalling real-time streams.",
tags: ["jitter", "latency"]
},
{
type: "match",
q: "Match each duplex mode to its example.",
pairs: [
{ item: "Full-duplex", match: "Telephone call with both parties speaking" },
{ item: "Half-duplex", match: "Building intercom with one speaker at a time" },
{ item: "Simplex", match: "Broadcast radio in one direction only" }
],
explain: "Full-duplex goes both ways at once, half-duplex alternates direction, and simplex is one-way only.",
tags: ["duplex", "simplex"]
},
{
type: "mcq",
q: "Two NICs fail to communicate after manual speed and duplex settings. What is the likely cause?",
options: ["A speed and duplex mismatch with the neighbor", "An optical link budget set too high", "A wavelength mismatch on copper pairs", "A split pair passing continuity testing", "A ferrule size incompatible with the jack"],
answer: 0,
explain: "Manually specifying an unsupported speed and duplex instead of Auto Negotiation produces slow or failed transmission.",
tags: ["duplex", "nic"]
},
{
type: "mcq",
q: "How does multiplexing increase data carried in one direction?",
options: ["By regenerating the signal at every switch port", "By twisting wire pairs more tightly together", "By converting electrical signals into light pulses", "By logically dividing the channel into smaller subchannels", "By pairing one wire for transmit and one for receive"],
answer: 3,
explain: "Multiplexing carries multiple simultaneous signals one way over subchannels, while duplexing enables two-way travel.",
tags: ["multiplexing", "duplex"]
},
{
type: "tf",
q: "Bandwidth and throughput are identical measurements.",
answer: false,
explain: "Bandwidth is the theoretical maximum while throughput is the data actually received, always shaped by real-world conditions.",
tags: ["bandwidth", "throughput"]
},
{
type: "tf",
q: "A loss of 3 dB means a signal has lost half its power.",
answer: true,
explain: "The 3 dB rule holds at any power level, such as 10 watts arriving at 5 watts.",
tags: ["decibel", "attenuation"]
},
{
type: "fill",
q: "What unit is round trip time usually measured in?",
answer: "Milliseconds",
accepts: ["ms", "millisecond"],
explain: "RTT, the time for a packet to go from sender to receiver and back, is usually measured in milliseconds.",
tags: ["latency", "rtt"]
},
{
type: "mcq",
q: "What was coaxial cable originally, and where is it still used?",
options: ["Power grid wiring, now building riser spaces", "1980s Ethernet foundation, now cable Internet and TV", "Telephone backbone, now fiber distribution panels", "Data center fabric, now desktop workstation links", "Radio tower feedline, now satellite uplink dishes"],
answer: 1,
explain: "Coax carried the first Ethernet LANs of the 1980s and persists for cable Internet, cable TV, and some multimedia connections.",
tags: ["coaxial", "media"]
},
{
type: "match",
q: "Match each coaxial cable layer to its role.",
pairs: [
{ item: "Core", match: "Carries the electromagnetic signal" },
{ item: "Insulator", match: "Prevents short-circuiting against the shield" },
{ item: "Shielding", match: "Protects against noise and grounds the signal" },
{ item: "Sheath", match: "Protects the cable from physical damage" }
],
explain: "From center outward: core signals, insulator isolates, shielding guards and grounds, sheath armors.",
tags: ["coaxial", "cable-structure"]
},
{
type: "mcq",
q: "What does a larger AWG number indicate about a cable core?",
options: ["A larger core wire diameter", "A higher impedance rating", "A greater number of conductors", "A longer maximum segment length", "A smaller core wire diameter"],
answer: 4,
explain: "AWG refers inversely to conducting core size, so larger AWG means a smaller diameter.",
tags: ["awg", "coaxial"]
},
{
type: "mcq",
q: "Which impedance suits computer networks and CB radio, and which suits TV receivers?",
options: ["75 ohms for both network and receiver uses", "25 ohms for networks, 100 ohms for receivers", "50 ohms for networks, 75 ohms for receivers", "75 ohms for networks, 50 ohms for receivers", "50 ohms for both network and receiver uses"],
answer: 2,
explain: "50 ohms compromises well for computer networks and CB or ham radio, while 75 ohms sustains signals for TVs, satellite boxes, and scanners.",
tags: ["coaxial", "impedance"]
},
{
type: "mcq",
q: "How do RG-59 and RG-6 compare?",
options: ["RG-59 uses thin braid for short video runs, RG-6 uses 18 AWG solid core for broadband", "RG-59 uses 18 AWG solid core for broadband, RG-6 uses thin braid for video", "RG-59 carries fiber light while RG-6 carries copper current", "RG-59 spans 10 km on SMF while RG-6 spans 550 m on MMF", "RG-59 needs LC connectors while RG-6 needs MPO connectors"],
answer: 0,
explain: "RG-59 has a 20 or 22 AWG usually braided core with greater attenuation for short video distribution, while RG-6 has an 18 AWG usually solid core feeding cable Internet and TV.",
tags: ["rg-59", "rg-6"]
},
{
type: "mcq",
q: "How can you visually distinguish a BNC connector from an F-type connector?",
options: ["BNC uses eight pins, F-type uses two pins", "BNC is threaded brass, F-type is smooth plastic", "BNC is rectangular, F-type is square", "BNC has locking tabs for twist-on, F-type has visible threads", "BNC has visible threads, F-type has locking tabs"],
answer: 3,
explain: "BNC pushes in and twists with a bayonet lock, while F-type screws on with obvious threads.",
tags: ["bnc", "f-type"]
},
{
type: "mcq",
q: "Which connector pairing fits CCTV cameras versus cable TV boxes?",
options: ["LC for CCTV, MPO for cable TV", "BNC for CCTV, F-type for cable TV", "F-type for CCTV, BNC for cable TV", "BNC for both CCTV and cable TV", "F-type for both CCTV and cable TV"],
answer: 1,
explain: "BNC serves CCTV, video, test, and RF equipment with fast connect and disconnect, while F-type serves cable and satellite TV plus cable Internet.",
tags: ["bnc", "f-type"]
},
{
type: "mcq",
q: "Why must an F-type connector be made specifically for the RG-6 cable it terminates?",
options: ["So the connector matches the fiber core diameter", "So the connector supports the correct wavelength", "So the connector negotiates duplex automatically", "So the connector grounds the Kevlar strands", "So connector and cable share the same impedance rating"],
answer: 4,
explain: "Mismatched impedance ratings cause data errors and degrade transmission performance.",
tags: ["coaxial", "impedance"]
},
{
type: "mcq",
q: "What makes twinax capable of higher throughput than coax?",
options: ["A wider frequency band allocated by regulators", "Built-in repeaters regenerating each segment", "Two cores cooperating half-duplex inside the cable", "A glass core carrying pulsing laser light", "Four twisted pairs canceling crosstalk"],
answer: 2,
explain: "Twinax holds two conductors that cooperate half-duplex, and newer versions add multiple core pairs for even more data.",
tags: ["twinax", "coaxial"]
},
{
type: "mcq",
q: "A rack needs an ultra-high-speed router-to-switch link under 5 meters. Which cable fits best?",
options: ["Passive twinaxial cable", "RG-59 coaxial cable", "Cat 5e twisted-pair cable", "Cat 3 twisted-pair cable", "RG-6 coaxial cable"],
answer: 0,
explain: "Twinax, or DAC, is the inexpensive short high-speed choice for data center device links, with passive cable covering under about 5 or 7 meters.",
tags: ["twinax", "dac"]
},
{
type: "mcq",
q: "How far can passive versus active twinax reach?",
options: ["Passive up to 30 m, active up to 100 m", "Passive up to 550 m, active up to 5 km", "Passive up to 10 m, active up to 100 m", "Passive under 5 to 7 m, active up to 10 m", "Passive up to 100 m, active up to 550 m"],
answer: 3,
explain: "Passive twinax lacks internal electronics for the shortest runs, while active twinax strengthens signals for slightly longer spans.",
tags: ["twinax", "distance"]
},
{
type: "multi",
q: "Which statement about twinax installation is true?",
options: [
"Twinax spans 100 m at 10 Gbps like Cat 6a",
"Twinax uses glass cores carrying laser light",
"Twinax arrives factory terminated with fixed lengths",
"Passive twinax contains signal-boosting electronics",
"Twinax field joints require a fusion splicer"
],
answer: [2],
explain: "Twinax ships with preinstalled transceivers, so lengths are fixed. It is copper DAC for very short runs, not 100 m links, and passive cable has no internal electronics.",
tags: ["twinax", "dac"]
},
{
type: "mcq",
q: "How do Fast Ethernet and Gigabit Ethernet differ in pair usage?",
options: ["Both use all four pairs but at different voltages", "Fast Ethernet uses two pairs, Gigabit uses all four pairs", "Fast Ethernet uses all four pairs, Gigabit uses two pairs", "Both use a single pair with different modulation", "Fast Ethernet uses fiber strands, Gigabit uses copper"],
answer: 1,
explain: "Fast Ethernet sends on one pair, receives on another, and idles two pairs, while Gigabit and above use all four pairs bidirectionally.",
tags: ["twisted-pair", "ethernet"]
},
{
type: "mcq",
q: "Why are twisted pairs twisted, and what limits the twisting?",
options: ["Twists raise frequency, but tighter twists lower bandwidth", "Twists add conductors, but tighter twists need thicker jackets", "Twists block attenuation, but tighter twists raise crosstalk", "Twists shorten cable runs, but tighter twists raise impedance", "Twists resist crosstalk, but tighter twists raise attenuation"],
answer: 4,
explain: "More twists per foot improve noise resistance at the cost of longer wire and greater attenuation, so makers balance the two. The twists-per-length measure is the twist ratio.",
tags: ["twisted-pair", "twist-ratio"]
},
{
type: "mcq",
q: "What did TIA/EIA-568 establish in 1991?",
options: ["Cisco IOS command modes for routers and switches", "Coaxial impedance ratings for RG-59 and RG-6 cable", "Twisted-pair wiring categories 3, 5, 5e, 6, 6a, 7, 7a, and 8", "Fiber-optic wavelength standards for SMF and MMF", "PoE wattage levels for PSE sourcing and PD devices"],
answer: 2,
explain: "TIA/EIA-568 divides twisted-pair wiring into categories, with Cat 4 existing but rarely used and modern LANs requiring Cat 5e or higher.",
tags: ["tia-eia-568", "categories"]
},
{
type: "match",
q: "Match each twisted-pair category to its rating.",
pairs: [
{ item: "Cat 5e", match: "1 Gbps at 100 m" },
{ item: "Cat 6", match: "10 Gbps to 55 m" },
{ item: "Cat 6a", match: "10 Gbps at 100 m" },
{ item: "Cat 8", match: "25 and 40 Gbps to 30 m" }
],
explain: "Cat 5e is the Gigabit minimum, Cat 6 reaches 10 Gbps only short, Cat 6a holds 10 Gbps to 100 m, and Cat 8 serves short data center runs.",
tags: ["cat5e", "cat6", "cat6a", "cat8"]
},
{
type: "mcq",
q: "Which categories can support Gigabit Ethernet?",
options: ["Cat 5e, Cat 6a, and Cat 7", "Cat 3, Cat 5, and Cat 5e", "Cat 3, Cat 4, and Cat 5", "Cat 5, Cat 6, and Cat 3", "Cat 6, Cat 7a, and Cat 5"],
answer: 0,
explain: "Cat 5e is the preferred Gigabit minimum and higher categories build on it, while Cat 3 handles 10 Mbps and Cat 5 handles 100 Mbps only.",
tags: ["cat5e", "gigabit"]
},
{
type: "mcq",
q: "What is the minimum category for 10-Gigabit Ethernet at 100 meters?",
options: ["Cat 6a", "Cat 7a", "Cat 8", "Cat 5e", "Cat 6"],
answer: 0,
explain: "10GBASE-T needs Cat 6a or Cat 7 at 100 meters, so Cat 6a is the earliest qualifying standard.",
tags: ["cat6a", "10gbase-t"]
},
{
type: "mcq",
q: "What are the frequency ratings of Cat 6a and Cat 8?",
options: ["Cat 6a 2 GHz, Cat 8 500 MHz", "Cat 6a 500 MHz, Cat 8 2 GHz", "Cat 6a 250 MHz, Cat 8 500 MHz", "Cat 6a 100 MHz, Cat 8 350 MHz", "Cat 6a 600 MHz, Cat 8 1000 MHz"],
answer: 1,
explain: "Cat 6a is rated 500 MHz for 10 Gbps at 100 m, while Cat 8 reaches 2 GHz for 25 and 40 Gbps data center runs.",
tags: ["cat6a", "cat8", "frequency"]
},
{
type: "mcq",
q: "Why must STP shielding be grounded?",
options: ["To increase the cable maximum frequency", "To supply PoE wattage to powered devices", "To convert half-duplex links to full-duplex", "To melt fiber tips during fusion splicing", "To enhance protection and prevent reflection issues"],
answer: 4,
explain: "Grounding lets the foil or braided shield block external forces and contain signal energy without reflections.",
tags: ["stp", "shielding"]
},
{
type: "mcq",
q: "How do UTP and STP differ in cost and noise resistance?",
options: ["Both cost the same with equal resistance", "STP costs less but needs no grounding", "UTP costs less but resists noise less well", "UTP costs more and resists noise better", "UTP costs less and resists noise better"],
answer: 2,
explain: "Without extra shielding, UTP is cheaper yet more interference-prone, though twisting and proper installation still help.",
tags: ["utp", "stp"]
},
{
type: "mcq",
q: "Which connectors suit twisted-pair data versus traditional telephones?",
options: ["RJ-45 for data, RJ-11 for telephones", "RJ-11 for data, RJ-45 for telephones", "BNC for data, F-type for telephones", "LC for data, SC for telephones", "MPO for data, ST for telephones"],
answer: 0,
explain: "STP and UTP use larger RJ-45 modular connectors and jacks, while analog phones use smaller RJ-11.",
tags: ["rj-45", "rj-11"]
},
{
type: "mcq",
q: "Where must plenum-grade cable be used instead of riser-rated cable?",
options: ["In outdoor aerial spans between buildings", "In underground waterproof vaults", "Inside sealed fiber distribution panels", "In air-circulation spaces such as attics", "In vertical conduit runs between floors"],
answer: 3,
explain: "Plenum cable has a fire-retardant low-smoke nontoxic jacket for airflow spaces, while thicker riser cable suits vertical non-airflow runs.",
tags: ["plenum", "riser"]
},
{
type: "mcq",
q: "What is the maximum Ethernet segment length for STP and UTP?",
options: ["10,000 m", "100 m", "10 m", "30 m", "550 m"],
answer: 1,
explain: "Both reach 100 m, or 328 feet, on Ethernet from 1 Mbps to 10 Gbps, with shorter runs sometimes needed for top STP ratings.",
tags: ["stp", "utp", "distance"]
},
{
type: "mcq",
q: "A factory floor with heavy machinery needs new Ethernet. Which cable type fits best?",
options: ["UTP for its lower attenuation", "RG-59 for its video distribution", "Zipcord for its duplex strands", "Unrated PVC for its flexibility", "STP for its shielding against EMI"],
answer: 4,
explain: "STP shielding suits high-interference industrial settings despite cost and grounding needs, while UTP suits typical low-interference offices.",
tags: ["stp", "utp"]
},
{
type: "mcq",
q: "How do T568A and T568B differ?",
options: ["They change the core from copper to glass", "They alter the impedance from 50 to 75 ohms", "They swap the orange and green pairs", "They swap the blue and brown pairs", "They reverse all eight wires"],
answer: 2,
explain: "The standards differ only by reversing the orange pair on pins 1 and 2 with the green pair on pins 3 and 6.",
tags: ["t568a", "t568b"]
},
{
type: "mcq",
q: "Patch cables for a federal government office must use which standard, and what color lands on pin 1?",
options: ["T568A with white/green on pin 1", "T568B with white/orange on pin 1", "T568A with solid brown on pin 1", "T568B with solid blue on pin 1", "T568A with solid orange on pin 1"],
answer: 0,
explain: "Federal contracts require T568A for backward compatibility, placing white/green on pin 1.",
tags: ["t568a", "pinout"]
},
{
type: "mcq",
q: "In T568B, which colors land on pins 3 and 6?",
options: ["Solid blue on 3 and white/blue on 6", "White/brown on 3 and solid brown on 6", "Solid orange on 3 and white/green on 6", "White/green on 3 and solid green on 6", "White/orange on 3 and solid orange on 6"],
answer: 3,
explain: "T568B puts white/orange on pin 1, orange on 2, white/green on 3, and green on 6.",
tags: ["t568b", "pinout"]
},
{
type: "mcq",
q: "What defines a straight-through cable, and what does it connect?",
options: ["Untwisted pairs joining patch panels to wall jacks", "Identical ends per one standard, joining unlike devices", "Reversed transmit and receive pairs joining like devices", "Mirrored wires joining computer console ports", "Mixed media standards joining fiber to copper"],
answer: 1,
explain: "Terminating both RJ-45 ends identically lets signals pass straight through between workstation and switch or switch and router.",
tags: ["straight-through", "patch-cable"]
},
{
type: "match",
q: "Match each port type to its behavior.",
pairs: [
{ item: "MDI", match: "Computers and routers send and receive on standard wires" },
{ item: "MDI-X", match: "Switches listen on MDI transmit wires" },
{ item: "Auto-MDI-X", match: "Ports detect termination and adapt signaling" }
],
explain: "MDI and MDI-X complement each other for straight-through links, while auto-MDI-X adapts to either cable.",
tags: ["mdi", "mdi-x"]
},
{
type: "mcq",
q: "When is a crossover cable still needed?",
options: ["Connecting a workstation to a modern switch", "Connecting a switch to a router over fiber", "Powering a camera over a PoE injector", "Joining SMF to MMF at a panel", "Connecting like devices without auto-MDI-X ports"],
answer: 4,
explain: "Crossovers reverse transmit and receive for MDI-to-MDI or MDI-X-to-MDI-X links, though modern autosensing ports usually remove the need.",
tags: ["crossover", "mdi-x"]
},
{
type: "mcq",
q: "How is an Ethernet crossover cable wired?",
options: ["Mirrored 1-to-8 on both ends", "Identical pairs with no twists", "T568A on one end and T568B on the other", "T568A on both ends", "T568B on both ends"],
answer: 2,
explain: "A-to-B ends cross the pairs, while same-standard ends make a straight-through cable.",
tags: ["crossover", "t568a", "t568b"]
},
{
type: "mcq",
q: "How do Fast Ethernet and Gigabit crossovers differ?",
options: ["Fast crosses 2 pairs, Gigabit crosses all 4 pairs", "Fast crosses all 4 pairs, Gigabit crosses 2 pairs", "Fast mirrors all wires, Gigabit crosses 2 pairs", "Both cross only the blue and brown pairs", "Both mirror all eight wires identically"],
answer: 0,
explain: "Fast Ethernet crosses orange with green on pins 1, 2, 3, and 6, while Gigabit crosses every pair on all 8 pins.",
tags: ["crossover", "gigabit"]
},
{
type: "mcq",
q: "Improper termination with TX and RX wires transposed can cause which problem on older devices?",
options: ["Wavelength mismatch on SMF spans", "Alien crosstalk between conduits", "Jitter from packet delay variation", "NEXT from TX/RX reverse", "Optical loss from dirty ferrules"],
answer: 3,
explain: "TX/RX reverse mismatches straight-through or crossover standards, and excess untwisting or damaged insulation also invites NEXT.",
tags: ["tx-rx-reverse", "next"]
},
{
type: "mcq",
q: "How does a rollover cable differ from a crossover cable?",
options: ["It splits one cable into four channels", "It mirrors all wires 1-to-8 for console connections", "It crosses only the orange and green pairs", "It terminates both ends to T568B", "It carries pulsing light instead of current"],
answer: 1,
explain: "Rollover cables reverse every wire as a mirror image to link a computer to a router console port for device configuration.",
tags: ["rollover", "console-cable"]
},
{
type: "mcq",
q: "What is the rip cord used for during termination?",
options: ["Testing continuity across all eight pins", "Grounding the foil shield to the rack", "Polishing the fiber ferrule tip", "Labeling each patch panel port", "Stripping extra sheath beyond a possible nick point"],
answer: 4,
explain: "Pull the inner string through a fresh cut to expose more wire past tool damage, then trim string and sheath.",
tags: ["termination", "rip-cord"]
},
{
type: "multi",
q: "Which measurements apply when seating wires into an RJ-45 plug?",
options: [
"Strip about 1 inch of sheath",
"Trim wires evenly to 1/2 inch",
"Extend sheath about 3/8 inch into the plug",
"Untwist pairs a full 3 inches back",
"Leave the sheath outside the plug entirely"
],
answer: [0, 1, 2],
explain: "Strip 1 inch, trim to half an inch, and seat with three-eighths inch of sheath inside. Long untwists invite crosstalk, and the sheath must enter the plug.",
tags: ["termination", "rj-45"]
},
{
type: "match",
q: "Match each twisted-pair Ethernet standard to its requirement.",
pairs: [
{ item: "100BASE-TX", match: "100 Mbps on 2 pairs" },
{ item: "1000BASE-T", match: "1 Gbps on 4 pairs over Cat 5e" },
{ item: "10GBASE-T", match: "10 Gbps on 4 pairs over Cat 6a" },
{ item: "40GBASE-T", match: "40 Gbps on 4 pairs over Cat 8" }
],
explain: "Pair counts rise from two at Fast Ethernet to four at Gigabit and above, with category minima per speed.",
tags: ["ethernet-standards", "twisted-pair"]
},
{
type: "mcq",
q: "What do 2.5GBASE-T and 5GBASE-T provide?",
options: ["Console access modes on Cisco routers and switches", "PoE wattage tiers for cameras and access points", "Intermediate steps needing Cat 5e and Cat 6 respectively", "Long-range fiber links reaching 10 km on SMF", "Short DAC twinax links under 7 m in racks"],
answer: 2,
explain: "2.5GBASE-T needs Cat 5e or better and 5GBASE-T needs Cat 6 or better, enabling progressive per-device upgrades.",
tags: ["2.5gbase-t", "5gbase-t"]
},
{
type: "mcq",
q: "Why is 100GBASE-T unsuitable for long-distance connections?",
options: ["Its 100 m segment limit", "Its need for fusion splicing", "Its 75-ohm impedance rating", "Its half-duplex twin cores", "Its dependence on WDM transceivers"],
answer: 0,
explain: "Despite fiber-like rates at lower cost than fiber, 100GBASE-T shares the 100 m twisted-pair distance ceiling.",
tags: ["100gbase-t", "distance"]
},
{
type: "mcq",
q: "How do standard PoE and PoE+ differ?",
options: ["PoE runs on fiber, PoE+ runs on twinax", "PoE needs Cat 8, PoE+ needs Cat 3", "PoE powers switches, PoE+ powers routers only", "PoE gives 15.4 W per 802.3af, PoE+ gives 25.5 W per 802.3at", "PoE gives 25.5 W per 802.3at, PoE+ gives 15.4 W per 802.3af"],
answer: 3,
explain: "Standard PoE under 802.3af tops 15.4 watts and PoE+ under 802.3at tops 25.5 watts, both over Cat 5 or better.",
tags: ["poe", "poe-plus"]
},
{
type: "mcq",
q: "In PoE, what are PSE and PD?",
options: ["PSE splices fiber, PD tests copper", "PSE supplies power, PD receives power", "PSE receives power, PD supplies power", "PSE stores data, PD forwards frames", "PSE modulates signals, PD demodulates them"],
answer: 1,
explain: "Power sourcing equipment feeds powered devices such as cameras, access points, and IP phones after verifying capability.",
tags: ["poe", "pse", "pd"]
},
{
type: "mcq",
q: "A PoE switch stops powering some ports after new cameras are added. What is the likely cause?",
options: ["The fiber wavelength is mismatched", "The T568A plugs are backward compatible", "The STP shield is grounded correctly", "The RTT latency dropped too low", "The overall PoE power budget is exceeded"],
answer: 4,
explain: "The budget may be lower than per-port maximum times port count, so overload shuts off ports. Cisco show power inline reveals per-interface demand.",
tags: ["poe", "power-budget"]
},
{
type: "mcq",
q: "How do a PoE injector and splitter work together?",
options: ["The injector tests continuity, the splitter certifies performance", "The injector grounds shielding, the splitter twists pairs", "The injector adds power to data, the splitter separates them", "The injector splits signals, the splitter amplifies them", "The injector converts fiber to copper, the splitter reverses it"],
answer: 2,
explain: "With a non-PoE switch, the injector combines power and data onto one cable and the splitter divides them at a non-PoE device.",
tags: ["poe", "injector", "splitter"]
},
{
type: "tf",
q: "T568A and T568B are functionally very different wiring schemes that cannot be mixed within one cable run.",
answer: false,
explain: "They differ little except the swapped orange and green pairs, and mixing them deliberately on opposite ends is exactly how a crossover cable is made.",
tags: ["t568a", "t568b"]
},
{
type: "tf",
q: "Modern LANs should use Cat 5e or higher wiring.",
answer: true,
explain: "Cat 5e is the minimum required to support Gigabit Ethernet.",
tags: ["cat5e", "categories"]
},
{
type: "fill",
q: "What is the maximum segment length in meters for twisted-pair Ethernet at common speeds?",
answer: "100",
accepts: ["100 m", "100 meters", "328 feet"],
explain: "STP and UTP reach 100 m, or 328 feet, for Ethernet from 1 Mbps to 10 Gbps.",
tags: ["distance", "twisted-pair"]
},
{
type: "fill",
q: "A crossover cable has T568A on one end and what standard on the other end?",
answer: "T568B",
accepts: ["T568-B", "568B", "B"],
explain: "A-to-B ends cross the transmit and receive pairs, while same-standard ends make straight-through cable.",
tags: ["crossover", "t568b"]
},
{
type: "mcq",
q: "How do laser and LED fiber light sources differ in use?",
options: ["Lasers suit extremely long high-throughput runs, LEDs suit shorter links", "Lasers suit short desktop links, LEDs suit long-haul backbones", "Lasers carry copper current while LEDs carry radio waves", "Lasers need no transceiver while LEDs need QSFP+ modules", "Lasers work only on MMF while LEDs work only on SMF"],
answer: 0,
explain: "Intense focused lasers span very long distances, while cool long-lasting LEDs link nearby floors or switch-to-router hops.",
tags: ["fiber", "laser", "led"]
},
{
type: "match",
q: "Match each fiber cable layer to its role.",
pairs: [
{ item: "Core", match: "Carries pulsing light" },
{ item: "Cladding", match: "Reflects light back into the core" },
{ item: "Buffer", match: "Protects cladding and absorbs escaping light" },
{ item: "Kevlar", match: "Prevents stretching and adds protection" }
],
explain: "Light travels the core, cladding reflects it around bends, opaque buffer guards it, and Kevlar strengthens the cable under the sheath.",
tags: ["fiber", "cable-structure"]
},
{
type: "mcq",
q: "How does full-duplex fiber normally use its strands?",
options: ["Four strands bonded into a single channel", "One strand with power plus data combined", "Two strands both transmitting outward", "Two strands, one transmitting each direction", "One strand carrying both directions at once"],
answer: 3,
explain: "A single strand is simplex, so full-duplex needs two, often as zipcord for short server-to-switch runs.",
tags: ["fiber", "zipcord", "duplex"]
},
{
type: "mcq",
q: "What does WDM allow, and what does it require?",
options: ["Simultaneous send and receive on one copper wire pair, needing MDI-X", "Bidirectional traffic per fiber on separate wavelengths, needing BiDi transceivers", "Four channels per transceiver on one copper pair, needing Cat 8 cable", "Power plus data on one cable, needing PSE sourcing gear and PD", "Two voice calls per wire pair, needing analog splitter hardware"],
answer: 1,
explain: "WDM colors each direction differently per fiber, halving fiber needs at a higher transceiver price.",
tags: ["wdm", "bidi"]
},
{
type: "multi",
q: "Which are benefits of fiber over copper cabling?",
options: [
"Extremely high throughput",
"Very high resistance to noise",
"Much longer runs before repeaters",
"Lower installation and equipment cost",
"Quick field repairs with basic tools"
],
answer: [0, 1, 2],
explain: "Fiber wins on throughput, noise immunity, and distance, but costs more to install and equip, and splicing complicates field repair.",
tags: ["fiber", "advantages"]
},
{
type: "mcq",
q: "What primarily limits fiber segment length?",
options: ["Crosstalk between adjacent glass strands", "Latency from modulating light signals", "Impedance mismatch at RJ-45 plugs", "Jitter from packet delay variation", "Optical loss degrading light with distance"],
answer: 4,
explain: "Like a dimming flashlight, light fades with distance and at every connection, worsened by dust or oil from handling.",
tags: ["fiber", "optical-loss"]
},
{
type: "mcq",
q: "How do SMF and MMF cores compare?",
options: ["SMF is 18 AWG, MMF is 26 AWG", "Both use identical 9-micron cores", "SMF is 8 to 10 microns, MMF is 50 or 62.5 microns", "SMF is 50 or 62.5 microns, MMF is 8 to 10 microns", "SMF is 2.5 mm, MMF is 1.25 mm"],
answer: 2,
explain: "SMF narrow core carries one laser path with little reflection, while MMF wide core carries many angled pulses.",
tags: ["smf", "mmf"]
},
{
type: "mcq",
q: "Why does SMF outperform MMF over long distances?",
options: ["Its narrow core keeps light on one path with little dispersion", "Its wide core reflects more light around bends", "Its LED source burns cooler than lasers", "Its plastic cladding conducts electricity", "Its thicker Kevlar prevents all attenuation"],
answer: 0,
explain: "Single-path light barely disperses, giving the highest bandwidths and longest repeater-free distances of any wired medium.",
tags: ["smf", "mmf"]
},
{
type: "mcq",
q: "Which fiber suits the Internet backbone versus a desktop-to-network link?",
options: ["SMF for both backbone and desktop", "MMF for both backbone and desktop", "Twinax for both backbone and desktop", "SMF for the backbone, MMF for the desktop", "MMF for the backbone, SMF for the desktop"],
answer: 3,
explain: "Costly SMF spans the longest highest-bandwidth runs, while cheaper MMF links nearby routers, switches, servers, and workstations.",
tags: ["smf", "mmf"]
},
{
type: "mcq",
q: "What is an FDP, and how are permanent splices made there?",
options: ["A patch panel joining console cables, mirrored pin to pin", "A rack case joining fibers, spliced by melting tips with a fusion splicer", "A wall jack joining copper pairs, punched down with a crimper", "A switch socket joining transceivers, locked with a tab", "A test meter joining light pulses, calibrated to NIST"],
answer: 1,
explain: "The fiber distribution panel converges fiber and ISP terminal gear, with fusion splicers bonding tips so light passes cleanly.",
tags: ["fdp", "fusion-splicer"]
},
{
type: "mcq",
q: "Which tools terminate fiber-optic cable?",
options: ["Cable crimper and tone generator", "Multimeter and continuity tester", "Punchdown block and loopback plug", "Fusion splicer and cable stripper", "Fiber stripper and fiber cleaver"],
answer: 4,
explain: "The stripper removes outer layers and the cleaver slices strands cleanly, in a process more error-sensitive than copper termination.",
tags: ["fiber", "termination"]
},
{
type: "mcq",
q: "What is a ferrule?",
options: ["The string used to strip extra sheath past nicks", "The latch tab locking a transceiver into its socket", "The extended connector tip contacting the jack receptacle", "The glass strand carrying pulsing light signals", "The foil layer shielding twisted copper pairs"],
answer: 2,
explain: "SMF connectors group by ferrule size and shape, while MMF connectors group by fiber count.",
tags: ["fiber", "ferrule"]
},
{
type: "match",
q: "Match each fiber connector to its description.",
pairs: [
{ item: "ST", match: "2.5-mm ferrule, simplex legacy use" },
{ item: "SC", match: "2.5-mm ferrule with full-duplex option" },
{ item: "LC", match: "1.25-mm ferrule for high-density links" },
{ item: "MPO", match: "Multi-fiber push-on for data center backbones" }
],
explain: "ST and SC share the older 2.5-mm size, LC shrinks to 1.25 mm for density, and MPO packs many fibers per ferrule.",
tags: ["fiber", "connectors"]
},
{
type: "mcq",
q: "Which connector provides full-duplex over one ferrule holding two fibers?",
options: ["MT-RJ", "ST", "SC simplex", "BNC", "F-type"],
answer: 0,
explain: "MT-RJ packs two strands per ferrule for MMF switch, router, and desktop links.",
tags: ["mt-rj", "fiber"]
},
{
type: "mcq",
q: "What does hot-swappable mean for transceivers?",
options: ["They require opening the chassis for upgrades", "They work only when the switch is offline", "They cannot be removed once latched", "They can be changed without powering down the switch", "They must be installed before cables are attached"],
answer: 3,
explain: "Transceivers slide into keyed sockets and lock with a tab, upgrading interfaces without downtime, though cables go on after insertion and off before removal.",
tags: ["transceiver", "hot-swappable"]
},
{
type: "match",
q: "Match each transceiver standard to its speed.",
pairs: [
{ item: "SFP", match: "Typically 1 Gbps" },
{ item: "XFP", match: "Up to 10 Gbps" },
{ item: "QSFP", match: "Up to 40 Gbps over four channels" },
{ item: "CFP", match: "Intended for 100 Gbps links" }
],
explain: "SFP covers Gigabit, XFP and SFP+ cover 10-Gigabit class, QSFP quads channels toward 40 Gbps and beyond, and CFP targets 100 Gbps.",
tags: ["sfp", "qsfp", "cfp"]
},
{
type: "mcq",
q: "Which transceiver first squeezed four channels into a single module?",
options: ["GBIC", "QSFP", "SFP", "SFP+", "XFP"],
answer: 1,
explain: "QSFP per 802.3ba reaches 40 Gbps as 4 by 10 Gbps, while later QSFP+ exceeds 40 Gbps toward 400 Gbps.",
tags: ["qsfp", "transceiver"]
},
{
type: "mcq",
q: "A router SFP+ has its own IP address configurable over Telnet. What does that show?",
options: ["All transceivers share the switch MAC table", "SFP+ ports cannot route without a media converter", "Telnet replaces the router operating system", "Management interfaces require MMF cabling", "Some transceivers expose a separate management interface"],
answer: 4,
explain: "Certain transceivers manage ports for speed or protocol independently, such as a 16-Gbps SFP+ with its own address.",
tags: ["transceiver", "management"]
},
{
type: "match",
q: "Match each fiber Ethernet standard to its media and reach.",
pairs: [
{ item: "1000BASE-SX", match: "MMF to about 300 to 550 m" },
{ item: "1000BASE-LX", match: "550 m MMF or 5000 m SMF" },
{ item: "10GBASE-SR", match: "MMF to about 300 to 400 m" },
{ item: "10GBASE-LR", match: "SMF to 10,000 m" }
],
explain: "SX and SR are short MMF standards while LX reaches further and LR spans 10 km on SMF.",
tags: ["fiber", "ethernet-standards"]
},
{
type: "mcq",
q: "A 4,000 m Gigabit Ethernet fiber run is approved. Which fiber mode is required?",
options: ["SFP", "QSFP", "SMF", "MMF", "POF"],
answer: 2,
explain: "1000BASE-LX reaches 5,000 m on SMF but only 550 m on MMF, so the 4,000 m span needs SMF. SFP and QSFP are transceivers, not fiber modes.",
tags: ["smf", "1000base-lx"]
},
{
type: "mcq",
q: "Joining a 50-micron cable to a 62.5-micron cable causes which problem?",
options: ["Fiber type mismatch", "Wavelength mismatch", "TX/RX reverse", "Dirty connectors", "Split pair"],
answer: 0,
explain: "Even same-mode cables mismatch when core widths differ, and SMF-to-MMF joints also fail.",
tags: ["fiber", "mismatch"]
},
{
type: "mcq",
q: "Transmissions optimized for one cable type are sent over another. What is this called?",
options: ["TX/RX reverse", "Reversed pair", "Alien crosstalk", "Wavelength mismatch", "Fiber type match"],
answer: 3,
explain: "SMF, MMF, and plastic fiber use different wavelengths, so crossing them degrades transmission.",
tags: ["fiber", "wavelength"]
},
{
type: "mcq",
q: "What preventive step avoids dirty-connector signal loss on fiber?",
options: ["Splice every connection with a fusion splicer", "Keep protectors on connectors and dust covers on jacks", "Coil excess cable tightly around the rack", "Terminate ends with T568A on both sides", "Calibrate transceivers to NIST each morning"],
answer: 1,
explain: "Even slight dust on fiber connectors causes loss and errors, so cover unused connectors and jacks.",
tags: ["fiber", "connectors"]
},
{
type: "mcq",
q: "What is an optical link budget?",
options: ["The purchase price of fiber versus copper cable", "The count of strands inside an MPO ferrule", "The number of channels in a QSFP module", "The length of sheath stripped for termination", "The calculation of all anticipated dB losses along a connection"],
answer: 4,
explain: "Distance, multiplexing, patches, splices, and connections all consume power budget, and a shortfall causes link loss with poor efficiency and downtime.",
tags: ["fiber", "link-budget"]
},
{
type: "tf",
q: "SMF has a thicker core than MMF.",
answer: false,
explain: "SMF is narrower at 8 to 10 microns against MMF at 50 or 62.5 microns, which is why SMF disperses less.",
tags: ["smf", "mmf"]
},
{
type: "tf",
q: "MMF signals experience more reflection within the core than SMF signals.",
answer: true,
explain: "Many angled MMF pulses reflect more, while SMF single-path light reflects very little.",
tags: ["mmf", "smf"]
},
{
type: "fill",
q: "What is the narrow core diameter range, in microns, of single mode fiber?",
answer: "8 to 10",
accepts: ["8-10", "8 to 10 microns", "8-10 microns"],
explain: "SMF cores measure 8 to 10 microns against 50 or 62.5 microns for MMF.",
tags: ["smf", "fiber"]
},
{
type: "fill",
q: "Which connector packs typically 8, 12, or 24 fibers into high-density data center links?",
answer: "MPO",
accepts: ["MTP", "MPO connector"],
explain: "MPO or MTP multi-fiber push-on connectors serve 10, 40, and 100 Gb backbone connections on MMF or SMF.",
tags: ["mpo", "fiber"]
},
{
type: "mcq",
q: "What do steady, blinking, and red or amber port LEDs indicate?",
options: ["Steady means half-duplex, blinking means full-duplex, colors mean crosstalk", "Steady means attenuation, blinking means latency, colors mean jitter", "Steady means connectivity, blinking means activity, red or amber may mean a problem", "Steady means activity, blinking means connectivity, colors mean speed", "Steady means PoE supplied, blinking means PoE denied, colors mean fiber mode"],
answer: 2,
explain: "LEDs give the first troubleshooting clue before checking NICs and cable seating.",
tags: ["troubleshooting", "led"]
},
{
type: "mcq",
q: "Which part of a toner and probe kit emits the audible tone?",
options: ["Tone locator", "Tone generator", "TDR module", "Remote unit", "Fusion splicer"],
answer: 0,
explain: "The generator or toner issues the signal on the wire, and the locator or probe sounds when it detects that activity.",
tags: ["toner-probe", "tools"]
},
{
type: "mcq",
q: "What can a toner and probe kit NOT determine about a wire?",
options: ["Which patch panel port it reaches", "Where a wall outlet cable ends", "Which wire in a bundle is the traced one", "Whether it is defective or meets IEEE length standards", "Which termination among hundreds is its far end"],
answer: 3,
explain: "Toners locate terminations only and never certify defects or standards compliance.",
tags: ["toner-probe", "tools"]
},
{
type: "multi",
q: "Which tasks suit a multimeter on network cable?",
options: [
"Certify 10GBASE-T throughput ratings",
"Verify conduction by measuring voltage",
"Map pins to TIA/EIA 568 assignments",
"Detect noise via extraneous voltage",
"Measure light power against NIST standards"
],
answer: [1, 3],
explain: "Multimeters read resistance, voltage, and impedance for conduction, noise, faults, and impedance shifts, while certification, wire mapping, and light power belong to performance testers, continuity testers, and the OPM.",
tags: ["multimeter", "tools"]
},
{
type: "mcq",
q: "Missing needed connections, such as a broken wire, is which fault?",
options: ["Wavelength mismatch", "Open circuit", "Short circuit", "Split pair", "Crossed pair"],
answer: 1,
explain: "Opens lack required connections while shorts add unwanted ones like touching exposed wires.",
tags: ["open-circuit", "short-circuit"]
},
{
type: "mcq",
q: "How do the two units of a continuity tester cooperate?",
options: ["Probe sounds on one end, generator listens on the other", "Toner electrifies the port, locator reads the switch", "OTDR flashes light outward, OPM absorbs it inward", "Crimper seats pins first, stripper verifies them after", "Base generates voltage on one end, remote detects it on the other"],
answer: 4,
explain: "The battery base sources voltage and the remote senses arrival, with lights or tones signaling pass or fail.",
tags: ["continuity-tester", "tools"]
},
{
type: "match",
q: "Match each wire map fault to its wiring error.",
pairs: [
{ item: "Reversed pair", match: "Two wires of one pair swapped with each other" },
{ item: "Crossed pair", match: "Two whole pairs swapped with each other" },
{ item: "Split pair", match: "One wire from each of two pairs swapped" }
],
explain: "Reversed swaps within a pair, crossed swaps two pairs, and split mixes wires across pairs, the hardest for simple continuity tests.",
tags: ["wire-map", "continuity-tester"]
},
{
type: "mcq",
q: "Why is a split pair the hardest wire map fault for a simple continuity test?",
options: ["It only affects cable runs longer than 100 m", "It trips the PoE power budget immediately on link-up", "The wiring can still pass basic continuity despite being wrong", "It produces no voltage on any pin at either end", "It requires fiber light pulses to appear on copper"],
answer: 2,
explain: "A split pair such as solid blue swapped with striped brown keeps end-to-end paths while violating pairing.",
tags: ["wire-map", "split-pair"]
},
{
type: "mcq",
q: "What must you do before testing a network cable with a continuity tester?",
options: ["Disconnect it from the network", "Energize it with PoE first", "Attach the tone generator to its port", "Calibrate it to NIST standards", "Heat the jacket to plenum rating"],
answer: 0,
explain: "Continuity testers must never run on live network cable.",
tags: ["continuity-tester", "safety"]
},
{
type: "mcq",
q: "Which tool reveals a tight bend losing light on a fiber run?",
options: ["Tone generator", "Cable crimper", "Wire map adapter", "Visual fault locator", "Multimeter"],
answer: 3,
explain: "The visual fault finder shines a bright laser so damage or overtight bends show where light escapes.",
tags: ["visual-fault-locator", "fiber"]
},
{
type: "multi",
q: "Which measurements can a cable performance tester provide?",
options: [
"Distance to damage or termination",
"Attenuation along the cable",
"NEXT and alien crosstalk",
"Pass or fail per cabling standard",
"Optical power in NIST-traceable units"
],
answer: [0, 1, 2, 3],
explain: "Performance testers add distance, attenuation, crosstalk, impedance, ratings, storage, and graphs beyond continuity. Calibrated optical power belongs to the OPM.",
tags: ["performance-tester", "tools"]
},
{
type: "mcq",
q: "How does a TDR find a bad crimp on copper?",
options: ["By melting the joint and watching light pass", "By analyzing the timing and amplitude of the reflected signal", "By listening for an audible tone at the far end", "By measuring light power against NIST standards", "By comparing wire colors to a printed map"],
answer: 1,
explain: "Defects alter the returning signal, letting the time domain reflectometer pinpoint connectors, bends, shorts, and mismatches.",
tags: ["tdr", "performance-tester"]
},
{
type: "mcq",
q: "How does an OTDR differ from a copper TDR?",
options: ["It measures voltage instead of reflection timing", "It issues an audible tone along the wire", "It tests only live network cables", "It certifies PoE power budgets", "It transmits different-wavelength light and analyzes the return"],
answer: 4,
explain: "Optical TDRs measure fiber length, locate bad splices, breaks, connectors, and bends, and gauge attenuation with light.",
tags: ["otdr", "fiber"]
},
{
type: "mcq",
q: "What is an OPM, and what must be true of it?",
options: ["A fusion splicer aligned to micron cores", "A crimper gauged for RJ-45 pins", "A fiber light meter calibrated to NIST optical power standards", "A copper resistance meter rated for TIA/EIA pinouts", "A tone probe tuned to 850 nm wavelengths"],
answer: 2,
explain: "The optical power meter reads light power on fiber, with room temperature, connection type, and technician skill affecting accuracy.",
tags: ["opm", "fiber"]
},
{
type: "tf",
q: "A tone generator may be used on a wire connected to a network adapter.",
answer: false,
explain: "Its transmitted electricity could damage the device or adapter, so disconnect first.",
tags: ["toner-probe", "safety"]
},
{
type: "tf",
q: "A basic continuity tester certifies cabling against IEEE length and performance standards.",
answer: false,
explain: "Continuity only verifies signal arrival and pairing, while performance testers issue standards ratings.",
tags: ["continuity-tester", "performance-tester"]
},
{
type: "fill",
q: "What reflectometer, abbreviated TDR, locates copper cable faults from signal reflections?",
answer: "Time domain reflectometer",
accepts: ["time-domain reflectometer"],
explain: "A TDR sends a signal and measures its reflection, while fiber testers use the optical version, OTDR.",
tags: ["tdr", "tools"]
},
{
type: "fill",
q: "What meter, abbreviated OPM, measures light power transmitted on a fiber line?",
answer: "Optical power meter",
accepts: ["fiber light meter", "optical power metre"],
explain: "The OPM or fiber light meter must be calibrated to NIST optical power standards.",
tags: ["opm", "fiber"]
}
]
});
