import { iterator } from "@times-components/test-utils";
import { readFileSync } from "fs";
import { getCacheKey, process as transform } from "../src/source-loader";

const tests = [
  {
    name: "monorepo package hash",
    test() {
      const filePath = "./fixtures/times-components/src/test.js";
      const fileContents = readFileSync(filePath).toString();

      expect(getCacheKey(fileContents, filePath, "", {})).toMatchSnapshot();
    }
  },
  {
    name: "non-monorepo package hash",
    test() {
      const filePath = "./fixtures/test.js";
      const fileContents = readFileSync(filePath).toString();

      expect(
        getCacheKey(fileContents, filePath, "", {
          rootDir: ""
        })
      ).toMatchSnapshot();
    }
  },
  {
    name: "untransformed unbabelable file",
    test() {
      const fileContents = `fn main(){"println!("Hello World!");}`;

      const actual = transform(fileContents, "./fixtures/test.rs", {
        cwd: "/home/cwd",
        coveragePathIgnorePatterns: []
      });

      expect(actual).toEqual(fileContents);
    }
  },
  {
    name: "transformed non-monorepo file",
    test() {
      const fileContents = readFileSync("./fixtures/test.js").toString();

      const { code } = transform(fileContents, "./fixtures/test.js", {
        cwd: "/home/cwd",
        coveragePathIgnorePatterns: []
      });

      expect(code).toMatchSnapshot();
    }
  },
  {
    name: "transformed monorepo src file",
    test() {
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
    }
  }
];

iterator(tests);
