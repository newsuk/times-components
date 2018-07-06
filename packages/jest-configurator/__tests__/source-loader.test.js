import { readFileSync } from "fs";
import { getCacheKey, process as transform } from "../src/source-loader";

describe("source loader", () => {
  describe("getCacheKey", () => {
    it("should create a hash based upon the source contents if the file belongs to a monorepo package", () => {
      const filePath = "./fixtures/times-components/src/test.js";
      const fileContents = readFileSync(filePath).toString();

      expect(getCacheKey(fileContents, filePath, "", {})).toMatchSnapshot();
    });

    it("should delegate to babel-jest if it is not a monorepo package file", () => {
      const filePath = "./fixtures/test.js";
      const fileContents = readFileSync(filePath).toString();

      expect(
        getCacheKey(fileContents, filePath, "", {
          rootDir: ""
        })
      ).toMatchSnapshot();
    });
  });

  describe("transform", () => {
    it("should return a file that is not able to be babeled", () => {
      const fileContents = `fn main(){"println!("Hello World!");}`;

      const actual = transform(fileContents, "./fixtures/test.rs", {
        cwd: "/home/cwd",
        coveragePathIgnorePatterns: []
      });

      expect(actual).toEqual(fileContents);
    });

    it("should transform the given file", () => {
      const fileContents = readFileSync("./fixtures/test.js").toString();

      const { code } = transform(fileContents, "./fixtures/test.js", {
        cwd: "/home/cwd",
        coveragePathIgnorePatterns: []
      });

      expect(code).toMatchSnapshot();
    });

    it("should transform the given src version of the file", () => {
      const fileContents = readFileSync(
        "./fixtures/times-components/dist/test.js"
      ).toString();

      const { code } = transform(
        fileContents,
        "./fixtures/times-components/dist/test.js",
        {
          cwd: "/home/cwd",
          coveragePathIgnorePatterns: []
        }
      );

      expect(code).toMatchSnapshot();
    });
  });
});
