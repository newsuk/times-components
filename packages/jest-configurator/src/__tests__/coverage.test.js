import getCoveragePaths from "../coverage";

describe("getCoveragePaths should", () => {
  it("return a single universal file for web", () => {
    expect(getCoveragePaths("./fixtures", "./fixtures/simple", "web")).toEqual([
      "**/simple/src/simple.js"
    ]);
  });

  it("return a single universal file for android", () => {
    expect(
      getCoveragePaths("./fixtures", "./fixtures/simple", "android")
    ).toEqual(["**/simple/src/simple.js"]);
  });

  it("return a single universal file for ios", () => {
    expect(getCoveragePaths("./fixtures", "./fixtures/simple", "ios")).toEqual([
      "**/simple/src/simple.js"
    ]);
  });

  it("return a universal file if extension is unknown", () => {
    expect(getCoveragePaths("./fixtures", "./fixtures/unknown", "ios")).toEqual(
      ["**/unknown/src/unknown.platform.js"]
    );
  });

  it("return files ignoring irrelevant files", () => {
    expect(getCoveragePaths("./fixtures", "./fixtures/ignore", "web")).toEqual([
      "**/ignore/src/data-helper.js",
      "**/ignore/src/ignore.js"
    ]);
  });

  it("return files ignoring irrelevant files and custom globs provided", () => {
    expect(
      getCoveragePaths("./fixtures", "./fixtures/ignore", "web", [
        "data-helper.js"
      ])
    ).toEqual(["**/ignore/src/ignore.js"]);
  });

  it("return a web file for web for a web native split", () => {
    expect(
      getCoveragePaths("./fixtures", "./fixtures/web-native", "web")
    ).toEqual(["**/web-native/src/component.web.js"]);
  });

  it("return a native file for android for a web native split", () => {
    expect(
      getCoveragePaths("./fixtures", "./fixtures/web-native", "android")
    ).toEqual(["**/web-native/src/component.js"]);
  });

  it("return a native file for ios for a web native split", () => {
    expect(
      getCoveragePaths("./fixtures", "./fixtures/web-native", "ios")
    ).toEqual(["**/web-native/src/component.js"]);
  });

  it("return a universal file for web for an android split", () => {
    expect(getCoveragePaths("./fixtures", "./fixtures/android", "web")).toEqual(
      ["**/android/src/component.js"]
    );
  });

  it("return an android file for android for an android split", () => {
    expect(
      getCoveragePaths("./fixtures", "./fixtures/android", "android")
    ).toEqual(["**/android/src/component.android.js"]);
  });

  it("return a universal file for ios for an android split", () => {
    expect(getCoveragePaths("./fixtures", "./fixtures/android", "ios")).toEqual(
      ["**/android/src/component.js"]
    );
  });

  it("return a universal file for web for an ios split", () => {
    expect(getCoveragePaths("./fixtures", "./fixtures/ios", "web")).toEqual([
      "**/ios/src/component.js"
    ]);
  });

  it("return a universal file for android for an ios split", () => {
    expect(getCoveragePaths("./fixtures", "./fixtures/ios", "android")).toEqual(
      ["**/ios/src/component.js"]
    );
  });

  it("return an ios file for ios for an ios split", () => {
    expect(getCoveragePaths("./fixtures", "./fixtures/ios", "ios")).toEqual([
      "**/ios/src/component.ios.js"
    ]);
  });

  it("return a web file for web for complete split", () => {
    expect(getCoveragePaths("./fixtures", "./fixtures/all", "web")).toEqual([
      "**/all/src/component.web.js"
    ]);
  });

  it("return an android file for android for a complete split", () => {
    expect(getCoveragePaths("./fixtures", "./fixtures/all", "android")).toEqual(
      ["**/all/src/component.android.js"]
    );
  });

  it("return an ios file for ios for a complete split", () => {
    expect(getCoveragePaths("./fixtures", "./fixtures/all", "ios")).toEqual([
      "**/all/src/component.ios.js"
    ]);
  });

  it("return the expected files for web for a nested android split", () => {
    expect(getCoveragePaths("./fixtures", "./fixtures/nested", "web")).toEqual([
      "**/nested/src/component.web.js",
      "**/nested/src/styles/shared.js"
    ]);
  });

  it("return the expected files for android for a nested android split", () => {
    expect(
      getCoveragePaths("./fixtures", "./fixtures/nested", "android")
    ).toEqual([
      "**/nested/src/styles/android/index.android.js",
      "**/nested/src/component.js",
      "**/nested/src/styles/shared.js"
    ]);
  });

  it("return the expected files for ios for a nested android split", () => {
    expect(getCoveragePaths("./fixtures", "./fixtures/nested", "ios")).toEqual([
      "**/nested/src/component.js",
      "**/nested/src/styles/shared.js"
    ]);
  });
});
