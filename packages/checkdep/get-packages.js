import glob from "glob";
import { readJson } from "fs-extra";

export default function getPackages(expr) {
  return new Promise((done, reject) => {
    glob(expr, (error, paths) => {
      if (error) return reject(error);
      return done(paths.map(p => readJson(p).then(json => [p, json])));
    });
  }).then(files => Promise.all(files));
}
