/* eslint-env jest */

import { getEditionData, getPastSixDaysData } from "./api";
import { fetchJSON as mockFetchJSON } from "./util";

jest.mock("./util", () => ({
  today: () => "2019-02-12",
  fetchJSON: jest.fn(() => Promise.resolve())
}));

describe("api", () => {
  let originalConsole;

  beforeEach(() => {
    originalConsole = global.console;
    global.console = { log: () => null };
    mockFetchJSON.mockReset();
  });

  afterEach(() => {
    global.console = originalConsole;
  });

  describe("getEditionData", () => {
    it("requests the correct data from the API", async () => {
      mockFetchJSON.mockReturnValueOnce(
        Promise.resolve({
          cpi_updatetext: "9AM UPDATE",
          cpi_modules: [],
          title: "Times Tuesday 12 February 2019"
        })
      );

      await getEditionData({
        edition: "latest",
        api: "http://times.api"
      });

      expect(mockFetchJSON.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "http://times.api/edition/latest?include=article",
          ],
        ]
      `);
    });

    it("returns the correct data", async () => {
      mockFetchJSON.mockReturnValueOnce(
        Promise.resolve({
          cpi_updatetext: "9AM UPDATE",
          cpi_modules: [
            { identifier: "abc" },
            { identifier: "def" },
            { identifier: "ghi" }
          ],
          title: "Times Tuesday 12 February 2019"
        })
      );

      expect(await getEditionData({})).toMatchInlineSnapshot(`
        Object {
          "ids": Array [
            "abc",
            "def",
            "ghi",
          ],
          "title": "Times Tuesday 12 February 2019 (9AM UPDATE)",
        }
      `);
    });
  });

  describe("getPastSixDaysData", () => {
    it("requests the correct data from the APIs", async () => {
      mockFetchJSON.mockImplementation(url =>
        Promise.resolve(
          url.includes("past-six-days")
            ? [{ editiondate: "2019-02-11" }, { editiondate: "2019-02-12" }]
            : {
                cpi_updatetext: "9AM UPDATE",
                cpi_modules: [],
                title: "Times Tuesday 12 February 2019"
              }
        )
      );

      await getPastSixDaysData({
        api: "http://times.api"
      });

      expect(mockFetchJSON.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "http://times.api/past-six-days",
          ],
          Array [
            "http://times.api/edition/2019-02-11?include=article",
          ],
          Array [
            "http://times.api/edition/2019-02-12?include=article",
          ],
        ]
      `);
    });

    it("returns the correct data", async () => {
      mockFetchJSON.mockImplementation(url =>
        Promise.resolve(
          url.includes("past-six-days")
            ? [{ editiondate: "2019-02-11" }, { editiondate: "2019-02-12" }]
            : {
                cpi_updatetext: "9AM UPDATE",
                cpi_modules: [
                  { identifier: "abc" },
                  { identifier: "def" },
                  { identifier: "ghi" }
                ],
                title: "Times Tuesday 12 February 2019"
              }
        )
      );

      expect(await getPastSixDaysData({})).toMatchInlineSnapshot(`
        Object {
          "ids": Array [
            "abc",
            "def",
            "ghi",
            "abc",
            "def",
            "ghi",
          ],
          "title": "Past six days from 2019-02-12",
        }
      `);
    });
  });
});
