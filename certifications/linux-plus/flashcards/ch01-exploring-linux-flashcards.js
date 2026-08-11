window.ReviewApp.content.register({
  type: "flashcards",
  cert: "linux-plus",
  chapter: "Ch 01 · Exploring Linux",
  items: [
    {
      front: "What are the four parts that make up a complete Linux system?",
      back: "The Linux kernel, GNU utilities, a user interface (graphical or CLI), and application software.",
      tags: ["linux-concepts", "components"]
    },
    {
      front: "What is the primary role of the Linux kernel?",
      back: "It interfaces between software and hardware, managing CPU usage, memory, and devices.",
      tags: ["kernel", "linux-concepts"]
    },
    {
      front: "Which CPU architecture is an open standard that any manufacturer can implement?",
      back: "RISC-V (Reduced Instruction Set Computing, version 5).",
      tags: ["hardware", "risc-v"]
    },
    {
      front: "In a kernel version such as 5.18.16, what does each number represent?",
      back: "5 is the major number, 18 is the minor number, and 16 is the revision number.",
      tags: ["kernel", "versions"]
    },
    {
      front: "What is the fundamental difference between copyleft and permissive open source licenses?",
      back: "Copyleft requires derivative work to use the same license; permissive licenses allow derivatives to use a different license or none at all.",
      tags: ["licensing", "copyleft"]
    },
    {
      front: "Which license requires that modifications to source code be released publicly under the same license terms?",
      back: "The GNU General Public License (GPL).",
      tags: ["licensing", "gpl"]
    },
    {
      front: "Which license allows integrating open source code into a proprietary project without releasing your own changes?",
      back: "The GNU Lesser General Public License (LGPL).",
      tags: ["licensing", "lgpl"]
    },
    {
      front: "What is the minimum recommended RAM for a virtualization product hosting multiple Linux distros?",
      back: "8 GB.",
      tags: ["virtualization", "hardware"]
    },
    {
      front: "Which virtualization product emulates a CPU using dynamic binary translation?",
      back: "QEMU (Quick Emulator).",
      tags: ["virtualization", "qemu"]
    },
    {
      front: "Which Windows 11 editions support Microsoft Hyper-V?",
      back: "Pro and Enterprise; Windows 11 Home does not support it.",
      tags: ["virtualization", "hyper-v"]
    },
    {
      front: "What is CentOS Stream's relationship to RHEL?",
      back: "It is a rolling development distribution and is no longer an exact duplicate of the current RHEL version.",
      tags: ["distributions", "rhel"]
    },
    {
      front: "Which distribution was created by the original CentOS developers to be an exact duplicate of the latest RHEL?",
      back: "Rocky Linux.",
      tags: ["distributions", "rocky-linux"]
    },
    {
      front: "Which package manager does Ubuntu use?",
      back: "APT (Advanced Package Tool).",
      tags: ["package-management", "ubuntu"]
    },
    {
      front: "Which package manager does Rocky Linux use?",
      back: "DNF (Dandified YUM).",
      tags: ["package-management", "rocky-linux"]
    },
    {
      front: "What is YaST on openSUSE?",
      back: "Yet another Setup Tool — a command-center utility that controls many system services from one interface.",
      tags: ["opensuse", "yast"]
    },
    {
      front: "How do you access a text-only terminal (TTY) from a graphical desktop on most Linux distributions?",
      back: "Press Ctrl+Alt+F2 or F3. Return to the graphical desktop with Ctrl+Alt+F1, F7, or F2 depending on the distro.",
      tags: ["terminal", "tty"]
    },
    {
      front: "Which two major distribution groups are emphasized for the Linux+ exam?",
      back: "Red Hat-based (RPM-based) and Debian-based (dpkg-based).",
      tags: ["distributions", "package-management"]
    },
    {
      front: "What command refreshes repository metadata on openSUSE?",
      back: "sudo zypper refresh",
      tags: ["opensuse", "zypper"]
    },
    {
      front: "What is the difference between freeware and shareware?",
      back: "Freeware is closed-source software distributed free of charge; shareware is closed-source software initially free but requires payment after a trial period.",
      tags: ["licensing", "software-types"]
    },
    {
      front: "Which cloud providers are mentioned as options for running Linux VMs?",
      back: "Amazon Web Services (AWS), Microsoft Azure, and DigitalOcean.",
      tags: ["cloud", "virtualization"]
    },
    {
      front: "ls — Important options",
      back: "-a → show all entries, including hidden files\n-l → use long listing format\n-h → show human-readable sizes\n-R → list subdirectories recursively\n-t → sort by modification time (newest first)",
      tags: ["ls", "options"]
    }
  ]
});