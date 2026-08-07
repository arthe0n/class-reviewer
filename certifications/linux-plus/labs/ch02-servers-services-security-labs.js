window.ReviewApp.content.register({
  type: "labs",
  cert: "linux-plus",
  chapter: "Ch 2.4 · Linux Server Services",
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
          hint: "Use ps with grep. Remember that grep itself will appear in the output unless you exclude it.",
          solution: "ps ax | grep '[d]$'",
          check: "You see processes such as systemd, sshd, crond, or mysqld listed."
        },
        {
          do: "Display all currently active systemd service units.",
          hint: "Use systemctl with filters for unit type and state.",
          solution: "systemctl list-units --type=service --state=active",
          check: "A paginated list of active services appears (e.g., sshd, crond, NetworkManager)."
        },
        {
          do: "Check which TCP and UDP ports are currently listening, showing numeric ports and associated processes.",
          hint: "Use the ss utility with options for listening, numeric, and process information.",
          solution: "ss -tlnp && ss -ulnp",
          check: "Output shows Local Address:Port entries (e.g., 0.0.0.0:22, :::80) with PIDs and process names."
        },
        {
          do: "Look up the official IANA port assignments for HTTP, HTTPS, and SSH in the local services database.",
          hint: "Search /etc/services with grep using a pattern that matches the start of a line.",
          solution: "grep -E '^(http|https|ssh)\\s' /etc/services",
          check: "Output confirms http 80/tcp, https 443/tcp, and ssh 22/tcp."
        },
        {
          do: "Inspect the sshd service unit file to see how systemd manages it.",
          hint: "Use systemctl cat to view the raw unit file without opening an editor.",
          solution: "systemctl cat sshd.service",
          check: "The unit file contents display, including [Unit], [Service], and [Install] sections with ExecStart directives."
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
          hint: "Use your package manager (dnf or apt) with automatic confirmation.",
          solution: "sudo dnf install -y httpd\n# OR on Debian/Ubuntu:\n# sudo apt update && sudo apt install -y apache2",
          check: "The package manager reports a successful installation with no dependency errors."
        },
        {
          do: "Start the web server immediately and configure it to start automatically on boot.",
          hint: "Use systemctl to both start and enable the service in one logical flow.",
          solution: "sudo systemctl start httpd && sudo systemctl enable httpd\n# OR on Debian/Ubuntu:\n# sudo systemctl start apache2 && sudo systemctl enable apache2",
          check: "Running systemctl status httpd (or apache2) shows 'active (running)' and the enabled state."
        },
        {
          do: "Verify the default DocumentRoot directory exists and view its contents.",
          hint: "Common paths are /var/www/html for Apache or /usr/share/nginx/html for Nginx.",
          solution: "ls -la /var/www/html/",
          check: "The directory exists. You may see an existing index.html or an empty folder."
        },
        {
          do: "Create a simple test HTML file in the DocumentRoot and test local access.",
          hint: "Use tee with sudo to write the file, then use curl to request it from localhost.",
          solution: "echo '<h1>Linux Lab Test</h1>' | sudo tee /var/www/html/index.html && curl -s http://localhost/",
          check: "curl returns the HTML content exactly as written, including the heading."
        },
        {
          do: "Confirm the web server process is listening on port 80 and identify the process name.",
          hint: "Filter ss output for port 80.",
          solution: "ss -tlnp | grep ':80'",
          check: "Output shows a line with Local Address:80 and the process name (httpd, apache2, or nginx)."
        }
      ],
      tags: ["apache", "nginx", "web-server", "systemctl", "curl", "documentroot"]
    }
  ]
});