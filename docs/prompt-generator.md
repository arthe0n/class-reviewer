# AI Prompt Generator

Ready-to-use prompts for turning your own study notes into ReviewApp content
with an AI assistant. Each prompt is **copy-and-paste**: drop in your unit
notes and send it — the AI replies with a complete `.js` file.

## How to use

1. Copy one prompt below.
2. Replace the `PASTE YOUR UNIT NOTES HERE` placeholder with your full notes.
3. Send it to the AI.
4. Save the reply as a `.js` file under the matching folder, e.g.
   `certifications/linux-plus/questions/ch02-working-with-files.js`.
5. Add that path to `certifications/_manifest.js` → `files`.
6. Open ReviewApp and hit **Reload**.

---

## Flashcards

> You are generating CompTIA Linux+ flashcards for the offline ReviewApp study tool.
>
> OUTPUT RULES (strict):
> - Output ONE complete classic JS file only. No markdown fences, no commentary before or after.
> - Use exactly this shape:
>
> ```js
> window.ReviewApp.content.register({
>   type: "flashcards",
>   cert: "linux-plus",
>   chapter: "Ch XX · <Short Chapter Title>",
>   items: [ /* array of card objects */ ]
> });
> ```
>
> CARD SCHEMA (every item):
> ```js
> {
>   front: "Concise prompt / term / question (one line preferred)",
>   back: "Clear answer or short explanation (1–3 sentences max)",
>   tags: ["tag1", "tag2"]
> }
> ```
>
> CONTENT REQUIREMENTS:
> - Produce a minimum of 70 cards covering the entire unit notes below.
> - Create more flashcards if the content contains enough important information.
> - Prioritize complete coverage of the material over reaching a specific number.
> - Fronts should be short (term, command, “What does X do?”, “Symbol for …”).
> - Backs must be accurate and useful for active recall.
> - COMMAND OPTIONS — group a command's options into ONE flashcard per command whenever possible. Front: the command, with a short label (e.g. “ls — Important options”), so the command stays visible on the front. Back: the option → description relationships, one per line (e.g. “-a → show all entries”). If the full set cannot reasonably fit or read well on one card, split it into AT MOST TWO cards for that command, grouping related options logically (e.g. display options vs. sorting/recursive options). NEVER create one flashcard per option for a multi-option command. This grouping rule applies ONLY to command-option information; all other flashcards follow the normal rules above.
> - Prioritize: key commands, metacharacters, file-type symbols, ls options, regex vs shell wildcards, vi basics, FHS-related path facts from the notes.
> - Tags: short lowercase keywords (e.g. ls, wildcards, grep, vi, file-types).
> - No duplicates. No fluff. No placeholders.
> - Chapter title: invent a concise title that matches the notes.
>
> UNIT NOTES:
>
> [PASTE YOUR UNIT NOTES HERE]

---

## Questions

> You are generating CompTIA Linux+ practice questions for the offline ReviewApp study tool.
>
> OUTPUT RULES (strict):
> - Output ONE complete classic JS file only. No markdown fences, no commentary before or after.
> - Use exactly this shape:
>
> ```js
> window.ReviewApp.content.register({
>   type: "questions",
>   cert: "linux-plus",
>   chapter: "Ch XX · <Short Chapter Title>",
>   items: [ /* array of question objects */ ]
> });
> ```
>
> QUESTION SCHEMA (every item must follow this):
> ```js
> {
>   q: "Clear, exam-style question text",
>   type: "mcq" | "multi" | "tf" | "fill" | "command_match",
>   options: ["A", "B", "C", "D", "E"],   // exactly 5 options for mcq and multi only
>   answer: <see below>,
>   accepts: ["alternate accepted answer", "ACR"],   // optional, fill only — extra legitimate equivalents
>   explain: "1–3 sentences explaining why the answer is correct and why common wrong answers fail",
>   tags: ["tag1", "tag2"]
> }
> ```
>
> ANSWER FORMATS:
> - mcq:   zero-based index (e.g. 0) — exactly 1 correct choice
> - multi: array of 1–4 zero-based indices (e.g. [0, 2]) — 1 to 4 of the 5 options are correct; the correct-choice count must vary across questions, never default to 3
> - tf:    true or false
> - fill:  string — matched case-insensitively with inner whitespace collapsed; a parenthetical acronym in the answer (e.g. "Certificate Authority (CA)") also accepts the full name alone and the acronym alone; put extra legitimate equivalents in the optional `accepts` array
> - command_match: no answer field — the pairs array IS the answer (see below)
>
> COMMAND MATCHING (command_match):
> A dedicated question type that tests the relationship between a command/tool and its options or flags. The command is the context, the options are listed, and the student must match each option to its description. It counts as ONE question no matter how many option/description pairs it contains — every pair belongs to that single question, and the whole question is correct only if every option is matched correctly.
>
> Schema (in addition to q and explain):
> ```js
> {
>   q: "Match the ls options with their descriptions.",
>   type: "command_match",
>   command: "ls",
>   pairs: [
>     { option: "-a", description: "Show hidden files" },
>     { option: "-l", description: "Use long listing format" },
>     { option: "-h", description: "Show human-readable sizes" }
>   ],
>   explain: "These options modify how ls displays directory contents.",
>   tags: ["ls", "options"]
> }
> ```
>
> Rules for command_match:
> - command (string) and pairs (array of { option, description }) are required; include at least 2–6 meaningful pairs.
> - Options and descriptions must each be unique within the question. The pairs array IS the answer — do not add an answer field.
> - Use it when the notes contain a command option table or a meaningful set of options/flags worth memorizing (ls, grep, find, chmod, tar, ip, ss, ps, systemctl, curl, etc.). Do NOT generate one for every command automatically — skip commands whose options are trivial, redundant, or not worth testing.
> - Do NOT use it where a normal mcq is more appropriate (e.g. a single command/flag fact). command_match is for multi-option matching, not a replacement for mcq.
> - Options and descriptions must come ONLY from information supported by the provided notes. Do not invent flags.
> - The output must remain valid JavaScript matching the application's schema: q, type, command, pairs, explain, tags (all fields required except tags).
>
> CONTENT REQUIREMENTS:
> - Produce a minimum of 70 questions covering the entire unit notes below.
> - Create more questions if the content contains enough important information.
> - Prioritize complete coverage of the material over reaching a specific number.
> - Mix types: roughly 50% mcq, 20% multi, 15% tf, 15% fill.
> - Present EXACTLY 5 options for every mcq and multi question (no more, no fewer).
> - VARY THE NUMBER OF CORRECT ANSWERS in multi questions. A multi question may have 1, 2, 3, or 4 correct choices out of its 5 options. Never default to 3, and never give every multi question the same number of correct choices. Across a set of questions, the correct-answer counts of consecutive multi questions should be visibly varied (e.g. 1 / 2 / 3 / 4 / 1 or 2 / 4 / 1 / 3 / 2), never 3 / 3 / 3 / 3.
> - Choose the correct-answer count that fits the question: one correct choice when only one answer is right, more when several distinct choices legitimately qualify (e.g. selecting multiple commands, options, or true statements). Do not add fake correct answers to reach a target count, do not pad with choices that are duplicates or near-duplicates, and do not write questions where it is unclear which choices should be correct.
> - Every multi question must include at least one plausible but incorrect distractor, and the `answer` array must exactly match the correct options.
> - For `fill` answers, put the canonical answer in `answer` — answers are matched case-insensitively with whitespace collapsed, so do not rely on case or spacing to distinguish answers. When the answer has a standard acronym, write it in parentheses after the full name (e.g. `"Certificate Authority (CA)"`); the engine then accepts the full name, the acronym, and the parenthesized form. List any other genuinely equivalent forms (common synonyms, alternate spellings, full names of acronyms such as LAMP → `"Linux Apache MySQL PHP"`) in the optional `accepts` array. Never invent aliases, never add partial words or vague statements to `accepts`, and never treat substrings of the answer as valid — every accepted form must be a real, unambiguous equivalent of the canonical answer.
> - Questions must be technically accurate for CompTIA Linux+.
> - Prefer application and discrimination over pure recall (e.g. “which command…”, “what does this output mean…”, “given this scenario…”).
> - Cover the most important objectives and command tables in the notes.
> - Tags should be short lowercase keywords drawn from the topic (e.g. paths, wildcards, grep, vi, ls, regex).
> - No lorem ipsum. No placeholder text. No “TODO”.
> - Chapter title: invent a concise title that matches the notes (e.g. “Ch 02 · Working with Files”).
>
> UNIT NOTES:
>
> [PASTE YOUR UNIT NOTES HERE]

---

## Labs

> You are generating a CompTIA Linux+ hands-on lab for the offline ReviewApp study tool.
>
> OUTPUT RULES (strict):
> - Output ONE complete classic JS file only. No markdown fences, no commentary before or after.
> - Use exactly this shape:
>
> ```js
> window.ReviewApp.content.register({
>   type: "labs",
>   cert: "linux-plus",
>   chapter: "Ch XX · <Short Chapter Title>",
>   items: [
>     {
>       title: "Descriptive lab title",
>       difficulty: 1 | 2 | 3,
>       minutes: <number>,
>       scenario: "Markdown paragraph(s) setting context and goal",
>       objectives: ["Observable skill 1", "Observable skill 2", "..."],
>       steps: [
>         {
>           do: "What the student should do (clear instruction)",
>           command: "Internal exact command metadata for the step (required for command-based steps; never rendered in the learner UI; omit for non-command/manual steps)",
>           hint: "Specific conceptual guidance that points toward the approach without revealing the answer",
>           solution: "Exact command(s) or actions that solve the step (copy-pasteable)",
>           expectedOutput: "Concrete representative example of the output the learner should see in the View output modal; preserve line breaks and whitespace",
>           expectedOutputDynamic: false, // optional; set true when values or formatting vary by system/run
>           check: "One concise, single-line statement of what the learner should expect to see"
>         }
>       ],
>       tags: ["tag1", "tag2"]
>     }
>   ]
> });
> ```
>
> CONTENT REQUIREMENTS:
> - Create 1+ solid lab (optionally another shorter one if the notes support it).
> - 4–7 steps that build on each other and exercise the commands/concepts in the notes.
> - Scenario should feel realistic (junior sysadmin task, troubleshooting, exploration).
> - difficulty: 1 = guided intro, 2 = intermediate, 3 = multi-skill.
> - minutes: honest estimate (15–40 typical).
> - Solutions must be real Linux commands that work on a standard distro.
> - For every command-based step, include the exact command in the internal `command` field and a concrete representative result in `expectedOutput`; do not make the frontend infer output from `solution`. The `command` field is metadata for validation/content tooling, not learner-facing text.
> - Treat `expectedOutput` as the example the learner should see after selecting **View output**. Use realistic mock values even when the real result varies: write `Local Address:Port 192.0.2.10:119`, not `<port>` or another placeholder. Set `expectedOutputDynamic: true` when values or formatting can vary, but still provide concrete example values and use the one-line `check` to state what may vary.
> - For deterministic output, use the actual result when it is stable. For variable output, use a short, meaningful representative sample rather than a generic description, a truncation marker, or a fabricated success message.
> - If a command legitimately produces no output, set `expectedOutput` to `(no output)` rather than inventing a success message.
> - Preserve output line breaks, indentation, whitespace, symbols, and special characters in `expectedOutput`; multiline examples belong in the View output modal and must remain complete and unmodified.
> - `check` is the learner-facing Verify text. It must be one concise line describing what the learner should expect to see, not a procedure, command, multi-step instruction, or second output block. Do not repeat exact command syntax in `do`, `hint`, or `check`; the complete command belongs only in `solution` and the internal `command` metadata.
> - Non-command/manual steps may omit `command`, but should still provide `expectedOutput` when there is a meaningful observable result.
> - Cover the most lab-friendly parts of the notes (navigation, ls options, wildcards, viewing files, grep, basic vi).
> - Tags: short lowercase keywords.
> - Chapter title: invent a concise title that matches the notes.
> - Do not use placeholders or “TODO” in titles, scenarios, instructions, hints, solutions, checks, or other prose. In `expectedOutput`, never use angle-bracket placeholders, unresolved variables, or truncation markers; use concrete representative mock data instead. Literal symbols that are part of real command output are allowed. Use `expectedOutputDynamic: true` to mark variability, not to justify placeholder text.
>
> HINT / REVEAL ANSWER RULES (strict):
> - `hint` and `solution` have different responsibilities. The hint is guidance; the solution is the answer exposed by **Reveal Answer** (the app may label this **Reveal Solution**).
> - A hint should help the student reason about the current step by pointing toward the relevant concept, action, observation, relationship, or direction. Make it specific enough to reduce difficulty slightly and encourage investigation or experimentation.
> - A hint must stop short of solving the step. It must never state or closely paraphrase the required command, code, configuration, parameter, value, final action, required sequence, expected output, or result.
> - Do not put the exact answer in a hint using a different format, wording, placeholder, example, partial command, flag, path, filename, value, or sequence of actions. A hint must provide direction, not completion.
> - Do not give a complete procedure that makes the step mechanically solvable. Describe what to look for or how to reason, not every action to perform.
> - If mentioning a tool or technique is useful, describe its purpose or capability rather than naming the exact tool, option, argument, path, or syntax the student is expected to discover.
> - **Reveal Answer** is the only place allowed to provide the complete solution: the exact command, code, configuration, value, required action sequence, and explanation. `expectedOutput` is separate Verify metadata; the Verify row's output button opens it in a modal, but it must never replace `solution` or put solution steps in `hint`.
> - Before finalizing each step, compare its hint with its solution and remove any detail that would make Reveal Answer redundant. When in doubt, make the hint less specific rather than more revealing.
>
> VERIFY / EXPECTED OUTPUT RULES (strict):
> - Render exactly one compact `Verify` row at the bottom of each step. Do not render a separate `Expected Output` section, an inline output block, or a second Verify heading.
> - The Verify text (`check`) must be one concise line describing the expected result. The row should not contain a second explanation or a multiline output preview.
> - Keep `command`, `expectedOutput`, and `check` separate in the data model: `command` is internal metadata, `expectedOutput` is the concrete example opened by the modal, and `check` is the one-line learner-facing expectation.
> - Never render the `command` field in the learner UI. Do not repeat exact command syntax in `do`, `hint`, or `check`; the exact command may appear only in `solution`, which is shown through **Reveal solution**.
> - When a meaningful `expectedOutput` exists, place a compact **View output** button at the far right of the same Verify row. The button opens a modal containing the example output; multiline output must not expand inline.
> - The modal must contain the complete, unmodified example output, preserving line breaks, indentation, whitespace, symbols, and special characters. Never truncate the stored output to make it fit.
> - If the command legitimately produces no output, use `(no output)` and do not add an output button for it.
> - For dynamic output, use concrete mock values in `expectedOutput` and set `expectedOutputDynamic: true`; explain the variable portion or environment-dependent condition in the one-line `check`. Never use `<port>`, `<pid>`, `<value>`, or similar placeholders in the modal example.
> - Keep output data safe to render: it is plain text, not HTML, and must preserve formatting without executing embedded content.
>
> UNIT NOTES:
>
> [PASTE YOUR UNIT NOTES HERE]

---

## Notes

> You are generating a compact study note for the offline ReviewApp tool (CompTIA Linux+).
>
> OUTPUT RULES (strict):
> - Output ONE complete classic JS file only. No markdown fences, no commentary before or after.
> - Use exactly this shape:
>
> ```js
> window.ReviewApp.content.register({
>   type: "notes",
>   cert: "linux-plus",
>   chapter: "Ch XX · <Short Chapter Title>",
>   items: [
>     {
>       title: "Clear note title",
>       body: "Markdown body (see allowed syntax below)",
>       tags: ["tag1", "tag2"]
>     }
>   ]
> });
> ```
>
> ALLOWED MARKDOWN in body:
> - Headings: # ## ###
> - Bold **text**, italic *text*
> - Inline code `like this`
> - Fenced code blocks ``` ... ```
> - Unordered lists (- or *) and ordered lists (1.)
> - Links [label](https://...)
> - Horizontal rules ---
>
> CONTENT REQUIREMENTS:
> - Produce 1 (or at most 2) dense, exam-oriented note(s) that reorganize the unit notes below into a clean reference.
> - Prefer tables and short command lists over long prose.
> - Include: key path concepts, file types + ls -F symbols, important ls options, wildcards vs regex, cat/head/tail/less, grep options, vi open/modes if present.
> - Keep it scannable — someone should be able to review in 5–8 minutes.
> - Tags: short lowercase keywords.
> - Chapter title: invent a concise title that matches the notes.
> - No fluff, no placeholders, no “TODO”.
>
> UNIT NOTES:
>
> [PASTE YOUR UNIT NOTES HERE]

---

## Command Summary

> You are an expert technical documentation assistant specialized in Linux, networking, cybersecurity, and IT certifications (Linux+, Network+, Security+, etc.).
>
> I will provide you with raw study notes. Your job is to extract ONLY the commands, tools, utilities, protocols, and CLI syntax examples from my notes.
>
> Ignore:
> - General explanations
> - Theory paragraphs
> - Stories/examples that do not contain commands
> - Memorization tips
> - Exam objectives without commands
>
> For every command or tool you find, create a structured Markdown (.md) reference table.
>
> The table must contain these columns:
>
> | Command | Description | Options/Flags | Usage Example |
>
> Requirements:
>
> 1. Command:
> - Write the exact command name or syntax.
> - Include important syntax patterns if relevant.
> - Keep commands separated if multiple commands appear.
>
> 2. Description:
> - Give a short but accurate explanation of what the command does.
> - Explain its purpose in a Linux/networking/security administration context.
>
> 3. Options/Flags:
> - List the most important options, flags, switches, and arguments.
> - Format them clearly.
> - Include the purpose of each option.
> - If the command has no meaningful options, write "N/A".
>
> Example format:
> - `-a` → show all entries
> - `-n` → do not resolve hostnames
> - `-v` → verbose output
>
> 4. Usage Example:
> - Provide a realistic command example.
> - Include placeholders when needed.
> - Explain what the example accomplishes.
>
> Example:
> `grep -i "error" /var/log/syslog`
> → Searches the syslog file for "error" without case sensitivity.
>
> 5. Missing Information:
> If my notes mention a command but do not provide enough details:
> - Use your existing knowledge to complete the missing description, options, and examples.
> - Do not leave incomplete entries.
> - If you are unsure, clearly mark the information as "Verify".
>
> 6. Accuracy:
> - Prefer official Linux man-page behavior and commonly accepted industry usage.
> - Do not invent flags or syntax.
> - If a command differs between distributions (Ubuntu, Debian, RHEL, Fedora, etc.), mention the difference briefly.
>
> 7. Organization:
> Organize the final Markdown file by category when possible:
>
> ```text
> ## File Management Commands
> ## Networking Commands
> ## Process Management Commands
> ## User and Permission Commands
> ## Disk and Storage Commands
> ## Security Commands
> ## Package Management Commands
> ## Troubleshooting Commands
> ## Other Commands
> ```
>
> 8. Output Rules:
> - Output ONLY Markdown.
> - Do not include explanations before or after the table.
> - Do not summarize the notes.
> - Do not include non-command information.
> - Make the final output ready to save as a `.md` file.
>
> Here are my notes:
>
> [PASTE YOUR UNIT NOTES HERE]
