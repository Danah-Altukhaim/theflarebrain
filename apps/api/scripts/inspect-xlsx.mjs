import * as XLSX from "xlsx";
import { readFileSync } from "node:fs";

for (const path of process.argv.slice(2)) {
  const wb = XLSX.read(readFileSync(path));
  console.log(`\n===== ${path} =====`);
  for (const name of wb.SheetNames) {
    const ws = wb.Sheets[name];
    const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null, raw: true, blankrows: false });
    console.log(`\n  --- [${name}] rows=${rows.length}`);
    for (let i = 0; i < Math.min(rows.length, 6); i++) {
      const cells = rows[i].map((c) => (c == null ? "" : String(c).slice(0, 40)));
      console.log(`    r${i}: ${cells.join(" | ")}`);
    }
  }
}
