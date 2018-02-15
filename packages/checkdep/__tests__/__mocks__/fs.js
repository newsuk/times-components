const fs = jest.genMockFromModule('fs');


let dir = {};
function __mockFs(files) {
  dir = files;
}

function lstat(path, cb) {
  return cb(0, 0);
}

function readdir(path, cb) {
  if (!dir) cb(1);
  return cb(0, Object.keys(dir).sort());
}

function readFile(path, ...args) {
  if (args.length == 1) {
    return args[0](0, dir[path]);
  }
  args[1](0, dir[path]);
}

fs.__mockFs = __mockFs;
fs.readdir = readdir;
fs.lstat = lstat;
fs.readFile = readFile;

module.exports = fs;
