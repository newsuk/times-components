import getCoveragePaths from "../src/coverage";

describe("getCoveragePaths should", () => {
  it("return a single universal file for web", () => {
    expect(getCoveragePaths("./fixtures/simple", "web")).toEqual([
      "**/packages/simple/simple.js"
    ]);
  });

  it("return a single universal file for android", () => {
    expect(getCoveragePaths("./fixtures/simple", "android")).toEqual([
      "**/packages/simple/simple.js"
    ]);
  });

  it("return a single universal file for ios", () => {
    expect(getCoveragePaths("./fixtures/simple", "ios")).toEqual([
      "**/packages/simple/simple.js"
    ]);
  });

  it("return a universal file if extension is unknown", () => {
    expect(getCoveragePaths("./fixtures/unknown", "ios")).toEqual([
      "**/packages/unknown/unknown.platform.js"
    ]);
  });

  it("return files ignoring irrelevant files", () => {
    expect(getCoveragePaths("./fixtures/ignore", "web")).toEqual([
      "**/packages/ignore/data-helper.js",
      "**/packages/ignore/ignore.js"
    ]);
  });

  it("return files ignoring irrelevant files and custom globs provided", () => {
    expect(
      getCoveragePaths("./fixtures/ignore", "web", ["data-helper.js"])
    ).toEqual(["**/packages/ignore/ignore.js"]);
  });

  it("return a web file for web for a web native split", () => {
    expect(getCoveragePaths("./fixtures/web-native", "web")).toEqual([
      "**/packages/web-native/component.web.js"
    ]);
  });

  it("return a native file for android for a web native split", () => {
    expect(getCoveragePaths("./fixtures/web-native", "android")).toEqual([
      "**/packages/web-native/component.js"
    ]);
  });

  it("return a native file for ios for a web native split", () => {
    expect(getCoveragePaths("./fixtures/web-native", "ios")).toEqual([
      "**/packages/web-native/component.js"
    ]);
  });

  it("return a universal file for web for an android split", () => {
    expect(getCoveragePaths("./fixtures/android", "web")).toEqual([
      "**/packages/android/component.js"
    ]);
  });

  it("return an android file for android for an android split", () => {
    expect(getCoveragePaths("./fixtures/android", "android")).toEqual([
      "**/packages/android/component.android.js"
    ]);
  });

  it("return a universal file for ios for an android split", () => {
    expect(getCoveragePaths("./fixtures/android", "ios")).toEqual([
      "**/packages/android/component.js"
    ]);
  });

  it("return a universal file for web for an ios split", () => {
    expect(getCoveragePaths("./fixtures/ios", "web")).toEqual([
      "**/packages/ios/component.js"
    ]);
  });

  it("return a universal file for android for an ios split", () => {
    expect(getCoveragePaths("./fixtures/ios", "android")).toEqual([
      "**/packages/ios/component.js"
    ]);
  });

  it("return an ios file for ios for an ios split", () => {
    expect(getCoveragePaths("./fixtures/ios", "ios")).toEqual([
      "**/packages/ios/component.ios.js"
    ]);
  });

  it("return a web file for web for complete split", () => {
    expect(getCoveragePaths("./fixtures/all", "web")).toEqual([
      "**/packages/all/component.web.js"
    ]);
  });

  it("return an android file for android for a complete split", () => {
    expect(getCoveragePaths("./fixtures/all", "android")).toEqual([
      "**/packages/all/component.android.js"
    ]);
  });

  it("return an ios file for ios for a complete split", () => {
    expect(getCoveragePaths("./fixtures/all", "ios")).toEqual([
      "**/packages/all/component.ios.js"
    ]);
  });

  it("return the expected files for web for a nested android split", () => {
    expect(getCoveragePaths("./fixtures/nested", "web")).toEqual([
      "**/packages/nested/component.web.js",
      "**/packages/nested/styles/shared.js"
    ]);
  });

  it("return the expected files for android for a nested android split", () => {
    expect(getCoveragePaths("./fixtures/nested", "android")).toEqual([
      "**/packages/nested/styles/android/index.android.js",
      "**/packages/nested/component.js",
      "**/packages/nested/styles/shared.js"
    ]);
  });

  it("return the expected files for ios for a nested android split", () => {
    expect(getCoveragePaths("./fixtures/nested", "ios")).toEqual([
      "**/packages/nested/component.js",
      "**/packages/nested/styles/shared.js"
    ]);
  });
});
