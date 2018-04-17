import * as babelJest from "babel-jest";
import * as fs from "fs";
import { getCacheKey, process as transform } from "../src/source-loader";

jest.mock("babel-jest");
jest.mock("fs", () => jest.genMockFromModule("fs"));

describe("source loader", () => {
  describe("getCacheKey", () => {
    afterEach(() => {
      fs.readFileSync.mockReset();
    });

    it("should create a hash based upon the source contents if the file belongs to a monorepo package", () => {
      const filename = "node_modules/@times-components/foo/bar.js";
      const src = "foo";
      const expectedKey = "acbd18db4cc2f85cedef654fccc4a4d8";

      fs.readFileSync.mockImplementationOnce(() => src);

      const actualKey = getCacheKey(src, filename);

      expect(actualKey).toEqual(expectedKey);
      expect(babelJest.getCacheKey).not.toHaveBeenCalled();
    });

    it("should delegate to babel-jest if it is not a monorepo package file", () => {
      const src = "src";
      const filename = "node_modules/react-native/foo/bar.js";
      const expectedKey = "some hashed key";
      const config = "config";
      const options = {};

      babelJest.getCacheKey.mockImplementationOnce(() => expectedKey);

      const actualKey = getCacheKey(src, filename, config, options);

      expect(actualKey).toEqual(expectedKey);

      expect(babelJest.getCacheKey).toHaveBeenCalledWith(
        src,
        filename,
        config,
        options
      );
    });
  });

  describe("transform", () => {
    const inputSource = "source";
    const expectedOutput = "output";
    const config = {};
    const options = {};

    beforeEach(() => {
      babelJest.process.mockImplementationOnce(() => expectedOutput);
    });

    afterEach(() => {
      fs.readFileSync.mockReset();
    });

    it("should read the respective source file for a module if it belongs to a monorepo package", () => {
      const srcFilename = "node_modules/@times-components/src/foo/bar.js";
      const distFilename = "node_modules/@times-components/dist/foo/bar.js";
      const rawSource = "raw source";

      fs.readFileSync.mockImplementationOnce(() => rawSource);

      const actualOutput = transform(
        inputSource,
        distFilename,
        config,
        options
      );

      expect(actualOutput).toEqual(expectedOutput);
      expect(babelJest.process).toHaveBeenCalledWith(
        rawSource,
        srcFilename,
        config,
        options
      );
    });

    it("should not manipulate the source and filename parameters if they don`t belong to a monorepo package", () => {
      const filename = "node_modules/react-native/foo/bar.js";
      const actualOutput = transform(inputSource, filename, config, options);

      expect(actualOutput).toEqual(expectedOutput);
      expect(babelJest.process).toHaveBeenCalledWith(
        inputSource,
        filename,
        config,
        options
      );
      expect(fs.readFileSync).not.toHaveBeenCalled();
    });
  });
});
