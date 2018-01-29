import gql from "graphql-tag";
import { createProviderTester, getRenderedQueries, getResolvedQueries } from "./provider-testing-utils";
import connectGraphql from "../connect";

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

describe("provider execution order tests", () => {
  it("should resolve in order", async () => {
    const Connected = connectGraphql(query);
    const { link, setProps } = createProviderTester(
      AuthorQueryResolver,
      Connected,
      { slug: "1" }
    );

    await link.findByQuery('AuthorQuery', {slug: "1"}).resolve();
    expect(getRenderedQueries(link)[0]).toMatchObject({
      isLoading: true,
      variables: { slug: "1" }
    });

    await setProps({ slug: "2" });
    expect(getRenderedQueries(link).length).toBe(2);
    expect(getRenderedQueries(link)[1]).toMatchObject({
      isLoading: true,
      variables: { slug: "2" }
    });


    await link.findByQuery('AuthorQuery', {slug: "2"}).resolve();
    expect(getRenderedQueries(link).length).toBe(3);
    expect(getRenderedQueries(link)[2]).toMatchObject({
      isLoading: false,
      variables: { slug: "2" },
      author: { name: "2" }
    });
  });

  it("should render in order even if resolved out of order", async () => {
    const Connected = connectGraphql(query);
    const { link, setProps } = createProviderTester(
      AuthorQueryResolver,
      Connected,
      { slug: "1" }
    );


    await setProps({ slug: "2" });
    await link.findByQuery('AuthorQuery', {slug: "2"}).resolve();
    expect(getRenderedQueries(link).length).toBe(3);
    expect(getRenderedQueries(link)).toMatchObject([{
      isLoading: true,
      variables: { slug: "1" }
    },{
      isLoading: true,
      variables: { slug: "2" }
    },{
      isLoading: false,
      variables: { slug: "2" },
      author: { name: "2" }
    }]);
  });

});
