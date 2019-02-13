/* eslint-env jest */

import MockDate from "mockdate";
import { today, unshiftContext, fetchJSON, retry } from "./util";

jest.mock("node-fetch", () => requestedUrl =>
  Promise.resolve({ json: () => Promise.resolve({ requestedUrl }) })
);

describe("util", () => {
  describe("today", () => {
    it("should return today's day in YYYY-MM-DD format", () => {
      MockDate.set("2019-02-12");

      expect(today()).toEqual("2019-02-12");
    });
  });

  describe("unshiftContext", () => {
    it("should create a wrapper function that passes the context as the first argument when called", () => {
      const context = { foo: "bar" };
      const handler = jest.fn();
      const wrapper = unshiftContext(handler);

      wrapper.call(context, "first argument", "second argument");

      expect(handler).toHaveBeenCalledWith(
        context,
        "first argument",
        "second argument"
      );
    });
  });

  describe("retry", () => {
    it("should not recall the handler once it passes", async () => {
      let callNumber = 0;

      const failingFn = jest.fn(() => {
        if (!callNumber) {
          callNumber += 1;
          throw new Error();
        }
      });

      await retry(2, failingFn, () => {});

      expect(failingFn).toHaveBeenCalledTimes(2);
    });

    it("should return the result of the handler", async () => {
      const result = await retry(2, () => "result", () => {});

      expect(result).toEqual("result");
    });

    it("should call a failing function only the maximum number of times before throwing the error", async () => {
      expect.assertions(1);

      let callNumber = 0;
      const failingFn = jest.fn(() => {
        callNumber += 1;
        throw new Error(`Errored on call ${callNumber}`);
      });

      const retryPromise = retry(3, failingFn, () => null);

      await expect(retryPromise).rejects.toMatchInlineSnapshot(
        `[Error: Errored on call 3]`
      );
    });

    it("should call the retry handler each time the handler fails", async () => {
      let callNumber = 0;
      const error = new Error();
      const failingFn = async () => {
        await Promise.resolve({});

        if (callNumber < 3) {
          callNumber += 1;
          await Promise.reject(error);
        }
      };
      const failureHandler = jest.fn();

      await retry(4, failingFn, failureHandler);

      expect(failureHandler).toHaveBeenCalledTimes(3);
    });

    it("should call the failure handler with the error, call number, and if it will retry each time it fails", async () => {
      const error = new Error("test");
      const failingFn = () => {
        throw error;
      };
      const failureHandler = jest.fn();

      await retry(4, failingFn, failureHandler).catch(() => {});

      expect(failureHandler.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    [Error: test],
    1,
    true,
  ],
  Array [
    [Error: test],
    2,
    true,
  ],
  Array [
    [Error: test],
    3,
    true,
  ],
  Array [
    [Error: test],
    4,
    false,
  ],
]
`);
    });
  });

  describe("fetchJSON", () => {
    it("should return the JSON of the remote url", async () => {
      expect(await fetchJSON("http://google.com")).toMatchInlineSnapshot(`
Object {
  "requestedUrl": "http://google.com",
}
`);
    });
  });
});
