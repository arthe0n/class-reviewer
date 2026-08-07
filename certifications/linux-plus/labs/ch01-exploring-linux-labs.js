window.ReviewApp.content.register({
  type: "labs",
  cert: "linux-plus",
  chapter: "Ch 01 · Exploring Linux",
  items: [
    {
      title: "New Workstation System Inventory",
      difficulty: 1,
      minutes: 20,
      scenario: "You have just been assigned a new Linux workstation. Before installing any software, you must document the system's kernel version, CPU architecture, distribution details, available hardware resources, and verify that the package manager can reach its repositories. You also need to confirm you can access a text-only terminal if the graphical environment becomes unavailable.",
      objectives: [
        "Identify the running kernel version and CPU architecture",
        "Determine the Linux distribution name and version",
        "Assess available system memory and disk space",
        "Refresh package repository metadata using the correct package manager",
        "Access a virtual console (TTY) and return to the graphical desktop"
      ],
      steps: [
        {
          do: "Display the current running kernel version.",
          hint: "The uname command with the -r flag shows the kernel release.",
          solution: "uname -r",
          check: "A version string appears (e.g., 5.14.0-570.el9 or 6.8.0)."
        },
        {
          do: "Display the machine hardware name (CPU architecture).",
          hint: "uname with the -m flag shows the machine hardware name.",
          solution: "uname -m",
          check: "Output shows x86_64, aarch64, s390x, or similar."
        },
        {
          do: "Display the operating system identification information.",
          hint: "The /etc/os-release file contains distribution details.",
          solution: "cat /etc/os-release",
          check: "Output includes NAME=, VERSION_ID=, and ID= fields identifying the distro."
        },
        {
          do: "Display available system memory in human-readable format.",
          hint: "Use the free command with the human-readable flag.",
          solution: "free -h",
          check: "Output shows total, used, and available memory in GiB or MiB."
        },
        {
          do: "Display disk space usage for all mounted filesystems in human-readable format.",
          hint: "Use df with the -h flag.",
          solution: "df -h",
          check: "Output shows Size, Used, Avail, and Use% columns for each mount point."
        },
        {
          do: "Refresh the package repository metadata using your distribution's package manager.",
          hint: "Ubuntu uses apt, Rocky/RHEL uses dnf, openSUSE uses zypper.",
          solution: "# Ubuntu/Debian:\nsudo apt update\n\n# Rocky/RHEL/Fedora:\nsudo dnf check-update\n\n# openSUSE:\nsudo zypper refresh",
          check: "Command completes without errors and reports repository or package status."
        },
        {
          do: "Switch to a text-only virtual console, then return to the graphical desktop.",
          hint: "Use Ctrl+Alt plus a function key.",
          solution: "Press Ctrl+Alt+F2 to open a virtual console (tty2). Log in if prompted. Then press Ctrl+Alt+F1 (or F7 on some distributions) to return to the graphical desktop.",
          check: "The display switches to a text login prompt and then back to the graphical environment."
        }
      ],
      tags: ["system-info", "kernel", "package-management", "tty"]
    }
  ]
});