/* eslint-env jest */

import mockFetch from "node-fetch";
import Slack from "./Slack";

jest.mock("node-fetch", () => jest.fn());

describe("Slack", () => {
  describe("post", () => {
    it("sends a correctly formatted request to the specified slack hook", async () => {
      const slack = new Slack("http://slack.hook/", "slackUsername");

      await slack.post("a test message");

      expect(mockFetch.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "http://slack.hook/",
    Object {
      "body": "payload=%7B%22text%22%3A%22a%20test%20message%22%2C%22username%22%3A%22slackUsername%22%7D",
      "headers": Object {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      "method": "POST",
    },
  ],
]
`);
    });
  });
});
