window.ReviewApp.content.register({
type: "flashcards",
cert: "network-plus",
chapter: "Chapter 5: Cabling",
items: [
{
front: "What is frequency in network cabling, and how is it measured?",
back: "Frequency is the number of times per second an electrical signal can change states, measured in MHz or GHz. A cable's maximum frequency affects how quickly data can transfer over it.",
tags: ["network-plus", "frequency", "transmission"]
},
{
front: "How do wired signals differ from wireless signals regarding frequency containment?",
back: "Wireless signals must stay within a specific range of the electromagnetic spectrum to avoid interference, while wired signals cover a wide spectrum because the cable itself mostly limits dispersion.",
tags: ["network-plus", "frequency", "cabling"]
},
{
front: "What is bandwidth when discussing data rates, and how is it measured?",
back: "Bandwidth is the amount of data that could theoretically be transmitted per unit of time, measured in Mbps or Gbps. It factors in frequency, distance, and signal-to-noise ratio.",
tags: ["network-plus", "bandwidth", "throughput"]
},
{
front: "What is bandwidth when discussing frequencies?",
back: "Bandwidth identifies the full range of available frequencies for a specific application, measured in Hz, MHz, or GHz. It is the width of the band up to the maximum frequency.",
tags: ["network-plus", "bandwidth", "frequency"]
},
{
front: "What freeway analogy describes bandwidth?",
back: "Bandwidth is the number of lanes on a freeway, or the size of the pipe. Adding lanes lets more cars through per green light, but unused lanes waste resources.",
tags: ["network-plus", "bandwidth", "analogy"]
},
{
front: "What is throughput, and what are its other names?",
back: "Throughput, also called payload rate or effective data rate, is the number of data bits actually received per second, measured in Mbps or Gbps. It reflects real-world conditions like delays, noise, and errors.",
tags: ["network-plus", "throughput", "bandwidth"]
},
{
front: "Why is actual throughput lower than advertised bandwidth?",
back: "Throughput accounts for crossing interfaces, noise, lost data from errors, Ethernet frame overhead, and congestion. A 3 Mbps connection typically delivers less, which is why providers advertise speeds as up to a maximum.",
tags: ["network-plus", "throughput", "bandwidth"]
},
{
front: "How are frequency, bandwidth, and throughput distinguished by unit and meaning?",
back: "Frequency is signal oscillation rate in Hz/MHz/GHz, bandwidth is the range of frequencies or theoretical maximum rate, and throughput is actual data received per second in bps/Mbps/Gbps.",
tags: ["network-plus", "frequency", "bandwidth", "throughput"]
},
{
front: "What does a small b versus a capital B signify in data quantities?",
back: "A small b means bits and a capital B means bytes. Throughput is usually expressed in bits per second, such as 1 Gbps, while storage uses bytes, such as a 1 GB file.",
tags: ["network-plus", "bits", "bytes"]
},
{
front: "How does the prefix kilo differ between data storage and data throughput?",
back: "For storage, kilo means 2 to the 10th power, or 1,024. For throughput, kilo means 10 to the 3rd power, or 1,000. Storage uses powers of 2 and throughput uses powers of 10.",
tags: ["network-plus", "bits", "throughput"]
},
{
front: "How do modulation and encoding increase throughput without changing frequency?",
back: "Modulation sends data over an analog signal and encoding converts data into a digital signal, packing more bits into each signal state change. A 250 MHz cable can thus be rated for 1000 Mbps.",
tags: ["network-plus", "modulation", "encoding"]
},
{
front: "Which applications need significant throughput and which need much less?",
back: "Videoconferencing, telephone signaling, and multimedia streaming need significant throughput, while instant messaging and email require much less.",
tags: ["network-plus", "throughput", "applications"]
},
{
front: "What three factors cause signal degradation?",
back: "Noise, attenuation, and latency reduce signal quality or strength between transmission and reception.",
tags: ["network-plus", "signal-degradation", "noise"]
},
{
front: "What is a decibel, and what does a 3 dB loss mean?",
back: "A decibel is a relative measure of signal loss or gain comparing strength at transmission versus arrival. A loss of 3 dB means the signal lost half its power, so a 10-watt signal arrives at 5 watts.",
tags: ["network-plus", "decibel", "noise"]
},
{
front: "A 1000-watt signal suffers 6 dB of loss. At what power does it arrive?",
back: "It arrives at 250 watts. Each 3 dB of loss halves the power, so 6 dB quarters it: 1000 to 500 to 250 watts.",
tags: ["network-plus", "decibel", "attenuation"]
},
{
front: "What is EMI, and what are common sources of it?",
back: "EMI is electromagnetic interference from electrical activity such as motors, power lines, televisions, copiers, fluorescent lights, microwave ovens, machinery, and severe thunderstorms.",
tags: ["network-plus", "emi", "noise"]
},
{
front: "What is RFI?",
back: "RFI is radio frequency interference, a type of EMI caused by radio waves, such as strong broadcast signals from radio or TV antennas.",
tags: ["network-plus", "rfi", "emi"]
},
{
front: "What is crosstalk, and what is a classic example of it?",
back: "Crosstalk occurs when a signal on one wire infringes on the signal traveling over an adjacent wire. Hearing a second conversation in the background of a landline call is a classic example.",
tags: ["network-plus", "crosstalk", "noise"]
},
{
front: "What are alien crosstalk, NEXT, and FEXT?",
back: "Alien crosstalk occurs between two cables, NEXT is crosstalk between wire pairs near the signal source, and FEXT is crosstalk measured at the far end of the cable from the source.",
tags: ["network-plus", "crosstalk", "next", "fext"]
},
{
front: "What is attenuation, and how does a repeater compensate for it?",
back: "Attenuation is the loss of signal strength as it travels from its source. A repeater regenerates a digital signal in its original form, without the accumulated noise.",
tags: ["network-plus", "attenuation", "repeater"]
},
{
front: "Why does a switch on an Ethernet network act as a multiport repeater?",
back: "Because transmitted bits effectively start over at each switch port, regenerating the signal the way a repeater does.",
tags: ["network-plus", "attenuation", "switch"]
},
{
front: "What is latency, and how is it most commonly measured?",
back: "Latency is the brief delay between data leaving the source and arriving at its destination. It is most commonly measured as RTT, round trip time, in milliseconds.",
tags: ["network-plus", "latency", "rtt"]
},
{
front: "Why do modems add more latency than switches?",
back: "Modems convert, or modulate, both incoming and outgoing signals, while switches simply repeat a signal. Other latency sources include cable length, routers, firewalls, DNS resolution, congestion, and wired-to-wireless conversion.",
tags: ["network-plus", "latency", "modem"]
},
{
front: "What is jitter, and what problems does it cause?",
back: "Jitter, precisely PDV or packet delay variation, is varying delay that lets packets arrive out of order. It makes streaming video or voice pause, jump, or stall, and can trigger transmission errors if data stops arriving in time.",
tags: ["network-plus", "jitter", "latency"]
},
{
front: "How do full-duplex, half-duplex, and simplex differ, with an example of each?",
back: "Full-duplex sends both directions simultaneously, like a telephone call. Half-duplex sends both directions but only one at a time, like a building intercom. Simplex sends one direction only, like broadcast radio.",
tags: ["network-plus", "duplex", "simplex"]
},
{
front: "What happens during a speed and duplex mismatch?",
back: "If a NIC is set to a speed and duplex the neighboring device does not support instead of Auto Negotiation, the result is slow or failed transmission. Modern NICs default to full-duplex.",
tags: ["network-plus", "duplex", "nic"]
},
{
front: "How do duplexing and multiplexing differ?",
back: "Duplexing lets signals travel in both directions at once, while multiplexing lets multiple signals travel simultaneously in one direction by logically dividing the channel into subchannels, increasing data per timespan.",
tags: ["network-plus", "duplex", "multiplexing"]
},
{
front: "What was coaxial cable used for, and what is it still used for?",
back: "Coax was the foundation of 1980s Ethernet networks. It was replaced for computer networks but is still used for cable Internet, cable TV, and some multimedia connections.",
tags: ["network-plus", "coaxial", "media"]
},
{
front: "What are the four layers of a coaxial cable, from center outward?",
back: "The core carries the signal, the plastic insulator prevents short-circuiting against the shield, the braided shielding protects against noise and grounds the signal, and the sheath protects against physical damage.",
tags: ["network-plus", "coaxial", "cabling"]
},
{
front: "What do RG ratings and AWG measure on coaxial cable?",
back: "RG, or radio guide, numbers rate the shielding and core materials, affecting attenuation, throughput, and impedance. AWG refers inversely to core size: a larger AWG means a smaller core diameter.",
tags: ["network-plus", "coaxial", "rg", "awg"]
},
{
front: "Why would you choose 50-ohm versus 75-ohm coaxial cable?",
back: "Lower impedance gives better power transfer, while higher impedance yields less attenuation over distance. 50 ohms suits computer networks and CB or ham radio, while 75 ohms sustains signals for receiving devices like TVs and satellite boxes.",
tags: ["network-plus", "coaxial", "impedance"]
},
{
front: "How do RG-59 and RG-6 differ in core and use?",
back: "RG-59 has a 20 or 22 AWG usually braided core and serves short video-distribution runs, but suffers greater attenuation. RG-6 has an 18 AWG usually solid core and delivers broadband cable Internet and cable TV to the consumer.",
tags: ["network-plus", "coaxial", "rg-59", "rg-6"]
},
{
front: "How do you tell a BNC connector from an F-type connector?",
back: "BNC pushes in and twists with a bayonet lock and metal pin, so remember BNC equals twist. F-type screws on with visible threads and usually uses the cable center wire, so remember F-type equals screw.",
tags: ["network-plus", "bnc", "f-type"]
},
{
front: "Which applications use BNC versus F-type connectors?",
back: "BNC suits CCTV, video equipment, test equipment, and RF gear with fast connect and disconnect. F-type suits cable TV, satellite TV, and cable Internet, secured by tightening the threads.",
tags: ["network-plus", "bnc", "f-type"]
},
{
front: "Why must a coax connector match the cable impedance rating?",
back: "Connectors and cable must share the same impedance rating, such as an RG-6 F-type connector on RG-6 cable. Mismatched impedance causes data errors and degrades transmission performance.",
tags: ["network-plus", "coaxial", "impedance"]
},
{
front: "What is twinaxial cable, and why is it also called DAC?",
back: "Twinax looks like coax but has two cores cooperating half-duplex for much higher throughput. It is called DAC, direct attach copper, as a cheap short high-speed copper option, such as switch to router or server links in a data center.",
tags: ["network-plus", "twinax", "dac"]
},
{
front: "How do passive and active twinax differ in distance?",
back: "Passive twinax has no internal electrical components and spans the shortest distances, under about 5 or 7 meters. Active twinax strengthens signals to reach up to 10 meters.",
tags: ["network-plus", "twinax", "distance"]
},
{
front: "What are the installation facts of twinax regarding termination, speed, and handling?",
back: "Twinax is factory terminated with preinstalled transceivers, so lengths are fixed, and can support up to 100 Gbps with shorter limits at higher rates. Its 26 or 28 AWG copper resists rough handling, and it costs less and uses less power than fiber.",
tags: ["network-plus", "twinax", "transceiver"]
},
{
front: "What is twisted-pair cable, and how many pairs do Fast Ethernet and Gigabit Ethernet use?",
back: "Twisted-pair cable is color-coded insulated copper wire pairs twisted together inside a sheath. Fast Ethernet uses one pair to send, one to receive, and leaves two unused, while Gigabit Ethernet and above use all four pairs bidirectionally.",
tags: ["network-plus", "twisted-pair", "ethernet"]
},
{
front: "Why are the wires in twisted-pair cable twisted, and what is the tradeoff?",
back: "More twists per foot mean more resistance to crosstalk and noise, which is why better cable costs more. But tighter twisting needs longer wire, increasing attenuation, so makers balance the two. The twists-per-length measure is the twist ratio.",
tags: ["network-plus", "twisted-pair", "twist-ratio"]
},
{
front: "What is the TIA/EIA-568 standard, and which categories does it define?",
back: "Finalized in 1991, TIA/EIA-568 specifies twisted-pair wiring in categories 3, 5, 5e, 6, 6a, 7, 7a, and 8. Cat 4 exists but is rarely used, and modern LANs use Cat 5e or higher.",
tags: ["network-plus", "tia-eia-568", "categories"]
},
{
front: "What are the speed, distance, and frequency ratings of Cat 3, Cat 5, and Cat 5e?",
back: "Cat 3 does 10 Mbps at 100 m up to 16 MHz and is obsolete. Cat 5 does 100 Mbps Fast Ethernet at 100 m and 100 MHz. Cat 5e does 1 Gbps at 100 m and 350 MHz with better copper and less crosstalk, the minimum for Gigabit Ethernet.",
tags: ["network-plus", "cat3", "cat5", "cat5e"]
},
{
front: "What are the ratings of Cat 6 and Cat 6a?",
back: "Cat 6 does 1 Gbps at 100 m and 10 Gbps only to 55 m, rated 250 MHz with a plastic core against crosstalk. Cat 6a does 10 Gbps at the full 100 m, rated 500 MHz with reduced attenuation and crosstalk.",
tags: ["network-plus", "cat6", "cat6a"]
},
{
front: "What are the ratings of Cat 7, Cat 7a, and Cat 8?",
back: "Cat 7 does 10 Gbps at 100 m at 600 MHz but needs special connectors. Cat 7a reaches 40 to 100 Gbps over very short runs at 1000 MHz with per-pair plus overall shielding. Cat 8 does 25 and 40 Gbps to 30 m at 2 GHz for data centers, rivaling fiber at short distances.",
tags: ["network-plus", "cat7", "cat8"]
},
{
front: "How do you identify the category of an installed twisted-pair cable?",
back: "Check the information stamped on the cable jacket.",
tags: ["network-plus", "twisted-pair", "categories"]
},
{
front: "What is STP cable, and why must its shielding be grounded?",
back: "STP surrounds insulated twisted pairs with foil or braided copper shielding that blocks external electromagnetic forces and contains internal signal energy. Grounding enhances protection and prevents reflection issues.",
tags: ["network-plus", "stp", "shielding"]
},
{
front: "What determines how effective STP shielding is?",
back: "Effectiveness depends on the volume and type of environmental noise, the thickness and material of the shield, the grounding mechanism, and the symmetry and consistency of the shielding.",
tags: ["network-plus", "stp", "emi"]
},
{
front: "What is UTP cable, and how does it compare with STP on cost and noise?",
back: "UTP is insulated wire pairs in a plastic sheath with no extra shielding. It costs less than STP but resists noise less well, though twisting, balancing, filtering, and proper installation still reduce interference.",
tags: ["network-plus", "utp", "stp"]
},
{
front: "What connectors do STP and UTP use, and what do telephones use instead?",
back: "Both STP and UTP use RJ-45 modular connectors and data jacks. Traditional telephone connections use the smaller RJ-11 instead.",
tags: ["network-plus", "rj-45", "rj-11"]
},
{
front: "What is the difference between plenum-grade and riser-rated cable?",
back: "Plenum-grade cable has a highly fire-retardant, low-smoke nontoxic jacket for air-circulation spaces like attics. Riser-rated cable has a fire-retardant jacket and thicker build for pulling through vertical non-airflow spaces between floors.",
tags: ["network-plus", "plenum", "riser"]
},
{
front: "What is the maximum Ethernet segment length for STP and UTP?",
back: "Both reach up to 100 m, or 328 feet, for Ethernet from 1 Mbps to 10 Gbps, though some STP categories need shorter runs for top rated performance.",
tags: ["network-plus", "stp", "utp", "distance"]
},
{
front: "When should you choose STP over UTP?",
back: "Choose STP for high-interference environments like industrial areas, where shielding and grounding pay off. Choose UTP for typical office, home, and enterprise networks where cost, simplicity, and easy installation matter most.",
tags: ["network-plus", "stp", "utp"]
},
{
front: "What are T568A and T568B, and which is more common?",
back: "They are the two TIA/EIA methods for inserting twisted-pair wires into RJ-45 plugs, differing only by swapping the orange and green pairs. T568B is more common on home and business networks, while the federal government requires T568A for backward compatibility.",
tags: ["network-plus", "t568a", "t568b"]
},
{
front: "In T568B, which colors land on pins 1, 2, 3, and 6?",
back: "Pin 1 is white/orange, pin 2 is solid orange, pin 3 is white/green, and pin 6 is solid green. Pins 4, 5, 7, and 8 are blue, white/blue, white/brown, and brown in both standards.",
tags: ["network-plus", "t568b", "pinout"]
},
{
front: "In T568A, which colors land on pins 1, 2, 3, and 6?",
back: "Pin 1 is white/green, pin 2 is solid green, pin 3 is white/orange, and pin 6 is solid orange. It is exactly the T568B layout with the orange and green pairs swapped.",
tags: ["network-plus", "t568a", "pinout"]
},
{
front: "How do Fast Ethernet and Gigabit Ethernet use the wire pairs differently?",
back: "Fast Ethernet transmits on one pair and receives on another, leaving the blue and brown pairs unused. Gigabit Ethernet uses all four pairs for both sending and receiving, which partly explains its higher bandwidth.",
tags: ["network-plus", "ethernet", "pinout"]
},
{
front: "What is a wire map, and what do Tx and Rx mean on it?",
back: "A wire map, also called a cable map or diagram, illustrates pin numbers and assignments for a termination standard. Tx means transmit and Rx means receive, and standard pinouts are designed to avoid crosstalk.",
tags: ["network-plus", "wire-map", "pinout"]
},
{
front: "What is a straight-through cable, and which devices does it connect?",
back: "A straight-through cable, or patch cable, terminates both RJ-45 ends identically so signals pass straight through. It connects unlike devices such as workstation to switch or switch to router.",
tags: ["network-plus", "straight-through", "patch-cable"]
},
{
front: "What are MDI and MDI-X port configurations?",
back: "Computers and routers use MDI, sending and receiving on the standard wires, while switches use MDI-X, listening on the MDI transmit wires and transmitting on the receive wires. That pairing is why straight-through cables work for unlike devices.",
tags: ["network-plus", "mdi", "mdi-x"]
},
{
front: "What is auto-MDI-X, and does it remove every reason to use the right cable?",
back: "Auto-MDI-X ports detect termination and adapt transmit and receive signaling, so the link works even with the wrong cable type. The wrong cable can still cause problems or extra crosstalk, though.",
tags: ["network-plus", "auto-mdi-x", "crossover"]
},
{
front: "What is a loopback adapter, and how do you use it to test a port versus a cable?",
back: "A loopback adapter crosses transmit to receive in a closed loop so a host hears its own transmission. A plug inserted directly into a port tests the port, while a cable connector into a loopback jack also tests cable continuity, but not performance.",
tags: ["network-plus", "loopback", "testing"]
},
{
front: "What is a crossover cable, and how is it wired?",
back: "A crossover cable reverses transmit and receive pairs to connect like devices, such as switch to switch or computer to computer, plus computer to router on legacy gear. It has T568A on one end and T568B on the other.",
tags: ["network-plus", "crossover", "t568a", "t568b"]
},
{
front: "How do 2-pair and 4-pair crossovers differ?",
back: "Fast Ethernet crossovers cross 2 pairs, orange with green, on pins 1, 2, 3, and 6, leaving blue and brown in place. Gigabit crossovers cross all 4 pairs on all 8 pins.",
tags: ["network-plus", "crossover", "gigabit"]
},
{
front: "What is TX/RX reverse, and which crosstalk type can it cause?",
back: "TX/RX reverse transposes the transmitter and receiver wires by mismatching straight-through or crossover standards on older devices. It is one potential cause of NEXT, near end crosstalk.",
tags: ["network-plus", "tx-rx-reverse", "next"]
},
{
front: "What is a rollover cable, and what is its pinout?",
back: "A rollover cable, or console cable, reverses all wires as a mirror image, pin 1 to 8, 2 to 7, 3 to 6, 4 to 5, and vice versa. It connects a computer to a router console port for device configuration rather than network communication.",
tags: ["network-plus", "rollover", "console-cable"]
},
{
front: "How do a router Ethernet port and console port differ?",
back: "Ethernet ports carry network communications with LANs through the router. The console port talks to the router itself, for example to change its configuration.",
tags: ["network-plus", "console-port", "router"]
},
{
front: "Which tools terminate twisted-pair cable, and what does each do?",
back: "A wire cutter or snips makes a clean cut, a cable stripper removes the sheath without harming inner wires, and a cable crimper forces RJ-45 pins through wire insulation. A boot is a plastic cover protecting wires at the connector.",
tags: ["network-plus", "termination", "crimper"]
},
{
front: "What is the rip cord in a twisted-pair cable for?",
back: "The rip cord is a string inside the sheath used to strip additional sheath beyond a point where the cutting tool may have nicked the pairs. Pull it through a fresh cut, then trim the excess string and sheath.",
tags: ["network-plus", "termination", "rip-cord"]
},
{
front: "What are the key measurements when terminating a straight-through patch cable?",
back: "Strip about 1 inch of sheath, untwist and order the wires, trim evenly to 1/2 inch, seat them so the sheath extends about 3/8 inch into the plug, crimp without rotating, then verify each wire contacts its pin and test the cable.",
tags: ["network-plus", "termination", "rj-45"]
},
{
front: "What do the 10BASE-T, 100BASE-TX, and 1000BASE-T standards require?",
back: "10BASE-T runs 10 Mbps over Cat 3 or better on 2 pairs. 100BASE-TX Fast Ethernet runs 100 Mbps on 2 pairs over Cat 5 or better. 1000BASE-T Gigabit Ethernet runs 1000 Mbps on 4 pairs, with Cat 5e preferred. All reach 100 m.",
tags: ["network-plus", "ethernet-standards", "twisted-pair"]
},
{
front: "What do the 10GBASE-T and 40GBASE-T standards require?",
back: "10GBASE-T runs 10 Gbps on 4 pairs over Cat 6a or Cat 7 to 100 m. 40GBASE-T runs 40 Gbps on 4 pairs over Cat 8 to 30 m.",
tags: ["network-plus", "10gbase-t", "40gbase-t"]
},
{
front: "What are the 2.5GBASE-T and 5GBASE-T standards for?",
back: "They are intermediate steps between Gigabit and 10-Gigabit Ethernet: 2.5GBASE-T needs Cat 5e or better, and 5GBASE-T needs Cat 6 or better, letting networks upgrade one device or NIC at a time.",
tags: ["network-plus", "2.5gbase-t", "5gbase-t"]
},
{
front: "What limits 100GBASE-T despite its fiber-like speed on copper?",
back: "Its 100 m maximum segment length makes it unsuitable for long-distance connections, even though it is cheaper than fiber at comparable rates.",
tags: ["network-plus", "100gbase-t", "distance"]
},
{
front: "What are PoE and PoE+, including standards and wattage?",
back: "PoE supplies electrical power over twisted-pair Ethernet per IEEE 802.3af at up to 15.4 watts, and PoE+ per 802.3at at up to 25.5 watts. Both need Cat 5 or better cable and suit devices like cameras, access points, and IP phones.",
tags: ["network-plus", "poe", "poe-plus"]
},
{
front: "What are PSE and PD in a PoE deployment?",
back: "PSE, power sourcing equipment, supplies the power, while PDs, powered devices, receive it. The PSE first checks that a node is PoE-capable before energizing it.",
tags: ["network-plus", "poe", "pse", "pd"]
},
{
front: "What is a PoE power budget, and what happens when it is exceeded?",
back: "The power budget is the total power a PSE can supply, which may be less than per-port maximum times port count. Exceeding it can shut off power to some or all ports. On Cisco switches, show power inline displays per-interface demand.",
tags: ["network-plus", "poe", "power-budget"]
},
{
front: "How do a PoE injector and splitter extend PoE to non-PoE switches?",
back: "The injector combines power and data onto one cable from a non-PoE switch, and the splitter separates them again at a non-PoE device. A PoE-capable switch instead delivers power plus data directly.",
tags: ["network-plus", "poe", "injector", "splitter"]
},
{
front: "What are the layers of a fiber-optic cable, from center outward?",
back: "The core carries pulsing light, cladding reflects light back into the core, the opaque buffer protects and absorbs escaping light, Kevlar strands prevent stretching, and the sheath covers everything.",
tags: ["network-plus", "fiber", "cable-structure"]
},
{
front: "How do laser and LED light sources for fiber differ?",
back: "Lasers are intense focused light for extremely long, high-throughput runs. LEDs are cool-burning and long-lasting for shorter links, such as between floors or between a switch and a router.",
tags: ["network-plus", "fiber", "laser", "led"]
},
{
front: "How does a single fiber strand carry full-duplex traffic?",
back: "One strand normally transmits simplex in one direction, so full-duplex needs two strands. Zipcord pairs two strands side by side for short runs like server to switch, while WDM sends both directions per fiber on different wavelengths.",
tags: ["network-plus", "fiber", "zipcord", "wdm"]
},
{
front: "What do BiDi or WDM transceivers trade off?",
back: "They cost more than standard duplex transceivers but halve the fiber needed for the same throughput, making them more economical overall. Both ends of the link need them.",
tags: ["network-plus", "wdm", "bidi", "transceiver"]
},
{
front: "What advantages does fiber hold over copper cabling?",
back: "Fiber offers extremely high throughput, very high noise resistance, excellent though imperfect security, and much longer runs before repeaters.",
tags: ["network-plus", "fiber", "advantages"]
},
{
front: "What are the main drawbacks of fiber-optic cable?",
back: "Fiber is the most expensive wired medium, with pricier transmitters, connectivity gear up to five times UTP costs, and costlier installers. Splicing needs special equipment, so fast field repairs are difficult.",
tags: ["network-plus", "fiber", "cost", "splicing"]
},
{
front: "What is optical loss, and what worsens it?",
back: "Optical loss is light-signal degradation with distance and at every connection point, like a dimming flashlight. Long runs, splices, patches, and dust or oil from handling all increase it.",
tags: ["network-plus", "fiber", "optical-loss"]
},
{
front: "What are the core size, light path, and reach of SMF?",
back: "SMF has a narrow 8 to 10 micron core carrying laser light over a single path with little reflection or dispersion. It gives the highest bandwidths and longest repeater-free distances of any wired medium.",
tags: ["network-plus", "smf", "fiber"]
},
{
front: "What are the core size, light path, and reach of MMF?",
back: "MMF has a 50 or 62.5 micron core carrying many laser or LED pulses at various angles. Greater attenuation limits it to several hundred meters, but it costs less to install.",
tags: ["network-plus", "mmf", "fiber"]
},
{
front: "When would you choose SMF versus MMF?",
back: "SMF suits the Internet backbone and other long high-bandwidth runs, rarely short server-to-switch links, given its cost. MMF suits LAN backbones linking routers, switches, and servers, plus desktop-to-network connections.",
tags: ["network-plus", "smf", "mmf"]
},
{
front: "What is an FDP, and how are splices made there?",
back: "An FDP, fiber distribution panel, is a rack case where fiber cables converge and join each other and ISP terminal equipment. Permanent splices use a fusion splicer melting fiber tips together, while connectors make temporary splices.",
tags: ["network-plus", "fdp", "fusion-splicer"]
},
{
front: "What tools terminate fiber-optic cable?",
back: "A fiber stripper removes the outer layers and a fiber cleaver cuts a clean slice through the strands. Termination is more error-sensitive than terminating copper.",
tags: ["network-plus", "fiber", "termination"]
},
{
front: "What is the ferrule of a fiber connector?",
back: "The ferrule is the extended connector tip that contacts the receptacle in the jack or mating connector. SMF connectors are grouped by ferrule size and shape, MMF by fiber count.",
tags: ["network-plus", "fiber", "ferrule", "connectors"]
},
{
front: "How do ST and SC fiber connectors differ?",
back: "Both use 2.5-mm ferrules on older or legacy networks. ST, straight tip, is simplex-only, while SC, subscriber or standard connector, can run full-duplex. Both are less common now.",
tags: ["network-plus", "st-connector", "sc-connector"]
},
{
front: "What is the LC fiber connector, and why is it the most common small connector?",
back: "LC, local connector, uses a 1.25-mm ferrule with full-duplex for high-density SMF and MMF links to switches, routers, servers, SFP or QSFP transceivers, and patch panels. Its small size packs more connections per space.",
tags: ["network-plus", "lc-connector", "fiber"]
},
{
front: "What are MT-RJ and MPO fiber connectors?",
back: "MT-RJ holds 2 fibers in one ferrule for full-duplex MMF links to switches, routers, and desktops. MPO or MTP packs typically 8, 12, or 24 fibers, up to 72 in special cables, for multi full-duplex data center backbone links on MMF or SMF.",
tags: ["network-plus", "mt-rj", "mpo"]
},
{
front: "What does hot-swappable mean for fiber transceivers?",
back: "Transceivers plug into switch sockets and can be inserted, removed, or upgraded without buying a new switch, opening the chassis, or powering down. No cables should be attached before inserting, and cables must come off before removal.",
tags: ["network-plus", "transceiver", "hot-swappable"]
},
{
front: "What speeds do SFP, XFP, and SFP+ transceivers support?",
back: "SFP runs typically 1 Gbps, theoretically 5 Gbps, common for 1 Gbps links. XFP runs up to 10 Gbps with lower power draw than SFP+. SFP+ matches the SFP module size with up to 16 Gbps theoretical maximum and remains widely used.",
tags: ["network-plus", "sfp", "sfp-plus", "xfp"]
},
{
front: "What speeds do QSFP, QSFP+, and CFP transceivers support?",
back: "QSFP squeezes four channels into one transceiver for up to 40 Gbps, or 4 by 10 Gbps, per 802.3ba. QSFP+ exceeds 40 Gbps, with QSFP56-DD reaching 400 Gbps over eight lanes. CFP targets 100 Gbps links, with smaller CFP2, CFP4, and CFP8 generations.",
tags: ["network-plus", "qsfp", "cfp", "transceiver"]
},
{
front: "What connector and port details matter when matching transceivers?",
back: "Match supported speeds and protocols plus cable connectors: most modern transceivers use LC, occasionally RJ-45. SFPs may expose separate transmit and receive fiber ports protected by dust plugs when unused.",
tags: ["network-plus", "transceiver", "lc"]
},
{
front: "What is a media converter?",
back: "A media converter lets networks or segments using different media interconnect and exchange signals. It can hold transceivers such as SFP+ and XFP.",
tags: ["network-plus", "media-converter", "transceiver"]
},
{
front: "How can a transceiver have its own management interface?",
back: "Some transceivers carry a separate IP address apart from the host switch or router. An admin can Telnet to it to configure speed or routing protocol without touching the router OS.",
tags: ["network-plus", "transceiver", "management"]
},
{
front: "How do you test a transceiver with a loopback adapter?",
back: "A fiber-optic loopback adapter creates the closed loop on the fiber connector, the same trick copper loopbacks play on RJ-45. It helps verify transceiver function or expose a mismatch.",
tags: ["network-plus", "transceiver", "loopback"]
},
{
front: "What do the 1000BASE-SX and 1000BASE-LX standards specify?",
back: "1000BASE-SX runs 1 Gbps over MMF on 850 nm short wavelengths, up to about 300 to 550 m by modal bandwidth and core size, for short data center to closet runs with one repeater. 1000BASE-LX runs 1 Gbps on 1300 nm long wavelengths, 550 m on MMF and 5000 m on SMF, for MAN or building backbones.",
tags: ["network-plus", "1000base-sx", "1000base-lx"]
},
{
front: "What do the 10GBASE-SR and 10GBASE-LR standards specify?",
back: "10GBASE-SR is 10 Gbps short range on 850 nm MMF, up to about 300 to 400 m by cabling. 10GBASE-LR is 10 Gbps long range on 1310 nm laser light over SMF to 10,000 m.",
tags: ["network-plus", "10gbase-sr", "10gbase-lr"]
},
{
front: "What is a fiber type mismatch?",
back: "It is really a core mismatch: joining SMF to MMF blocks successful transmission, and even same-mode cables fail if cores differ, such as 50-micron to 62.5-micron MMF.",
tags: ["network-plus", "fiber", "mismatch"]
},
{
front: "What are wavelength mismatch and dirty connectors in fiber troubleshooting?",
back: "Wavelength mismatch sends transmissions optimized for one cable type over another, since SMF, MMF, and plastic fiber use different wavelengths. Dirty or dusty connectors cause signal loss and errors, so keep protectors and dust covers on unused connectors and jacks.",
tags: ["network-plus", "fiber", "wavelength", "connectors"]
},
{
front: "What is an optical link budget, and what happens when it is too low?",
back: "The optical link budget totals all anticipated dB losses along a connection: distance, multiplexing, patches, splices, and connections. The transceiver power budget must overcome them, or link loss causes poor efficiency and downtime.",
tags: ["network-plus", "fiber", "link-budget", "link-loss"]
},
{
front: "What do steady, blinking, and red or amber NIC LEDs indicate?",
back: "A steady light means connectivity, a blinking light means activity, and a red or amber light may mean a problem. Also verify NICs and that cable connections are solid.",
tags: ["network-plus", "troubleshooting", "led"]
},
{
front: "What are the toner and probe in a toner and probe kit?",
back: "The tone generator, or toner, issues a signal on a wire, while the tone locator, or probe, sounds an audible tone when it detects that electrical activity. They are sold as a set to find where one wire among hundreds terminates.",
tags: ["network-plus", "toner-probe", "tools"]
},
{
front: "What can and cannot a toner and probe kit tell you?",
back: "It finds the far-end termination by sweeping the probe over candidates until the tone sounds. It cannot tell whether the wire is defective or whether its length meets IEEE standards.",
tags: ["network-plus", "toner-probe", "tools"]
},
{
front: "What safety rule applies to tone generators?",
back: "Never use a tone generator on a wire connected to a device port or network adapter, because its transmitted electricity could damage the device.",
tags: ["network-plus", "toner-probe", "safety"]
},
{
front: "What does a multimeter measure, and what do its readings reveal?",
back: "A multimeter measures resistance, voltage, and impedance in one instrument. Voltage checks proper conduction, extraneous voltage reveals noise, and unexpected resistance or voltage loss exposes short or open circuits. Impedance shifts locate faults, damage, bad pairing, or terminations.",
tags: ["network-plus", "multimeter", "tools"]
},
{
front: "What is the difference between a short circuit and an open circuit?",
back: "A short circuit is an unwanted connection, such as exposed wires touching. An open circuit is a missing needed connection, such as a broken wire.",
tags: ["network-plus", "short-circuit", "open-circuit"]
},
{
front: "How does a cable continuity tester work?",
back: "The battery-operated base unit connects to one end and generates voltage while the remote unit on the other end detects it, with lights or tones signaling pass or fail. Copper tests verify the signal path, and fiber tests send light pulses to confirm arrival.",
tags: ["network-plus", "continuity-tester", "tools"]
},
{
front: "What is a wire map test, and which faults can it detect?",
back: "A wire map or cable map test verifies correct pin-to-pin pairing per TIA/EIA 568. It detects shorts, exposed wires, crossed wires, reversed pairs, crossed pairs, and split pairs. Bad pinouts cause crosstalk, spikes, and poor performance, especially on older devices.",
tags: ["network-plus", "wire-map", "continuity-tester"]
},
{
front: "Which wire map fault is hardest to catch with a simple continuity test?",
back: "A split pair, where one wire from each of two pairs is swapped, such as solid blue with striped brown. The wiring can still pass basic continuity despite being wrong.",
tags: ["network-plus", "wire-map", "split-pair"]
},
{
front: "What are the practical facts of a continuity tester purchase and use?",
back: "Most are portable, lightweight, 9-volt powered units costing about 10 to 300 dollars from brands like Belkin, Fluke, and Greenlee. Pick one supporting your network type, such as 1000BASE-T or 10GBASE-T, and never test a live network cable: disconnect it first.",
tags: ["network-plus", "continuity-tester", "wire-map"]
},
{
front: "What is a visual fault locator, and when is it used?",
back: "Also called a visual fault finder, it projects a bright visible laser into fiber so you can see damage or an overtight bend losing light. It tests continuity on fiber cable.",
tags: ["network-plus", "visual-fault-locator", "fiber"]
},
{
front: "What extra capabilities does a cable performance tester add over a continuity tester?",
back: "It measures distance to devices, terminations, or damage, plus attenuation, NEXT and alien crosstalk, termination resistance, and impedance. It issues pass or fail ratings per cabling standard, stores or prints results, and graphs attenuation and crosstalk along the cable.",
tags: ["network-plus", "performance-tester", "tools"]
},
{
front: "How do TDR and OTDR locate cable faults?",
back: "A TDR sends an electrical signal and analyzes the reflection timing and amplitude, since bad connectors, crimps, bends, shorts, and mismatches alter the return. An OTDR does the same with different-wavelength light on fiber, also measuring length, bad splices, breaks, and attenuation.",
tags: ["network-plus", "tdr", "otdr"]
},
{
front: "How much does a cable performance tester cost?",
back: "Far more than a continuity tester: from a few hundred dollars for low-end units up to 50,000 dollars for high-end kits.",
tags: ["network-plus", "performance-tester", "cost"]
},
{
front: "What is an OPM, and what affects its accuracy?",
back: "An OPM, optical power meter or fiber light meter, measures light power on a fiber line. It must be calibrated to NIST optical power standards, while room temperature, connection type, and technician skill affect results.",
tags: ["network-plus", "opm", "fiber"]
}
]
});
