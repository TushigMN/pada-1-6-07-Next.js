#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const appDir = path.join(process.cwd(), 'app');
const allowedPageExt = ['.js', '.jsx', '.ts', '.tsx'];
let problems = 0;

function hasPageFile(dir) {
  try {
    const files = fs.readdirSync(dir);
    return files.some((f) => {
      const ext = path.extname(f);
      const name = path.basename(f, ext).toLowerCase();
      return name === 'page' && allowedPageExt.includes(ext);
    });
  } catch (e) {
    return false;
  }
}

function walk(dir, cb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    cb(full, ent);
    if (ent.isDirectory()) walk(full, cb);
  }
}

console.log('Checking app routes and files for common issues...');

if (!fs.existsSync(appDir)) {
  console.warn('No app/ directory found — skipping route checks.');
  process.exit(0);
}

// 1) Check each top-level app/* directory has a page.* file
const topEntries = fs.readdirSync(appDir, { withFileTypes: true });
for (const ent of topEntries) {
  if (!ent.isDirectory()) continue;
  const dir = path.join(appDir, ent.name);
  if (!hasPageFile(dir)) {
    console.error(`❌ Missing page.* in route folder: app/${ent.name} — add app/${ent.name}/page.(js|jsx|ts|tsx)`);
    problems++;
  }
}

// 2) Scan files for duplicate import identifiers (simple heuristic)
walk(appDir, (full, ent) => {
  if (!ent.isFile()) return;
  const ext = path.extname(full).toLowerCase();
  if (!allowedPageExt.includes(ext) && ext !== '.css' && ext !== '.json') return;
  const src = fs.readFileSync(full, 'utf8');
  const importNames = {};
  const importRe = /import\s+([\s\S]+?)\s+from\s+['\"][^'\"]+['\"]/g;
  let m;
  while ((m = importRe.exec(src))) {
    const raw = m[1].trim();
    // normalize named/default imports into simple tokens
    const names = [];
    if (raw.startsWith('{')) {
      raw.replace(/[{}]/g, '').split(',').forEach(s => names.push(s.split('as')[0].trim()));
    } else if (raw.startsWith('* as')) {
      names.push(raw.replace('* as', '').trim());
    } else {
      // default import (could be like Link)
      names.push(raw.split(',')[0].split('{')[0].trim());
    }
    for (const n of names) {
      if (!n) continue;
      importNames[n] = (importNames[n] || 0) + 1;
    }
  }
  for (const [name, count] of Object.entries(importNames)) {
    if (count > 1) {
      console.error(`❌ Duplicate import name "${name}" found ${count} times in ${path.relative(process.cwd(), full)}`);
      problems++;
    }
  }
});

if (problems > 0) {
  console.error(`\nFound ${problems} problem(s). Fix them before running the dev server.`);
  process.exit(2);
}

console.log('OK — route folder checks passed.');
process.exit(0);
