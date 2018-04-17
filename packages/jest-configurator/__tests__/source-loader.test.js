import * as babelJest from "babel-jest";
import * as fs from "fs";
import { getCacheKey, process as transform } from "../src/source-loader";

jest.mock("babel-jest");

const stubHrtime = (seconds, nanoseconds) => {
  const realHrtime = process.hrtime;
  process.hrtime = () => [seconds, nanoseconds];

  return () => process.hrtime = realHrtime;
};

describe("source loader", () => {
  const seconds = 0;
  const nanoseconds = 50;
  let restoreHrtime;

  beforeAll(() => restoreHrtime = stubHrtime(seconds, nanoseconds));
  afterAll(() => restoreHrtime());

  describe("getCacheKey", () => {
    it("should create a high-res time-based key if the file belongs a monorepo package", () => {
      const filename = "node_modules/@times-components/foo/bar.js";
      const expectedKey = `${filename}_${seconds}${nanoseconds}`;
      const actualKey = getCacheKey("", filename);

      expect(actualKey).toEqual(expectedKey);
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
      expect(babelJest.getCacheKey).toHaveBeenCalledWith(src, filename, config, options);
    });
  });

  describe("transform", () => {

  });
});
