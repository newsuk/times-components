import glob from "glob";
import { readJson } from "fs-extra";

export default function getPackages(expr) {
  return new Promise((resolve, reject) => {
    glob(expr, (error, paths) => {
      if (error) return reject(error);
      return resolve(paths.map(p => readJson(p).then(json => [p, json])));
    });
  }).then(files => Promise.all(files));
}
