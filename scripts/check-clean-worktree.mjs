#!/usr/bin/env node

import { execFileSync } from "node:child_process";

function runGit(args, cwd) {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

try {
  const root = runGit(["rev-parse", "--show-toplevel"], process.cwd()).trim();
  const status = runGit(["status", "--porcelain=v1", "--untracked-files=all"], root);

  if (status.trim()) {
    console.error("❌ working tree is not clean; deployment is blocked");
    console.error(status.trimEnd());
    process.exit(1);
  }

  const sha = runGit(["rev-parse", "HEAD"], root).trim();
  console.log(`✅ clean working tree: ${sha}`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`❌ unable to verify working tree: ${message}`);
  process.exit(1);
}
