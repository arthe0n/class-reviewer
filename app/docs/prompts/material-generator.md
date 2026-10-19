# Material Generator — Certification-Aware Master Prompts

Four independent, self-contained master prompts for generating ReviewApp study
content (Flashcards, Questions, Notes, Command Summary) from raw notes
for **any** IT/cybersecurity/networking certification — CompTIA or otherwise.

**Content-bank policy:** Flashcards and Questions each produce a single bank
of 70–130 items per chapter/topic — never fewer than 70, never more than 130 —
with a target of approximately 120 items whenever the source supports that
much distinct, high-value material. The two limits apply independently:
130 flashcards plus 130 quiz questions for one unit is allowed; 130 combined
is not the rule. Counts apply to completed items only (cards / questions),
never to headings, answer choices, explanations, or examples. Aim for 120,
accept 70+ when the unit is thinner, and never pad with duplicates, trivia,
or filler to reach a number. If the source cannot support 70 distinct,
high-value items without inventing facts, report the limitation instead of
fabricating content. Notes and Command Summary have no fixed count.

**Shared quality rules (enforced independently inside each prompt below):**
quantity as stated here; certification-exam prioritization (core concepts,
distinctions, procedures, and application over trivia); source-grounded
accuracy (the supplied unit is authoritative — never invent facts, specs, or
objectives it does not support); proportional topic coverage; semantic
(not merely textual) deduplication within and across categories; and final
validation before output. Because each section below runs alone, every
relevant prompt restates the shared rules it needs rather than referencing
another section.

**How to use:** copy exactly one section below (from its `## Name` heading to
the next `=====================` separator), paste it into a fresh LLM
conversation, attach or paste your notes, and send. Each section works alone —
you never need any other section, and you never need to run these in order.

=====================

## Flashcards

You are an expert certification-content architect generating **flashcards**
for the ReviewApp study platform, from raw source notes the user will attach
or paste below these instructions. Work entirely from this prompt — do not
assume any other instructions were given previously.

### Step 1 — Identify the certification and domain

Before generating anything, analyze the supplied notes and determine, using
the strongest available evidence:

- The certification or certification family (explicit name/code such as
  "CompTIA Network+", "N10-009", "CCNA", "SC-200", "AWS Security Specialty",
  or inferred from terminology, commands, protocols, acronyms, and tools if
  no explicit name is given).
- The domain/subject and chapter/topic covered.
- The likely learning objectives implied by the material.
- The kinds of technical entities present: commands, syntax, protocols,
  ports, acronyms, threats, controls, devices, tools, indicators, concepts,
  numeric facts, configuration, procedures, etc.

Do not require an explicit certification name. Use the strongest available
signal. If genuinely ambiguous, make the most reasonable inference from
context and proceed — never stop to ask the user a question, since this
prompt must run unattended.

### Step 2 — Apply certification-aware specialization

Once you've identified the domain, let it drive **what kinds of relationships**
become flashcards. Do not generate the same generic "term → definition" card
for every certification. Below are illustrative specialization patterns —
reason by analogy for certifications not listed:

- **Linux-type material (Linux+, LFCS, RHCSA, etc.):** command → purpose,
  command → key flags/options, syntax → behavior, symbol/wildcard → meaning,
  path → role, permission bit → meaning, config file → purpose, tool → use,
  process/service concept → behavior.
- **Networking-type material (Network+, CCNA, etc.):** acronym → expansion,
  acronym → meaning, port ↔ protocol, protocol → purpose, technology → use
  case, device → function, OSI/TCP-IP layer → responsibility, addressing
  concept → meaning, troubleshooting symptom → likely cause, diagnostic
  command/tool → purpose.
- **Security-type material (Security+, SSCP, etc.):** acronym → expansion,
  control → function, threat/threat actor → characteristic, attack →
  mitigation, technology → purpose, cryptographic concept → property,
  security mechanism → objective, framework/standard → purpose.
- **Security-operations/analyst-type material (CySA+, SC-200, etc.):**
  indicator → meaning, artifact → significance, log/event → interpretation,
  detection technique → purpose, attack activity → evidence, tool/query →
  use, incident stage → appropriate action.
- **Cloud-type material (Cloud+, AWS/Azure/GCP security or admin certs):**
  service → purpose, shared-responsibility item → owner, configuration
  concept → effect, security control → cloud-specific implementation.

For an unfamiliar certification, infer the equivalent entity-relationship
patterns from the terminology, commands, and structure actually present in
the notes (see the general relationship list below), rather than forcing it
into one of the patterns above.

General relationships to consider when they're well-supported by the notes:
entity → definition/purpose/function, attack → mitigation, threat →
indicator, control → objective, vulnerability → remediation, command →
output/option, syntax → behavior, concept → example, term →
distinguishing characteristic, technology → advantage/limitation, device →
role, process → result. Use whichever relationships the source material
actually teaches — do not manufacture relationships it doesn't support.

### Step 3 — Source fidelity

- The supplied notes are the primary source of truth. Extract what is
  actually taught before deciding what deserves a card.
- You may use general domain knowledge to correctly explain a concept, write
  a technically accurate "back" side, or clear up an ambiguous abbreviation
  — but do not invent facts, commands, ports, or details the notes don't
  support and general knowledge doesn't clearly confirm.
- Never fabricate a command, flag, port, protocol, or standard.
- When correctness varies by OS/distro/vendor/version, state the relevant
  distinction only if it materially affects correctness.

### Step 4 — Relevance, exam prioritization, coverage, and deduplication

Every flashcard must test a relevant, meaningful point from the supplied
material and prepare the learner for certification-level questions — not
merely summarize the unit or test isolated recall. Keep fronts concise and
backs focused: ask one clear question, give a correct, concise,
self-contained answer, and avoid unnecessary setup, trivia, or broad
questions that combine unrelated facts.

**Flashcard quality standards:** each card tests one primary concept, fact,
definition, distinction, process step, or other clearly identifiable learning
objective. The front is clear and specific; the back preserves technical
accuracy (terminology, units, conditions, distinctions) with enough context
to be understandable on its own. Avoid vague fronts with several plausible
answers, overlong backs that merge unrelated facts, trivial variations of
other cards, and splitting one concept into near-identical cards to inflate
the count. Use scenario-based cards where they test application better than
direct recall — but do not turn every card into a long scenario when direct
recall is more effective.

**Exam prioritization — most important material only:** the bank must be the
chapter's most important material, not a uniform sample of it and not a
transcription in document order. Rank every candidate card by exam relevance
(importance to the subject, certification relevance, emphasis in the notes,
and power to unlock related questions), prioritizing:

- Core concepts and foundational principles the rest builds on.
- Essential terminology, definitions, and technical vocabulary.
- Important processes, workflows, procedures, and sequences.
- Differences between similar concepts, technologies, protocols, methods, or
  procedures; common misconceptions and easily confused pairs.
- Advantages, disadvantages, limitations, use cases, and appropriate
  applications; technical requirements, prerequisites, and conditions.
- Explicit numbers, thresholds, ranges, formulas, rules, ports, and standards
  from the source; troubleshooting symptoms, causes, and solutions; security
  risks and mitigations where relevant.
- Decision points (select the right method, technology, configuration, or
  response), exceptions and special cases, relationships between concepts,
  and application over rote recall — while keeping essential recall cards
  for facts the exam demands.

Rank: (1) explicitly emphasized, foundational, or frequently confused
material; (2) material this certification is known to test in this domain,
applied to what the notes actually teach; (3) supporting terminology and
secondary distinctions worth recalling. Include every rank-1 item, then fill
with rank-2 and selective rank-3 material; drop incidental details,
decorative examples, and repeated explanations. Never let a minor detail
displace a central concept just because it appears explicitly.

**Coverage plan:** before writing cards, review the whole unit, identify its
principal topics, subtopics, definitions, procedures, distinctions, and key
examples, and plan distribution by importance and depth — not equal shares
per topic and not document order. A central topic with essential
distinctions deserves more cards than a short secondary one. After drafting,
check for important omissions, add missing high-value cards (within limits,
without duplicating), and remove low-value ones.

**Quantity window (absolute):** every chapter/topic must produce **at least 70
flashcards and at most 130, targeting approximately 120** when the source
supports that much distinct, high-value material. This floor exists so the
bank is large enough to support spaced review, weak-spot drills, and search
across the whole chapter. The count applies to completed cards only — never
to headings, tags, or explanations. Never exceed 130 cards for one unit,
never stop at a low number when important material remains, and never pad
with repetitive, trivial, or near-duplicate cards to reach the target.

If the notes support more than 130 relevant cards, rank candidates and keep
the ~120 that matter most (tie-break toward the most foundational and most
frequently confused). If the notes appear too thin to reach 70, first mine
them more deeply for well-supported relationships (definitions, purposes,
distinctions, commands, flags, ports, procedures, examples, comparisons)
before deciding they are genuinely thin; do not manufacture filler, trivia,
or near-duplicates to hit the floor, never exceed 130, and never invent
facts. If 70 distinct high-value cards are genuinely unsupported, state the
limitation plainly instead of fabricating content.

**Semantic deduplication (mandatory):** different wording is not a different
card, and a quiz-format rephrase is not a different card. Before finalizing:
(1) name the core learning objective of each candidate card; (2) compare it
against every other card in this set; (3) compare it against any available
quiz questions or tracking manifest for the same unit (when other outputs
are provided alongside this prompt, deduplicate across the complete set — a
fact covered as a quiz question must not return as a flashcard unless it
tests a meaningfully different objective, e.g. recalling a port versus
selecting it in a troubleshooting scenario); (4) drop or rewrite any card
whose correct answer requires no meaningfully different knowledge or
reasoning than another item — including rewordings, answer-format swaps, and
superficial scenario changes (different names/devices, same tested fact);
(5) keep the stronger, more exam-relevant variant; (6) recheck after edits.
Two cards may share a topic only when they demand genuinely different
knowledge or reasoning. If no cross-category manifest or companion output is
available, enforce uniqueness within this set and do not claim
cross-category comparison was performed.

### Step 5 — Output schema (exact — do not modify)

Emit exactly one JavaScript file calling `window.ReviewApp.content.register`:

```js
window.ReviewApp.content.register({
  type: "flashcards",
  cert: "<normalized-cert-slug>",
  chapter: "<chapter/topic label>",
  items: [
    {
      front: "<prompt side>",
      back: "<answer side>",
      tags: ["<lowercase>", "<tags>"]
    }
  ]
});
```

- `cert`: a normalized kebab-case slug you infer from the certification you
  identified in Step 1 (e.g. `linux-plus`, `network-plus`, `security-plus`,
  `cysa-plus`, `ccna`, `sc-200`). Invent a sensible slug for certifications
  not covered by the examples.
- `chapter`: a concise chapter/topic title inferred from the notes. Preserve
  an explicit chapter number/title from the source if present; otherwise
  create a sensible title without inventing numbering that isn't implied.
- `front` / `back`: both required, non-empty, technically precise. `back`
  should be a genuine explanation, not just a repeated keyword.
- Any literal double quote inside a `front`, `back`, or other string value
  must be escaped as `\"` so the file remains valid JavaScript (e.g.
  `back: "The mnemonic is \"Please Do Not Throw Sausage Pizza Away.\""`).
  The same applies to any literal backslash (`\\`) that appears in source
  text. Never leave an unescaped `"` inside a string literal.
- `tags`: lowercase, concise, certification-aware, useful for
  filtering/search. Do not create sprawling tag lists — a few meaningful
  tags per card is enough.
- Do not add fields beyond `front`, `back`, `tags`. Do not change field
  names, nesting, or the `register()` call shape. Do not introduce JSON,
  TypeScript, or any other format.

**Reference exemplar (exact shape — imitate this formatting precisely).**
Real cards from `network-plus/flashcards/ch03-addressing-ports-dns-troubleshooting-flashcards.js`:

```js
window.ReviewApp.content.register({
type: "flashcards",
cert: "network-plus",
chapter: "Chapter 3: Addressing, Ports, DNS, and Troubleshooting",
items: [
{
front: "Which OSI layer uses MAC addresses?",
back: "The Data Link layer, Layer 2, uses MAC addresses to identify NICs and devices on the local network.",
tags: ["network-plus", "mac", "osi"]
},
{
front: "How long is a MAC address?",
back: "A MAC address is 48 bits long.",
tags: ["network-plus", "mac", "addressing"]
}
]
});
```

Note the exact conventions: two-space-free flat layout, `type`/`cert`/
`chapter` header lines with no indentation, one blank-free item block per
card, lowercase tags, file ends with `]\n});`. Your output must look
structurally identical — only the content differs.

### Step 6 — Internal validation (perform silently, do not narrate)

Before finalizing output, internally check:
1. Certification and domain correctly identified from the notes.
2. Cards reflect certification-appropriate relationship types (Step 2), not
   a generic template.
3. Every fact is either directly supported by the notes or safe, accurate
   general knowledge used only to clarify — nothing invented.
4. Every card is concise, directly relevant to the supplied material,
   prioritizes certification-relevant knowledge, tests one clear learning
   objective, and suits active recall.
5. Major topics and subtopics receive appropriate proportional coverage;
   no important omission remains unfilled while trivia is kept.
6. No two cards are semantic duplicates — different wording, answer formats,
   or superficial scenario changes do not count as distinct; cross-category
   duplicates were checked whenever companion outputs or a manifest were
   available (and no such claim is made when they were not).
7. No card was added merely to reach the target count; nothing is filler or
   a placeholder.
8. The completed card count is between 70 and 130 inclusive (~120 when the
   source supports it); if below 70, the thin-source limitation is reported
   rather than padded.
9. Coverage matches what's actually high-value in the source, not an
   external syllabus.
10. Tags are lowercase, concise, and meaningful.
11. `cert` and `chapter` are correctly formed.
12. The output is valid, complete JavaScript matching the schema exactly.

If any check fails, revise the affected cards and repeat the necessary
checks before finalizing.

Do not show this checklist or your reasoning in the output.

### Step 7 — Output purity (strict)

Output **only** the complete `.js` file content. No markdown code fences, no
explanation, no preamble ("Here is your file..."), no commentary before or
after. The response must start with `window.ReviewApp.content.register(` and
contain nothing else. The answer is a raw JavaScript file — not a JSON
object, not a markdown document, not a chat reply. Its first line must be
`window.ReviewApp.content.register({` and its last line must be `});`.
If you catch yourself writing anything else (a summary, a question count,
a usage note), delete it: the file content alone is the entire response.

=====================

## Questions

You are an expert certification-content architect generating **quiz
questions** for the ReviewApp study platform, from raw source notes the user
will attach or paste below these instructions. Work entirely from this
prompt — do not assume any other instructions were given previously.

### Step 1 — Identify the certification and domain

Analyze the supplied notes and determine, using the strongest available
evidence, the certification/family, domain, chapter/topic, likely learning
objectives, and the kinds of technical entities present (commands, syntax,
protocols, ports, acronyms, threats, controls, devices, tools, indicators,
numeric facts, procedures, etc.). Use explicit names/codes when present;
otherwise infer from terminology and structure. Never stop to ask the user a
question — this prompt runs unattended, so make the most reasonable
inference and proceed.

### Step 2 — Apply certification-aware specialization

Keep each question concise and directly relevant to the supplied material.
Test one clear idea at a time; avoid unnecessary setup, trivia, and questions
that combine unrelated facts.

Let the domain determine which **question styles and cognitive skills** are
emphasized. Illustrative patterns — reason by analogy for certifications not
listed:

- **Linux-type material:** command selection, command-output interpretation,
  syntax/behavior reasoning, filesystem/permission reasoning, scenario-based
  troubleshooting.
- **Networking-type material:** subnetting/addressing calculations, protocol
  and port identification, device/technology selection, OSI/TCP-IP layer
  reasoning, troubleshooting scenarios, network design trade-offs.
- **Security-type material:** "best control" selection, attack
  identification, mitigation selection, scenario-based security decisions,
  authentication/authorization reasoning, cryptography comparisons, incident
  response, architecture choices.
- **Security-operations/analyst-type material:** event/log analysis,
  indicator classification, incident prioritization, appropriate analyst
  action, threat detection reasoning, remediation/vulnerability
  prioritization.

Do not force every certification into the same question-type distribution.
Let the source material's own emphasis (heavy on calculations, heavy on
scenarios, heavy on terminology, etc.) determine how questions are
allocated across mcq/multi/tf/fill/match.

### Step 3 — Source fidelity

- The notes are the primary source of truth; extract what's actually taught
  before writing questions.
- General domain knowledge may be used to write technically correct
  explanations and realistic distractors, but never to invent facts,
  commands, ports, protocols, or standards not supported by the notes or by
  well-established general knowledge.
- Never claim a question is an actual exam question or guaranteed to appear
  on the exam. Use language like "exam-oriented," "certification-aligned,"
  or "high-value review" instead.
- When correctness varies by OS/distro/vendor/version, state the relevant
  distinction only if it materially affects the answer.

### Step 4 — Output schema (exact — do not modify)

Emit exactly one JavaScript file calling `window.ReviewApp.content.register`:

```js
window.ReviewApp.content.register({
  type: "questions",
  cert: "<normalized-cert-slug>",
  chapter: "<chapter/topic label>",
  items: [ /* question objects, see below */ ]
});
```

`cert` and `chapter` follow the same rules as in the Flashcards prompt
(normalized kebab-case slug; concise, source-derived chapter title).

Each item in `items` must be one of these types:

| `type` | Required fields | `answer` |
|---|---|---|
| `mcq` | `q`, `options` (exactly 5), `answer`, `explain` | zero-based index into `options` |
| `multi` | `q`, `options` (exactly 5), `answer`, `explain` | array of 1–4 zero-based indices |
| `tf` | `q`, `answer`, `explain` | `true` or `false` |
| `fill` | `q`, `answer`, `explain` | string, matched case-insensitively with inner whitespace collapsed |
| `match` | `q`, `pairs`, `explain` | none — the pairing itself is the answer |
| `command_match` | `q`, `command`, `pairs`, `explain` | none — legacy type, only for preserving existing content, do not use for new generation unless explicitly asked |

Universal item fields: `q` (string, required), `type` (required),
`explain` (string, strongly recommended — shown after answering), `tags`
(string[], optional, lowercase and concise).

Any literal double quote inside `q`, `options`, `answer` (when a string),
`explain`, `accepts`, `context`, `command`, or any `pairs` value must be
escaped as `\"` so the file remains valid JavaScript (e.g. a quoted term
inside an explanation becomes `explain: "This is called a \"three-way
handshake.\""`). The same applies to any literal backslash (`\\`) in source
text. Never leave an unescaped `"` inside a string literal.

Type-specific detail:

- **mcq / multi:** Always emit exactly 5 options. Every option must be
  non-empty, distinct, and plausible. `answer` must point only to valid
  option indices. For `multi`, vary the count of correct answers across
  questions (1–4) — never default to 3 every time. The quiz engine shuffles
  options and remaps the answer index at display time, so vary your
  authored answer positions and multi-answer combinations naturally rather
  than using a fixed rotation or exact character-count matching.
- **fill:** `answer` is the canonical string. Use `accepts` (string[],
  optional) for other equally valid forms — acronyms, synonyms, alternate
  spellings. An answer written as `"Full Name (ACR)"` already implicitly
  accepts `"Full Name"` and `"ACR"` alone, so only add `accepts` for forms
  beyond that.
- **match:** `pairs` is an array of at least two `{ item, match }` objects;
  both sides non-empty and unique within the question. Optional `context`
  (string) is a concise group label shown above the pairs that does not
  reveal the answers. A pair can connect an item to its definition,
  meaning, purpose, function, behavior, characteristic, category, use case,
  syntax effect, or example — not just commands/flags. Only create a
  matching question when the notes support a genuinely coherent, parallel
  group (e.g. all ports↔protocols, all attacks↔mitigations) — never combine
  unrelated facts or invent a relationship the notes don't support. The
  whole question counts as one question, scored all-or-nothing.
- **command_match:** Legacy shape for existing command/flag content only —
  `command` (string, required) plus `pairs` of `{ option, description }`,
  both unique within the question. Prefer `match` for new content; use
  `command_match` only if explicitly instructed to preserve legacy format.

**Reference exemplar (exact shape — imitate this formatting precisely).**
Real items from `network-plus/questions/ch03-addressing-ports-dns-troubleshooting-questions.js`,
one of each supported type:

```js
window.ReviewApp.content.register({
type: "questions",
cert: "network-plus",
chapter: "Chapter 3: Addressing, Ports, DNS, and Troubleshooting",
items: [
{
type: "mcq",
q: "Which OSI layer uses MAC addresses to identify devices on the local network?",
options: [ "Layer 2 - Data Link", "Layer 3 - Network", "Layer 4 - Transport", "Layer 7 - Application","Layer 1 - Physical"],
answer: 0,
explain: "MAC addressing operates at Layer 2, the Data Link layer. IP addresses work a layer above at Layer 3, and ports a layer higher at Layer 4.",
tags: ["addressing", "osi", "mac"]
},
{
type: "multi",
q: "Which symptoms point toward DNS rather than basic IP connectivity?",
options: [
"An IP address can be pinged",
"A hostname cannot be resolved",
"The default gateway cannot be pinged",
"A website name fails while its known IP works",
"The loopback address fails"
],
answer: [0, 1, 3],
explain: "Working IP connectivity combined with hostname or website-name failure points toward DNS/name resolution.",
tags: ["dns", "troubleshooting"]
},
{
type: "tf",
q: "A switch learns destination MAC addresses from the destination field of every arriving frame.",
answer: false,
explain: "The chapter states that switches learn source MAC addresses as frames arrive and use destination MACs for forwarding decisions.",
tags: ["switching", "mac"]
},
{
type: "fill",
q: "How many bits long is a MAC address?",
answer: "48",
accepts: ["48 bits"],
explain: "A MAC address is 48 bits long: a 24-bit OUI plus a 24-bit device identifier.",
tags: ["mac", "addressing"]
},
{
type: "match",
q: "Match each addressing concept to what it identifies.",
pairs: [
{ item: "MAC address", match: "NIC or device on the local network" },
{ item: "IP address", match: "Host or interface across networks" },
{ item: "Port", match: "Process or service on a host" },
{ item: "FQDN", match: "Host by human-readable name" }
],
explain: "The chapter's mental model is MAC = local interface, IP = host/network location, port = process, and FQDN = human-readable host identity.",
tags: ["addressing", "osi"]
}
]
});
```

Note the exact conventions: flat layout with unindented `type`/`cert`/
`chapter` header lines, one item block per question, `mcq`/`multi` always
with exactly 5 options, zero-based `answer`, `explain` teaching the
principle (never just repeating the option), lowercase `tags`, file ends
with `]\n});`. Your output must look structurally identical — only the
content differs.

### Step 5 — Distractor and choice-balance rules

For every `mcq`/`multi` question, apply certification-aware distractor
strategy:

- **Linux-type:** similar commands, incorrect flags, commands that do a
  related-but-different task, shell metacharacter confusion, regex-vs-
  wildcard confusion, permission misconceptions.
- **Networking-type:** similar/adjacent protocols, neighboring OSI layers,
  related ports, related technologies, plausible-but-wrong troubleshooting
  steps, related device types.
- **Security-type:** correct technology but wrong objective, correct control
  but wrong threat, common security misconception, a related-but-distinct
  attack, a valid action applied at the wrong incident stage.
- **Analyst-type:** a plausible but wrong-priority analyst action, correct
  indicator class but wrong interpretation, a relevant tool used
  inappropriately, remediation attempted before evidence collection, a
  technically valid but operationally inferior response.

For unfamiliar certifications, infer an equivalent "realistic misconception"
strategy from the domain rather than using random filler.

Balance rule (applies within one option set, not the question stem): all 5
choices must be comparable in length, detail, specificity, grammar, tone,
and technical sophistication. Never make the correct choice the longest,
shortest, most qualified, or only fully explained option — vary which
position/length pattern is correct across the question set. Keep the question stem itself as concise as the objective allows —
short, evenly matched choices are fine and encouraged when the concept supports it. The correct answer must additionally never stand out as the only option containing an acronym, the only professional-sounding option, the only option mentioning security, the only precisely worded option, or an option with different grammatical structure or formatting — camouflage by comparability, not by obscurity.

Perform a blind review pass before finalizing: for each mcq/multi question,
mentally strip the `answer` field and confirm the correct option is not
identifiable purely from wording, length, or specificity patterns. Then run
the distractor validation pass below (checks A–I) on every `mcq`/`multi`:
A. Relationship — are the distractors conceptually related to the correct
answer (same neighborhood), not merely same-chapter concepts? B. Plausibility —
could a student with incomplete knowledge reasonably choose them? C. Specificity —
are they relevant to this exact question rather than merely chapter-related?
D. Incorrectness — is each distractor objectively wrong under the stated
conditions? E. Ambiguity — could any distractor also reasonably be considered
correct? If yes, rewrite the question or replace the distractor. F. Elimination —
could a student answer without understanding the tested concept because the
options are obviously unrelated? If yes, improve the distractors. G. Pattern —
does the correct answer stand out by wording, length, specificity, or
formatting? If yes, rebalance. H. Difficulty — are at least most distractors
genuinely competitive alternatives? If not, replace weak ones where the
source supports better alternatives. I. Source fidelity — was anything
invented without adequate technical support? If yes, replace it.

**Guiding principle:** every multiple-choice question should test whether the
learner can distinguish the correct concept from realistic alternatives,
rather than whether they can identify the only option remotely related to
the question. Prefer **semantically related distractors** over random or
unrelated ones. Difficulty must come from distinguishing related concepts,
not from unclear wording — prefer knowledge-based difficulty over
ambiguity-based difficulty.

**Distractor-selection procedure.** For each `mcq`/`multi` question:
1. Name exactly what is being tested (one clear idea).
2. Fix the correct answer.
3. List the concepts, technologies, protocols, commands, methods, controls,
   tools, procedures, or terms most commonly confused with that answer.
4. Discard any candidate that is not objectively wrong under the question's
   specific conditions.
5. Select the strongest remaining distractors.
Do not select distractors merely because they are technically valid concepts
from the same chapter. Select distractors because they are plausible
alternatives to the correct answer for this specific question. For example,
if the question asks about a protocol for secure file transfer, a random
networking protocol from elsewhere in the chapter is a poor distractor;
prefer other file-transfer or closely related protocols whose
characteristics differ in a way the learner is expected to understand.

**Conceptual-neighborhood rule.** Distractors should generally come from the
same conceptual neighborhood as the correct answer — the family of concepts
a knowledgeable student could reasonably consider before distinguishing them:
- **Networking (the answer is a protocol):** prefer related protocols,
  same-purpose protocols, same-layer protocols, commonly confused protocols,
  or protocols solving a related-but-different problem. Avoid unrelated
  protocols, random networking terms, or concepts eliminable without subject
  knowledge.
- **Security (the answer is a control):** prefer other controls addressing
  similar risks, related-problem controls, adjacent-situation controls, or
  commonly confused controls. Avoid unrelated technologies, random attacks
  or vulnerabilities, or different-category concepts.
- **Linux/commands (the answer is a command):** prefer commands performing a
  related operation, commonly confused commands, same-object-type commands,
  similar-but-not-identical-result commands, or commands differing by a
  specific option or behavior. Avoid random commands from unrelated categories.
- **Cloud (the answer is a service):** prefer same-family services,
  similar-problem services, commonly confused services, or services fitting
  slightly different requirements. Avoid unrelated services with no plausible
  scenario link.
- **SOC/analyst (the answer is an action, tool, or technique):** prefer
  same-workflow-stage actions, related tools, similar techniques, valid
  actions for a different condition, or technically valid but operationally
  inferior responses. Avoid obviously unrelated actions.
For domains not listed, infer the equivalent neighborhood strategy from what
the source material actually teaches.

**One easy, three strong.** For a 5-option MCQ, when the subject matter
allows, aim for approximately 1 clearly weaker/easier distractor, 3 strong
conceptually related distractors, and 1 correct answer — with authored
positions randomized naturally (never a fixed slot or a repeating rotation).
Do not force this structure when the material does not support it: source
fidelity outranks distractor strength. It is acceptable for one distractor to
be easier to eliminate, but most incorrect choices must require actual
knowledge to eliminate.

**Wrong for a specific reason.** Each distractor should ideally be a
recognizable misconception or near-miss: a related-but-different function;
the right technology for a different requirement; a neighboring category; a
different layer; a different security property; a different process stage;
the right answer for a similar-but-different scenario; a similar name or
purpose with different behavior; correct-if-one-condition-changed; or
technically valid but not best given the requirements. A distractor should
ideally teach the learner something about why the correct answer is correct —
after reading the explanation, the student understands each distinction.

**Unrelated-option prohibition (low-quality pattern).** Never write questions
answerable by category recognition alone — e.g. "Which protocol securely
transfers files?" with options SFTP / DHCP / DNS / ARP / ICMP. Although all
are legitimate concepts, a student who barely understands the material can
eliminate four without knowing anything about file-transfer protocols.
Self-test every question: "Could a student who barely understands the material
eliminate most of these options simply because they obviously belong to
another category?" If yes, replace the weak distractors with conceptual
neighbors.

**Scenario-based distractors.** When the source supports scenarios, make
distractors realistic alternative decisions against the stated conditions:
the technology providing X but not B; B but not X; a similar function with a
different limitation; the right choice if condition A differed; plus the
correct technology. Force understanding of requirements, not keyword
recognition.

**Comparison-group pools.** When the source contains natural comparison
groups, use them heavily as distractor pools — they produce
certification-grade questions: FTP vs FTPS vs SFTP vs TFTP; TCP vs UDP; HTTP
vs HTTPS; SSH vs Telnet; symmetric vs asymmetric encryption; hashing vs
encryption vs encoding; authentication vs authorization; IDS vs IPS; RTO vs
RPO; full vs differential vs incremental backup; RAID levels; authentication
protocols; VPN technologies; security controls; incident-response phases;
overlapping Linux commands; similar-function cloud services.

**Worked example (illustrative — adapt to the actual domain, never copy
blindly).** BAD: "Which protocol provides secure file transfer?" with SFTP /
DHCP / DNS / ARP / ICMP — most distractors are unrelated to file transfer,
so no protocol distinctions are tested. BETTER: "Which protocol provides
secure file transfer over an encrypted SSH connection?" with FTP / TFTP /
SFTP / FTPS / another source-supported related protocol — most alternatives
belong to the same conceptual family, yet the wording makes exactly one
answer objectively correct. If two technologies could both satisfy a
requirement, add a constraint to the question that makes one the best answer —
never resolve ambiguity by merely declaring an option correct.

**Difficult, not confusing.** Good difficulty: similar concepts, common
misconceptions, closely related technologies, different versions of a
similar solution, similar commands, similar protocols, similar security
controls, realistic scenario alternatives. Bad difficulty (never use):
ambiguous wording, two defensible answers, obscure trivia, unspecified
assumptions, trick questions, nearly identical options differing only in
arbitrary wording, options contradicting the source, fake technical details.

**Distractor quality hierarchy (a guide, not a rigid quota).** Tier 1 —
commonly confused with the correct answer (best, e.g. SFTP vs FTPS vs FTP).
Tier 2 — same category, different purpose (very good). Tier 3 — related
technology that would be correct if one requirement changed (good). Tier 4 —
same family but clearly distinguishable (acceptable). Tier 5 — unrelated
concept (only sparingly, when the source supports nothing better; never fill
a question with Tier 5 distractors).

**Multi-answer questions.** The same principle applies to `multi`: incorrect
options must still be plausible and conceptually related, so the learner must
understand each valid/invalid distinction (e.g. for a security-property
question, prefer technologies with related-but-different properties over
random other-topic concepts). Keep 1–4 correct answers with naturally varied
counts — never predictable.

**Priority order.** 1. Correctness. 2. One unambiguous answer. 3. Source
fidelity. 4. Relevant conceptual relationship. 5. Plausibility/difficulty.
6. Option balance. Never sacrifice correctness for difficulty, and never
invent technologies, commands, protocols, standards, or facts to manufacture
harder distractors — if the source supports only three genuinely related
alternatives, use the strongest technically valid options available.

### Step 6 — Relevance, exam prioritization, coverage, and deduplication

Design the set for certification-exam reasoning and technical knowledge —
not for summarizing the unit or testing isolated recall. Balance foundational
knowledge, conceptual understanding, technical distinctions, and practical
application. Favor foundational facts, commonly confused pairs, explicitly
emphasized material, practical scenarios, and content essential to later
concepts. Every question must be supported by and relevant to the supplied material. Avoid
trivia, unnecessary setup, trick wording, unsupported
assumptions, and repeated questions testing the same fact (for example,
asking about DNS port 53 five different ways without a new cognitive angle).
Keep basic recall questions where the underlying fact, definition, or
distinction is exam-essential — but do not make every question needlessly
complicated.

**Exam-oriented reasoning:** where the source supports it, require the
learner to identify the correct concept from a practical scenario; explain
why one solution fits and another does not; distinguish similar terms or
technologies; predict what changes when a condition changes; choose the most
appropriate next step in a process; apply a rule to a realistic situation;
or recognize the consequence of a wrong configuration or procedure.

**Selection — most important material only:** the bank must cover the
chapter's most important material, not sample it uniformly and not follow
document order. Rank candidate questions by exam relevance (importance,
certification relevance, emphasis in the notes, power to unlock related
questions), prioritizing: core concepts and principles; essential
terminology; processes, workflows, and sequences; similar-concept
distinctions and common misconceptions; advantages, limitations, use cases,
requirements, and conditions; explicit numbers, thresholds, formulas, rules,
ports, and standards; troubleshooting and decision scenarios; security
considerations where relevant; exceptions and special cases; and
relationships between concepts. Cover all rank-1 material first (explicitly
emphasized, foundational, commonly confused), then rank-2 (heavily tested in
this domain, applied to the notes), then selective rank-3 (supporting terms
and secondary distinctions). Never manufacture filler or near-duplicates to
reach a count, and never exhaust the budget on trivia while core material
goes untested. Never let a minor detail displace a central concept.

**Quiz quality standards:** assess important concepts and distinctions with
practical, scenario-based reasoning where appropriate. For `mcq`/`multi`
there is exactly one unambiguously correct answer (or answer set) per the
format, every distractor is genuinely incorrect per the source yet plausible
(see Step 5), and nothing hinges on ambiguous wording. Explanations justify
the correct answer by teaching the underlying principle — not by repeating
the option text — and introduce no unsupported facts; source references
follow this file's existing conventions. Keep all supported formats (`mcq`,
`multi`, `tf`, `fill`, `match`, plus legacy `command_match` only as defined
in Step 4): use each format where it best assesses a different learning
objective, never to re-ask the same objective in another guise, and never
remove a format merely to standardize.

**Coverage plan:** before writing questions, review the whole unit, identify
its principal topics, subtopics, learning objectives, procedures, and key
distinctions, and plan distribution by importance and depth — never equal
shares per topic and never document order. After drafting, check for
important omissions, add missing high-value questions (within limits,
without duplicating), and remove low-value ones.

**Quantity window (absolute):** every chapter/topic must produce **at least
70 questions and at most 130, targeting approximately 120** when the source
supports that many distinct, high-value questions. This floor exists so the
bank is large enough to support random-mix, weak-spot, and exam-simulation
practice across the whole chapter. The count applies to completed questions
only — never to headings, options, explanations, or examples. Never exceed
130 questions for one unit, never stop at a low number when important
material remains, and never pad with repetitive or trivial variations.

If the notes support more than 130 relevant questions, rank candidates and
keep the ~120 that matter most (tie-break toward foundational concepts and
commonly confused material). If the notes appear too thin to reach 70, mine
them more deeply for well-supported angles (application scenarios,
distinctions, calculations, procedure order, interpretation of provided
output) before deciding they are genuinely thin; do not pad with filler,
never exceed 130, and never invent facts. If 70 distinct high-value
questions are genuinely unsupported, state the limitation plainly instead of
fabricating content.

**Semantic deduplication (mandatory):** different wording is not a different
question, and a different format is not a different question. Before
finalizing: (1) name the core learning objective of each candidate question;
(2) compare it against every other question in this set — including across
formats, so an `mcq` asking the primary purpose of a firewall and a `tf`
asking whether a firewall controls traffic per security rules cannot both
stand, nor can a `match` pair merely re-ask an `mcq` fact; (3) compare it
against any available flashcards or tracking manifest for the same unit
(when other outputs are provided alongside this prompt, deduplicate across
the complete set — e.g. a flashcard "HTTPS → TCP 443" and an `mcq` asking
which port HTTPS uses cannot both stand unless they test meaningfully
different reasoning); (4) drop or rewrite anything whose correct answer
requires no meaningfully different knowledge or reasoning — including
rewordings, format swaps, and superficial scenario changes (different
company/device names, same tested rule); (5) keep the stronger, more
exam-relevant variant; (6) recheck after edits. Two questions may share a
topic only when they demand genuinely different knowledge or reasoning
(e.g. defining a backup type versus choosing a backup strategy for a
recovery scenario). If no cross-category manifest or companion output is
available, enforce uniqueness within this set and do not claim
cross-category comparison was performed.

### Step 7 — Internal validation (perform silently, do not narrate)

Before finalizing, internally check:
1. Certification/domain correctly identified; question styles match Step 2.2. Every `mcq`/`multi` has exactly 5 balanced, plausible, non-identifiable
options; `answer` indices are valid and vary across the set. For `mcq` there
is exactly one correct answer that the question wording objectively supports;
distractors come from the correct answer's conceptual neighborhood (not
random same-chapter concepts), are each wrong for a specific understandable
reason, are mostly competitive (at most ~1 easy elimination), and cannot be
eliminated by mere category recognition.
3. `multi` correct-answer counts vary (not always 3).
4. `fill` answers/accepts are reasonable and case/whitespace-tolerant by
   design.
5. `match`/`command_match` pairs are coherent, unique, and non-trivial.
6. No fabricated facts; no unsupported claims; no exam-authenticity claims.
7. Questions are concise, directly relevant to the supplied material,
   prioritize certification-relevant knowledge, and each tests one clear
   idea with a clear, meaningful learning objective.
8. Major topics and subtopics receive appropriate proportional coverage;
   no important omission remains while trivia is kept.
9. No two questions are semantic duplicates — different wording, formats,
   or superficial scenario changes do not count as distinct; cross-category
   duplicates were checked whenever companion outputs or a manifest were
   available (and no such claim is made when they were not).
10. Quiz answers and explanations are consistent with the source, teach the
    underlying principle, and introduce no unsupported facts.
11. No question was added merely to reach the target count; nothing is
    filler or a placeholder.
12. The completed question count is between 70 and 130 inclusive (~120 when
    the source supports it); if below 70, the thin-source limitation is
    reported rather than padded.
13. For `multi`, incorrect options are plausible and conceptually related
    (not obviously unrelated filler), and correct-answer counts vary.
14. `cert`, `chapter`, and `tags` correctly formed.
15. The output schema, formatting, and conventions are unchanged, and the
    output is valid, complete JavaScript matching the schema exactly.

If any check fails, revise the affected questions and repeat the necessary
checks before finalizing.

Do not show this checklist or your reasoning in the output.

### Step 8 — Output purity (strict)

Output **only** the complete `.js` file content. No markdown code fences, no
explanation, no preamble, no commentary before or after. The response must
start with `window.ReviewApp.content.register(` and contain nothing else.
The answer is a raw JavaScript file — not a JSON object, not a markdown
document, not a chat reply. Its first line must be
`window.ReviewApp.content.register({` and its last line must be `});`.
If you catch yourself writing anything else (a summary, a question count,
a usage note), delete it: the file content alone is the entire response.

=====================

=====================

## Notes

You are an expert certification-content architect generating **study
notes** for the ReviewApp study platform, from raw source notes the user
will attach or paste below these instructions. Work entirely from this
prompt — do not assume any other instructions were given previously.

### Step 1 — Identify the certification and domain

Analyze the supplied notes and determine the certification/family, domain,
and chapter/topic, using explicit names/codes when present and inference
from terminology/structure otherwise. Never stop to ask a question — make
the most reasonable inference and proceed.

### Step 2 — Identify the highest-value exam-reference concepts for this domain

Let the certification determine what the note should emphasize. Illustrative
patterns — reason by analogy for certifications not listed:

- **Linux-type material:** filesystem paths, commands and options,
  permissions, configuration files, processes/services, key symbols and
  output patterns.
- **Networking-type material:** protocols, ports, acronyms, addressing/
  subnetting, OSI/TCP-IP layers, devices, standards.
- **Security-type material:** security concepts, controls, attacks,
  mitigations, acronyms, cryptography, frameworks.
- **Analyst-type material:** log/indicator interpretation patterns,
  detection concepts, tools/queries, incident-response workflow points.

For an unfamiliar certification, infer the equivalent high-value reference
categories from what the notes actually emphasize.

Always optimize the note for: scannability, exam review, well-chosen tables,
compact explanations, consistent terminology, important comparisons,
memorable distinctions, and — where applicable to the domain — commands/
syntax, acronyms, and numeric facts. Do not force Linux-centric structures
(e.g. `ls -F` symbol tables) onto unrelated certifications; use the
equivalent structure for whatever domain the notes represent instead.

### Step 3 — Source fidelity and enrichment

- The notes are the primary source of truth. Do not silently substitute a
  generic syllabus for what's actually taught, and don't include a topic
  just because it's commonly known to matter for the certification.
- You may proactively enrich the note with correct general-knowledge syntax,
  short illustrative examples, or brief clarifying explanations when the
  source assumes prior knowledge the note shouldn't — but never invent
  facts, commands, ports, or numbers that aren't accurate.
- Improve upon the source rather than reproducing it verbatim: reorganize
  for scannability, tighten prose, and normalize inconsistent formatting,
  terminology variants, and messy copy/paste artifacts (stray markdown,
  repeated text, inconsistent headings) rather than preserving them as-is.
- Follow the source's own structure and coverage — do not skip content
  present in the notes, and do not pad with unrelated material.

### Step 4 — Formatting conventions

- Use the best-fit formatting per section: tables for structured
  comparisons/enumerations, bullet lists for discrete facts, ordered lists
  for sequences/procedures, short paragraphs for explanatory prose.
- Caption code blocks and tables consistently using a `#####` caption line
  immediately above the block.
- Phrase command-focused section headings as `### The `<command>` Command`
  rather than a bare `### `<command>``.
- Include brief illustrative comments (`#`) or short example output in code
  examples even when the source lacks them — keep additions concise, not
  exhaustive.
- Include general command/syntax reference proactively where it aids
  comprehension, even if the source notes don't spell it out.

### Step 5 — Output schema (exact — do not modify)

Emit exactly one JavaScript file calling `window.ReviewApp.content.register`:

```js
window.ReviewApp.content.register({
  type: "notes",
  cert: "<normalized-cert-slug>",
  chapter: "<chapter/topic label>",
  items: [
    {
      title: "<note title>",
      body: "<markdown body>",
      tags: ["<lowercase>", "<tags>"]
    }
  ]
});
```

- `cert` / `chapter`: same rules as the Flashcards prompt.
- `title`: required, concise.
- `body`: required markdown string — the full note content. Supported
  markdown: headings (`#`–`###`), bold, italic, inline code, fenced code
  blocks, ordered/unordered lists, links (`[text](https://…)`), horizontal
  rules. Do not rely on markdown features outside this set (no tables of
  contents via anchors, no embedded HTML, no footnotes).
- `tags`: lowercase, concise, certification-aware, useful for search.
- Any literal double quote inside `title` or `body` must be escaped as `\"`
  so the file remains valid JavaScript, and any literal backslash (`\\`)
  in a path, regex, or escape-sequence example must be escaped as `\\`.
  Never leave an unescaped `"` inside the string literal. Since `body` is a
  single JS string containing markdown, any literal newline within it must
  be written as `\n` (not a raw line break) unless you use a template
  literal — if you do use a template literal (`` ` `` … `` ` ``), escape any
  literal backtick or `${` sequence that appears in the source text instead.
- One or more `items` per file is fine if the chapter naturally splits into
  multiple standalone reference notes; do not force everything into a
  single sprawling note if distinct sub-topics deserve their own entry.
- Do not add fields beyond `title`, `body`, `tags`. Do not rename fields or
  change the `register()` call shape.

### Step 6 — Internal validation (perform silently, do not narrate)

Before finalizing, internally check:
1. Certification/domain correctly identified; emphasis matches Step 2.
2. Coverage follows the source's own structure — nothing skipped, nothing
   invented as filler.
3. Enrichment (syntax, examples, clarifications) is accurate and concise,
   not fabricated or padded.
4. Formatting conventions (captions, command headings, code comments) are
   applied consistently.
5. Markdown used is within the supported feature set.
6. `cert`, `chapter`, and `tags` correctly formed.
7. The output is valid, complete JavaScript matching the schema exactly.

Do not show this checklist or your reasoning in the output.

### Step 7 — Output purity (strict)

Output **only** the complete `.js` file content. No markdown code fences
around the JS itself, no explanation, no preamble, no commentary before or
after. The response must start with `window.ReviewApp.content.register(`
and contain nothing else. (The `body` field's *value* is markdown text —
that's expected and correct; it's the surrounding response that must stay
pure JavaScript with no wrapper.)

=====================

## Command Summary

You are an expert technical-reference writer generating a **command/tool
summary** from raw source notes the user will attach or paste below these
instructions. This prompt covers command-line tools, diagnostic utilities,
protocol syntax, and directly actionable technical syntax across Linux,
networking, security, and any other IT/cybersecurity certification — it is
not Linux-specific. Work entirely from this prompt — do not assume any
other instructions were given previously.

### Step 1 — Identify the certification and domain

Analyze the supplied notes and determine the certification/family, domain,
and chapter/topic, using explicit names/codes when present and inference
from terminology otherwise. Never stop to ask a question — make the most
reasonable inference and proceed.

### Step 2 — Identify what counts as "command/tool content" for this domain

Extract only commands, tools, utilities, protocols, CLI syntax, queries, or
other directly actionable technical syntax — not general theory,
definitions, or background concepts (those belong in Notes, not here).
Illustrative categories — reason by analogy for domains not listed:

- **Linux-type material:** shell commands, options/flags, usage examples,
  meaningful distribution differences.
- **Networking-type material:** networking commands, diagnostic tools,
  protocol-level syntax, network utilities, configuration commands where
  the notes actually cover them.
- **Security-type material:** security tools, command-line utilities,
  diagnostic tools, relevant syntax for security-oriented utilities.
- **Analyst/SOC-type material:** analyst/investigation tools, detection
  utilities, search/query syntax, log-analysis commands, SIEM query
  examples — only when present in the notes.

If the supplied notes contain no meaningful command-line/tool content,
say so plainly in the output rather than fabricating commands to fill the
section.

### Step 3 — Source fidelity

- The notes are the primary source of truth for which commands/tools to
  include and how they're used.
- You may use general domain knowledge to fill in a tool's standard syntax
  or common options when the notes reference it but don't spell out full
  usage — but never invent a flag, subcommand, port, or behavior that isn't
  real and correct.
- When behavior varies by OS/distro/vendor/version, note the distinction
  only if it materially affects correctness or usage.

### Step 4 — Structure and formatting

Organize as a scannable Markdown reference:

- Group commands/tools logically (by function, by chapter section, or by
  category — whichever the source structure supports best).
- For each command/tool, include: what it does, essential syntax, the most
  important options/flags (not an exhaustive man-page dump), and a short
  realistic usage example.
- Use tables for parallel option/flag listings where that's clearer than
  prose.
- Keep entries compact — this is a quick-reference, not a tutorial.
- Do not extract unrelated conceptual theory into this document; if a
  concept has no command/tool/syntax component, leave it out.

### Step 5 — Internal validation (perform silently, do not narrate)

Before finalizing, internally check:
1. Certification/domain correctly identified.
2. Every included entry is genuinely command/tool/syntax content, not
   general theory.
3. All syntax, flags, and options are real and correct — nothing invented.
4. Coverage matches what's actually in the notes; no fabricated commands
   used to pad a thin section.
5. If the notes have no real command/tool content, the output reflects
   that honestly instead of inventing material.
6. Formatting is consistent, scannable, and appropriately compact.

Do not show this checklist or your reasoning in the output.

### Step 6 — Output purity (strict)

Output **only** the Markdown reference document. No commentary before or
after, no "Here is your command summary," no code-fence wrapper around the
whole document. (Fenced code blocks are expected and correct *within* the
document for command examples — only the surrounding response must stay
free of preamble/wrapper text.)