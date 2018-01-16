// @flow

import type { Platform } from "./jest-configurator";

type AllPlatform = Platform | "universal";

const path = require("path");
const recursive = require("recursive-readdir-synchronous");

// it's quite hard to match on things that start with dot seemingly?
// these would be config files we'd never check for coverage
const configFiles = (file: string) => path.basename(file).startsWith(".");

// we'll never want coverage from these
const staticFilesAndFolders = [
  "coverage",
  "node_modules",
  "fixtures",
  "__tests__",
  "*.md",
  "LICENSE",
  "*.stories*.js",
  "*.json",
  "*fructose*"
];

const toValidExt = (ext: string): AllPlatform | null => {
  switch (ext) {
    case ".web":
      return "web";
    case ".android":
      return "android";
    case ".ios":
      return "ios";
    default:
      return null;
  }
};

// group each file path by either universal, android, ios or web
const toPlatformMap = (filePath: string) => (
  fileMap: { [AllPlatform]: Set<string> },
  file: string
) => {
  const { dir, name } = path.parse(path.relative(filePath, file));
  const { name: subName, ext } = path.parse(name);
  const platform = toValidExt(ext);
  const normalizedPlatform = platform || "universal";

  const files = fileMap[normalizedPlatform] || new Set();

  files.add(path.join(dir, platform ? subName || name : `${subName}${ext}`));

  return {
    ...fileMap,
    [normalizedPlatform]: files
  };
};

const fileToCoveragePath = (subPath: string, platform: AllPlatform) => (
  file: string
) => {
  const componentPath = subPath ? `${subPath}/` : "";
  return `**/${componentPath}${file}${
    platform !== "universal" ? `.${platform}` : ""
  }.js`;
};

const makeCoveragePaths = (
  rootDir: string,
  module: string,
  platform: Platform,
  files: Array<string>
) => {
  // assume that the package is the component
  const componentPath = path.relative(rootDir, module);
  // group the file paths by platform
  const fileMap = files.reduce(toPlatformMap(module), {});

  // take everything from the requested platform plus anything that is not
  // platform specific aka universal
  return [
    ...[...(fileMap[platform] || [])].map(
      fileToCoveragePath(componentPath, platform)
    ),
    ...[...(fileMap.universal || [])]
      .filter(file => !fileMap[platform] || !fileMap[platform].has(file))
      .map(fileToCoveragePath(componentPath, "universal"))
  ];
};

// will return an array of paths which coverage will be chosen from
// currently does not group and use wildcards with exclusions i.e.
// is file specific and inclusive only
export default (
  rootDir: string,
  module: string,
  platform: Platform,
  ignore: Array<string> = []
) => {
  const files = recursive(module, [
    ...staticFilesAndFolders,
    configFiles,
    ...ignore
  ]);

  return makeCoveragePaths(rootDir, module, platform, files);
};
