window.ReviewApp.content.register({
type: "questions",
cert: "linux-plus",
chapter: "Ch 03 · Files, Directories & Search",
items: [
{
q: "Which pathname is an absolute pathname on Linux?",
type: "mcq",
options: ["/etc/passwd", "etc/passwd", "./etc/passwd", "../etc/passwd", "home/etc/passwd"],
answer: 0,
explain: "An absolute pathname starts at the root directory, `/`. The other choices are relative pathnames.",
tags: ["paths", "absolute"]
},
{
q: "Which command displays your current working directory?",
type: "mcq",
options: ["cd", "pwd", "ls", "whereis", "whoami"],
answer: 1,
explain: "`pwd` prints the working directory. `cd` changes directories, while `ls` lists directory contents.",
tags: ["paths", "pwd"]
},
{
q: "What does `cd` with no argument do?",
type: "mcq",
options: ["Moves to the root directory", "Moves to the previous directory", "Returns to the user's home directory", "Lists the current directory", "Stays in the current directory"],
answer: 2,
explain: "Plain `cd` returns you to your home directory. `cd -` instead returns to the previous working directory.",
tags: ["paths", "cd"]
},
{
q: "Which metacharacter refers to the current user's home directory?",
type: "mcq",
options: ["$", "~", "#", "&", "!"],
answer: 1,
explain: "`~` is the special home-directory variable. `$` is used for shell variables.",
tags: ["paths", "metacharacters"]
},
{
q: "Which command changes to another user's home directory when supported by the shell?",
type: "mcq",
options: ["cd @mary", "cd ~mary", "cd $mary", "cd /mary", "cd /~mary"],
answer: 1,
explain: "`~mary` refers to Mary's home directory, so `cd ~mary` changes there.",
tags: ["paths", "cd", "metacharacters"]
},
{
q: "What is a relative pathname?",
type: "mcq",
options: ["A pathname interpreted from the root directory regardless of the current working directory.", "A pathname interpreted from the current working directory rather than from the root directory.", "A pathname that contains only a filename and never includes a directory component.", "A pathname stored in a system configuration file such as `/etc`, not in the directory tree.", "A pathname expanded from the user's home directory before the command runs."],
answer: 1,
explain: "A relative pathname is interpreted from the current working directory. An absolute pathname starts at `/`.",
tags: ["paths", "relative"]
},
{
q: "In the Linux directory tree, what is the parent directory?",
type: "mcq",
options: ["The directory closest to `/dev` in the filesystem tree, regardless of the current path.", "The directory one level closer to the root than the current directory in the tree.", "The home directory assigned to the current user rather than the current path's parent.", "The directory that contains the system administrator's home directory in every case.", "The directory one level farther from the root than the current directory."],
answer: 1,
explain: "The parent directory is one level closer to the root than the current directory.",
tags: ["paths", "directories"]
},
{
q: "Which shell feature lets you type enough unique characters and press Tab to complete a pathname?",
type: "mcq",
options: ["Piping", "Tab completion", "Command grouping", "Variable expansion", "Command substitution"],
answer: 1,
explain: "Bash provides Tab completion. If multiple matches exist, it can present the possibilities.",
tags: ["bash", "paths"]
},
{
q: "Which directory contains system-wide configuration files?",
type: "mcq",
options: ["/etc", "/var", "/srv", "/opt", "/var/config"],
answer: 0,
explain: "`/etc` stores system-wide configuration files. `/var` stores variable data such as logs and caches.",
tags: ["filesystem", "etc"]
},
{
q: "Which directory contains user home directories?",
type: "mcq",
options: ["/home", "/root", "/usr", "/tmp", "/users"],
answer: 0,
explain: "`/home` contains ordinary users' home directories. `/root` is specifically the root user's home directory.",
tags: ["filesystem", "home"]
},
{
q: "Which directory is the home directory for the root user?",
type: "mcq",
options: ["/home/root", "/root", "/usr/root", "/var/root", "/home/admin"],
answer: 1,
explain: "The notes identify `/root` as the root user's home directory.",
tags: ["filesystem", "root"]
},
{
q: "Where are Linux kernel and boot-related files normally stored?",
type: "mcq",
options: ["/boot", "/etc", "/run", "/usr/src", "/var/lib/boot"],
answer: 0,
explain: "`/boot` contains the Linux kernel, initramfs, and boot-related files.",
tags: ["filesystem", "boot"]
},
{
q: "Which directory is associated with UEFI bootloaders and the EFI System Partition?",
type: "mcq",
options: ["/boot/efi", "/etc/efi", "/usr/efi", "/var/efi", "/boot/grub"],
answer: 0,
explain: "The notes identify `/boot/efi` as the EFI System Partition for UEFI bootloaders.",
tags: ["filesystem", "uefi"]
},
{
q: "Which directory contains most system commands and utilities?",
type: "mcq",
options: ["/usr", "/var", "/srv", "/mnt", "/home"],
answer: 0,
explain: "`/usr` contains most system commands and utilities, along with libraries and other shared data.",
tags: ["filesystem", "usr"]
},
{
q: "Which subdirectory contains user binary commands?",
type: "mcq",
options: ["/usr/bin", "/usr/sbin", "/usr/lib", "/usr/src", "/usr/share"],
answer: 0,
explain: "The notes identify `/usr/bin` as the location for user binary commands.",
tags: ["filesystem", "usr", "bin"]
},
{
q: "Which `/usr` subdirectory contains system binary commands?",
type: "mcq",
options: ["/usr/share", "/usr/sbin", "/usr/include", "/usr/local", "/usr/bin"],
answer: 1,
explain: "`/usr/sbin` contains system binary commands. `/usr/bin` contains user binary commands.",
tags: ["filesystem", "usr", "sbin"]
},
{
q: "Which `/usr` subdirectories contain libraries?",
type: "mcq",
options: ["/usr/lib and /usr/lib64", "/usr/bin and /usr/sbin", "/usr/src and /usr/share", "/usr/local and /usr/include", "/usr/libexec and /usr/share"],
answer: 0,
explain: "The notes list `/usr/lib` and `/usr/lib64` as library directories.",
tags: ["filesystem", "libraries"]
},
{
q: "Which directory is intended for optional or third-party application software?",
type: "mcq",
options: ["/opt", "/srv", "/tmp", "/media", "/usr/share"],
answer: 0,
explain: "`/opt` is used for optional or third-party application software.",
tags: ["filesystem", "opt"]
},
{
q: "Which directory contains variable data such as logs, spools, caches, and databases?",
type: "mcq",
options: ["/var", "/usr", "/boot", "/proc", "/etc"],
answer: 0,
explain: "`/var` contains variable data. Its subdirectories include `/var/log`, `/var/lib`, and `/var/cache`.",
tags: ["filesystem", "var"]
},
{
q: "Which directory contains system and application logs?",
type: "mcq",
options: ["/var/log", "/var/lib", "/var/cache", "/run/log", "/var/spool"],
answer: 0,
explain: "`/var/log` is used for system and application logs.",
tags: ["filesystem", "logs", "var"]
},
{
q: "Which directory is used for temporary files created by programs?",
type: "mcq",
options: ["/tmp", "/srv", "/mnt", "/run", "/var/cache"],
answer: 0,
explain: "`/tmp` contains temporary files used by programs.",
tags: ["filesystem", "tmp"]
},
{
q: "Which directory is intended for data served by system services such as web or FTP services?",
type: "mcq",
options: ["/srv", "/media", "/opt", "/proc", "/usr/share"],
answer: 0,
explain: "`/srv` contains data served by system services, such as web, FTP, or repositories.",
tags: ["filesystem", "srv"]
},
{
q: "Which directory is a temporary manual mount point?",
type: "mcq",
options: ["/mnt", "/media", "/run", "/boot", "/home"],
answer: 0,
explain: "`/mnt` is described as a temporary manual mount point. `/media` is for automatically mounted removable media.",
tags: ["filesystem", "mounts"]
},
{
q: "Which directory is commonly used for automatically mounted removable media such as USB devices and DVDs?",
type: "mcq",
options: ["/media", "/mnt", "/dev", "/srv", "/sys"],
answer: 0,
explain: "`/media` is used for auto-mounted removable media.",
tags: ["filesystem", "media"]
},
{
q: "Which directory is a virtual filesystem containing process and kernel information?",
type: "mcq",
options: ["/proc", "/sys", "/dev", "/run", "/etc/kernel"],
answer: 0,
explain: "`/proc` is a virtual filesystem for process and kernel information. `/sys` exposes devices and kernel interfaces.",
tags: ["filesystem", "proc"]
},
{
q: "Which directory contains device files?",
type: "mcq",
options: ["/dev", "/proc", "/sys", "/run", "/sys/kernel"],
answer: 0,
explain: "`/dev` contains device files, usually through devtmpfs.",
tags: ["filesystem", "dev", "devices"]
},
{
q: "Which directory stores runtime process state and replaces `/var/run`?",
type: "mcq",
options: ["/run", "/tmp", "/proc", "/var/lib", "/var/tmp"],
answer: 0,
explain: "`/run` stores runtime process state and replaces `/var/run`.",
tags: ["filesystem", "run"]
},
{
q: "Which shell metacharacter expands to a shell variable's value?",
type: "mcq",
options: ["$", "#", ";", "|", "%"],
answer: 0,
explain: "`$` tells the shell that the following text refers to a variable.",
tags: ["metacharacters", "variables"]
},
{
q: "Which shell metacharacter runs a command in the background?",
type: "mcq",
options: ["&", ";", "#", ">", "!"],
answer: 0,
explain: "`&` causes command execution in the background. `;` terminates one command before another.",
tags: ["metacharacters", "background"]
},
{
q: "Which metacharacter is used for command piping?",
type: "mcq",
options: ["|", ">", "&", "$", ">>"],
answer: 0,
explain: "`|` pipes the output of one command into another command.",
tags: ["metacharacters", "pipe"]
},
{
q: "Which wildcard represents any number of characters?",
type: "mcq",
options: ["?", "*", "[ ]", "~", "{ }"],
answer: 1,
explain: "The `*` wildcard represents anything, while `?` represents a single character.",
tags: ["wildcards", "metacharacters"]
},
{
q: "Which wildcard represents a single character?",
type: "mcq",
options: ["*", "?", "[ ]", "#", "{ }"],
answer: 1,
explain: "`?` matches a single character. `*` can match any number of characters.",
tags: ["wildcards", "metacharacters"]
},
{
q: "Which shell metacharacter is used for a range wildcard?",
type: "mcq",
options: ["[ ]", "*", "?", "{ }", "~"],
answer: 0,
explain: "`[ ]` is identified in the notes as the range wildcard.",
tags: ["wildcards", "metacharacters"]
},
{
q: "What is the purpose of single quotes in shell metacharacter handling?",
type: "mcq",
options: ["Allow variables to expand", "Treat text literally", "Run text in the background", "Create a pipeline", "Perform command substitution"],
answer: 1,
explain: "Single quotes make the enclosed text literal. Double quotes allow variables.",
tags: ["quoting", "metacharacters"]
},
{
q: "Which quoting form allows variables to expand?",
type: "mcq",
options: ["Single quotes", "Double quotes", "Backslashes only", "Parentheses", "Here documents"],
answer: 1,
explain: "The notes state that double quotes allow variables, while single quotes preserve literal text.",
tags: ["quoting", "variables"]
},
{
q: "What is the primary purpose of `echo`?",
type: "mcq",
options: ["Display text on the terminal", "Create a directory", "Delete a file", "Search the filesystem", "Read input from the terminal"],
answer: 0,
explain: "`echo` prints text to the terminal screen.",
tags: ["shell", "echo"]
},
{
q: "Which filename characteristic makes a file hidden in Linux?",
type: "mcq",
options: ["It ends in `.hidden`", "It begins with a period", "It contains a dash", "It has no extension", "It is owned by the root user"],
answer: 1,
explain: "Files whose names begin with `.` are hidden files. `ls -a` displays them.",
tags: ["filenames", "hidden"]
},
{
q: "Which operator appends command output to an existing file without replacing its contents?",
type: "mcq",
options: [">", ">>", "<", "|", "&"],
answer: 1,
explain: "`>>` appends standard output to a file. A single `>` replaces the file's previous contents, while the other operators serve different shell functions.",
tags: ["shell", "redirection"]
},
{
q: "Which statement about Linux file extensions is correct?",
type: "mcq",
options: ["Every executable must end in `.exe`", "Extensions are mandatory", "Extensions are optional", "Only text files may have extensions", "Extensions determine file permissions"],
answer: 2,
explain: "Linux does not require filename extensions; they are optional.",
tags: ["filenames", "extensions"]
},
{
q: "What is the maximum filename length in Linux?",
type: "mcq",
options: ["64 characters", "128 characters", "255 characters", "1024 characters", "512 characters"],
answer: 2,
explain: "The notes state that filenames can include up to 255 characters.",
tags: ["filenames"]
},
{
q: "Which command displays file and subdirectory names along with metadata?",
type: "mcq",
options: ["ls", "cat", "file", "stat", "pwd"],
answer: 0,
explain: "`ls` lists files and directories and can display metadata. `stat` provides more detailed metadata for a file.",
tags: ["ls", "metadata"]
},
{
q: "Which `ls` option displays a directory's own metadata instead of its contents?",
type: "mcq",
options: ["-a", "-d", "-R", "-i", "-D"],
answer: 1,
explain: "`-d` displays the directory entry itself instead of listing its contents.",
tags: ["ls", "options"]
},
{
q: "Which `ls` option appends indicators showing file types?",
type: "mcq",
options: ["-F", "-h", "-l", "-R", "-g"],
answer: 0,
explain: "`ls -F` appends type indicators such as `/` for directories and `*` for executables.",
tags: ["ls", "options"]
},
{
q: "Which `ls` option displays inode numbers?",
type: "mcq",
options: ["-i", "-n", "-o", "-I", "-L"],
answer: 0,
explain: "`ls -i` displays each file's inode number.",
tags: ["ls", "inode"]
},
{
q: "An `ls -l` line begins `-rw-r--r-- 2 alex staff 512 ...`. What does the `2` represent?",
type: "mcq",
options: ["The permission mask", "The hard-link count", "The file owner", "The file size", "The file type"],
answer: 1,
explain: "The number after the permission bits in long format is the count of directory entries referring to the file's inode.",
tags: ["ls", "metadata", "hard-links"]
},
{
q: "Which shell operator runs the second command after the first finishes regardless of the first command's exit status?",
type: "mcq",
options: [";", "|", "&", ">", "$"],
answer: 0,
explain: "A semicolon separates commands so the next command runs after the first completes, regardless of whether it succeeded.",
tags: ["shell", "command-separation"]
},
{
q: "A script must select filenames ending in `.log` before passing them to a command. Which pattern is a shell wildcard rather than a regular expression?",
type: "mcq",
options: ["`*.log`", "`^.*\\.log$`", "`log+`", "`[[:digit:]]`", "`\\b.log\\b`"],
answer: 0,
explain: "`*.log` is shell filename-expansion syntax. The other choices use regular-expression notation and are interpreted by tools such as `grep -E`.",
tags: ["wildcards", "regex", "shell"]
},
{
q: "In an `ls -l` entry, what does the first character `d` represent?",
type: "mcq",
options: ["Device", "Directory", "Data file", "Daemon", "Document"],
answer: 1,
explain: "The first character identifies file type, and `d` means directory.",
tags: ["ls", "filetypes"]
},
{
q: "In an `ls -l` entry, what does the first character `l` represent?",
type: "mcq",
options: ["Log file", "Library", "Symbolic link", "Local file", "Regular file"],
answer: 2,
explain: "The leading `l` identifies a symbolic link.",
tags: ["ls", "symlink"]
},
{
q: "Which command creates an empty file or updates a file's timestamps?",
type: "mcq",
options: ["mkdir", "touch", "cat", "file", "chmod"],
answer: 1,
explain: "`touch` creates an empty file if needed or updates access and modification timestamps for an existing file.",
tags: ["touch", "files"]
},
{
q: "Which command creates a directory?",
type: "mcq",
options: ["mkdir", "rmdir", "touch", "cp", "chmod"],
answer: 0,
explain: "`mkdir` creates directories. `rmdir` removes empty directories.",
tags: ["mkdir", "directories"]
},
{
q: "Which `mkdir` option creates missing parent directories automatically?",
type: "mcq",
options: ["-v", "-p", "-m", "-Z", "-d"],
answer: 1,
explain: "`mkdir -p` creates any missing parent directories needed for the full path.",
tags: ["mkdir", "options"]
},
{
q: "Which `mkdir` option prints a message for each directory created?",
type: "mcq",
options: ["-p", "-v", "-m", "-Z", "-d"],
answer: 1,
explain: "`-v` is verbose and reports each directory created.",
tags: ["mkdir", "options"]
},
{
q: "A command should read its standard input from `records.txt` instead of the keyboard. Which shell operator is used?",
type: "mcq",
options: ["<", ">", ">>", "|", "&"],
answer: 0,
explain: "The `<` operator redirects a file into a command's standard input. The other operators redirect output, append output, pipe data, or background a command.",
tags: ["shell", "redirection"]
},
{
q: "Which command returns to the previous working directory?",
type: "mcq",
options: ["cd ..", "cd -", "cd ~", "cd /", "cd /home"],
answer: 1,
explain: "`cd -` jumps to the previous working directory. Plain `cd` returns home.",
tags: ["cd", "paths"]
},
{
q: "Which command copies a file or directory locally?",
type: "mcq",
options: ["mv", "cp", "rsync", "ln", "chmod"],
answer: 1,
explain: "`cp` copies files or directories. `mv` moves or renames them.",
tags: ["cp", "files"]
},
{
q: "What does `cp` require in its basic syntax?",
type: "mcq",
options: ["Only a source", "Only a destination", "A source and a destination", "A source and a pipe", "A source and a permission mask"],
answer: 2,
explain: "Both the source and destination are required in the basic `cp` syntax.",
tags: ["cp", "syntax"]
},
{
q: "Which option is required by `cp` when copying a directory tree?",
type: "mcq",
options: ["-h", "-R", "-i", "-u", "-f"],
answer: 1,
explain: "`-R` or `-r` recursively copies a directory and its contents.",
tags: ["cp", "recursive"]
},
{
q: "Two backup copies exist and only source files that are newer should replace their destinations. Which `cp` option expresses this policy?",
type: "mcq",
options: ["-u", "-n", "-i", "-a", "-v"],
answer: 0,
explain: "`cp -u` updates a destination only when the source is newer or the destination is missing, making it suitable for this update policy.",
tags: ["cp", "update"]
},
{
q: "Which `cp` option preserves permissions, ownership, and timestamps while copying recursively?",
type: "mcq",
options: ["-a", "-f", "-n", "-v", "-R"],
answer: 0,
explain: "`-a` is archive mode and performs a recursive copy while preserving permissions, ownership, and timestamps.",
tags: ["cp", "archive"]
},
{
q: "Which `cp` option asks before overwriting an existing destination file?",
type: "mcq",
options: ["-i", "-f", "-u", "-n", "-R"],
answer: 0,
explain: "`-i` is interactive and asks for confirmation before overwriting an existing destination file.",
tags: ["cp", "overwrite"]
},
{
q: "Which `cp` option guarantees that an existing destination file is not overwritten?",
type: "mcq",
options: ["-f", "-i", "-n", "-u", "-R"],
answer: 2,
explain: "`-n` means no-clobber and never overwrites an existing destination file.",
tags: ["cp", "overwrite"]
},
{
q: "Which command moves or renames a file or directory?",
type: "mcq",
options: ["mv", "cp", "ln", "rsync", "install"],
answer: 0,
explain: "`mv` moves files or directories and can also rename them.",
tags: ["mv", "files"]
},
{
q: "Can `mv` rename a directory without a special recursive option?",
type: "mcq",
options: ["Yes", "No, `-R` is required", "Only with `-p`", "Only for empty directories", "Only when the directory is mounted"],
answer: 0,
explain: "Renaming an entire directory with `mv` works like renaming a file and requires no extra option.",
tags: ["mv", "directories"]
},
{
q: "Which command can move a file to a new directory and rename it in one operation?",
type: "mcq",
options: ["mv", "cp", "ln", "touch", "mkdir"],
answer: 0,
explain: "`mv source new-location/new-name` can move and rename in a single command.",
tags: ["mv", "paths"]
},
{
q: "Which command is useful for fast copies of large numbers of files and backups?",
type: "mcq",
options: ["rmdir", "rsync", "cat", "which", "tar"],
answer: 1,
explain: "`rsync` is used for fast copying of large files or many files and is commonly used for backups.",
tags: ["rsync", "backup"]
},
{
q: "Which `rsync` option enables archive mode?",
type: "mcq",
options: ["-a", "-h", "-t", "--stats", "-r"],
answer: 0,
explain: "`-a` is archive mode and is shorthand for `-rlptgoD`.",
tags: ["rsync", "archive"]
},
{
q: "Which command is the main utility for removing files and directory trees?",
type: "mcq",
options: ["rm", "rmdir", "mv", "cp", "unlink"],
answer: 0,
explain: "`rm` is the main deletion utility. `rmdir` specifically removes empty directories.",
tags: ["rm", "deletion"]
},
{
q: "Which `rm` option asks for confirmation before deleting each file?",
type: "mcq",
options: ["-i", "-f", "-I", "-v", "-d"],
answer: 0,
explain: "`rm -i` is interactive and prompts before deleting each file.",
tags: ["rm", "safety"]
},
{
q: "Which `rm` option suppresses errors for nonexistent targets and prompts?",
type: "mcq",
options: ["-i", "-f", "-I", "-d", "-n"],
answer: 1,
explain: "`-f` forces deletion, suppressing prompts and continuing even when some target files do not exist.",
tags: ["rm", "options"]
},
{
q: "Which `rm` option asks only once before deleting more than three files or before recursive deletion?",
type: "mcq",
options: ["-I", "-i", "-f", "-d", "-n"],
answer: 0,
explain: "`-I` provides a single confirmation in the described bulk or recursive cases, unlike `-i`, which prompts for each file.",
tags: ["rm", "safety"]
},
{
q: "Which option allows `rm` to remove a directory tree recursively?",
type: "mcq",
options: ["-R", "-d", "-p", "-a", "-u"],
answer: 0,
explain: "`rm -R` or `rm -r` recursively removes directory contents and then the directories.",
tags: ["rm", "recursive"]
},
{
q: "Which command removes empty directories only?",
type: "mcq",
options: ["rm", "rmdir", "mkdir", "mv", "unlink"],
answer: 1,
explain: "`rmdir` removes empty directories only. Non-empty directories require recursive `rm`.",
tags: ["rmdir", "directories"]
},
{
q: "Which `rmdir` option removes a chain of empty parent directories?",
type: "mcq",
options: ["-p", "-v", "-R", "-i", "-d"],
answer: 0,
explain: "`rmdir -p` removes a directory tree of empty directories when given the full path.",
tags: ["rmdir", "options"]
},
{
q: "What is the key structural difference between hard and symbolic links?",
type: "mcq",
options: ["Hard links share an inode; symbolic links do not", "Symbolic links share an inode; hard links do not", "Both always have different inodes", "Both always have the same inode", "Both require the target to remain on the same filesystem"],
answer: 0,
explain: "Hard links refer to the same inode and underlying data. Symbolic links point to the original name and location and have their own inode.",
tags: ["links", "inode"]
},
{
q: "Which command creates a hard link?",
type: "mcq",
options: ["ln", "ln -s", "readlink", "cp -a", "readlink -f"],
answer: 0,
explain: "`ln original linked` creates a hard link. `ln -s` creates a symbolic link.",
tags: ["links", "ln"]
},
{
q: "What must be true before creating a hard link?",
type: "mcq",
options: ["The original may be absent if the destination name is created first.", "The destination name must already exist, and both paths may use different filesystems.", "The original must exist, the new name must be unused, and both paths must use one filesystem.", "The two link names must use different filesystems so their inodes remain separate.", "The target may be a directory when both names use one filesystem."],
answer: 2,
explain: "The original must exist, the new name must not already exist, and hard links must reside on the same filesystem.",
tags: ["links", "hardlink"]
},
{
q: "Which command creates a symbolic link?",
type: "mcq",
options: ["ln -s", "ln -P", "readlink", "cp -a", "ln"],
answer: 0,
explain: "`ln -s` or `ln --symbolic` creates a symbolic link.",
tags: ["links", "symlink"]
},
{
q: "Which statement about symbolic links is correct?",
type: "mcq",
options: ["They must share an inode with the original", "They can point across filesystems", "They duplicate the target's data", "They cannot become stale", "They always require an existing target at creation time"],
answer: 1,
explain: "Symbolic links can exist on different filesystems because they point to the original file's name and location rather than sharing its inode.",
tags: ["links", "symlink"]
},
{
q: "What command can resolve a chain of symbolic links to its final target?",
type: "mcq",
options: ["readlink -f", "stat", "ls -i", "which -a", "basename"],
answer: 0,
explain: "`readlink -f <file>` resolves a chain of symbolic links to the final target name and directory location.",
tags: ["links", "readlink"]
},
{
q: "What is a stale symbolic link?",
type: "mcq",
options: ["A hard link with two directory entries that refer to the same inode.", "A symbolic link whose target was moved or deleted, so the link no longer resolves.", "A file whose timestamp no longer matches the metadata in its directory entry.", "A link that cannot be changed because its filesystem is mounted read-only.", "A symbolic link whose target is on another filesystem."],
answer: 1,
explain: "A stale or dead link points to a target that has been deleted or moved. The link itself is not automatically updated or removed.",
tags: ["links", "security"]
},
{
q: "Which command displays the contents of a small text file and can concatenate multiple files?",
type: "mcq",
options: ["cat", "grep", "less", "file", "strings"],
answer: 0,
explain: "`cat` concatenates and displays text files and is commonly used for small files.",
tags: ["cat", "reading"]
},
{
q: "Which `cat` option displays line numbers?",
type: "mcq",
options: ["-l", "-n", "-c", "-N", "-s"],
answer: 1,
explain: "`cat -n` numbers the lines of the displayed file.",
tags: ["cat", "options"]
},
{
q: "Which `grep` option enables extended regular expressions such as `+` without escaping it?",
type: "mcq",
options: ["-E", "-F", "-i", "-v", "-n"],
answer: 0,
explain: "`grep -E` enables extended regular expressions. `-F` selects literal matching, while the remaining choices control other search behaviors.",
tags: ["grep", "regex"]
},
{
q: "An administrator needs literal matching for a pattern containing `.` and `*`, not regular-expression interpretation. Which `grep` option should be used?",
type: "mcq",
options: ["-F", "-E", "-i", "-R", "-c"],
answer: 0,
explain: "`grep -F` treats the pattern as fixed text, so characters such as `.` and `*` do not act as regular-expression operators.",
tags: ["grep", "fixed-strings"]
},
{
q: "A live filesystem search must match names using a regular expression rather than shell wildcard syntax. Which `find` criterion is appropriate?",
type: "mcq",
options: ["-regex", "-name", "-type", "-inum", "-maxdepth"],
answer: 0,
explain: "`find -regex` applies a regular expression to the pathname. `-name` uses filename-pattern matching instead.",
tags: ["find", "regex"]
},
{
q: "Which `grep` option displays the number of matching lines?",
type: "mcq",
options: ["-c", "-n", "-v", "-i", "-m"],
answer: 0,
explain: "`grep -c` reports the number of matching lines.",
tags: ["grep", "options"]
},
{
q: "Which command normally displays the first 10 lines of a file?",
type: "mcq",
options: ["head", "tail", "more", "pr", "wc"],
answer: 0,
explain: "`head` displays the first lines of a file, defaulting to 10.",
tags: ["head", "reading"]
},
{
q: "Which command normally displays the last 10 lines of a file?",
type: "mcq",
options: ["head", "tail", "less", "cat", "sed"],
answer: 1,
explain: "`tail` displays the last lines of a file, defaulting to 10.",
tags: ["tail", "reading"]
},
{
q: "Which `tail` option follows a file and displays newly appended lines?",
type: "mcq",
options: ["-f", "-n", "-c", "-w", "--pid"],
answer: 0,
explain: "`tail -f` follows the file and is useful for monitoring logs in real time.",
tags: ["tail", "logs"]
},
{
q: "On systems using journald, which command can follow new journal messages?",
type: "mcq",
options: ["journalctl --follow", "tail --journal", "grep -f journal", "less --follow", "journalctl --since today"],
answer: 0,
explain: "`journalctl --follow` watches messages being added to the systemd journal.",
tags: ["journald", "logs"]
},
{
q: "Which pager can move backward through a file while `more` cannot?",
type: "mcq",
options: ["less", "cat", "head", "pr", "more"],
answer: 0,
explain: "`less` supports backward movement, while `more` does not.",
tags: ["less", "more", "pager"]
},
{
q: "Which key exits `less`?",
type: "mcq",
options: ["x", "q", "Esc", "Ctrl+D", "Space"],
answer: 1,
explain: "Press `q` to exit `less`.",
tags: ["less", "pager"]
},
{
q: "Which command is the default pager for `man` pages?",
type: "mcq",
options: ["more", "less", "cat", "pr", "view"],
answer: 1,
explain: "The notes state that `less` is the default man-page pager.",
tags: ["man", "less"]
},
{
q: "What is the purpose of the `file` command?",
type: "mcq",
options: ["Show detailed inode metadata", "Determine a file's basic type", "Find a file by owner", "Compare two files", "Extract printable strings"],
answer: 1,
explain: "`file` provides basic information about a file's type, such as whether it is an executable text file.",
tags: ["file", "metadata"]
},
{
q: "Which command displays detailed metadata including inode, size, device, and timestamps?",
type: "mcq",
options: ["ls", "stat", "file", "which", "ls -l"],
answer: 1,
explain: "`stat` provides detailed metadata such as size, inode number, device, and access/modify/change timestamps.",
tags: ["stat", "metadata"]
},
{
q: "Which command compares two text files line by line?",
type: "mcq",
options: ["diff", "grep", "sdiff", "file", "cmp"],
answer: 0,
explain: "`diff` compares two text files line by line. `sdiff` provides a more visually oriented side-by-side comparison.",
tags: ["diff", "comparison"]
},
{
q: "What does `diff -q` do when two files differ?",
type: "mcq",
options: ["Shows every changed line", "Prints a simple message saying the files differ", "Creates an `ed` script", "Displays the files side by side", "Shows a unified diff"],
answer: 1,
explain: "`-q` means brief and reports that the files differ without showing the detailed changes.",
tags: ["diff", "options"]
},
{
q: "Which `diff` option displays two files side by side?",
type: "mcq",
options: ["-y", "-q", "-e", "-s", "-u"],
answer: 0,
explain: "`diff -y` displays the files in two columns for side-by-side comparison.",
tags: ["diff", "options"]
},
{
q: "Which command shows the full pathname of a shell command by searching directories in `PATH`?",
type: "mcq",
options: ["which", "whereis", "locate", "find", "apropos"],
answer: 0,
explain: "`which` searches directories in `$PATH` and shows the command's full pathname. It can also reveal aliases.",
tags: ["which", "path"]
},
{
q: "What does the `PATH` environment variable contain?",
type: "mcq",
options: ["User passwords", "Directories searched for command binaries", "Filesystem mount points", "Kernel parameters", "Command aliases"],
answer: 1,
explain: "`PATH` specifies the directories Linux searches for a command's binary. Entries are separated by colons.",
tags: ["path", "environment"]
},
{
q: "Which command locates a program binary, source files, and man pages?",
type: "mcq",
options: ["whereis", "which", "locate", "find", "apropos"],
answer: 0,
explain: "`whereis` locates a command's program binary, source code files, and man pages.",
tags: ["whereis", "search"]
},
{
q: "Which command searches a prebuilt database for files?",
type: "mcq",
options: ["find", "locate", "which", "stat", "whereis"],
answer: 1,
explain: "`locate` searches a prebuilt database rather than the live filesystem.",
tags: ["locate", "search"]
},
{
q: "Why might `locate` fail to find a file created recently?",
type: "mcq",
options: ["It searches only `/home`", "Its database is typically refreshed only once per day", "It ignores text files", "It only searches mounted USB devices", "The file name begins with a period"],
answer: 1,
explain: "The notes state that the `locate` database is typically updated once daily, so newly created files may not appear until it is refreshed.",
tags: ["locate", "database"]
},
{
q: "Which command can manually refresh the database used by `locate`?",
type: "mcq",
options: ["updatedb", "updated", "rebuilddb", "locate --update", "locate --rebuild"],
answer: 0,
explain: "`updatedb` refreshes the `locate` database and requires superuser privileges according to the notes.",
tags: ["locate", "updatedb"]
},
{
q: "Which option makes `locate` match only the filename portion, ignoring directory names?",
type: "mcq",
options: ["-b", "-w", "-A", "-r", "-d"],
answer: 0,
explain: "`locate -b` matches the basename only. `-w` includes the directory names.",
tags: ["locate", "options"]
},
{
q: "Which command searches files recursively using metadata such as owner, modification time, or permissions?",
type: "mcq",
options: ["find", "which", "whereis", "cat", "locate"],
answer: 0,
explain: "`find` recursively searches from a starting path using criteria such as name, owner, time, size, type, or permissions.",
tags: ["find", "metadata"]
},
{
q: "What does `find .` use as its starting directory?",
type: "mcq",
options: ["The root directory", "The current working directory", "The user's home directory", "The `/tmp` directory", "The directory containing the shell executable"],
answer: 1,
explain: "A dot (`.`) designates the current working directory as `find`'s starting point.",
tags: ["find", "paths"]
},
{
q: "Which `find` criterion searches for a specified filename?",
type: "mcq",
options: ["-name", "-type", "-user", "-size", "-printf"],
answer: 0,
explain: "`find -name` searches for a specified filename.",
tags: ["find", "name"]
},
{
q: "Which `find` criterion searches for a specific inode number?",
type: "mcq",
options: ["-inum", "-inode", "-i", "-id", "-links"],
answer: 0,
explain: "`-inum` searches for files with the specified inode number.",
tags: ["find", "inode"]
},
{
q: "Which `find` criterion searches by file type?",
type: "mcq",
options: ["-type", "-name", "-user", "-size", "-perm"],
answer: 0,
explain: "`-type` searches by type, such as `f` for regular file, `d` for directory, or `l` for symbolic link.",
tags: ["find", "filetypes"]
},
{
q: "Which `find` option limits how many levels down the directory tree are searched?",
type: "mcq",
options: ["-maxdepth", "-depth", "-mindepth", "-size", "-empty"],
answer: 0,
explain: "`-maxdepth` limits the depth of the recursive search.",
tags: ["find", "maxdepth"]
},
{
q: "Which command can audit `/usr/bin` for the SUID permission bit?",
type: "mcq",
options: ["find /usr/bin -perm /4000", "find /usr/bin -mode 4000", "ls /usr/bin -suid", "grep /usr/bin 4000", "find /usr/bin -suid"],
answer: 0,
explain: "The notes give `find /usr/bin -perm /4000`; the leading `/` causes the search to match the SUID bit while ignoring other permission bits.",
tags: ["find", "suid", "permissions"]
},
{
q: "To find files modified within the last day, which `find` criterion expresses age in days?",
type: "mcq",
options: ["-mtime", "-name", "-inum", "-type", "-maxdepth"],
answer: 0,
explain: "`find -mtime` filters by the number of whole days since a file was modified. The other criteria test different metadata.",
tags: ["find", "time"]
},
{
q: "Which `grep` option causes directories encountered while searching to be skipped?",
type: "mcq",
options: ["-d skip", "-r", "-R", "-v", "-h"],
answer: 0,
explain: "`grep -d skip` tells `grep` to skip directories instead of producing errors for them in the described search.",
tags: ["grep", "directories"]
},
{
q: "Which of the following are valid Linux file types?",
type: "multi",
options: ["Encrypted files", "Text files", "Binary data files", "Executable program files", "Directory files"],
answer: [1, 2, 3, 4],
explain: "The notes categorize files as text, binary data, executable programs, directories, linked files, named pipes/sockets (and device files). Encryption and compression are file properties, not distinct file types.",
tags: ["files", "filetypes"]
},
{
q: "Which statements about the Linux directory tree are correct?",
type: "multi",
options: ["Every mounted filesystem must expose a separate top-level root", "It has a single root directory `/`", "Different filesystems can be mounted at directories", "It combines storage devices into one virtual directory structure", "Every filesystem must use a separate visible device tree"],
answer: [1, 2, 3],
explain: "Linux presents a single directory tree rooted at `/`, and different storage filesystems can be mounted into that tree.",
tags: ["filesystem", "paths"]
},
{
q: "An `ls -l` entry begins with `c`. What kind of object does that identify?",
type: "mcq",
options: ["A character device", "A block device", "A named pipe", "A socket", "A regular file"],
answer: 0,
explain: "The leading `c` in an `ls -l` entry identifies a character device, such as a terminal device.",
tags: ["ls", "filetypes", "devices"]
},
{
q: "`ls -F` displays a trailing backtick on an entry. Which file type does that indicator identify?",
type: "mcq",
options: ["A named pipe (FIFO)", "A socket", "A symbolic link", "An executable", "A directory"],
answer: 0,
explain: "The backtick indicator identifies a named pipe, also called a FIFO. The other choices use different `ls -F` indicators.",
tags: ["ls", "filetypes", "pipes"]
},
{
q: "A backup job must transfer only changed file data to a remote host over SSH. Which utility best matches that job?",
type: "mcq",
options: ["rsync", "cp", "mv", "rmdir", "locate"],
answer: 0,
explain: "`rsync` is designed for efficient synchronization and can transfer files over a network through OpenSSH, unlike the local file-management commands listed here.",
tags: ["rsync", "backup", "ssh"]
},
{
q: "A deployment script should move a source only when it is newer than the destination. Which `mv` option expresses that policy?",
type: "mcq",
options: ["-u", "-n", "-i", "-f", "-v"],
answer: 0,
explain: "`mv -u` updates the destination only when the source is newer or the destination is missing.",
tags: ["mv", "update"]
},
{
q: "Which directory is intended for programs installed locally by an administrator rather than files managed by the distribution?",
type: "mcq",
options: ["/usr/local", "/opt", "/srv", "/var/lib", "/home"],
answer: 0,
explain: "`/usr/local` is intended for locally installed programs and data, keeping them separate from distribution-managed files under `/usr`.",
tags: ["filesystem", "usr-local"]
},
{
q: "A directory contains a socket used for local interprocess communication. Which first character would `ls -l` show for that entry?",
type: "mcq",
options: ["s", "p", "b", "c", "l"],
answer: 0,
explain: "The leading `s` identifies a socket in `ls -l` output. The other characters identify a named pipe, block device, character device, or symbolic link.",
tags: ["ls", "filetypes", "sockets"]
},
{
q: "Two reports need to be formatted in parallel columns for review. Which utility and option are intended for side-by-side formatted output?",
type: "mcq",
options: ["`pr -m`", "`diff -q`", "`cat -n`", "`head`", "`stat`"],
answer: 0,
explain: "`pr -m` formats files in parallel columns. `diff -y` compares files side by side, but it is a comparison tool rather than a report-formatting utility.",
tags: ["pr", "formatting", "text"]
},
{
q: "While reviewing a man page in `less`, which key sequence starts a backward search?",
type: "mcq",
options: ["?", "/", "q", "Space", "Esc + V"],
answer: 0,
explain: "Pressing `?` starts a backward search in `less`; `/` searches forward, `q` exits, and `Esc + V` moves back one page.",
tags: ["less", "search", "pager"]
},
{
q: "An executable runs when invoked with its full pathname but not by name alone. Which environment setting should be checked first?",
type: "mcq",
options: ["PATH", "HOME", "SHELL", "PWD", "TERM"],
answer: 0,
explain: "The shell searches the directories listed in `PATH` when a command is entered without a pathname. A missing directory there can prevent name-based execution.",
tags: ["path", "environment", "troubleshooting"]
},
{
q: "`locate` should report only how many database matches exist, not their paths. Which option is appropriate?",
type: "mcq",
options: ["-c", "-b", "-i", "-A", "-q"],
answer: 0,
explain: "`locate -c` prints a count of matching database entries instead of listing every pathname.",
tags: ["locate", "options", "count"]
},
{
q: "An administrator wants to find zero-byte files and empty directories under `/var/tmp`. Which `find` criterion should be used?",
type: "mcq",
options: ["-empty", "-size", "-type", "-name", "-mtime"],
answer: 0,
explain: "`find -empty` selects empty regular files and directories. The other criteria filter by size, type, name, or modification age.",
tags: ["find", "empty"]
},
{
q: "A troubleshooting task must locate regular files owned by `web` that were modified recently, not search their contents. Which tool should form the search?",
type: "mcq",
options: ["find", "grep", "locate", "which", "cat"],
answer: 0,
explain: "`find` searches live filesystem metadata such as ownership and modification time. `grep` searches file contents, while the other tools use different lookup mechanisms.",
tags: ["find", "metadata", "troubleshooting"]
},
{
q: "A script needs an `ed` command sequence that transforms one text file into another. Which `diff` option produces it?",
type: "mcq",
options: ["-e", "-q", "-y", "-u", "-s"],
answer: 0,
explain: "`diff -e` generates an `ed` script that can transform the first file into the second. The other options report or format differences differently.",
tags: ["diff", "options", "ed"]
},
{
q: "Which virtual filesystem exposes devices and kernel interfaces rather than ordinary user files?",
type: "mcq",
options: ["/sys", "/proc", "/dev", "/run", "/etc"],
answer: 0,
explain: "`/sys` exposes devices and kernel interfaces through a virtual filesystem. `/proc` focuses on process and kernel information, while `/dev` contains device files.",
tags: ["filesystem", "sys", "devices"]
},
{
q: "Which statements about Linux filenames are correct?",
type: "multi",
options: ["Filenames must include a file extension", "Filenames may contain periods", "Names beginning with `.` are hidden", "Filenames can be up to 255 characters", "Extensions are optional"],
answer: [1, 2, 3, 4],
explain: "Filenames can be up to 255 characters, may contain periods, do not require extensions, and are hidden when they start with `.`; extensions are never mandatory.",
tags: ["filenames", "hidden"]
},
{
q: "A hard-linked file and its original are deleted using one filename. What remains?",
type: "tf",
options: ["True", "False"],
answer: true,
explain: "Deleting one hard-link name does not remove the underlying data if another hard-link name still exists.",
tags: ["links", "hardlink"]
},
{
q: "The `/var/lib` directory is intended for persistent application state such as databases and package information.",
type: "tf",
answer: true,
explain: "`/var/lib` stores variable application state, including databases and package-management information.",
tags: ["filesystem", "var", "application-state"]
},
{
q: "The `/usr/share` directory is intended for architecture-independent shared data.",
type: "tf",
answer: true,
explain: "`/usr/share` contains data that can be shared across architectures, such as documentation and other common resources.",
tags: ["filesystem", "usr", "architecture-independent"]
},
{
q: "In `ls -l` output, a leading `-` identifies a regular file.",
type: "tf",
answer: true,
explain: "The first character of a long listing identifies the file type; `-` means a regular file.",
tags: ["ls", "filetypes"]
},
{
q: "The `/var/cache` directory stores cached application or package data that can generally be regenerated.",
type: "tf",
answer: true,
explain: "`/var/cache` is intended for cached data rather than the primary persistent state of an application.",
tags: ["filesystem", "var", "cache"]
},
{
q: "In a shell script, text after an unquoted `#` is treated as a comment.",
type: "tf",
answer: true,
explain: "An unquoted `#` begins a shell comment, so the shell ignores the remainder of that line.",
tags: ["shell", "comments"]
},
{
q: "In `ls -l` output, a leading `b` identifies a block device.",
type: "tf",
answer: true,
explain: "The `b` file-type character identifies a block device, while `c` identifies a character device.",
tags: ["ls", "filetypes", "devices"]
},
{
q: "The `locate -i` option makes database searches case-insensitive.",
type: "tf",
answer: true,
explain: "`locate -i` ignores case when comparing the search pattern with database entries.",
tags: ["locate", "options", "case"]
},
{
q: "`diff -s` can report when two files are identical.",
type: "tf",
answer: true,
explain: "The `-s` option asks `diff` to report identical files instead of remaining silent when no differences exist.",
tags: ["diff", "options"]
},
{
q: "The `find -user` criterion can select files owned by a specified user or UID.",
type: "tf",
answer: true,
explain: "`find -user` filters filesystem entries by user ownership; `-group` performs the analogous group check.",
tags: ["find", "ownership"]
},
{
q: "`which` can reveal an alias for a command.",
type: "tf",
options: ["True", "False"],
answer: true,
explain: "The notes show `which ls` reporting an alias before the actual binary path.",
tags: ["which", "aliases"]
},
{
q: "The `rsync -l` option preserves symbolic links as links rather than copying their target contents.",
type: "tf",
answer: true,
explain: "`rsync -l` preserves symbolic links during a transfer; archive mode includes this behavior as part of its preservation set.",
tags: ["rsync", "links", "options"]
},
{
q: "The `find -size` criterion can filter filesystem entries by their file size.",
type: "tf",
answer: true,
explain: "`find -size` selects entries according to size, complementing criteria such as `-name`, `-type`, and `-mtime`.",
tags: ["find", "size"]
},
{
q: "The shell metacharacters used to group commands in a subshell are ___",
type: "fill",
answer: "()",
explain: "Parentheses group commands and run the group in a subshell.",
tags: ["shell", "grouping"]
},
{
q: "The `rsync` option that displays transfer progress is ___",
type: "fill",
answer: "--progress",
explain: "`rsync --progress` displays progress information while files are transferred.",
tags: ["rsync", "options"]
},
{
q: "The `find` criterion used to restrict a search to a filesystem type is ___",
type: "fill",
answer: "-fstype",
explain: "`find -fstype` limits matches according to the filesystem type containing each entry.",
tags: ["find", "filesystem"]
},
{
q: "The `locate` option that requires every supplied pattern to match is ___",
type: "fill",
answer: "-A",
explain: "`locate -A` returns entries that match all supplied search patterns.",
tags: ["locate", "options"]
},
{
q: "The shell redirection operator that sends standard error (file descriptor 2) to a file is ___",
type: "fill",
answer: "2>",
explain: "`2>` redirects standard error to a file, while ordinary `>` redirects standard output.",
tags: ["shell", "redirection", "stderr"]
},
{
q: "The `rsync` option that prints transfer statistics after a copy is ___",
type: "fill",
answer: "--stats",
explain: "`rsync --stats` prints summary statistics about the transfer.",
tags: ["rsync", "options"]
},
{
q: "The `rsync` option that preserves device and other special files is ___",
type: "fill",
answer: "-D",
explain: "`rsync -D` preserves device and other special files during a transfer; archive mode includes this behavior.",
tags: ["rsync", "options", "devices"]
},
{
q: "The `find` criterion that filters entries by modification age in minutes is ___",
type: "fill",
answer: "-mmin",
explain: "`find -mmin` filters entries according to how many minutes ago they were modified.",
tags: ["find", "time"]
},
{
q: "The command used to remove a linked filename without modifying the original link target is ___",
type: "fill",
answer: "unlink",
explain: "The notes specify `unlink` with the linked filename to remove that link.",
tags: ["links", "unlink"]
},
{
q: "The shell redirection operator that begins a here-document is ___",
type: "fill",
answer: "<<",
explain: "`<<` starts a here-document, allowing a command to receive a block of shell input until a chosen delimiter.",
tags: ["shell", "redirection", "here-document"]
},
{
q: "The `locate` option that suppresses error messages is ___",
type: "fill",
answer: "-q",
explain: "`locate -q` suppresses error messages while performing the database search.",
tags: ["locate", "options"]
},
{
q: "The `find` criterion that filters by how many days ago a file was accessed is ___",
type: "fill",
answer: "-atime",
explain: "`find -atime` filters entries by their access age in days.",
tags: ["find", "time"]
},
{
q: "The `find` criterion that filters entries by group ownership is ___",
type: "fill",
answer: "-group",
explain: "`find -group` searches for entries owned by a specified group or GID.",
tags: ["find", "ownership"]
},
{
q: "The `locate` option that interprets a search pattern as a regular expression is ___",
type: "fill",
answer: "-r",
explain: "`locate -r` treats the supplied pattern as a regular expression.",
tags: ["locate", "regex"]
},
{
q: "The `find` criterion that filters entries accessed within a specified number of minutes is ___",
type: "fill",
answer: "-amin",
explain: "`find -amin` filters entries according to how many minutes ago they were accessed.",
tags: ["find", "time"]
},
{
q: "A support engineer receives a path that may contain a symbolic link and needs the final target before changing the file. Which command should be used?",
type: "mcq",
options: ["readlink -f", "which", "locate", "file", "pwd"],
answer: 0,
explain: "`readlink -f` resolves a chain of symbolic links to its final target. The other commands answer different path or file-information questions.",
tags: ["links", "readlink", "troubleshooting"]
},
{
q: "A privileged script follows a symbolic link whose original target was deleted, and an attacker creates a replacement at that path. What risk does this create?",
type: "mcq",
options: ["The script may operate on an unintended attacker-controlled file", "The link automatically changes into a hard link", "The filesystem restores the deleted target from the inode", "The shell refuses to follow all symbolic links", "The target path becomes permanently unavailable"],
answer: 0,
explain: "A stale link can resolve to a replacement at the reused path, allowing a privileged operation to affect an unintended file.",
tags: ["links", "symlink", "security"]
},
{
q: "A directory listing shows a symbolic link. Which suffix does `ls -F` append to identify it?",
type: "mcq",
options: ["@", "/", "*", "=", "`"],
answer: 0,
explain: "`ls -F` appends `@` to symbolic links. Directories, executables, sockets, and named pipes use different indicators.",
tags: ["ls", "filetypes", "symlinks"]
},
{
q: "A second filesystem is mounted at `/data`. How does Linux expose its contents to applications?",
type: "mcq",
options: ["As a directory within the single system tree", "As a separate top-level root visible beside `/`", "Only through a device filename under `/dev`", "Only through a shell variable", "As files outside the directory hierarchy"],
answer: 0,
explain: "Linux mounts additional filesystems at directories within one virtual tree rooted at `/`, so applications access the mounted contents through that directory.",
tags: ["filesystem", "mounts", "paths"]
},
{
q: "A deployment script should run a reload only when its configuration test succeeds. Which shell operator should connect the two commands?",
type: "mcq",
options: ["&&", ";", "||", "|", "&"],
answer: 0,
explain: "`&&` runs the command on its right only when the command on its left exits successfully; the other operators have different sequencing behavior.",
tags: ["shell", "conditionals", "deployment"]
},
]
});
