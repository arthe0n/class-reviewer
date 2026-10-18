window.ReviewApp.content.register({
type: "questions",
cert: "network-plus",
chapter: "Chapter 3: Addressing, Ports, DNS, and Troubleshooting",
items: [
{
type: "mcq",
q: "Which OSI layer uses MAC addresses to identify devices on the local network?",
options: [ "Layer 2 - Data Link", "Layer 3 - Network", "Layer 4 - Transport", "Layer 7 - Application","Layer 1 - Physical"],
answer: 0,
explain: "MAC addressing operates at Layer 2, the Data Link layer. IP addresses work a layer above at Layer 3, and ports a layer higher at Layer 4.",
tags: ["addressing", "osi", "mac"]
},
{
type: "mcq",
q: "Which address does a router use to locate a destination host on another network?",
options: [ "Port number", "IP address", "FQDN", "OUI","MAC address"],
answer: 1,
explain: "Routers forward by IP address, the Layer 3 location identity. MAC addresses stay local, ports pick processes, and the FQDN is only the human-readable name.",
tags: ["addressing", "routing", "ip"]
},
{
type: "mcq",
q: "Which identifier directs data to a specific process or service on a destination host?",
options: ["MAC address", "IP address", "Port", "FQDN", "Subnet mask"],
answer: 2,
explain: "The port selects the process on the host the IP address already located. The IP finds the host, the MAC stays on the LAN, and the mask only splits network from host bits.",
tags: ["ports", "transport", "addressing"]
},
{
type: "match",
q: "Match each addressing concept to what it identifies.",
pairs: [
{ item: "MAC address", match: "NIC or device on the local network" },
{ item: "IP address", match: "Host or interface across networks" },
{ item: "Port", match: "Process or service on a host" },
{ item: "FQDN", match: "Host by human-readable name" }
],
explain: "The chapter's mental model is MAC = local interface, IP = host/network location, port = process, and FQDN = human-readable host identity.",
tags: ["addressing", "osi"]
},
{
type: "fill",
q: "How many bits long is a MAC address?",
answer: "48",
accepts: ["48 bits"],
explain: "A MAC address is 48 bits long: a 24-bit OUI plus a 24-bit device identifier.",
tags: ["mac", "addressing"]
},
{
type: "mcq",
q: "How are MAC addresses normally displayed?",
options: [ "Four blocks of decimal numbers", "Two 24-bit decimal halves","Four groups of decimal octets", "Six groups of hexadecimal characters", "Eight blocks of hexadecimal digits"],
answer: 3,
explain: "MAC addresses appear as 12 hex characters in six colon-separated groups. Decimal octets are IPv4 style, and eight hex blocks are IPv6 style.",
tags: ["mac", "hexadecimal"]
},
{
type: "mcq",
q: "What does the first 24 bits of a MAC address identify?",
options: [ "The network prefix length", "The switch port number", "The VLAN assignment","The device extension identifier", "The NIC manufacturer (OUI)"],
answer: 4,
explain: "The first half is the OUI, naming the manufacturer. The second 24-bit half names the device itself; prefix length, ports, and VLANs live at other layers.",
tags: ["mac", "oui"]
},
{
type: "tf",
q: "A switch learns a MAC address by examining the source MAC address of an arriving frame.",
answer: true,
explain: "A Layer 2 switch learns the source MAC and associates it with the ingress port.",
tags: ["switching", "mac"]
},
{
type: "mcq",
q: "A switch receives a frame for a destination MAC already in its MAC table. What does it do?",
options: [ "Forwards the frame toward the learned port", "Sends the frame to the default gateway", "Drops the frame and logs an error","Rewrites the destination IP address", "Floods the frame out every port"],
answer: 0,
explain: "A known destination means a targeted forward to the learned port. Flooding is reserved for unknown destinations, and the switch never touches the Layer 3 address.",
tags: ["switching", "mac-table"]
},
{
type: "fill",
q: "Which Cisco command displays the MAC address table?",
answer: "show mac-address-table",
explain: "The chapter shows `show mac-address-table` for displaying learned MAC addresses and associated ports.",
tags: ["cisco", "mac-table"]
},
{
type: "mcq",
q: "Which Windows command reveals a computer's MAC address and detailed TCP/IP information?",
options: ["ping /all", "ipconfig /all", "route print", "hostname /all", "nslookup /all"],
answer: 1,
explain: "Windows `ipconfig /all` displays detailed interface and TCP/IP configuration, including the physical MAC address. The other variants are not real option combinations.",
tags: ["windows", "ipconfig"]
},
{
type: "multi",
q: "Which host settings are emphasized as the four core TCP/IP configuration values?",
options: ["IP address", "Subnet mask", "Default gateway", "DNS server address", "MAC address"],
answer: [0, 1, 2, 3],
explain: "The chapter emphasizes IP address, subnet mask, default gateway, and DNS server address. The MAC address is burned into the NIC, not part of TCP/IP configuration.",
tags: ["tcp-ip", "configuration"]
},
{
type: "mcq",
q: "What is the primary purpose of a subnet mask?",
options: ["To identify the default gateway's address", "To assign ports to local processes", "To separate the network and host portions", "To translate private addresses to public ones", "To resolve hostnames into IP addresses"],
answer: 2,
explain: "A mask draws the line between network and host bits. Gateways route, ports select processes, NAT translates, and DNS resolves - the mask only splits the address.",
tags: ["ipv4", "subnetting"]
},
{
type: "mcq",
q: "What does a host use its default gateway for?",
options: [ "Identifying processes on remote hosts", "Learning MAC addresses on the LAN","Obtaining an IP address automatically", "Reaching destinations outside the local network", "Resolving hostnames into IP addresses"],
answer: 3,
explain: "The gateway is the exit path when no better route exists. DHCP assigns addresses, DNS resolves names, ports pick processes, and switches learn MACs.",
tags: ["routing", "gateway"]
},
{
type: "fill",
q: "How many bits are in an IPv4 address?",
answer: "32",
accepts: ["32 bits"],
explain: "IPv4 addresses are 32 bits long: four 8-bit octets.",
tags: ["ipv4", "addressing"]
},
{
type: "mcq",
q: "What is the maximum decimal value of an IPv4 octet?",
options: [ "256", "511","127", "128", "255"],
answer: 4,
explain: "Eight bits set (11111111) equals 255, so each octet ranges 0 through 255.",
tags: ["ipv4", "binary"]
},
{
type: "mcq",
q: "What does the prefix length in CIDR notation specify?",
options: ["The number of bits in the network portion", "The number of usable host addresses", "The transport protocol of the packet", "The DNS record type for the network", "The gateway's MAC address"],
answer: 0,
explain: "The slash number counts network bits (for example /24). Usable-host totals are derived from what remains; protocol, record type, and MAC are unrelated.",
tags: ["cidr", "ipv4"]
},
{
type: "mcq",
q: "In `192.168.89.127/24`, how many bits are in the network portion?",
options: [ "16", "24", "32", "64","8"],
answer: 1,
explain: "A `/24` prefix means the first 24 bits are the network portion and the remaining 8 are host bits.",
tags: ["cidr", "subnetting"]
},
{
type: "tf",
q: "In classless addressing, the network and host portions can be determined from the IP address alone.",
answer: false,
explain: "The subnet mask or CIDR prefix is required because the boundary can occur anywhere within the 32 bits.",
tags: ["cidr", "subnetting"]
},
{
type: "match",
q: "Match each private IPv4 range to its address block.",
pairs: [
{ item: "Class A private range", match: "10.0.0.0 - 10.255.255.255" },
{ item: "Class B private range", match: "172.16.0.0 - 172.31.255.255" },
{ item: "Class C private range", match: "192.168.0.0 - 192.168.255.255" }
],
explain: "These are the three RFC 1918 private ranges from the chapter. Note the Class B block starts at 172.16, not 172.0.",
tags: ["ipv4", "private-addressing"]
},
{
type: "mcq",
q: "Which 172.x.x.x address is in the private IPv4 range?",
options: ["172.0.10.5", "172.15.10.5", "172.16.10.5", "172.32.10.5", "172.40.10.5"],
answer: 2,
explain: "Only 172.16.0.0 through 172.31.255.255 is private. Addresses just outside either boundary are public.",
tags: ["ipv4", "private-addressing"]
},
{
type: "mcq",
q: "Which reserved IPv4 address represents an unspecified or unassigned address?",
options: ["127.0.0.1", "169.254.1.1", "192.168.1.1", "0.0.0.0", "255.255.255.255"],
answer: 3,
explain: "`0.0.0.0` means unspecified or unassigned. Loopback tests the local stack, APIPA signals DHCP failure, and all-ones is the broadcast address.",
tags: ["ipv4", "reserved"]
},
{
type: "mcq",
q: "Which address is the commonly used IPv4 localhost address?",
options: [ "169.254.0.1", "192.168.0.1", "255.255.255.255","0.0.0.0", "127.0.0.1"],
answer: 4,
explain: "`127.0.0.1` is the loopback address for testing the local TCP/IP stack. The 169.254 address indicates DHCP failure instead.",
tags: ["ipv4", "loopback"]
},
{
type: "mcq",
q: "A Windows laptop configured for DHCP boots and ends up with address 169.254.44.18. What is the best first interpretation?",
options: [ "DHCP address acquisition failed", "PAT translated the private address", "IPv6 routing took over","The DNS server became authoritative", "A static address was entered manually"],
answer: 0,
explain: "A 169.254.x.x APIPA address means no DHCP server answered. A manually entered static address would not fall in this range, and PAT, DNS, and IPv6 do not self-assign IPv4.",
tags: ["apipa", "dhcp", "troubleshooting"]
},
{
type: "tf",
q: "A DHCP reservation is configured on the client device itself.",
answer: false,
explain: "A DHCP reservation is configured on the DHCP server, which assigns the same IP based on the client's MAC address.",
tags: ["dhcp", "reservation"]
},
{
type: "mcq",
q: "How does the DHCP server recognize the device that should receive a reserved address?",
options: [ "By its DNS zone name","By its MAC address", "By its current IP address", "By its hostname", "By its switch port number"],
answer: 1,
explain: "Reservations bind an IP to the client's MAC address. The IP is the result being assigned, and hostnames, ports, and zones play no role in the match.",
tags: ["dhcp", "mac", "reservation"]
},
{
type: "mcq",
q: "What is the main management advantage of a DHCP reservation over configuring a static IP on the client?",
options: [ "It makes DNS resolution unnecessary", "It enlarges the DHCP scope automatically","It keeps address assignment centralized on the DHCP server", "It eliminates all DHCP traffic on the network", "It removes the need to record MAC addresses"],
answer: 2,
explain: "The client still uses DHCP, so control stays central. Traffic continues, the MAC must still be recorded, DNS is unaffected, and scope size never changes by itself.",
tags: ["dhcp", "reservation"]
},
{
type: "mcq",
q: "New laptops join the network but get no IP configuration while existing clients keep working, and the scope shows zero free leases. What is this condition?",
options: [ "A subnet mask mismatch", "A MAC table overflow","DNS cache poisoning", "DHCP scope exhaustion", "An IP address conflict"],
answer: 3,
explain: "Zero free leases with working existing clients is scope exhaustion. A conflict would break specific hosts, a mask mismatch would break existing ones too, and DNS or MAC issues do not stop lease offers.",
tags: ["dhcp", "troubleshooting"]
},
{
type: "mcq",
q: "What is a likely downside of an excessively long DHCP lease time?",
options: [ "DNS TTL values shrink automatically", "The scope range doubles by itself", "Switch MAC tables age entries faster","Clients renew too frequently", "Addresses stay tied up by inactive clients"],
answer: 4,
explain: "Long leases let departed clients squat on addresses until expiry, starving the scope. Frequent renewals are the opposite problem, caused by leases that are too short.",
tags: ["dhcp", "lease"]
},
{
type: "mcq",
q: "What is a likely downside of an excessively short DHCP lease time?",
options: ["Frequent renewals increase DHCP traffic", "Inactive clients hoard addresses", "Static addresses join the pool", "DNS zones stop replicating", "Ports below 1024 become unusable"],
answer: 0,
explain: "Short leases force constant renewals and chatter. Hoarding is the long-lease failure mode; DNS, static pools, and port ranges are unaffected by lease length.",
tags: ["dhcp", "lease"]
},
{
type: "mcq",
q: "A network printer must always keep 192.168.2.200, but the team wants to keep managing addresses centrally. Which approach fits best?",
options: ["APIPA self-assignment", "A DHCP reservation for the printer's MAC", "A loopback address on the printer", "A dynamic private port mapping", "A static IPv6 link-local address"],
answer: 1,
explain: "A reservation pins the address to the printer's MAC while the server stays in charge. APIPA is random and version 4 link-local only, loopback never leaves the host, and ports do not assign addresses.",
tags: ["dhcp", "reservation", "scenario"]
},
{
type: "multi",
q: "Which TWO statements about DHCP lease times are correct?",
options: [ "Lease time controls which DNS server clients use","A very long lease can starve the scope when clients leave", "A very short lease increases renewal traffic", "A longer lease shortens DNS TTL values", "A shorter lease enlarges the scope range"],
answer: [1, 2],
explain: "Lease length trades hoarding against chatter. It never changes TTL values, scope size, or DNS server selection.",
tags: ["dhcp", "lease"]
},
{
type: "fill",
q: "What technology translates private IPv4 addressing to a public-facing address at a gateway?",
answer: "NAT",
accepts: ["Network Address Translation", "Network Address Translation (NAT)"],
explain: "NAT substitutes private source addresses with a public-facing gateway address for external communication.",
tags: ["nat", "ipv4"]
},
{
type: "mcq",
q: "What does PAT use to keep multiple internal sessions apart when they share one public IP?",
options: [ "APIPA fallback addresses","Source MAC addresses", "Transport-layer port numbers", "DNS query names", "Additional public IP addresses"],
answer: 2,
explain: "PAT distinguishes flows by transport port. MACs never leave the LAN, DNS names do not identify sessions, and the whole point is needing no extra public IPs.",
tags: ["pat", "nat"]
},
{
type: "mcq",
q: "Private clients browse Internet sites through the gateway's public address. Which translation is the gateway performing on that outbound traffic?",
options: [ "DHCP reservation", "SLAAC autoconfiguration","DNAT on the destination", "SNAT on the source", "DNS recursion"],
answer: 3,
explain: "Outbound private traffic gets SNAT: the source becomes the public address. DNAT rewrites destinations for inbound traffic instead.",
tags: ["snat", "nat", "scenario"]
},
{
type: "mcq",
q: "Internet users reach an internal web server by contacting the gateway's public address. Which translation delivers that inbound traffic to the server?",
options: [ "DHCP allocation", "DNS forwarding","SNAT on the source", "NAT64 translation", "DNAT on the destination"],
answer: 4,
explain: "Inbound traffic to a public address needs DNAT rewriting the destination to the internal server. SNAT handles the reverse direction, and NAT64 bridges IP versions rather than publishing servers.",
tags: ["dnat", "nat", "scenario"]
},
{
type: "mcq",
q: "Which feature is commonly implemented with DNAT in the chapter?",
options: [ "Port forwarding to an internal server", "DHCP reservations by MAC", "DNS zone transfers", "MAC learning on switches","Outbound SNAT for clients"],
answer: 0,
explain: "DNAT underlies port forwarding to internal web or mail servers. Outbound sharing is SNAT/PAT territory, while DHCP, DNS, and switching operate independently.",
tags: ["dnat", "port-forwarding"]
},
{
type: "mcq",
q: "How many bits long is an IPv6 address?",
options: [ "96", "128","32", "48", "64"],
answer: 1,
explain: "IPv6 uses 128-bit addresses: eight 16-bit blocks. 32 bits is IPv4 and 48 bits is a MAC address.",
tags: ["ipv6", "addressing"]
},
{
type: "mcq",
q: "How many hexadecimal blocks are normally written in an IPv6 address?",
options: ["4", "6", "8", "16", "32"],
answer: 2,
explain: "IPv6 is written as eight blocks of four hexadecimal digits. Four decimal octets is the IPv4 layout instead.",
tags: ["ipv6", "hexadecimal"]
},
{
type: "mcq",
q: "Which IPv6 shorthand rule removes leading zeroes within a block?",
options: [ "Convert each block to decimal", "Duplicate the compressed blocks","Replace all zeros with a single colon", "Omit leading zeroes within a block", "Reverse the order of each block"],
answer: 3,
explain: "Leading zeroes inside a block drop out, so 00D3 becomes D3. Single-colon compression with `::` is the separate rule for whole zero blocks.",
tags: ["ipv6", "notation"]
},
{
type: "mcq",
q: "Which notation compresses a contiguous run of zero-valued IPv6 blocks?",
options: [ ":0:", "0000", "0:0","/", "::"],
answer: 4,
explain: "Double colon stands in for one or more all-zero blocks. The slash belongs to CIDR prefixes, and the other forms are not valid compression.",
tags: ["ipv6", "notation"]
},
{
type: "tf",
q: "The `::` IPv6 compression shorthand should be used more than once when possible.",
answer: false,
explain: "The chapter states that `::` should not be used more than once in a single IPv6 address, since the omitted length would become ambiguous.",
tags: ["ipv6", "notation"]
},
{
type: "multi",
q: "Which statements correctly describe IPv6 addressing types?",
options: [
"IPv6 relies on IPv4-style broadcasting for most functions",
"Anycast requires every device to use a unique address"
,
"Unicast sends to one destination",
"Multicast sends to members of a targeted group",
"Anycast sends to the closest destination according to routing"],
answer: [2, 3, 4],
explain: "Unicast is one-to-one, multicast is one-to-group, and anycast reaches the nearest of several devices sharing an address. IPv6 avoids broadcast, and anycast depends on shared addresses.",
tags: ["ipv6", "addressing"]
},
{
type: "match",
q: "Match each IPv6 prefix to its purpose.",
pairs: [
{ item: "2000::/3", match: "Global unicast, routable on the Internet" },
{ item: "FE80::/10", match: "Link-local, same link only" },
{ item: "FC00::/7", match: "Unique local, private internal use" }
],
explain: "Global addresses route worldwide, link-local never leaves the link, and unique local is the private-use space analogous to RFC 1918.",
tags: ["ipv6", "prefixes"]
},
{
type: "mcq",
q: "Which IPv6 address is the loopback address?",
options: [ "::1", "FE80::1", "FC00::1", "FF00::1","::0"],
answer: 0,
explain: "`::1/128` loops back to the host itself. FE80 is link-local, FC00 is unique local, and FF00 is multicast.",
tags: ["ipv6", "loopback"]
},
{
type: "mcq",
q: "Which IPv6 prefix identifies multicast addresses?",
options: [ "FC00::/7", "FF00::/8", "::1/128","2000::/3", "FE80::/10"],
answer: 1,
explain: "`FF00::/8` marks multicast groups. Global, link-local, and unique local are all unicast scopes, and ::1 is loopback.",
tags: ["ipv6", "multicast"]
},
{
type: "mcq",
q: "What does SLAAC let an IPv6 host do?",
options: [ "Register its hostname in DNS", "Take over a neighbor's duplicate address","Obtain an address automatically without a DHCPv6 server", "Request a stateful address from DHCPv6", "Translate its address for IPv4-only hosts"],
answer: 2,
explain: "SLAAC is stateless autoconfiguration with no DHCPv6 involved. Stateful assignment is DHCPv6's job, translation is NAT64's, and duplicates trigger a new address, not a takeover.",
tags: ["ipv6", "slaac"]
},
{
type: "match",
q: "Match each SLAAC step or message to its purpose.",
pairs: [
{ item: "DAD", match: "Checks whether the proposed address is already in use" },
{ item: "RS", match: "Asks the router for configuration information" },
{ item: "RA", match: "Provides network configuration from the router" },
{ item: "Interface ID", match: "Identifies the interface portion of the IPv6 address" }
],
explain: "SLAAC generates an address, checks uniqueness with DAD, sends a Router Solicitation, and receives a Router Advertisement carrying the prefix.",
tags: ["ipv6", "slaac", "dad"]
},
{
type: "mcq",
q: "During SLAAC, Duplicate Address Detection gets a response for the proposed address. What happens next?",
options: [ "The host sends another Router Solicitation","The host keeps the duplicate address", "The host disables IPv6 on the interface", "The host generates a different address", "The host falls back to DHCPv6 immediately"],
answer: 3,
explain: "A response proves someone else holds the address, so the host builds a different one. Keeping it would duplicate, and neither DHCPv6 nor another RS fixes the collision.",
tags: ["ipv6", "dad"]
},
{
type: "mcq",
q: "What is the purpose of an IPv6 Router Solicitation (RS) message?",
options: [ "To confirm an address is unique", "To release the current IPv6 address", "To renew a DHCPv6 lease","To advertise configuration to local hosts", "To request network configuration from a router"],
answer: 4,
explain: "RS asks, RA answers: the host solicits and the router advertises. Uniqueness checks are DAD's job, and release/renew belong to DHCP.",
tags: ["ipv6", "slaac"]
},
{
type: "mcq",
q: "Which IPv4/IPv6 coexistence method runs both protocols simultaneously?",
options: [ "Dual stack", "PAT", "APIPA","NAT64", "Tunneling"],
answer: 0,
explain: "Dual stack configures both protocols side by side. Tunneling carries one inside the other, NAT64 translates between them, and PAT/APIPA are IPv4-only mechanisms.",
tags: ["ipv6", "dual-stack"]
},
{
type: "mcq",
q: "Which transition method carries IPv6 traffic across an IPv4 network by encapsulation?",
options: ["Dual stack", "Tunneling", "NAT64", "PAT", "APIPA"],
answer: 1,
explain: "Tunneling wraps one version inside the other for transit. Dual stack runs both natively, NAT64 translates at a gateway, and PAT/APIPA never cross versions.",
tags: ["ipv6", "tunneling"]
},
{
type: "mcq",
q: "Which technology lets IPv4-only and IPv6-only devices communicate by translating between them?",
options: ["Dual stack", "Tunneling", "NAT64", "PAT", "SLAAC"],
answer: 2,
explain: "A NAT64 gateway translates addresses between versions. Dual stack avoids translation by running both, tunneling encapsulates without translating, and PAT/SLAAC stay within one version.",
tags: ["ipv6", "nat64"]
},
{
type: "mcq",
q: "Which port range is classified as well-known?",
options: [ "49152-65535", "1-4095", "32768-65535","0-1023", "1024-49151"],
answer: 3,
explain: "Ports 0 through 1023 are well-known and assigned by IANA to widely used services. The higher ranges are registered and dynamic.",
tags: ["ports", "ranges"]
},
{
type: "mcq",
q: "Which port range is classified as registered?",
options: [ "49152-65535", "60000-65535","0-255", "256-1023", "1024-49151"],
answer: 4,
explain: "Ports 1024 through 49151 are registered for nonstandard assignments. Below lies well-known space and above lies dynamic space.",
tags: ["ports", "ranges"]
},
{
type: "fill",
q: "Which port range is classified as dynamic/private?",
answer: "49152-65535",
accepts: ["49152 through 65535"],
explain: "Ports 49152 through 65535 are dynamic/private and open for use without restriction.",
tags: ["ports", "ranges"]
},
{
type: "match",
q: "Match each protocol to its port.",
pairs: [
{ item: "FTP data", match: "20" },
{ item: "FTP control", match: "21" },
{ item: "SSH", match: "22" },
{ item: "Telnet", match: "23" },
{ item: "SMTP", match: "25" }
],
explain: "FTP splits data (20) from control (21); SSH and Telnet are the secure/insecure remote pair (22/23); SMTP sends mail on 25.",
tags: ["ports", "protocols"]
},
{
type: "match",
q: "Match each network service to its port.",
pairs: [
{ item: "DNS", match: "53" },
{ item: "DHCP client-to-server", match: "67" },
{ item: "DHCP server-to-client", match: "68" },
{ item: "TFTP", match: "69" },
{ item: "HTTP", match: "80" }
],
explain: "DNS resolves on 53, DHCP uses the 67/68 pair directionally, TFTP stays trivial on 69, and plain HTTP is 80.",
tags: ["ports", "protocols"]
},
{
type: "match",
q: "Match each protocol to its port.",
pairs: [
{ item: "POP3", match: "110" },
{ item: "NTP", match: "123" },
{ item: "IMAP4", match: "143" },
{ item: "SNMP manager messages", match: "161" },
{ item: "SNMP responses or unsolicited messages", match: "162" }
],
explain: "Mail retrieval splits POP3 (110) from IMAP4 (143), time sync is 123, and SNMP separates manager messages (161) from device responses (162).",
tags: ["ports", "protocols"]
},
{
type: "match",
q: "Match each service to its port.",
pairs: [
{ item: "LDAP", match: "389" },
{ item: "HTTPS", match: "443" },
{ item: "SMB", match: "445" },
{ item: "Syslog", match: "514" },
{ item: "SMTPS", match: "587" }
],
explain: "Directory access is 389, secure web is 443, file sharing is 445, event messages are 514, and TLS-encrypted SMTP is 587.",
tags: ["ports", "protocols"]
},
{
type: "match",
q: "Match each service to its port.",
pairs: [
{ item: "LDAPS", match: "636" },
{ item: "IMAP4 over SSL", match: "993" },
{ item: "POP3 over SSL", match: "995" },
{ item: "SQL Server", match: "1433" },
{ item: "RDP", match: "3389" }
],
explain: "Secure directory access is 636, the SSL mail variants are 993/995, SQL Server listens on 1433, and Windows remote control is 3389.",
tags: ["ports", "protocols"]
},
{
type: "mcq",
q: "Which port does SSH use for encrypted remote communication?",
options: [ "22", "23", "3389", "443","21"],
answer: 0,
explain: "SSH is TCP 22. Telnet is its unencrypted counterpart on 23, RDP is Windows remote on 3389, and 21/443 belong to file transfer and web.",
tags: ["ports", "ssh"]
},
{
type: "mcq",
q: "Which protocol provides unencrypted remote computer control?",
options: [ "SFTP", "Telnet", "RDP", "HTTPS","SSH"],
answer: 1,
explain: "Telnet on port 23 sends everything in the clear, which is why SSH replaced it. SSH, RDP, SFTP, and HTTPS all encrypt.",
tags: ["ports", "telnet"]
},
{
type: "mcq",
q: "Which protocol provides encrypted file transfer through SSH?",
options: ["FTP", "FTPS", "SFTP", "TFTP", "SSH"],
answer: 2,
explain: "SFTP rides inside SSH on port 22. FTP and TFTP move files without encryption, FTPS wraps FTP in SSL/TLS instead, and SSH alone is the shell rather than the transfer.",
tags: ["ports", "sftp"]
},
{
type: "mcq",
q: "Which secure web protocol uses TCP port 443?",
options: [ "Telnet", "RDP","HTTP", "HTTPS", "SSH"],
answer: 3,
explain: "HTTPS is HTTP over TLS on 443. Plain HTTP is 80, while SSH, Telnet, and RDP are remote-access protocols on their own ports.",
tags: ["ports", "https"]
},
{
type: "multi",
q: "Which protocol-port pairs are secure variants emphasized by the chapter?",
options: [
"POP3 over SSL — 995",
"IMAP4 over SSL — 993",
"Telnet — 22"
,
"HTTPS — 443",
"LDAPS — 636"],
answer: [3, 4, 0, 1],
explain: "HTTPS, LDAPS, and the SSL mail variants are the secure forms. Telnet is unencrypted and lives on 23, not 22.",
tags: ["ports", "secure-protocols"]
},
{
type: "mcq",
q: "Which protocol synchronizes clocks over UDP port 123?",
options: [ "NTS", "SNMP", "Syslog", "SMTP","NTP"],
answer: 4,
explain: "NTP keeps time on UDP 123. NTS is its TLS-protected successor on 4460, SNMP monitors devices, Syslog carries events, and SMTP moves mail.",
tags: ["ports", "ntp"]
},
{
type: "mcq",
q: "Which service provides secure directory access on port 636?",
options: [ "LDAPS", "HTTPS", "SMTPS", "IMAP4 over SSL","LDAP"],
answer: 0,
explain: "LDAPS is LDAP over SSL on 636. Plain LDAP is 389, and the other options are secure variants of web, mail-transfer, and mail-retrieval protocols.",
tags: ["ports", "ldap"]
},
{
type: "mcq",
q: "Which email protocol uses TCP port 587 with TLS encryption in the source table?",
options: ["SMTP", "SMTPS", "POP3 over SSL", "IMAP4 over SSL", "HTTPS"],
answer: 1,
explain: "The source places SMTPS on 587. Plain SMTP is 25, the SSL retrieval variants are 993/995, and HTTPS is the secure web protocol on 443.",
tags: ["ports", "smtp"]
},
{
type: "mcq",
q: "What does DNS primarily provide to clients?",
options: [ "MAC-to-port learning","Automatic IP address assignment", "Name resolution", "Private-to-public address translation", "Clock synchronization"],
answer: 2,
explain: "DNS resolves names to addresses. Assignment is DHCP's job, translation is NAT's, time is NTP's, and MAC learning belongs to switches.",
tags: ["dns", "name-resolution"]
},
{
type: "mcq",
q: "What is an FQDN such as www.example.com?",
options: [ "An IPv4 address in disguise", "A DNS zone transfer file","A URL including protocol and path", "A complete host and domain name", "A top-level domain by itself"],
answer: 3,
explain: "An FQDN names the full host within its domain. A URL adds protocol and path around it, a TLD is only the last label, and no address or file is involved.",
tags: ["dns", "fqdn"]
},
{
type: "mcq",
q: "In `www.example.com`, what is `.com`?",
options: [ "URL", "IP address","Host name", "Domain name", "TLD"],
answer: 4,
explain: "`.com` is the Top-Level Domain. `www` is the host, `example` the domain, and a URL or address is a different construct entirely.",
tags: ["dns", "tld"]
},
{
type: "match",
q: "Match each DNS role to its function.",
pairs: [
{ item: "Resolver", match: "DNS client that sends requests" },
{ item: "Primary DNS server", match: "Authoritative database for the organization's zone" },
{ item: "Secondary DNS server", match: "Backup authoritative server" },
{ item: "Caching DNS server", match: "Caches answers for local clients" },
{ item: "Forwarding DNS server", match: "Forwards unresolved queries to another DNS server" }
],
explain: "The resolver asks, authoritative servers own the zone data, caching servers reuse collected answers, and forwarding servers pass along what they cannot answer.",
tags: ["dns", "servers"]
},
{
type: "mcq",
q: "How does a secondary DNS server synchronize authoritative zone data from the primary?",
options: ["Through a zone transfer", "Through a DNS cache lookup", "Through a DHCP lease renewal", "Through a reverse DNS query", "Through a PAT port mapping"],
answer: 0,
explain: "Secondaries pull zone copies via zone transfer. Cache lookups and reverse queries resolve names, DHCP assigns addresses, and PAT maps ports - none copy zone data.",
tags: ["dns", "zone-transfer"]
},
{
type: "mcq",
q: "What best describes a caching DNS server?",
options: ["It stores authoritative zone files", "It answers from previously collected DNS data", "It assigns addresses from a DHCP scope", "It forwards every query without caching", "It learns MAC addresses for local hosts"],
answer: 1,
explain: "Caching servers reuse answers they gathered; they hold no zone files. Authoritative storage belongs to primaries, assignment to DHCP, and MAC learning to switches.",
tags: ["dns", "caching"]
},
{
type: "mcq",
q: "Which DNS server level is queried to locate the authoritative server for a domain?",
options: [ "Resolver","Root", "TLD", "Caching", "Forwarding"],
answer: 2,
explain: "The TLD server points to the organization's authoritative servers. Root points to TLDs, while caching, forwarding, and resolver are client-side roles.",
tags: ["dns", "hierarchy"]
},
{
type: "mcq",
q: "A client asks its local DNS server to resolve a name and waits for the final answer. Which lookup type is this?",
options: [ "Reverse", "Zone transfer","Iterative", "Recursive", "Forwarding-only"],
answer: 3,
explain: "Recursive means resolve-it-for-me: the server keeps working until it returns success or failure. Iterative replies with only what is already known.",
tags: ["dns", "recursive"]
},
{
type: "mcq",
q: "A DNS server answers a fellow server's query with only what it already knows, such as a referral, and lets the requester continue. Which lookup type is this?",
options: [ "Caching-only", "Reverse", "Forwarding","Recursive", "Iterative"],
answer: 4,
explain: "Iterative means tell-me-what-you-know: referrals instead of final answers. Recursive queries demand the complete answer from the receiving server.",
tags: ["dns", "iterative"]
},
{
type: "mcq",
q: "Which DNS record maps a hostname to an IPv4 address?",
options: [ "A", "PTR", "MX", "CNAME","AAAA"],
answer: 0,
explain: "A records map names to IPv4. AAAA is the IPv6 twin, PTR reverses the direction, MX finds mail servers, and CNAME aliases names.",
tags: ["dns", "records"]
},
{
type: "mcq",
q: "Which DNS record maps a hostname to an IPv6 address?",
options: ["A", "AAAA", "PTR", "NS", "SOA"],
answer: 1,
explain: "AAAA (quad-A) is the IPv6 counterpart of the IPv4 A record. PTR reverses direction, NS names servers, and SOA carries zone authority.",
tags: ["dns", "records"]
},
{
type: "mcq",
q: "Which DNS record maps an alias to a canonical hostname?",
options: [ "SOA", "NS","CNAME", "PTR", "MX"],
answer: 2,
explain: "CNAME points one name at another name. PTR maps addresses back to names, MX finds mail, SOA holds authority, and NS names servers.",
tags: ["dns", "cname"]
},
{
type: "mcq",
q: "Which DNS record identifies mail servers for a domain?",
options: [ "TXT","A", "CNAME", "MX", "PTR"],
answer: 3,
explain: "MX designates the domain's mail exchangers. A/AAAA map host addresses, CNAME aliases names, PTR reverses, and TXT carries free-form text.",
tags: ["dns", "mx"]
},
{
type: "mcq",
q: "Which DNS record is used for reverse DNS?",
options: [ "MX", "CNAME","A", "AAAA", "PTR"],
answer: 4,
explain: "PTR maps an address back to a hostname. A and AAAA go the forward direction, MX finds mail, and CNAME aliases.",
tags: ["dns", "ptr"]
},
{
type: "mcq",
q: "Which DNS record identifies authoritative name servers?",
options: ["NS", "TXT", "SOA", "A", "MX"],
answer: 0,
explain: "NS delegates to the authoritative servers. TXT carries text, SOA holds zone authority data, A maps hosts, and MX finds mail.",
tags: ["dns", "ns"]
},
{
type: "mcq",
q: "Which DNS record contains zone-authority and administrative information?",
options: [ "CNAME","SOA", "MX", "PTR", "AAAA"],
answer: 1,
explain: "SOA opens the zone with contact, serial, and timing data. MX, PTR, AAAA, and CNAME each serve lookup traffic instead.",
tags: ["dns", "soa"]
},
{
type: "mcq",
q: "Which DNS record commonly stores SPF, DKIM, and DMARC information?",
options: ["A", "NS", "TXT", "PTR", "CNAME"],
answer: 2,
explain: "TXT holds the free-form strings behind SPF, DKIM, and DMARC mail authentication. Address, server, reverse, and alias records cannot carry them.",
tags: ["dns", "txt", "email"]
},
{
type: "multi",
q: "Which statements are correct about DNS record directionality and purpose?",
options: [
"AAAA maps hostname to IPv6",
"PTR maps IP to hostname",
"MX identifies mail servers",
"CNAME maps an IP directly to a hostname"
,
"A maps hostname to IPv4"],
answer: [4, 0, 1, 2],
explain: "A, AAAA, PTR, and MX work as stated. CNAME never touches IPs directly - it maps an alias name to a canonical name.",
tags: ["dns", "records"]
},
{
type: "mcq",
q: "What does the TTL value control for a DNS record?",
options: [ "How long a TCP connection stays open", "How often the zone serial increments", "How many referrals a resolver follows","How long cached data remains valid", "How long a DHCP client keeps its address"],
answer: 3,
explain: "TTL is the cache lifetime of DNS data. Lease length, connection duration, serial numbering, and referral counts are governed elsewhere.",
tags: ["dns", "ttl"]
},
{
type: "fill",
q: "What protocol does `ping` use for IPv4?",
answer: "ICMP",
accepts: ["Internet Control Message Protocol", "Internet Control Message Protocol (ICMP)"],
explain: "Ping sends ICMP echo requests and listens for echo replies.",
tags: ["ping", "icmp"]
},
{
type: "mcq",
q: "What does `ping 127.0.0.1` test?",
options: [ "The default route", "The remote host", "The DHCP server","Internet DNS resolution", "The local TCP/IP stack"],
answer: 4,
explain: "Loopback never leaves the host, so it isolates the local stack. Gateway, remote, DNS, and DHCP tests all require leaving it.",
tags: ["ping", "loopback"]
},
{
type: "mcq",
q: "A host successfully pings 8.8.8.8 but fails to ping google.com. What should you suspect first?",
options: [ "Failed DNS resolution", "A failed local TCP/IP stack", "DHCP scope exhaustion", "An incorrect subnet mask","A failed default gateway"],
answer: 0,
explain: "Reaching the raw IP proves gateway, stack, addressing, and lease all work; only the name step fails, which is DNS. A dead gateway or stack would have killed the IP ping too.",
tags: ["troubleshooting", "dns"]
},
{
type: "mcq",
q: "Which Windows command displays the routing table?",
options: [ "ipconfig /flushdns","route print", "ipconfig /release", "hostname", "nslookup"],
answer: 1,
explain: "`route print` shows where Windows sends each destination. The ipconfig variants manage addresses and DNS, hostname names the host, and nslookup queries DNS.",
tags: ["routing", "windows"]
},
{
type: "mcq",
q: "Which Windows command releases the current DHCP lease?",
options: [ "route print","ipconfig /renew", "ipconfig /release", "ipconfig /displaydns", "ipconfig /all"],
answer: 2,
explain: "`ipconfig /release` drops the lease; `/renew` then fetches a fresh one. Displaydns and /all only show information, and route print shows routes.",
tags: ["dhcp", "windows"]
},
{
type: "mcq",
q: "Which Windows command requests new DHCP configuration?",
options: [ "ipconfig /flushdns", "route print", "hostname","ipconfig /renew", "ipconfig /release"],
answer: 3,
explain: "`ipconfig /renew` asks DHCP for configuration. Release gives the current lease up first, flushdns clears names, and route/hostname do neither job.",
tags: ["dhcp", "windows"]
},
{
type: "mcq",
q: "Which Windows command displays the local DNS cache?",
options: [ "ipconfig /renew", "route print", "hostname","ipconfig /all", "ipconfig /displaydns"],
answer: 4,
explain: "`ipconfig /displaydns` dumps the resolver cache. Renew reconfigures DHCP, route print shows routes, and /all overviews interfaces rather than the cache.",
tags: ["dns", "windows"]
},
{
type: "mcq",
q: "Which Windows command clears the local DNS cache?",
options: [ "ipconfig /flushdns", "ipconfig /displaydns", "route print","ipconfig /release", "ipconfig /renew"],
answer: 0,
explain: "`ipconfig /flushdns` empties the cache; displaydns only views it. Release and renew act on DHCP leases, not cached names.",
tags: ["dns", "windows"]
},
{
type: "mcq",
q: "Which utility is described as deprecated on many Linux distributions, including Ubuntu?",
options: ["ip", "ifconfig", "hostname", "dig", "nslookup"],
answer: 1,
explain: "`ifconfig` is legacy; the modern `ip` utility replaces it. Hostname, dig, and nslookup serve unrelated naming and DNS roles.",
tags: ["linux", "ifconfig"]
},
{
type: "mcq",
q: "Which utility is emphasized as the modern Linux/UNIX interface and IP management tool?",
options: [ "hostname","ifconfig", "ip", "ping6", "nslookup"],
answer: 2,
explain: "The `ip` utility manages interfaces and addresses on current Linux. Ifconfig is its deprecated predecessor, ping6 tests, nslookup queries DNS, and hostname names.",
tags: ["linux", "ip"]
},
{
type: "mcq",
q: "Which command verifies the Linux routing table in the chapter?",
options: [ "route print", "resolvectl status", "hostname","ip route", "ip addr"],
answer: 3,
explain: "`ip route` shows Linux routes. `ip addr` shows addresses, `route print` is the Windows equivalent, resolvectl reports DNS state, and hostname names the host.",
tags: ["linux", "routing"]
},
{
type: "mcq",
q: "Which DNS tool generally provides more detailed response information on Linux and macOS?",
options: [ "route", "ipconfig","hostname", "ping", "dig"],
answer: 4,
explain: "`dig` exposes full DNS response detail beyond basic `nslookup` output. Hostname, ping, route, and ipconfig answer different questions entirely.",
tags: ["dns", "dig"]
},
{
type: "mcq",
q: "Which command queries MX records with `nslookup`?",
options: ["nslookup -type=MX example.com", "nslookup -mx example.com", "nslookup example.com MX", "nslookup --mail example.com", "nslookup /mx example.com"],
answer: 0,
explain: "Record-type selection uses `-type=MX` before the name. The other flag shapes and orderings are not valid nslookup syntax.",
tags: ["dns", "nslookup", "mx"]
},
{
type: "mcq",
q: "Which command performs a reverse DNS lookup with `dig`?",
options: ["dig example.com PTR", "dig -x 8.8.8.8", "dig @8.8.8.8", "dig reverse 8.8.8.8", "dig -r 8.8.8.8"],
answer: 1,
explain: "`dig -x` reverses an address to a name. `@server` picks the server instead, and the remaining forms are not real dig syntax.",
tags: ["dns", "dig", "reverse-dns"]
},
{
type: "mcq",
q: "Which command sends a DNS query to a specified server with `dig`?",
options: [ "dig --dns 8.8.8.8 example.com","dig 8.8.8.8 example.com", "dig @8.8.8.8 example.com", "dig -server 8.8.8.8 example.com", "dig example.com 8.8.8.8"],
answer: 2,
explain: "The `@server` form directs the query. A bare address order, `-server`, and `--dns` are not valid dig server selectors.",
tags: ["dns", "dig"]
},
{
type: "mcq",
q: "Which Windows tool is one of the first places to look for detailed system and application events?",
options: [ "Device Manager", "Services","Task Scheduler", "Event Viewer", "Resource Monitor"],
answer: 3,
explain: "Event Viewer journals system and application events with timestamps. The others schedule tasks, watch live resources, manage drivers, or control services.",
tags: ["windows", "event-viewer"]
},
{
type: "mcq",
q: "A single computer loses the correct time every time it powers on. What should you suspect first?",
options: [ "An expired DHCP lease", "An incorrect DNS server", "A duplicate IP address","A failed NTP server", "A dead CMOS battery"],
answer: 4,
explain: "One machine forgetting time across power cycles points at its CMOS battery. A bad time source would skew many machines, while DHCP, DNS, and addressing do not keep the clock.",
tags: ["troubleshooting", "time"]
},
{
type: "mcq",
q: "Many domain computers consistently show the wrong time. What should you check first?",
options: [ "The NTP time source", "The DHCP scope size", "The default gateway address", "The DNS cache contents","The CMOS battery in each computer"],
answer: 0,
explain: "Fleet-wide drift means the shared time source, not dozens of simultaneous battery failures. Scope, gateway, and cache do not drive the clock.",
tags: ["ntp", "troubleshooting"]
},
{
type: "mcq",
q: "Which UDP port must be allowed for normal NTP synchronization?",
options: [ "80", "123", "443","53", "67"],
answer: 1,
explain: "NTP is UDP 123. The neighbors are DNS (53), DHCP (67), HTTP (80), and HTTPS (443) - each a different service's well-known port.",
tags: ["ntp", "ports"]
},
{
type: "mcq",
q: "How does PTP differ most significantly from NTP in the chapter?",
options: [ "Name resolution for time servers","Lower cost with standard hardware", "Greater accuracy with hardware-based timekeeping", "Finer accuracy using software clocks only", "Automatic IP assignment for clients"],
answer: 2,
explain: "PTP reaches nanosecond precision through specialized hardware at higher cost. Low cost and standard hardware describe NTP, while assignment and naming belong to DHCP and DNS.",
tags: ["ntp", "ptp", "time-sync"]
},
{
type: "multi",
q: "A static host can reach nearby systems but not remote networks. Which settings should be checked?",
options: ["Default gateway", "Subnet mask", "IP address", "DNS server address", "DHCP lease time"],
answer: [0, 1, 2],
explain: "Local-but-not-remote means the address, mask, or gateway is wrong. DNS only affects names, and a static host holds no DHCP lease to check.",
tags: ["troubleshooting", "ipv4"]
},
{
type: "mcq",
q: "A client can ping its default gateway but cannot reach a remote IP address. What should you investigate next?",
options: [ "The DHCP scope size", "The loopback interface","DNS resolution", "Routing or the remote host", "The local MAC table"],
answer: 3,
explain: "Gateway success clears the local stack, link, and lease; the break lies beyond, in routing or at the far end. DNS is irrelevant to a numeric address.",
tags: ["troubleshooting", "routing"]
},
{
type: "mcq",
q: "What is the recommended high-level troubleshooting progression in the chapter?",
options: [ "DNS, MAC, DHCP, port", "Port, application, IP, DNS", "MAC, DNS, DHCP, application","Application, DNS, gateway, IP", "IP, subnet, gateway, DNS, application"],
answer: 4,
explain: "Work upward: local addressing and routing first, then name resolution, then the application. Starting at the top assumes the symptom names the cause.",
tags: ["troubleshooting", "workflow"]
},
{
type: "mcq",
q: "After a DNS migration, host settings look correct but an external test fails with \"Network is unreachable.\" What did the chapter's case study find?",
options: [ "A missing default route", "An expired DHCP lease", "A wrong DNS server address", "A corrupt hosts file","An incorrect MX record"],
answer: 0,
explain: "With no default route the host could never reach external DNS servers, so a DNS symptom had a routing root cause. Records, leases, and files were all innocent.",
tags: ["troubleshooting", "routing", "dns"]
},
{
type: "mcq",
q: "Which command is appropriate for finding a hostname from a known IP address?",
options: [ "ping /reverse 8.8.8.8","nslookup 8.8.8.8", "ipconfig /renew", "route print 8.8.8.8", "hostname 8.8.8.8"],
answer: 1,
explain: "`nslookup` with an address performs reverse lookup. Renew reconfigures DHCP, route prints tables, hostname names the local machine, and ping has no /reverse flag.",
tags: ["dns", "reverse-dns", "nslookup"]
},
{
type: "mcq",
q: "Which pair correctly identifies the service and process in `208.85.40.44:443`?",
options: [ "IP identifies subnet; port identifies OUI","IP identifies process; port identifies host", "IP identifies host; port identifies process", "IP identifies DNS; port identifies router", "IP identifies user; port identifies MAC"],
answer: 2,
explain: "The IP locates the host and 443 selects HTTPS on it. Every other pairing swaps the two roles or drags in unrelated identifiers.",
tags: ["socket", "ports", "https"]
},
{
type: "multi",
q: "Which statements correctly describe a troubleshooting case where local devices work but the Internet does not?",
options: [
"Assume the application is the root cause"
,
"Check the subnet configuration",
"Check the default gateway or route",
"Immediately blame DNS",
"Check local and remote reachability separately"],
answer: [1, 2, 4],
explain: "Verify subnetting, gateway routing, and each reachability leg before theorizing. Blaming DNS or the application up front inverts the diagnostic order.",
tags: ["troubleshooting", "routing"]
},
{
type: "match",
q: "Match each common problem to its most likely interpretation.",
pairs: [
{ item: "Wrong subnet mask", match: "Limited or failed communication" },
{ item: "Wrong default gateway", match: "Remote networks may be unreachable" },
{ item: "Wrong DNS", match: "Names may fail while IPs work" },
{ item: "Duplicate IP", match: "IP conflict and unstable communication" }
],
explain: "Masks bound the local conversation, gateways open remote ones, DNS only affects names, and duplicates fight over one address.",
tags: ["troubleshooting", "ipv4"]
},
{
type: "multi",
q: "Which symptoms point toward DNS rather than basic IP connectivity?",
options: [
"A website name fails while its known IP works",
"The loopback address fails"
,
"An IP address can be pinged",
"A hostname cannot be resolved",
"The default gateway cannot be pinged"],
answer: [2, 3, 0],
explain: "Working IPs with failing names isolate resolution. A dead gateway or loopback breaks IP itself, which points below DNS.",
tags: ["dns", "troubleshooting"]
},
{
type: "multi",
q: "Which items are associated with DNS troubleshooting in the chapter?",
options: [ "ipconfig /displaydns", "ipconfig /flushdns", "show mac-address-table","nslookup", "dig"],
answer: [3, 4, 0, 1],
explain: "Nslookup and dig query servers while the ipconfig pair inspects and clears the cache. The MAC table belongs to switching, not naming.",
tags: ["dns", "troubleshooting"]
},
{
type: "mcq",
q: "What does an MX preference number tell a sending mail system?",
options: [ "Numbers identify DNS classes", "Numbers identify TTL values","Higher numbers are preferred", "Lower numbers are preferred", "Numbers identify IP versions"],
answer: 3,
explain: "Lower MX preference means higher priority. The numbers rank mail exchangers only; versions, classes, and TTLs are separate fields.",
tags: ["dns", "mx"]
},
{
type: "tf",
q: "The primary and secondary DNS servers configured on a client necessarily refer to the organization's primary and secondary authoritative servers.",
answer: false,
explain: "Client settings typically point at caching or forwarding servers. Authoritative primary/secondary roles describe the organization's zone servers instead.",
tags: ["dns", "authoritative"]
},
{
type: "tf",
q: "A switch learns destination MAC addresses from the destination field of every arriving frame.",
answer: false,
explain: "Switches learn from the source field and associate it with the ingress port. Destination addresses drive forwarding lookups, not learning.",
tags: ["switching", "mac"]
},
{
type: "mcq",
q: "Which statement best captures how switches and routers differ in this chapter?",
options: [ "Both forward frames using MAC tables only", "Both route between networks using IP", "Switches assign IP addresses; routers assign ports","Switches forward by IP; routers forward by MAC", "Switches use MAC addresses locally; routers use IP across networks"],
answer: 4,
explain: "Switches switch local frames by MAC while routers route between networks by IP. The inverted, both-do-everything, and assignment options each break one side of that split.",
tags: ["switching", "routing", "addressing"]
},
{
type: "match",
q: "Match each command to its primary troubleshooting purpose.",
pairs: [
{ item: "`ipconfig /all`", match: "Display detailed Windows TCP/IP configuration" },
{ item: "`ipconfig /release`", match: "Release a DHCP address" },
{ item: "`ipconfig /renew`", match: "Request renewed DHCP configuration" },
{ item: "`ipconfig /displaydns`", match: "Display the DNS cache" },
{ item: "`ipconfig /flushdns`", match: "Clear the DNS cache" }
],
explain: "All shows everything, release drops the lease, renew fetches it back, displaydns views the cache, and flushdns empties it.",
tags: ["windows", "ipconfig", "troubleshooting"]
},
{
type: "multi",
q: "Which statements are correct about DNS record directionality and purpose?",
options: [
"AAAA maps hostname to IPv6",
"PTR maps IP to hostname",
"MX identifies mail servers",
"CNAME maps an IP directly to a hostname"
,
"A maps hostname to IPv4"],
answer: [4, 0, 1, 2],
explain: "A, AAAA, PTR, and MX work as stated. CNAME never touches IPs - it aliases one name to another name.",
tags: ["dns", "records"]
}
]
});
