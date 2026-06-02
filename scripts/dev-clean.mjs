import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const cwd = process.cwd();

function rmDir(name) {
  const dir = path.join(cwd, name);
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 3 });
    console.log(`Removed ${name}`);
  }
}

rmDir(".next");
rmDir("node_modules/.cache");

for (const port of [3000, 3001]) {
  try {
    if (process.platform === "win32") {
      const out = execSync(
        `netstat -ano | findstr ":${port}" | findstr LISTENING`,
        { encoding: "utf8" }
      ).trim();
      if (!out) continue;

      const pids = new Set();
      for (const line of out.split("\n").filter(Boolean)) {
        const pid = line.trim().split(/\s+/).pop();
        if (pid && pid !== "0") pids.add(pid);
      }
      for (const pid of pids) {
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
          console.log(`Stopped process ${pid} on port ${port}`);
        } catch {
          /* already stopped */
        }
      }
    }
  } catch {
    /* port free */
  }
}

console.log("Ready to run: npm run dev");
