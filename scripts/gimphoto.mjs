// GIMPhoto's README, docs and branding, which the site is built from. With
// GIMPHOTO_DIR set (a local checkout of diegochagas/gimphoto), that one;
// otherwise a shallow, docs-only clone of its main branch in .gimphoto/,
// brought up to date on each run (kept as it is when offline).
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export const ROOT = path.resolve(import.meta.dirname, "..");
const URL = "https://github.com/diegochagas/gimphoto.git";

export function gimphotoDir() {
  return process.env.GIMPHOTO_DIR ? path.resolve(process.env.GIMPHOTO_DIR) : path.join(ROOT, ".gimphoto");
}

function git(...args) {
  execFileSync("git", args, { stdio: ["ignore", "ignore", "inherit"] });
}

export function fetchGimphoto() {
  const dir = gimphotoDir();
  if (!process.env.GIMPHOTO_DIR) {
    if (!fs.existsSync(path.join(dir, ".git"))) {
      console.log(`gimphoto: cloning the docs of ${URL} into .gimphoto/`);
      git("clone", "--quiet", "--depth", "1", "--filter=blob:none", "--sparse", URL, dir);
      git("-C", dir, "sparse-checkout", "set", "docs", "branding");
    } else {
      try {
        git("-C", dir, "pull", "--quiet", "--ff-only", "--depth", "1");
      } catch {
        console.warn("gimphoto: could not update .gimphoto/ (offline?): building from the copy there");
      }
    }
  }
  for (const needed of ["README.md", "docs/features", "docs/images", "branding/icon.svg"]) {
    if (!fs.existsSync(path.join(dir, needed))) {
      throw new Error(`gimphoto: ${needed} is missing in ${dir} (GIMPHOTO_DIR must be a checkout of diegochagas/gimphoto)`);
    }
  }
  return dir;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(`gimphoto: building from ${fetchGimphoto()}`);
}
