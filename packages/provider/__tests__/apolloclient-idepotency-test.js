import gql from "graphql-tag";
import { createClientTester, getEvents } from "./provider-testing-utils";

function AuthorQueryResolver({ variables }) {
  return {
    data: {
      author: {
        name: variables.slug,
        __typename: "Author"
      }
    }
  };
}

const query = gql`
  query AuthorQuery($slug: Slug!) {
    author(slug: $slug) {
      name
    }
  }
`;

describe("apollo-client tests", () => {
  it("should resolve correctly", async () => {
    const { client, link } = createClientTester(AuthorQueryResolver);

    const q = client.query({
      query,
      variables: { slug: "bar" }
    });

    await link.resolve(0);
    await q;

    expect(getEvents(link)).toEqual([
      { type: "request", query: "AuthorQuery", vars: { slug: "bar" } },
      { type: "resolving", query: "AuthorQuery", vars: { slug: "bar" } },
      { type: "resolved", query: "AuthorQuery", vars: { slug: "bar" } }
    ]);
  });

  it("should not send the same query multiple times", async () => {
    const { client, link } = createClientTester(AuthorQueryResolver);

    const q1 = client.query({ query, variables: { slug: "1" } });
    const q2 = client.query({ query, variables: { slug: "2" } });
    const q3 = client.query({ query, variables: { slug: "1" } });
    const q4 = client.query({ query, variables: { slug: "2" } });

    await link.resolve(0);
    await link.resolve(1);

    await Promise.all([q1, q2, q3, q4]);

    expect(getEvents(link)).toEqual([
      { type: "request", query: "AuthorQuery", vars: { slug: "1" } },
      { type: "request", query: "AuthorQuery", vars: { slug: "2" } },
      { type: "resolving", query: "AuthorQuery", vars: { slug: "1" } },
      { type: "resolving", query: "AuthorQuery", vars: { slug: "2" } },
      { type: "resolved", query: "AuthorQuery", vars: { slug: "1" } },
      { type: "resolved", query: "AuthorQuery", vars: { slug: "2" } }
    ]);
  });

  it("should retrieve same response from cache", async () => {
    const { client, link } = createClientTester(AuthorQueryResolver);

    const q1 = client.query({ query, variables: { slug: "1" } });
    await link.resolve(0);
    const q2 = client.query({ query, variables: { slug: "1" } });

    await Promise.all([q1, q2]);

    expect(getEvents(link)).toEqual([
      { type: "request", query: "AuthorQuery", vars: { slug: "1" } },
      { type: "resolving", query: "AuthorQuery", vars: { slug: "1" } },
      { type: "resolved", query: "AuthorQuery", vars: { slug: "1" } }
    ]);
  });

  it("should return responses in the same order as resolved", async () => {
    const { client, link } = createClientTester(AuthorQueryResolver);

    const q1 = client.query({ query, variables: { slug: "1" } });
    const q2 = client.query({ query, variables: { slug: "2" } });

    await link.resolve(1);
    await q2;

    await link.resolve(0);
    await q1;

    expect(getEvents(link)).toEqual([
      { type: "request", query: "AuthorQuery", vars: { slug: "1" } },
      { type: "request", query: "AuthorQuery", vars: { slug: "2" } },
      { type: "resolving", query: "AuthorQuery", vars: { slug: "1" } },
      { type: "resolving", query: "AuthorQuery", vars: { slug: "2" } },
      { type: "resolved", query: "AuthorQuery", vars: { slug: "2" } },
      { type: "resolved", query: "AuthorQuery", vars: { slug: "1" } }
    ]);
  });
});
