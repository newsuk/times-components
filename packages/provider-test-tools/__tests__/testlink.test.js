import TestLink from "../test-link";

describe("TestLink tests", () => {
  it("should add an error event", async () => {
    const link = new TestLink(() => Promise.reject(new Error("network error")));
    const error = await new Promise(done => {
      link.request({ operationName: "Test" }).subscribe(() => {}, e => done(e));
    });

    expect(error).toEqual(new Error("network error"));

    expect(link.getRequests()).toMatchObject([
      {
        operation: { operationName: "Test" }
      }
    ]);

    expect(link.getEvents()).toMatchObject([
      {
        type: "request"
      },
      {
        type: "error",
        error: new Error("network error")
      }
    ]);
  });
});
