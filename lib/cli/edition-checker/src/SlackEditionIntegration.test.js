/* eslint-env jest */

import SlackEditionIntegration from "./SlackEditionIntegration";

describe("SlackEditionIntegration", () => {
  describe("post", () => {
    const edition = { title: "Test edition", ids: [1, 2, 3], total: 5 };

    it("posts a no issues found message if no results are passed", async () => {
      const postMock = jest.fn();
      const slackIntegration = new SlackEditionIntegration({ post: postMock });

      await slackIntegration.post(edition, null);

      expect(postMock.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "Test edition. 3/5 articles checked. No issues found",
  ],
]
`);
    });

    it("posts a no issues found message if empty results are passed", async () => {
      const postMock = jest.fn();
      const slackIntegration = new SlackEditionIntegration({ post: postMock });

      await slackIntegration.post(edition, []);

      expect(postMock.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "Test edition. 3/5 articles checked. No issues found",
  ],
]
`);
    });

    it("posts results summary message if results are passed", async () => {
      const postMock = jest.fn();
      const slackIntegration = new SlackEditionIntegration({ post: postMock });

      await slackIntegration.post(edition, [
        { status: 500, id: "abc", url: "/abc" },
        { status: 200, id: "def", url: "/def" },
        { status: 404, id: "ghi", url: "/ghi" }
      ]);

      expect(postMock.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "Test edition. 3/5 articles checked. Found 3 problems.
\`\`\`(500): abc – </abc>
(200): def – </def>
(404): ghi – </ghi>\`\`\`",
  ],
]
`);
    });
  });
});
