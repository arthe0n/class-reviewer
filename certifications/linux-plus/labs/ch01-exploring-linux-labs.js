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
          command: "uname -r",
          hint: "Start with the system-information utility that reports kernel details, and investigate which output identifies the running release.",
          solution: "uname -r",
          expectedOutput: "6.8.0-31-generic",
          expectedOutputDynamic: true,
          check: "A concrete kernel release such as 6.8.0-31-generic appears."
        },
        {
          do: "Display the machine hardware name (CPU architecture).",
          command: "uname -m",
          hint: "Use the same utility as the previous step, but look for the field that describes the machine architecture rather than the kernel release.",
          solution: "uname -m",
          expectedOutput: "x86_64",
          expectedOutputDynamic: true,
          check: "A machine architecture such as x86_64 appears."
        },
        {
          do: "Display the operating system identification information.",
          command: "cat /etc/os-release",
          hint: "Look for the standard operating-system identity metadata maintained by the distribution, and inspect the structured fields that distinguish its name and version.",
          solution: "cat /etc/os-release",
          expectedOutput: "NAME=\"Ubuntu\"\nVERSION_ID=\"24.04\"\nID=ubuntu",
          expectedOutputDynamic: true,
          check: "The output identifies Ubuntu, version 24.04, and the ubuntu distribution ID."
        },
        {
          do: "Display available system memory in human-readable format.",
          command: "free -h",
          hint: "Choose the utility that reports memory usage, then find its human-readable presentation so totals and availability are easy to compare.",
          solution: "free -h",
          expectedOutput: "              total        used        free      shared  buff/cache   available\nMem:           15Gi       4.1Gi       2.8Gi       512Mi       8.7Gi        10Gi\nSwap:         2.0Gi          0B       2.0Gi",
          expectedOutputDynamic: true,
          check: "The memory table includes total, used, free, and available values."
        },
        {
          do: "Display disk space usage for all mounted filesystems in human-readable format.",
          command: "df -h",
          hint: "Use the filesystem-capacity reporting tool and select a readable unit display; focus on mounted filesystems and their capacity columns.",
          solution: "df -h",
          expectedOutput: "Filesystem      Size  Used Avail Use% Mounted on\n/dev/nvme0n1p3  120G   38G   76G  34% /\ntmpfs           7.8G     0  7.8G   0% /dev/shm",
          expectedOutputDynamic: true,
          check: "The filesystem table includes Size, Used, Avail, Use%, and mount-point values."
        },
        {
          do: "Refresh the package repository metadata using your distribution's package manager.",
          command: "# Ubuntu/Debian:\nsudo apt update\n\n# Rocky/RHEL/Fedora:\nsudo dnf check-update\n\n# openSUSE:\nsudo zypper refresh",
          hint: "Identify which package-management family the distribution uses, then find its operation for refreshing repository metadata and confirm the refresh completes cleanly.",
          solution: "# Ubuntu/Debian:\nsudo apt update\n\n# Rocky/RHEL/Fedora:\nsudo dnf check-update\n\n# openSUSE:\nsudo zypper refresh",
          expectedOutput: "Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease\nReading package lists... Done\nAll packages are up to date.",
          expectedOutputDynamic: true,
          check: "The selected package manager refreshes repository metadata without an error."
        },
        {
          do: "Switch to a text-only virtual console, then return to the graphical desktop.",
          hint: "Find the keyboard shortcut sequence for switching from the graphical session to a numbered virtual terminal, then use the desktop-session shortcut appropriate to that system to return.",
          solution: "Press Ctrl+Alt+F2 to open a virtual console (tty2). Log in if prompted. Then press Ctrl+Alt+F1 (or F7 on some distributions) to return to the graphical desktop.",
          expectedOutput: "Ubuntu 24.04.1 LTS labhost tty2\nlabhost login: student\nGraphical desktop restored after returning from tty2.",
          expectedOutputDynamic: true,
          check: "A tty2 login prompt appears and the graphical desktop returns afterward."
        }
      ],
      tags: ["system-info", "kernel", "package-management", "tty"]
    }
  ]
});