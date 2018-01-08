// @flow

const path = require("path");
const recursive = require("recursive-readdir-synchronous");

// it's quite hard to match on things that start with dot seemingly?
// these would be config files we'd never check for coverage
const configFiles = file => path.basename(file).startsWith(".");

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

// group each file path by either universal, android, ios or web
const toPlatformMap = (filePath: string) => (fileMap, file) => {
  const { dir, name } = path.parse(path.relative(filePath, file));
  const { name: subName, ext } = path.parse(name);
  const platform = ext ? ext.substr(1) : "universal";
  const files = fileMap[platform] || new Set();

  files.add(path.join(dir, subName || name));

  return {
    ...fileMap,
    [platform]: files
  };
};

// this is very jest coverage this monorepo specific :-(
const fileToCoveragePath = (component, platform) => file =>
  `**/packages/${component}/${file}${
    platform !== "universal" ? `.${platform}` : ""
  }.js`;

const makeCoveragePaths = (filePath, platform, files) => {
  // assume that the package is the component
  const component = path.basename(filePath);
  // group the file paths by platform
  const fileMap = files.reduce(toPlatformMap(filePath), {});

  // take everything from the requested platform plus anything that is not
  // platform specific aka universal
  return [
    ...[...(fileMap[platform] || [])].map(
      fileToCoveragePath(component, platform)
    ),
    ...[...(fileMap.universal || [])]
      .filter(file => !fileMap[platform] || !fileMap[platform].has(file))
      .map(fileToCoveragePath(component, "universal"))
  ];
};

// will return an array of paths which coverage will be chosen from
// currently does not group and use wildcards with exclusions i.e.
// is file specific and inclusive only
export default (
  filePath: string,
  platform: string,
  ignore: Array<string> = []
) => {
  const files = recursive(filePath, [
    ...staticFilesAndFolders,
    configFiles,
    ...ignore
  ]);

  return makeCoveragePaths(filePath, platform, files);
};
