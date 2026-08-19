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
hint: "Create the workspace in a temporary location, including both levels of nested directories, then enter it using a full path so your starting directory is unambiguous.",
solution: "mkdir -p /tmp/linuxplus-lab/incoming /tmp/linuxplus-lab/archive/reports && cd /tmp/linuxplus-lab",
check: "Run `pwd` and confirm it reports `/tmp/linuxplus-lab`. Then run `ls -F` and confirm `incoming/` and `archive/` are present."
},
{
do: "Create three report files, one log file, and one hidden file inside `incoming`. Put realistic text into the reports and log so they can be searched later.",
hint: "Use shell output redirection to write several lines into each text file; include a hidden entry and remember to verify it with a listing that includes hidden names.",
solution: "printf 'Project42 status: complete\nOwner: Christine\nErrors: 0\n' > incoming/report42.txt\nprintf 'Project43 status: pending\nOwner: Alex\nErrors: 2\n' > incoming/report43.txt\nprintf 'Project44 status: complete\nOwner: Jordan\nErrors: 0\n' > incoming/report44.txt\nprintf 'INFO startup complete\nERROR database connection failed\nINFO retry scheduled\nERROR timeout detected\n' > incoming/server.log\nprintf 'Temporary shell settings\n' > incoming/.projectrc",
check: "Run `ls -la incoming` and confirm that `report42.txt`, `report43.txt`, `report44.txt`, `server.log`, and `.projectrc` are listed."
},
{
do: "Inspect the incoming directory using long format, including hidden files and human-readable sizes. Then identify which entries are regular files.",
hint: "Use a detailed listing that includes hidden entries and readable sizes, then use its type markers to distinguish ordinary files from directories and other special entries.",
solution: "ls -alhF incoming",
check: "Confirm the hidden `.projectrc` appears. The regular files should have no trailing type indicator, while directories would show `/` and other file types can receive their own indicators."
},
{
do: "Search the project reports for the word `status`, ignoring capitalization, and then inspect only the first two lines of the server log.",
hint: "Search the report group without treating letter case as significant, then limit the log inspection to its opening portion.",
solution: "grep -i status incoming/report*.txt\nhead -n 2 incoming/server.log",
check: "The `grep` command should return the status line from all three report files. `head` should display `INFO startup complete` followed by `ERROR database connection failed`."
},
{
do: "Find every `.txt` report under the workspace and copy all reports into the archive's `reports` directory.",
hint: "Use a recursive filename search to locate the report files, then use pattern-based file selection to copy that set into the archive location.",
solution: "find . -name \"*.txt\"\ncp incoming/*.txt archive/reports/",
check: "Run `ls -lh archive/reports` and confirm that `report42.txt`, `report43.txt`, and `report44.txt` are present."
},
{
do: "Verify the final workspace structure and compare the original report directory with the archived report directory. Use `diff` to check whether the copied reports are identical.",
hint: "Produce a recursive view of the workspace, then compare matching originals and copies; identical files should leave the comparison tool with no differences to report.",
solution: "ls -R /tmp/linuxplus-lab\nfind /tmp/linuxplus-lab -name \"*.txt\"\ndiff incoming/report42.txt archive/reports/report42.txt\ndiff incoming/report43.txt archive/reports/report43.txt\ndiff incoming/report44.txt archive/reports/report44.txt",
check: "The final layout should contain `incoming/` with the original files and `archive/reports/` with the three copied reports. Each `diff` command should produce no output when the files are identical."
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
hint: "Use shell redirection to write multiple log entries into a temporary file; include both normal and error events so later searches have useful targets.",
solution: "mkdir -p /tmp/linuxplus-loglab && cd /tmp/linuxplus-loglab && printf 'INFO service starting\nINFO configuration loaded\nERROR database unavailable\nINFO retrying connection\nERROR request timeout\nINFO service ready\n' > app.log",
check: "Run `cat app.log` and confirm that all six log entries are displayed."
},
{
do: "Find every log entry containing `ERROR` and display its line number.",
hint: "Search for the error marker while asking the search utility to identify each match's line position.",
solution: "grep -n ERROR app.log",
check: "The output should contain the two error lines and show their line numbers."
},
{
do: "Display only the first three lines of the log, then display only the last two lines.",
hint: "Use one file-reading tool for the beginning and another for the end, limiting each view to the requested number of lines.",
solution: "head -n 3 app.log\ntail -n 2 app.log",
check: "The first command should show the startup, configuration, and first error entries. The second should show the final two entries."
},
{
do: "Start following the log so that newly appended entries appear automatically.",
hint: "Look for the mode that keeps a file view open as new content arrives; consider how to stop a long-running monitor cleanly after observing a change.",
solution: "tail -f app.log",
check: "While `tail -f` is running, open another shell and run `printf 'INFO health check passed\\n' >> /tmp/linuxplus-loglab/app.log`. The new line should appear in the monitoring terminal; press Ctrl+C to stop."
}
],
tags: ["grep", "head", "tail", "logs", "files"]
}
]
});
