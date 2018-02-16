const fs = jest.genMockFromModule("fs");

let dir = {};
function mockFs(files) {
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
  if (args.length === 1) {
    return args[0](0, dir[path]);
  }
  return args[1](0, dir[path]);
}

fs.mockFs = mockFs;
fs.readdir = readdir;
fs.lstat = lstat;
fs.readFile = readFile;

module.exports = fs;
