// The Funniest One-Line Out-of-Office Reply — make.fun bounty
// u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8
//
// Writes one out-of-office auto-reply (160 characters or fewer) to
// /output/entry.txt, where the competition's gate scorer reads it.
// Run: node main.ts
// (Local check: OUTPUT_PATH=/tmp/entry.txt node main.ts)

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// One line, written as an out-of-office reply a real person would set.
// The joke: the narrator isn't just away — they have deliberately gone
// somewhere with no Wi-Fi, and admit that's the only way ignoring
// everyone was ever going to work. The laugh lands on the first read,
// no beach, no inbox, no pet, no "limited access to email".
const REPLY =
  "Out of office. I'm currently ignoring you from a place with no Wi-Fi, which is the only way this was ever going to work.";

const outputPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";

// Gate, mirrored from the competition's sealed scorer:
// /output/entry.txt must be UTF-8 text of 1 to 160 characters, not only
// white space, on one line. Anything else is never judged and takes no prize.
if (REPLY.length < 1 || REPLY.length > 160) {
  throw new Error(`Reply must be 1-160 characters, got ${REPLY.length}.`);
}
if (REPLY.trim().length === 0 || /\n/.test(REPLY)) {
  throw new Error("Reply must be a single non-blank line.");
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, REPLY, "utf8");

// Read back and verify: the file must be byte-for-byte the intended reply.
const written = readFileSync(outputPath, "utf8");
if (written !== REPLY) {
  throw new Error("Verification failed: entry.txt does not match the reply.");
}

console.log(`Wrote ${REPLY.length} characters to ${outputPath}`);
console.log(REPLY);
