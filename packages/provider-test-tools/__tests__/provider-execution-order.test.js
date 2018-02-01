import gql from "graphql-tag";
import { graphql } from "react-apollo-temp";
import { providerTester, getRenderedQueries, getResolvedQueries } from "../";

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

const connect = query => {
  const Wrapper = ({
    data: { error, loading, ...result },
    children,
    ...props
  }) =>
    children({
      error,
      loading,
      ...result,
      ...props
    });

  return graphql(query)(Wrapper);
};

const query = gql`
  query AuthorQuery($slug: Slug!) {
    author(slug: $slug) {
      name
    }
  }
`;

describe("provider execution order tests", () => {
  it("should resolve in order", async () => {
    const { link, setProps } = providerTester(
      AuthorQueryResolver,
      connect(query),
      { slug: "1" }
    );

    await link.findByQuery("AuthorQuery", { slug: "1" }).resolve();
    expect(getRenderedQueries(link)[0]).toMatchObject({
      loading: true,
      variables: { slug: "1" }
    });

    await setProps({ slug: "2" });
    expect(getRenderedQueries(link).length).toBe(2);
    expect(getRenderedQueries(link)[1]).toMatchObject({
      loading: true,
      variables: { slug: "2" }
    });

    await link.findByQuery("AuthorQuery", { slug: "2" }).resolve();
    expect(getRenderedQueries(link).length).toBe(3);
    expect(getRenderedQueries(link)[2]).toMatchObject({
      loading: false,
      variables: { slug: "2" },
      author: { name: "2" }
    });
  });

  it("should render in order even if resolved out of order", async () => {
    const { link, setProps } = providerTester(
      AuthorQueryResolver,
      connect(query),
      { slug: "1" }
    );

    await setProps({ slug: "2" });
    await link.findByQuery("AuthorQuery", { slug: "2" }).resolve();
    expect(getResolvedQueries(link).length).toBe(1);
    await link.findByQuery("AuthorQuery", { slug: "1" }).resolve();
    expect(getRenderedQueries(link).length).toBe(3);
    expect(getResolvedQueries(link).length).toBe(2);
    expect(getRenderedQueries(link)).toMatchObject([
      {
        loading: true,
        variables: { slug: "1" }
      },
      {
        loading: true,
        variables: { slug: "2" }
      },
      {
        loading: false,
        variables: { slug: "2" },
        author: { name: "2" }
      }
    ]);
  });
});
