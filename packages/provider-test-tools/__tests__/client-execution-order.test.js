import gql from "graphql-tag";
import { clientTester, getResolvedQueries } from "../src";

function AuthorQueryResolver({ variables }) {
  return {
    data: {
      author: {
        __typename: "Author",
        name: variables.slug
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
    const { client, link } = clientTester(AuthorQueryResolver);

    const q = client.query({
      query,
      variables: { slug: "bar" }
    });

    expect(link.findByQuery("AuthorQuery", { slug: "foo" })).toBe(undefined);

    await link.findByQuery("AuthorQuery", { slug: "bar" }).resolve();
    const data = await q;

    expect(data).toMatchObject({
      data: { author: { name: "bar" } }
    });
  });

  it("should not send the same query multiple times", async () => {
    const { client, link } = clientTester(AuthorQueryResolver);

    const queries = Promise.all([
      client.query({ query, variables: { slug: "1" } }),
      client.query({ query, variables: { slug: "2" } }),
      client.query({ query, variables: { slug: "1" } }),
      client.query({ query, variables: { slug: "2" } })
    ]);

    expect(link.filterByQuery("AuthorQuery").length).toBe(2);

    await link.findByQuery("AuthorQuery", { slug: "1" }).resolve();
    await link.findByQuery("AuthorQuery", { slug: "2" }).resolve();

    await queries;

    expect(getResolvedQueries(link)).toMatchObject([
      { vars: { slug: "1" } },
      { vars: { slug: "2" } }
    ]);
  });

  it("should retrieve same response from cache", async () => {
    const { client, link } = clientTester(AuthorQueryResolver);

    const q1 = client.query({ query, variables: { slug: "1" } });
    await link.findByQuery("AuthorQuery", { slug: "1" }).resolve();
    const q2 = client.query({ query, variables: { slug: "1" } });

    await Promise.all([q1, q2]);

    expect(link.filterByQuery("AuthorQuery").length).toBe(1);
    expect(getResolvedQueries(link)).toMatchObject([{ vars: { slug: "1" } }]);
  });

  it("should return responses in the same order as resolved", async () => {
    const { client, link } = clientTester(AuthorQueryResolver);

    const queries = Promise.all([
      client.query({ query, variables: { slug: "1" } }),
      client.query({ query, variables: { slug: "2" } })
    ]);

    await link.findByQuery("AuthorQuery", { slug: "2" }).resolve();
    await link.findByQuery("AuthorQuery", { slug: "1" }).resolve();

    await queries;

    expect(getResolvedQueries(link)).toMatchObject([
      { vars: { slug: "2" } },
      { vars: { slug: "1" } }
    ]);
  });
});
