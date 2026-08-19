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
      // Optional: which step indices satisfy each objective (objectives 1 and 3
      // each span two steps). Omitting this defaults to objective i ↔ step i.
      objectiveSteps: [[0, 1], [2], [3, 4], [5], [6]],
      steps: [
        {
          do: "Display the current running kernel version.",
          hint: "Start with the system-information utility that reports kernel details, and investigate which output identifies the running release.",
          solution: "uname -r",
          check: "A version string appears (e.g., 5.14.0-570.el9 or 6.8.0)."
        },
        {
          do: "Display the machine hardware name (CPU architecture).",
          hint: "Use the same utility as the previous step, but look for the field that describes the machine architecture rather than the kernel release.",
          solution: "uname -m",
          check: "Output shows x86_64, aarch64, s390x, or similar."
        },
        {
          do: "Display the operating system identification information.",
          hint: "Look for the standard operating-system identity metadata maintained by the distribution, and inspect the structured fields that distinguish its name and version.",
          solution: "cat /etc/os-release",
          check: "Output includes NAME=, VERSION_ID=, and ID= fields identifying the distro."
        },
        {
          do: "Display available system memory in human-readable format.",
          hint: "Choose the utility that reports memory usage, then find its human-readable presentation so totals and availability are easy to compare.",
          solution: "free -h",
          check: "Output shows total, used, and available memory in GiB or MiB."
        },
        {
          do: "Display disk space usage for all mounted filesystems in human-readable format.",
          hint: "Use the filesystem-capacity reporting tool and select a readable unit display; focus on mounted filesystems and their capacity columns.",
          solution: "df -h",
          check: "Output shows Size, Used, Avail, and Use% columns for each mount point."
        },
        {
          do: "Refresh the package repository metadata using your distribution's package manager.",
          hint: "Identify which package-management family the distribution uses, then find its operation for refreshing repository metadata and confirm the refresh completes cleanly.",
          solution: "# Ubuntu/Debian:\nsudo apt update\n\n# Rocky/RHEL/Fedora:\nsudo dnf check-update\n\n# openSUSE:\nsudo zypper refresh",
          check: "Command completes without errors and reports repository or package status."
        },
        {
          do: "Switch to a text-only virtual console, then return to the graphical desktop.",
          hint: "Find the keyboard shortcut sequence for switching from the graphical session to a numbered virtual terminal, then use the desktop-session shortcut appropriate to that system to return.",
          solution: "Press Ctrl+Alt+F2 to open a virtual console (tty2). Log in if prompted. Then press Ctrl+Alt+F1 (or F7 on some distributions) to return to the graphical desktop.",
          check: "The display switches to a text login prompt and then back to the graphical environment."
        }
      ],
      tags: ["system-info", "kernel", "package-management", "tty"]
    }
  ]
});