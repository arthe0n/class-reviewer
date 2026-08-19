window.ReviewApp.content.register({
  type: "labs",
  cert: "linux-plus",
  chapter: "Ch 02 · Linux Server Services",
  items: [
    {
      title: "Inspecting Daemons, Ports, and Systemd Services",
      difficulty: 2,
      minutes: 20,
      scenario: "You have just logged into a new Linux server as a junior systems administrator. Before making any changes, your senior admin asks you to document which services are running, which ports are listening, and how the SSH daemon is configured to start. This baseline inventory will help the team understand the current server state.",
      objectives: [
        "Identify running daemon processes using ps and naming conventions",
        "List active systemd services and interpret their states",
        "Discover listening TCP/UDP ports and map them to processes",
        "Cross-reference well-known ports using /etc/services",
        "Inspect a systemd unit file for a critical service"
      ],
      steps: [
        {
          do: "List all running processes and filter for daemon processes (programs whose names traditionally end in the letter 'd').",
          command: "ps ax | grep '[d]$'",
          hint: "Use a process-listing tool and filter names using the daemon naming pattern; make sure the filter itself does not appear as a false match.",
          solution: "ps ax | grep '[d]$'",
          expectedOutput: "  742 ?        Ss     0:00 /usr/lib/systemd/systemd\n  901 ?        Ss     0:00 sshd\n 1044 ?        Ssl    0:00 /usr/sbin/rsyslogd",
          expectedOutputDynamic: true,
          check: "The listing includes daemon processes such as systemd, sshd, or rsyslogd."
        },
        {
          do: "Display all currently active systemd service units.",
          command: "systemctl list-units --type=service --state=active",
          hint: "Ask the system service manager for units in the service category whose state is active; narrow the result by both type and state.",
          solution: "systemctl list-units --type=service --state=active",
          expectedOutput: "  UNIT                     LOAD   ACTIVE SUB     DESCRIPTION\n  cron.service             loaded active running Regular background program processing daemon\n  ssh.service              loaded active running OpenBSD Secure Shell server\n  systemd-journald.service loaded active running Journal Service\n\n3 loaded units listed.",
          expectedOutputDynamic: true,
          check: "The listing shows active service units with loaded and running states."
        },
        {
          do: "Check which TCP and UDP ports are currently listening, showing numeric ports and associated processes.",
          command: "ss -tlnp && ss -ulnp",
          hint: "Use a socket-inspection utility and request listening endpoints, numeric addresses, and owning processes; check both TCP and UDP.",
          solution: "ss -tlnp && ss -ulnp",
          expectedOutput: "Netid State  Recv-Q Send-Q Local Address:Port Peer Address:Port Process\ntcp   LISTEN 0      128    0.0.0.0:22    0.0.0.0:*    users:((\"sshd\",pid=901,fd=3))\ntcp   LISTEN 0      511    0.0.0.0:80    0.0.0.0:*    users:((\"httpd\",pid=1842,fd=4))\n\nNetid State  Recv-Q Send-Q Local Address:Port Peer Address:Port Process\nudp   UNCONN 0      0      127.0.0.53:53 0.0.0.0:*    users:((\"systemd-resolved\",pid=612,fd=13))",
          expectedOutputDynamic: true,
          check: "Listening TCP and UDP entries show concrete ports and owning process names."
        },
        {
          do: "Look up the official IANA port assignments for HTTP, HTTPS, and SSH in the local services database.",
          command: "grep -E '^(http|https|ssh)\\s' /etc/services",
          hint: "Search the local service-name database for the protocol names from the task, focusing on records that begin with each name; compare their assigned ports and transports.",
          solution: "grep -E '^(http|https|ssh)\\s' /etc/services",
          expectedOutput: "http            80/tcp          www\nhttps           443/tcp\nssh             22/tcp",
          expectedOutputDynamic: true,
          check: "The service database maps HTTP to 80, HTTPS to 443, and SSH to 22."
        },
        {
          do: "Inspect the sshd service unit file to see how systemd manages it.",
          command: "systemctl cat sshd.service",
          hint: "Have the service manager render the SSH daemon's unit definition rather than only showing runtime status; inspect its lifecycle sections and start directive.",
          solution: "systemctl cat sshd.service",
          expectedOutput: "# /usr/lib/systemd/system/sshd.service\n[Unit]\nDescription=OpenSSH server daemon\nAfter=network.target\n[Service]\nExecStart=/usr/sbin/sshd -D $SSHD_OPTS\n[Install]\nWantedBy=multi-user.target",
          expectedOutputDynamic: true,
          check: "The SSH unit shows Unit, Service, and Install sections with an ExecStart entry."
        }
      ],
      tags: ["daemons", "systemd", "ports", "services", "ss", "ps"]
    },
    {
      title: "Deploy and Verify a Basic Web Server",
      difficulty: 3,
      minutes: 30,
      scenario: "Your team needs a temporary internal web server to host a status page. You are tasked with installing and starting a web server, confirming it listens on the correct port, and ensuring it serves a custom page. You must also verify that the service will survive a reboot.",
      objectives: [
        "Install a web server package appropriate for the distribution",
        "Start and enable a service using systemd",
        "Locate and use the default DocumentRoot",
        "Verify network listening status with ss and test with curl",
        "Confirm service persistence across reboots"
      ],
      steps: [
        {
          do: "Install the Apache web server package. Account for differences between RHEL-based (httpd) and Debian-based (apache2) distributions.",
          command: "sudo dnf install -y httpd\n# OR on Debian/Ubuntu:\n# sudo apt update && sudo apt install -y apache2",
          hint: "Use the package-management workflow for the distribution, identify the web-server package used there, and enable noninteractive confirmation for the install.",
          solution: "sudo dnf install -y httpd\n# OR on Debian/Ubuntu:\n# sudo apt update && sudo apt install -y apache2",
          expectedOutput: "Last metadata expiration check: 0:12:15 ago on Mon 19 Aug 2026 10:00:00 UTC.\nDependencies resolved.\nInstalled:\n  httpd.x86_64 2.4.57-8.el9\nComplete!",
          expectedOutputDynamic: true,
          check: "The package manager reports a completed installation without dependency errors."
        },
        {
          do: "Start the web server immediately and configure it to start automatically on boot.",
          command: "sudo systemctl start httpd && sudo systemctl enable httpd\n# OR on Debian/Ubuntu:\n# sudo systemctl start apache2 && sudo systemctl enable apache2",
          hint: "Distinguish the setting that affects the current process from the setting that controls startup at boot, and verify both independently.",
          solution: "sudo systemctl start httpd && sudo systemctl enable httpd\n# OR on Debian/Ubuntu:\n# sudo systemctl start apache2 && sudo systemctl enable apache2",
          expectedOutput: "Created symlink /etc/systemd/system/multi-user.target.wants/httpd.service → /usr/lib/systemd/system/httpd.service.",
          expectedOutputDynamic: true,
          check: "The web service is active now and enabled to start at boot."
        },
        {
          do: "Verify the default DocumentRoot directory exists and view its contents.",
          command: "ls -la /var/www/html/",
          hint: "Determine the web server's conventional document root for this distribution, then inspect that location before making changes.",
          solution: "ls -la /var/www/html/",
          expectedOutput: "total 8\ndrwxr-xr-x 2 root root 4096 Aug 19 10:15 .\ndrwxr-xr-x 3 root root 4096 Aug 19 10:10 ..\n-rw-r--r-- 1 root root  356 Aug 19 10:15 index.html",
          expectedOutputDynamic: true,
          check: "The document root exists and its current entries are listed."
        },
        {
          do: "Create a simple test HTML file in the DocumentRoot and test local access.",
          command: "echo '<h1>Linux Lab Test</h1>' | sudo tee /var/www/html/index.html && curl -s http://localhost/",
          hint: "Think about how to write to a protected web root with elevated privileges, then test the local HTTP response for the page you created.",
          solution: "echo '<h1>Linux Lab Test</h1>' | sudo tee /var/www/html/index.html && curl -s http://localhost/",
          expectedOutput: "<h1>Linux Lab Test</h1>\n<h1>Linux Lab Test</h1>",
          check: "The local HTTP response contains the Linux Lab Test heading."
        },
        {
          do: "Confirm the web server process is listening on port 80 and identify the process name.",
          command: "ss -tlnp | grep ':80'",
          hint: "Inspect listening sockets and narrow them to the standard HTTP endpoint, then identify which process owns the listener.",
          solution: "ss -tlnp | grep ':80'",
          expectedOutput: "LISTEN 0      511    0.0.0.0:80    0.0.0.0:*    users:((\"httpd\",pid=1842,fd=4))",
          expectedOutputDynamic: true,
          check: "A listening entry shows port 80 owned by the web-server process."
        }
      ],
      tags: ["apache", "nginx", "web-server", "systemctl", "curl", "documentroot"]
    }
  ]
});