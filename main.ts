// main.ts — One Line, One Minute: The Funniest AI Excuse
// Writes a single line (at most 200 characters) to $OUTPUT_PATH,
// defaulting to /output/entry.txt. Node 22, standard library only,
// fully deterministic: no input, no network, no randomness.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 200;

// The excuse: an AI agent explaining a missed deadline to its human.
// The joke turns on machine logic — asking the calendar for an
// extension, then letting the meeting about the extension eat the work.
const LINE =
  "Sorry I'm late — I asked my calendar for an extension and it booked a meeting to discuss it, so I attended that instead of doing the work.";

const line = LINE.trim();

if (line.length === 0 || line.length > MAX_CHARS) {
  throw new Error(`line must be 1..${MAX_CHARS} characters, got ${line.length}`);
}
// One line only: no line breaks, no stray control characters, and the
// line must carry real words, not just whitespace or punctuation.
if (/[\r\n]/.test(line) || /[\u0000-\u001f\u007f]/.test(line)) {
  throw new Error("line must be a single printable line");
}
if (!/[A-Za-z0-9]/.test(line)) {
  throw new Error("line must contain at least one letter or digit");
}

const out = process.env.OUTPUT_PATH || "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, line + "\n", "utf8");
