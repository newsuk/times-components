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
      directives: [],
      mutationType: {
        name: "Mutation"
      },
      queryType: {
        name: "Query"
      },
      subscriptionType: null,
      types: [
        {
          description: "",
          enumValues: null,
          fields: [
            {
              args: [],
              deprecationReason: null,
              description: "A list of authors",
              isDeprecated: false,
              name: "author",
              type: {
                kind: "OBJECT",
                name: "Author",
                ofType: null
              }
            }
          ],
          inputFields: null,
          interfaces: [],
          kind: "OBJECT",
          name: "Query",
          possibleTypes: null
        },
        {
          args: [],
          deprecationReason: null,
          description: "",
          isDeprecated: false,
          name: "leadAsset",
          type: {
            kind: "UNION",
            name: "Media",
            ofType: null
          }
        },
        {
          description: "",
          enumValues: null,
          fields: null,
          inputFields: null,
          interfaces: null,
          kind: "UNION",
          name: "Media",
          possibleTypes: [
            {
              kind: "OBJECT",
              name: "Image",
              ofType: null
            },
            {
              kind: "OBJECT",
              name: "Video",
              ofType: null
            }
          ]
        }
      ]
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
