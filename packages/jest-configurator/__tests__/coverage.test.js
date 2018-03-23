import getCoveragePaths from "../coverage";

describe("getCoveragePaths should", () => {
  it("return a single universal file for web", () => {
    expect(getCoveragePaths("../", "./fixtures/simple", "web")).toEqual([
      "**/simple/simple.js"
    ]);
  });

  it("return a single universal file for android", () => {
    expect(
      getCoveragePaths("../", "./fixtures/simple", "android")
    ).toEqual(["**/simple/simple.js"]);
  });

  it("return a single universal file for ios", () => {
    expect(getCoveragePaths("../", "./fixtures/simple", "ios")).toEqual([
      "**/simple/simple.js"
    ]);
  });

  it("return a universal file if extension is unknown", () => {
    expect(getCoveragePaths("../", "./fixtures/unknown", "ios")).toEqual(
      ["**/unknown/unknown.platform.js"]
    );
  });

  it("return files ignoring irrelevant files", () => {
    expect(getCoveragePaths("../", "./fixtures/ignore", "web")).toEqual([
      "**/ignore/data-helper.js",
      "**/ignore/ignore.js"
    ]);
  });

  it("return files ignoring irrelevant files and custom globs provided", () => {
    expect(
      getCoveragePaths("../", "./fixtures/ignore", "web", [
        "data-helper.js"
      ])
    ).toEqual(["**/ignore/ignore.js"]);
  });

  it("return a web file for web for a web native split", () => {
    expect(
      getCoveragePaths("../", "./fixtures/web-native", "web")
    ).toEqual(["**/web-native/component.web.js"]);
  });

  it("return a native file for android for a web native split", () => {
    expect(
      getCoveragePaths("../", "./fixtures/web-native", "android")
    ).toEqual(["**/web-native/component.js"]);
  });

  it("return a native file for ios for a web native split", () => {
    expect(
      getCoveragePaths("../", "./fixtures/web-native", "ios")
    ).toEqual(["**/web-native/component.js"]);
  });

  it("return a universal file for web for an android split", () => {
    expect(getCoveragePaths("../", "./fixtures/android", "web")).toEqual(
      ["**/android/component.js"]
    );
  });

  it("return an android file for android for an android split", () => {
    expect(
      getCoveragePaths("../", "./fixtures/android", "android")
    ).toEqual(["**/android/component.android.js"]);
  });

  it("return a universal file for ios for an android split", () => {
    expect(getCoveragePaths("../", "./fixtures/android", "ios")).toEqual(
      ["**/android/component.js"]
    );
  });

  it("return a universal file for web for an ios split", () => {
    expect(getCoveragePaths("../", "./fixtures/ios", "web")).toEqual([
      "**/ios/component.js"
    ]);
  });

  it("return a universal file for android for an ios split", () => {
    expect(getCoveragePaths("../", "./fixtures/ios", "android")).toEqual(
      ["**/ios/component.js"]
    );
  });

  it("return an ios file for ios for an ios split", () => {
    expect(getCoveragePaths("../", "./fixtures/ios", "ios")).toEqual([
      "**/ios/component.ios.js"
    ]);
  });

  it("return a web file for web for complete split", () => {
    expect(getCoveragePaths("../", "./fixtures/all", "web")).toEqual([
      "**/all/component.web.js"
    ]);
  });

  it("return an android file for android for a complete split", () => {
    expect(getCoveragePaths("../", "./fixtures/all", "android")).toEqual(
      ["**/all/component.android.js"]
    );
  });

  it("return an ios file for ios for a complete split", () => {
    expect(getCoveragePaths("../", "./fixtures/all", "ios")).toEqual([
      "**/all/component.ios.js"
    ]);
  });

  it("return the expected files for web for a nested android split", () => {
    expect(getCoveragePaths("../", "./fixtures/nested", "web")).toEqual([
      "**/nested/component.web.js",
      "**/nested/styles/shared.js"
    ]);
  });

  it("return the expected files for android for a nested android split", () => {
    expect(
      getCoveragePaths("../", "./fixtures/nested", "android")
    ).toEqual([
      "**/nested/styles/android/index.android.js",
      "**/nested/component.js",
      "**/nested/styles/shared.js"
    ]);
  });

  it("return the expected files for ios for a nested android split", () => {
    expect(getCoveragePaths("../", "./fixtures/nested", "ios")).toEqual([
      "**/nested/component.js",
      "**/nested/styles/shared.js"
    ]);
  });
});
