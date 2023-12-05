import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { providerTester, getRenderedQueries, getResolvedQueries } from "../src";

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
      author: {
        name: "2"
      },
      loading: false,
      variables: {
        slug: "2"
      }
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
        author: {
          name: "2"
        },
        loading: false,
        variables: {
          slug: "2"
        }
      }
    ]);
  });

  it("should not send requests after unmount", async () => {
    const { link, setProps, component } = providerTester(
      AuthorQueryResolver,
      connect(query),
      { slug: "1" }
    );

    component.unmount();
    const nextProps = await setProps({ slug: "2" });
    expect(nextProps).toBeUndefined();
    expect(link.getRequests()).toHaveLength(1);
  });
});
