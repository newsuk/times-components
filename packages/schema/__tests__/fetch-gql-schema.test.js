const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const rimraf = require("rimraf");
const { iterator } = require("@times-components/test-utils");
const fetchGql = require("../fetch-gql-schema");

const mkdir = promisify(fs.mkdir);
const rmdir = promisify(rimraf);
const readFile = promisify(fs.readFile);

const mockSchema = {
  data: {
    __schema: {
      queryType: { name: "Query" },
      mutationType: { name: "Mutation" },
      subscriptionType: null,
      types: [
        {
          kind: "OBJECT",
          name: "Query",
          description: "",
          fields: [
            {
              name: "author",
              description: "A list of authors",
              args: [],
              type: { kind: "OBJECT", name: "Author", ofType: null },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null
        },
        {
          name: "leadAsset",
          description: "",
          args: [],
          type: { kind: "UNION", name: "Media", ofType: null },
          isDeprecated: false,
          deprecationReason: null
        },
        {
          kind: "UNION",
          name: "Media",
          description: "",
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: null,
          possibleTypes: [
            { kind: "OBJECT", name: "Image", ofType: null },
            { kind: "OBJECT", name: "Video", ofType: null }
          ]
        }
      ],
      directives: []
    }
  }
};

const makeTestDir = name => mkdir(name);

const removeTestDir = name => rmdir(name);

describe("fetch gql schema should", () => {
  const tests = [
    {
      name: "make the correct introspection query",
      async test() {
        const testDir = path.join(process.cwd(), "__tests__", "1");
        await makeTestDir(testDir);

        const mockFetch = jest.fn().mockReturnValueOnce(
          Promise.resolve({
            json() {
              return Promise.resolve(mockSchema);
            }
          })
        );
        const mockEndpoint = "https://graphql.io/graphql";

        await fetchGql(testDir, mockFetch, mockEndpoint);

        const [firstCall] = mockFetch.mock.calls;
        const [, query] = firstCall;

        expect(query).toMatchSnapshot();

        await removeTestDir(testDir);
      }
    },
    {
      name: "write the expected fragment matcher",
      async test() {
        const testDir = path.join(process.cwd(), "__tests__", "2");
        await makeTestDir(testDir);

        const mockFetch = jest.fn().mockReturnValueOnce(
          Promise.resolve({
            json() {
              return Promise.resolve(mockSchema);
            }
          })
        );
        const mockEndpoint = "https://graphql.io/graphql";

        await fetchGql(testDir, mockFetch, mockEndpoint);

        const fragmentMatcher = await readFile(
          path.join(testDir, "fragment-matcher.js"),
          "utf8"
        );

        expect(fragmentMatcher).toMatchSnapshot();

        await removeTestDir(testDir);
      }
    },
    {
      name: "make an introspection query for the given GraphQL endpoint",
      async test() {
        const testDir = path.join(process.cwd(), "__tests__", "3");
        await makeTestDir(testDir);

        const mockFetch = jest.fn().mockReturnValueOnce(
          Promise.resolve({
            json() {
              return Promise.resolve(mockSchema);
            }
          })
        );
        const mockEndpoint = "https://graphql.io/graphql";

        await fetchGql(testDir, mockFetch, mockEndpoint);

        const [firstCall] = mockFetch.mock.calls;
        const [endpoint] = firstCall;

        expect(endpoint).toEqual(mockEndpoint);

        await removeTestDir(testDir);
      }
    },
    {
      name: "write the expected schema",
      async test() {
        const testDir = path.join(process.cwd(), "__tests__", "4");
        await makeTestDir(testDir);

        const mockFetch = jest.fn().mockReturnValueOnce(
          Promise.resolve({
            json() {
              return Promise.resolve(mockSchema);
            }
          })
        );
        const mockEndpoint = "https://graphql.io/graphql";

        await fetchGql(testDir, mockFetch, mockEndpoint);

        const writtenSchema = await readFile(
          path.join(testDir, "schema.json"),
          "utf8"
        );

        expect(JSON.parse(writtenSchema)).toEqual(mockSchema);

        await removeTestDir(testDir);
      }
    }
  ];

  iterator(tests);
});
