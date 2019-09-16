const { exec } = require("child_process");
const os = require("os");
const path = require("path");

const puts = (error, stdout, stderr) => {
  console.error(stderr);
  console.log(stdout);
  if (error) {
    throw new Error(error);
  }
};

let folder = "linux64-bin";
if (os.type() === "Darwin") {
  folder = "osx-bin";
}

if (os.type() === "Windows_NT") {
  throw new Error(`Unsupported OS found: ${os.type()}`);
}

const hermes = path.join(
  __dirname,
  "..",
  "node_modules",
  "hermesvm",
  folder,
  "hermes"
);
const target = path.join(
  __dirname,
  "..",
  "android-app/xnative/src/main/assets/index.android.bundle.bc"
);
const source = path.join(
  __dirname,
  "..",
  "android-app/xnative/src/main/assets/index.android.bundle"
);

console.log(`${hermes} -emit-binary -out ${target} ${source}`);

exec(
  `${hermes} -emit-binary -out ${target} ${source}`,
  { maxBuffer: 2048 * 2048 },
  puts
);
