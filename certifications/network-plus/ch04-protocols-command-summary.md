# Chapter 4: Protocols — Command and Tool Summary

Quick reference for the commands, diagnostic tools, and actionable syntax in Chapter 4: Protocols. Conceptual background lives in the chapter notes; this file is commands only.

## Address Resolution

| Command | What it does | Key options | Example |
| --- | --- | --- | --- |
| `arp -a` | Lists all ARP table entries with IP-to-MAC mappings and static/dynamic types | — | `arp -a` |
| `arp -d` | Flushes entries to force table repopulation; follow with `ping` | Target one address: `arp -d 192.168.1.15` | `arp -d` then `ping 192.168.1.1` |
| `arp -s` | Adds a static entry (requires administrator permissions) | IP + MAC pair | `arp -s 192.168.1.15 00-11-22-AA-BB-CC` |
| `show arp` | Cisco IOS equivalent for viewing the ARP table | — | `show arp` |

## Connection Statistics

| Command | What it does | Key options | Example |
| --- | --- | --- | --- |
| `netstat` | Lists active TCP/IP connections on the local machine | — | `netstat` |
| `netstat -n` | Numeric IPs and ports, skipping name resolution | — | `netstat -n` |
| `netstat -f` | Adds FQDNs to the connection listing | — | `netstat -f` |
| `netstat -a` | All current connections plus listening TCP/UDP ports | — | `netstat -a` |
| `netstat -e` | Interface message statistics, errors, discards | — | `netstat -e` |
| `netstat -s` | Per-protocol statistics (TCP, UDP, IP, ICMP) | — | `netstat -s` |
| `netstat -r` | Routing table information | — | `netstat -r` |
| `ss` | Linux successor to deprecated `netstat`; shares many parameters | — | `ss` |

## Remote Access and File Transfer

| Command / tool | What it does | Notes | Example |
| --- | --- | --- | --- |
| `telnet <host>` | Terminal emulation to a device by IP or name (plaintext) | Close with `Ctrl+]`, then `quit` | `telnet 192.168.2.1` |
| `ssh` | Encrypted remote login, command execution, file copy (port 22) | OpenSSH on UNIX/macOS; PuTTY on Windows | `ssh admin@192.168.2.1` |
| `ssh-keygen` | Generates the client key pair for passwordless SSH auth | Install public key on the host | `ssh-keygen` |

## Ports Referenced by Tools in This Chapter

| Port | Service | Transport |
| --- | --- | --- |
| 22 | SSH / SFTP | TCP |
| 23 | Telnet | TCP |
| 69 | TFTP | UDP |
| 443 | HTTPS / DoH | TCP |
| 853 | DoT | TCP |
| 989–990 | FTPS data | TCP |
