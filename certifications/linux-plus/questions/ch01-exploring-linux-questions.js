window.ReviewApp.content.register({
  type: "questions",
  cert: "linux-plus",
  chapter: "Ch 01 · Exploring Linux",
  items: [
    {
      q: "A server reports its kernel version as 6.8.12. Which number represents the minor revision?",
      type: "mcq",
      options: ["6", "8", "12", "6.8", "6.8.12"],
      answer: 1,
      explain: "Linux kernel versions follow a major.minor.revision format. In 6.8.12, 6 is the major number, 8 is the minor number, and 12 is the revision number.",
      tags: ["kernel", "versions"]
    },
    {
      q: "A vendor distributes proprietary software at no cost, but does not provide its source code and does not limit use to a trial period. Which licensing category best describes it?",
      type: "mcq",
      options: ["Freeware", "Open source", "Shareware", "Copyleft", "Permissive"],
      answer: 0,
      explain: "Freeware is proprietary software provided at no monetary cost. Open source makes source available, shareware is typically a trial model, and copyleft or permissive describe open-source licensing terms.",
      tags: ["licensing", "freeware", "closed-source"]
    },
    {
      q: "Which of the following are considered permissive open source licenses? (Choose two.)",
      type: "multi",
      options: ["MPL", "MIT", "GPL", "Apache", "LGPL"],
      answer: [1, 3],
      explain: "Permissive licenses such as Apache and MIT allow redistribution of derivative work under a different license or with no license at all. GPL and LGPL are copyleft licenses, which require derivative work to inherit the parent license terms.",
      tags: ["licensing", "permissive"]
    },
    {
      q: "Which license governs the Linux kernel itself? (Select one.)",
      type: "multi",
      options: ["MIT", "MPL", "GPL version 2", "Apache", "LGPL"],
      answer: [2],
      explain: "The Linux kernel is licensed under GPL version 2. The other licenses use different permissive or copyleft terms and do not govern the kernel itself.",
      tags: ["licensing", "kernel"]
    },
    {
      q: "The Linux kernel itself is licensed under GPL version 2, but not all Linux distributions use this same license for all included software.",
      type: "tf",
      answer: true,
      explain: "True. While the Linux kernel is under GPL v2, distributions bundle third-party software that may be licensed under Apache, MIT, or other models, so the entire distro does not necessarily use GPL v2.",
      tags: ["licensing", "kernel"]
    },
    {
      q: "On an Ubuntu system, the command to refresh the package index before installing updates is `sudo ____ update`.",
      type: "fill",
      answer: "apt",
      explain: "Ubuntu uses the apt package manager. Running `sudo apt update` refreshes the local package index with the latest changes from the repositories before upgrades are applied.",
      tags: ["ubuntu", "apt", "package-management"]
    },
    {
      q: "Which virtualization product uses dynamic binary translation to emulate a computer's CPU?",
      type: "mcq",
      options: ["Oracle VirtualBox", "Microsoft Hyper-V", "QEMU", "VMware ESXi", "KVM"],
      answer: 2,
      explain: "QEMU (Quick Emulator) is unique among common hypervisors in that it emulates a computer's CPU using dynamic binary translation. VirtualBox and Hyper-V use hardware-assisted virtualization rather than CPU emulation.",
      tags: ["virtualization", "qemu"]
    },
    {
      q: "Which utility allows administrators to control many system services from a single interface on openSUSE?",
      type: "mcq",
      options: ["dnf", "YaST", "apt", "zypper", "pacman"],
      answer: 1,
      explain: "Yet another Setup Tool (YaST) is openSUSE's comprehensive command-center utility for managing system services, network settings, and software. dnf and apt are package managers for other distributions, while zypper is openSUSE's command-line package manager.",
      tags: ["opensuse", "yast"]
    },
    {
      q: "Which CPU architectures are explicitly stressed for the CompTIA Linux+ exam? (Choose all that apply.)",
      type: "multi",
      options: ["Intel/AMD x86 and x86_64", "SPARC (sparc64)", "ARM (aarch64)", "IBM Z (s390x)", "RISC-V"],
      answer: [0, 2, 3, 4],
      explain: "The Linux+ exam stresses Intel/AMD x86 and x86_64, AMD64, ARM (aarch64), IBM Z (s390x), and RISC-V. SPARC is not mentioned in the exam objectives.",
      tags: ["hardware", "architecture"]
    },
    {
      q: "CentOS Stream is currently an exact duplicate of the latest RHEL version, just as the original CentOS was.",
      type: "tf",
      answer: false,
      explain: "False. While the original CentOS was nearly an exact duplicate of RHEL, CentOS Stream is a rolling development distribution and no longer matches the current RHEL version exactly. Rocky Linux was created to fill the role of being an exact RHEL duplicate.",
      tags: ["rhel", "centos", "distributions"]
    },
    {
      q: "On openSUSE, which command refreshes package metadata before an upgrade?",
      type: "fill",
      answer: "zypper refresh",
      explain: "`zypper refresh` updates the local package metadata from configured openSUSE repositories before an upgrade.",
      tags: ["opensuse", "zypper", "package-management"]
    },
    {
      q: "A technician working at a graphical Ubuntu desktop needs to access a text-only terminal to run commands. Which key combination should they press?",
      type: "mcq",
      options: ["Ctrl + Alt + F1", "Ctrl + Alt + F2", "Ctrl + Alt + Delete", "Alt + F4", "Ctrl + Alt + F7"],
      answer: 1,
      explain: "Pressing Ctrl+Alt+F2 (or F3) switches to a virtual console (TTY) such as tty2, providing a text-only terminal. Ctrl+Alt+F1 or F7 typically returns to the graphical desktop, while Ctrl+Alt+Delete may reboot the system.",
      tags: ["terminal", "tty", "ui"]
    },
    {
      q: "Which statement best describes the fundamental difference between copyleft and permissive open source licenses?",
      type: "mcq",
      options: [
        "Copyleft licenses determine whether software may be used only for commercial purposes.",
        "Copyleft licenses require derivative works to retain the same license, while permissive licenses generally do not.",
        "Copyleft licenses prohibit users from modifying software, while permissive licenses encourage modification.",
        "Copyleft licenses are issued only by GNU projects, while permissive licenses are issued only by Apache projects.",
        "Copyleft licenses permit private changes but never allow redistribution of the resulting software."
      ],
      answer: 1,
      explain: "Copyleft licenses such as GPL require that any derivative work be released under the same license terms, ensuring the code remains open. Permissive licenses such as Apache and MIT impose no such restriction, allowing derivatives to use different licenses or remain closed source.",
      tags: ["licensing", "copyleft"]
    },
    {
      q: "A company requires a commercially supported Linux distribution with vendor-backed enterprise updates rather than a community rebuild. Which distribution best matches that requirement?",
      type: "mcq",
      options: ["RHEL", "CentOS Stream", "Rocky Linux", "Fedora", "Ubuntu Desktop"],
      answer: 0,
      explain: "RHEL is the commercially supported Red Hat enterprise distribution. CentOS Stream, Rocky Linux, Fedora, and Ubuntu Desktop serve different community, development, or desktop roles.",
      tags: ["distributions", "rhel", "support"]
    },
    {
      q: "On a Rocky Linux system, the command `sudo ____ check-update` is used to verify whether updated packages are available.",
      type: "fill",
      answer: "dnf",
      explain: "Rocky Linux, like RHEL and Fedora, uses the dnf package manager. The `sudo dnf check-update` command queries repositories for available updates before they are installed with `sudo dnf upgrade`.",
      tags: ["rocky-linux", "dnf", "package-management"]
    },
    {
      q: "An organization wants to deploy Linux virtual machines but lacks local hardware with sufficient resources. Which of the following is a valid cloud provider for running Linux VMs?",
      type: "mcq",
      options: [
        "Oracle VirtualBox, a desktop hypervisor that runs VMs on the local workstation.",
        "Microsoft Hyper-V, a host hypervisor that runs VMs on the organization's own servers.",
        "DigitalOcean, a hosted cloud platform that provisions Linux VMs on remote infrastructure.",
        "QEMU, a processor emulator that runs VMs on the local computer.",
        "KVM, a local hypervisor that runs virtual machines on existing hardware."
      ],
      answer: 2,
      explain: "DigitalOcean is a cloud service provider that offers Linux virtual machines. Oracle VirtualBox, Microsoft Hyper-V, and QEMU are local hypervisors or emulators that run on existing hardware, not cloud providers.",
      tags: ["cloud", "virtualization"]
    },
    {
      q: "Match each ls option with its description.",
      type: "command_match",
      command: "ls",
      pairs: [
        { option: "-a", description: "Show all entries, including hidden files" },
        { option: "-l", description: "Use long listing format with file details" },
        { option: "-h", description: "Show human-readable file sizes" },
        { option: "-R", description: "List subdirectories recursively" },
        { option: "-t", description: "Sort by modification time, newest first" }
      ],
      explain: "These options control which entries ls displays and how the output is formatted: -a reveals hidden files, -l adds detail, -h makes sizes readable, -R recurses into subdirectories, and -t sorts by modification time.",
      tags: ["ls", "options"]
    },
    {
      q: "Match each grep option with its description.",
      type: "command_match",
      command: "grep",
      pairs: [
        { option: "-i", description: "Ignore case when matching" },
        { option: "-r", description: "Search directories recursively" },
        { option: "-n", description: "Print line numbers with matches" },
        { option: "-v", description: "Show only lines that do NOT match" }
      ],
      explain: "grep options refine pattern matching: -i makes it case-insensitive, -r descends into directories, -n shows where matches occur, and -v inverts the match.",
      tags: ["grep", "options"]
    },
    {
      q: "Match each Linux system component with its role.",
      type: "match",
      context: "Linux system components",
      pairs: [
        { item: "Linux kernel", match: "Manages CPU, memory, and devices" },
        { item: "GNU utilities", match: "Provides command-line management programs" },
        { item: "User interface", match: "Offers a graphical desktop or command-line shell" },
        { item: "Application software", match: "Runs desktop and server programs" }
      ],
      explain: "The notes describe these four parts as the components of a complete Linux system and identify each part's role.",
      tags: ["linux-concepts", "components"]
    }
  ]
});