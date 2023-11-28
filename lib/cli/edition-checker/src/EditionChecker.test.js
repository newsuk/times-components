/* eslint-env jest */

import mockFetch from "node-fetch";
import EditionChecker from "./EditionChecker";

jest.mock("node-fetch", () => jest.fn());

describe("EditionChecker", () => {
  let originalConsole;

  beforeEach(() => {
    mockFetch.mockReset();
    originalConsole = global.console;
    const log = jest.fn();
    global.console = { log, warn: (...args) => log("warn", ...args) };
  });

  afterEach(() => {
    global.console = originalConsole;
  });

  describe("crawl", () => {
    const opts = {
      maxAttempts: 2,
      api: "http://times.api",
      articlePath: "http://times.co.uk/article",
      acs: "acs",
      sacs: "sacs",
      concurrency: 3,
      max: 3
    };
    const edition = { title: "Test edition", ids: [1, 2, 3, 4, 5] };

    it("correctly returns that articles contained a non-200 status code", async () => {
      mockFetch.mockReturnValueOnce(Promise.resolve({ status: 200 }));
      mockFetch.mockReturnValueOnce(Promise.resolve({ status: 500 }));
      mockFetch.mockReturnValueOnce(Promise.resolve({ status: 200 }));

      const editionChecker = new EditionChecker(opts, edition, null);

      expect(await editionChecker.crawl()).toEqual({ hasFailed: true });
    });

    it("can handle request failures within the maxAttempts", async () => {
      expect.assertions(1);

      mockFetch.mockImplementationOnce(() => Promise.resolve({ status: 200 }));
      mockFetch.mockImplementationOnce(() => {
        throw new Error("request error");
      });
      mockFetch.mockImplementationOnce(() => Promise.resolve({ status: 200 }));
      mockFetch.mockImplementationOnce(() => Promise.resolve({ status: 200 }));

      const editionChecker = new EditionChecker(opts, edition, null);

      await expect(editionChecker.crawl()).resolves.toEqual({
        hasFailed: false
      });
    });

    it("will not keep retrying if request continues to fail", async () => {
      expect.assertions(1);

      mockFetch.mockImplementation(() => {
        throw new Error("request error");
      });

      const editionChecker = new EditionChecker(opts, edition, null);

      await expect(editionChecker.crawl()).rejects.toMatchInlineSnapshot(
        `[Error: request error]`
      );
    });

    it("outputs results within the maximum to console", async () => {
      mockFetch.mockReturnValueOnce(
        Promise.resolve({ status: 200, url: "http://abc" })
      );
      mockFetch.mockReturnValueOnce(
        Promise.resolve({ status: 500, url: "http://def" })
      );
      mockFetch.mockReturnValueOnce(
        Promise.resolve({ status: 200, url: "http://ghi" })
      );
      mockFetch.mockReturnValueOnce(
        Promise.resolve({ status: 400, url: "http://jkl" })
      );

      const editionChecker = new EditionChecker(opts, edition, null);

      await editionChecker.crawl();

      expect(console.log.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "Checking 3/5 articles, with concurrency of 3",
  ],
  Array [
    "(1/3)",
  ],
  Array [
    "(2/3): 500 - 2 (http://times.co.uk/article/2?react=1)",
  ],
  Array [
    "(3/3)",
  ],
]
`);
    });

    it("outputs all results to console when there is no maximum", async () => {
      mockFetch.mockReturnValueOnce(
        Promise.resolve({ status: 200, url: "http://abc" })
      );
      mockFetch.mockReturnValueOnce(
        Promise.resolve({ status: 500, url: "http://def" })
      );
      mockFetch.mockReturnValueOnce(
        Promise.resolve({ status: 200, url: "http://ghi" })
      );
      mockFetch.mockReturnValueOnce(
        Promise.resolve({ status: 400, url: "http://jkl" })
      );
      mockFetch.mockReturnValueOnce(
        Promise.resolve({ status: 400, url: "http://mno" })
      );

      const ourOpts = { ...opts };

      delete ourOpts.max;

      const editionChecker = new EditionChecker(ourOpts, edition, null);

      await editionChecker.crawl();

      expect(console.log.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "Checking 5/5 articles, with concurrency of 3",
  ],
  Array [
    "(1/5)",
  ],
  Array [
    "(2/5): 500 - 2 (http://times.co.uk/article/2?react=1)",
  ],
  Array [
    "(3/5)",
  ],
  Array [
    "(4/5): 400 - 4 (http://times.co.uk/article/4?react=1)",
  ],
  Array [
    "(5/5): 400 - 5 (http://times.co.uk/article/5?react=1)",
  ],
]
`);
    });

    it("outputs verbose results to console", async () => {
      let callNumber = 0;

      mockFetch.mockImplementation(() => {
        callNumber += 1;

        if (callNumber < 3) {
          throw new Error("test error");
        }

        return { status: 200 };
      });

      const editionChecker = new EditionChecker(
        {
          ...opts,
          verbose: true
        },
        edition,
        null
      );

      await editionChecker.crawl();

      expect(console.log.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "Checking 3/5 articles, with concurrency of 3",
  ],
  Array [
    "warn",
    "(1) retrying (1/2)",
  ],
  Array [
    "warn",
    [Error: test error],
  ],
  Array [
    "warn",
    "(2) retrying (1/2)",
  ],
  Array [
    "warn",
    [Error: test error],
  ],
  Array [
    "(1/3)",
  ],
  Array [
    "(2/3)",
  ],
  Array [
    "(3/3)",
  ],
]
`);
    });

    it("outputs results to slack", async () => {
      mockFetch.mockReturnValueOnce(
        Promise.resolve({ status: 404, url: "http://abc" })
      );
      mockFetch.mockReturnValueOnce(
        Promise.resolve({ status: 500, url: "http://def" })
      );
      mockFetch.mockReturnValueOnce(
        Promise.resolve({ status: 200, url: "http://ghi" })
      );
      mockFetch.mockReturnValueOnce(
        Promise.resolve({ status: 400, url: "http://efg" })
      );

      const post = jest.fn();
      const editionChecker = new EditionChecker(opts, edition, { post });

      await editionChecker.crawl();

      expect(post.mock.calls[0][1]).toMatchInlineSnapshot(`
Array [
  Object {
    "id": 1,
    "status": 404,
    "url": "http://times.co.uk/article/1?react=1",
  },
  Object {
    "id": 2,
    "status": 500,
    "url": "http://times.co.uk/article/2?react=1",
  },
]
`);
    });

    it("runs the specified number of requests concurrently", async () => {
      let liveRequests = 0;
      const liveRequestValues = [];

      mockFetch.mockImplementation(async () => {
        liveRequests += 1;

        liveRequestValues.push(liveRequests);

        await Promise.resolve({});

        liveRequests -= 1;

        return { status: 200 };
      });
      const editionChecker = new EditionChecker(
        {
          ...opts,
          max: 50,
          concurrency: 10
        },
        {
          ...edition,
          ids: new Array(30).fill(1)
        },
        null
      );

      await editionChecker.crawl();

      const maxLiveRequestValue = liveRequestValues.reduce(
        (max, value) => Math.max(max, value),
        0
      );

      expect(maxLiveRequestValue).toEqual(10);
    });
  });
});
