import { spawn } from "child_process";

const forwardSlasesAfterRoot = process
  .cwd()
  .substr(process.cwd().indexOf("times-components"))
  .match(/\//g);
const numForwardSlashes = forwardSlasesAfterRoot
  ? forwardSlasesAfterRoot.length
  : 0;

var cwd = process.cwd();
for (var i = 0; i < numForwardSlashes; i++) {
  cwd = cwd + "/..";
}

const handlePackager = fructosePackager => {
  return new Promise((resolve, reject) => {
    fructosePackager.stdout.on("data", d => {
      if (d.toString("utf8").includes("Loading dependency graph, done.")) {
        resolve(fructosePackager);
      }
    });

    fructosePackager.stderr.on("data", d => {
      //not sure why I need this, but it prevents the packager from not loading on warnings
    });

    fructosePackager.on("close", code => {
      if (code != 0) {
        reject(`closed with code ${code}`);
      }
    });
  });
};

export const kill = packager => {
  return new Promise(resolve => {
    packager.on("exit", () => {
      resolve();
    });
    packager.kill("SIGINT");
  });
};

export const startPackager = () => {
  const fructosePackager = spawn("npm", ["run", "fructose-app"], { cwd: cwd });
  return handlePackager(fructosePackager);
};
