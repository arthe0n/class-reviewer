window.ReviewApp.content.register({
type: "labs",
cert: "linux-plus",
chapter: "Ch 03 · Files, Directories & Search",
items: [
{
title: "Investigate and Organize a New Project Directory",
difficulty: 2,
minutes: 30,
scenario: "You are a junior Linux administrator preparing a temporary project workspace for a team. Several files have arrived in an unorganized directory, including configuration notes, logs, and hidden shell-related files. Your task is to navigate the filesystem, inspect file metadata and contents, locate important text, and organize the workspace using standard Linux commands.",
objectives: [
"Navigate using absolute and relative pathnames",
"Create and inspect a directory tree",
"Use ls options to identify hidden files and metadata",
"Use wildcards to work with groups of files",
"Read selected portions of text files with grep and head",
"Locate files with find and verify the final layout"
],
steps: [
{
do: "Create a temporary workspace under `/tmp`, including an `incoming` directory and a nested `archive/reports` directory, then enter the workspace.",
command: "mkdir -p /tmp/linuxplus-lab/incoming /tmp/linuxplus-lab/archive/reports && cd /tmp/linuxplus-lab",
hint: "Create the workspace in a temporary location, including both levels of nested directories, then enter it using a full path so your starting directory is unambiguous.",
solution: "mkdir -p /tmp/linuxplus-lab/incoming /tmp/linuxplus-lab/archive/reports && cd /tmp/linuxplus-lab",
expectedOutput: "(no output)",
check: "The workspace is `/tmp/linuxplus-lab` with `incoming/` and `archive/` present."
},
{
do: "Create three report files, one log file, and one hidden file inside `incoming`. Put realistic text into the reports and log so they can be searched later.",
command: "printf 'Project42 status: complete\nOwner: Christine\nErrors: 0\n' > incoming/report42.txt\nprintf 'Project43 status: pending\nOwner: Alex\nErrors: 2\n' > incoming/report43.txt\nprintf 'Project44 status: complete\nOwner: Jordan\nErrors: 0\n' > incoming/report44.txt\nprintf 'INFO startup complete\nERROR database connection failed\nINFO retry scheduled\nERROR timeout detected\n' > incoming/server.log\nprintf 'Temporary shell settings\n' > incoming/.projectrc",
hint: "Use shell output redirection to write several lines into each text file; include a hidden entry and remember to verify it with a listing that includes hidden names.",
solution: "printf 'Project42 status: complete\nOwner: Christine\nErrors: 0\n' > incoming/report42.txt\nprintf 'Project43 status: pending\nOwner: Alex\nErrors: 2\n' > incoming/report43.txt\nprintf 'Project44 status: complete\nOwner: Jordan\nErrors: 0\n' > incoming/report44.txt\nprintf 'INFO startup complete\nERROR database connection failed\nINFO retry scheduled\nERROR timeout detected\n' > incoming/server.log\nprintf 'Temporary shell settings\n' > incoming/.projectrc",
expectedOutput: "(no output)",
check: "The `incoming` directory lists three reports, `server.log`, and hidden `.projectrc`."
},
{
do: "Inspect the incoming directory using long format, including hidden files and human-readable sizes. Then identify which entries are regular files.",
command: "ls -alhF incoming",
hint: "Use a detailed listing that includes hidden entries and readable sizes, then use its type markers to distinguish ordinary files from directories and other special entries.",
solution: "ls -alhF incoming",
expectedOutput: "total 20K\ndrwxr-xr-x 2 student student 4.0K Aug 19 10:00 ./\ndrwxr-xr-x 4 student student 4.0K Aug 19 10:00 ../\n-rw-r--r-- 1 student student   25B Aug 19 10:00 .projectrc\n-rw-r--r-- 1 student student   54B Aug 19 10:00 report42.txt\n-rw-r--r-- 1 student student   51B Aug 19 10:00 report43.txt\n-rw-r--r-- 1 student student   53B Aug 19 10:00 report44.txt\n-rw-r--r-- 1 student student  115B Aug 19 10:00 server.log",
expectedOutputDynamic: true,
check: "The listing includes hidden `.projectrc` and identifies the regular files with long-format metadata."
},
{
do: "Search the project reports for the word `status`, ignoring capitalization, and then inspect only the first two lines of the server log.",
command: "grep -i status incoming/report*.txt\nhead -n 2 incoming/server.log",
hint: "Search the report group without treating letter case as significant, then limit the log inspection to its opening portion.",
solution: "grep -i status incoming/report*.txt\nhead -n 2 incoming/server.log",
expectedOutput: "incoming/report42.txt:Project42 status: complete\nincoming/report43.txt:Project43 status: pending\nincoming/report44.txt:Project44 status: complete\nINFO startup complete\nERROR database connection failed",
check: "The search returns three status lines followed by the log's first two entries."
},
{
do: "Find every `.txt` report under the workspace and copy all reports into the archive's `reports` directory.",
command: "find . -name \"*.txt\"\ncp incoming/*.txt archive/reports/",
hint: "Use a recursive filename search to locate the report files, then use pattern-based file selection to copy that set into the archive location.",
solution: "find . -name \"*.txt\"\ncp incoming/*.txt archive/reports/",
expectedOutput: "./incoming/report42.txt\n./incoming/report43.txt\n./incoming/report44.txt",
check: "The archive contains report42.txt, report43.txt, and report44.txt."
},
{
do: "Verify the final workspace structure and compare the original report directory with the archived report directory. Use `diff` to check whether the copied reports are identical.",
command: "ls -R /tmp/linuxplus-lab\nfind /tmp/linuxplus-lab -name \"*.txt\"\ndiff incoming/report42.txt archive/reports/report42.txt\ndiff incoming/report43.txt archive/reports/report43.txt\ndiff incoming/report44.txt archive/reports/report44.txt",
hint: "Produce a recursive view of the workspace, then compare matching originals and copies; identical files should leave the comparison tool with no differences to report.",
solution: "ls -R /tmp/linuxplus-lab\nfind /tmp/linuxplus-lab -name \"*.txt\"\ndiff incoming/report42.txt archive/reports/report42.txt\ndiff incoming/report43.txt archive/reports/report43.txt\ndiff incoming/report44.txt archive/reports/report44.txt",
expectedOutput: "/tmp/linuxplus-lab:\narchive\nincoming\n\n/tmp/linuxplus-lab/archive:\nreports\n\n/tmp/linuxplus-lab/archive/reports:\nreport42.txt\nreport43.txt\nreport44.txt\n\n/tmp/linuxplus-lab/incoming:\nreport42.txt\nreport43.txt\nreport44.txt\nserver.log\n\n/tmp/linuxplus-lab/incoming/report42.txt\n/tmp/linuxplus-lab/incoming/report43.txt\n/tmp/linuxplus-lab/incoming/report44.txt\n/tmp/linuxplus-lab/archive/reports/report42.txt\n/tmp/linuxplus-lab/archive/reports/report43.txt\n/tmp/linuxplus-lab/archive/reports/report44.txt",
expectedOutputDynamic: true,
check: "The final tree contains the originals and identical report copies in `archive/reports`."
}
],
tags: ["paths", "ls", "wildcards", "grep", "head", "find", "cp", "diff"]
},
{
title: "Log Triage with grep, head, and tail",
difficulty: 1,
minutes: 20,
scenario: "A service administrator asks you to quickly inspect a small application log without opening the entire file. Create a test log, identify errors, inspect the beginning and end of the file, and monitor it as new entries are appended.",
objectives: [
"Create a text log with shell commands",
"Search log content with grep",
"Inspect the beginning and end of a file",
"Use tail -f to monitor appended log entries"
],
steps: [
{
do: "Create a temporary log file containing several informational and error messages.",
command: "mkdir -p /tmp/linuxplus-loglab && cd /tmp/linuxplus-loglab && printf 'INFO service starting\nINFO configuration loaded\nERROR database unavailable\nINFO retrying connection\nERROR request timeout\nINFO service ready\n' > app.log",
hint: "Use shell redirection to write multiple log entries into a temporary file; include both normal and error events so later searches have useful targets.",
solution: "mkdir -p /tmp/linuxplus-loglab && cd /tmp/linuxplus-loglab && printf 'INFO service starting\nINFO configuration loaded\nERROR database unavailable\nINFO retrying connection\nERROR request timeout\nINFO service ready\n' > app.log",
expectedOutput: "(no output)",
check: "The log contains six informational and error entries."
},
{
do: "Find every log entry containing `ERROR` and display its line number.",
command: "grep -n ERROR app.log",
hint: "Search for the error marker while asking the search utility to identify each match's line position.",
solution: "grep -n ERROR app.log",
expectedOutput: "3:ERROR database unavailable\n5:ERROR request timeout",
check: "Two error entries appear with line numbers 3 and 5."
},
{
do: "Display only the first three lines of the log, then display only the last two lines.",
command: "head -n 3 app.log\ntail -n 2 app.log",
hint: "Use one file-reading tool for the beginning and another for the end, limiting each view to the requested number of lines.",
solution: "head -n 3 app.log\ntail -n 2 app.log",
expectedOutput: "INFO service starting\nINFO configuration loaded\nERROR database unavailable\nERROR request timeout\nINFO service ready",
check: "The combined output contains the first three and final two log entries."
},
{
do: "Start following the log so that newly appended entries appear automatically.",
command: "tail -f app.log",
hint: "Look for the mode that keeps a file view open as new content arrives; consider how to stop a long-running monitor cleanly after observing a change.",
solution: "tail -f app.log",
expectedOutput: "INFO service starting\nINFO configuration loaded\nERROR database unavailable\nINFO retrying connection\nERROR request timeout\nINFO service ready\nINFO health check passed",
expectedOutputDynamic: true,
check: "The monitor shows the initial log and a newly appended health-check entry."
}
],
tags: ["grep", "head", "tail", "logs", "files"]
}
]
});
