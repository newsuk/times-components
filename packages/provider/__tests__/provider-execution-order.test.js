import gql from "graphql-tag";
import { createProviderTester, getEvents } from "./provider-testing-utils";
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
  query AuthorQuery($slug: String!) {
    author(slug: $slug) {
      name
    }
  }
`;

it("should resolve in order", async () => {
  const Connected = connectGraphql(query);
  const { link, setProps } = createProviderTester(
    AuthorQueryResolver,
    Connected,
    { slug: "1" }
  );

  await setProps({ slug: "2" });
  await link.resolve(0);
  await link.resolve(1);

  expect(getEvents(link)).toMatchObject([
    {
      type: "render",
      error: undefined,
      isLoading: true,
      variables: { slug: "1" },
      networkStatus: 1,
      slug: "1"
    },
    { type: "request", query: "AuthorQuery", vars: { slug: "1" } },
    { type: "request", query: "AuthorQuery", vars: { slug: "2" } },
    {
      type: "render",
      error: undefined,
      isLoading: true,
      variables: { slug: "2" },
      networkStatus: 1,
      slug: "2"
    },
    { type: "resolving", query: "AuthorQuery", vars: { slug: "1" } },
    { type: "resolving", query: "AuthorQuery", vars: { slug: "2" } },
    { type: "resolved", query: "AuthorQuery", vars: { slug: "1" } },
    { type: "resolved", query: "AuthorQuery", vars: { slug: "2" } },
    {
      type: "render",
      error: undefined,
      isLoading: false,
      variables: { slug: "2" },
      networkStatus: 7,
      author: { name: "2", __typename: "Author" },
      slug: "2"
    }
  ]);
});

it("should render in order even if resolved out of order", async () => {
  const Connected = connectGraphql(query);
  const { link, setProps } = createProviderTester(
    AuthorQueryResolver,
    Connected,
    { slug: "1" }
  );

  setProps({ slug: "2" });
  await link.resolve(1);
  await link.resolve(0);
  await setProps({ slug: "3" });
  await link.resolve(2);

  expect(getEvents(link)).toMatchObject([
    {
      type: "render",
      error: undefined,
      isLoading: true,
      variables: { slug: "1" },
      networkStatus: 1,
      slug: "1"
    },
    { type: "request", query: "AuthorQuery", vars: { slug: "1" } },
    { type: "request", query: "AuthorQuery", vars: { slug: "2" } },
    {
      type: "render",
      error: undefined,
      isLoading: true,
      variables: { slug: "2" },
      networkStatus: 1,
      slug: "2"
    },
    { type: "resolving", query: "AuthorQuery", vars: { slug: "1" } },
    { type: "resolving", query: "AuthorQuery", vars: { slug: "2" } },
    { type: "resolved", query: "AuthorQuery", vars: { slug: "2" } },
    {
      type: "render",
      error: undefined,
      isLoading: false,
      variables: { slug: "2" },
      networkStatus: 7,
      author: { name: "2", __typename: "Author" },
      slug: "2"
    },
    { type: "resolved", query: "AuthorQuery", vars: { slug: "1" } },
    { type: "request", query: "AuthorQuery", vars: { slug: "3" } },
    {
      type: "render",
      error: undefined,
      isLoading: true,
      variables: { slug: "3" },
      networkStatus: 2,
      author: { name: "2", __typename: "Author" },
      slug: "3"
    },
    { type: "resolving", query: "AuthorQuery", vars: { slug: "3" } },
    { type: "resolved", query: "AuthorQuery", vars: { slug: "3" } },
    {
      type: "render",
      error: undefined,
      isLoading: false,
      variables: { slug: "3" },
      networkStatus: 7,
      author: { name: "3", __typename: "Author" },
      slug: "3"
    }
  ]);
});

it("should not refetch if same query despite superflourus vars", async () => {
  const Connected = connectGraphql(query);
  const { link, setProps } = createProviderTester(
    AuthorQueryResolver,
    Connected,
    { slug: "1" }
  );

  await setProps({ slug: "1", foo: 1 });
  await link.resolve(0);
  await link.resolve(1);

  await setProps({ slug: "1", bar: 2 });
  await link.resolve(1);

  expect(getEvents(link)).toMatchObject([
    {
      type: "render",
      error: undefined,
      isLoading: true,
      variables: { slug: "1" },
      networkStatus: 1,
      slug: "1"
    },
    { type: "request", query: "AuthorQuery", vars: { slug: "1" } },
    {
      type: "render",
      error: undefined,
      isLoading: true,
      variables: { slug: "1" },
      networkStatus: 1,
      slug: "1",
      foo: 1
    },
    { type: "resolving", query: "AuthorQuery", vars: { slug: "1" } },
    { type: "resolved", query: "AuthorQuery", vars: { slug: "1" } },
    {
      type: "render",
      error: undefined,
      isLoading: false,
      variables: { slug: "1" },
      networkStatus: 7,
      author: { name: "1", __typename: "Author" },
      slug: "1",
      foo: 1
    },
    {
      type: "render",
      error: undefined,
      isLoading: false,
      variables: { slug: "1" },
      networkStatus: 7,
      author: { name: "1", __typename: "Author" },
      slug: "1",
      foo: 1,
      bar: 2
    }
  ]);
});
