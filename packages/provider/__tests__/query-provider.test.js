import React from "react";
import renderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import gql from "graphql-tag";
import omit from "lodash.omit";
import { addSerializers, minimalise } from "@times-components/jest-serializer";
import QueryProvider from "../src/query-provider";

jest.mock("react-apollo", () => ({
  Query: ({ children }) =>
    children({
      data: { foo: "bar" },
      error: null,
      fetchMore: () => null,
      loading: false,
      refetch: () => null
    })
}));

addSerializers(expect, minimalise((value, key) => key !== "results"));

const prepareMockForSnapshot = fn => ({
  ...fn.mock.calls[0][0],
  debouncedProps: omit(fn.mock.calls[0][0].debouncedProps, "children")
});

const query = gql`
  {
    author(slug: "fiona-hamilton") {
      name
    }
  }
`;

const queryWithVariable = gql`
  query ArticleQuery($id: ID!) {
    article(id: $id) {
      content
    }
  }
`;

describe("QueryProvider", () => {
  iterator([
    {
      name:
        "when passing no props to variables, it should call its children with the correct props",
      test() {
        const child = jest.fn(() => null);
        renderer.create(
          <QueryProvider debounceTimeMs={1000} foo="bar" query={query}>
            {child}
          </QueryProvider>
        );
        expect(prepareMockForSnapshot(child)).toMatchSnapshot();
      }
    },

    {
      name:
        "when passing props to variables, it should call its children with the correct props",
      test() {
        const child = jest.fn(() => null);
        renderer.create(
          <QueryProvider
            articleId="123"
            debounceTimeMs={1000}
            propsToVariables={props => ({ id: props.articleId })}
            query={queryWithVariable}
          >
            {child}
          </QueryProvider>
        );
        expect(prepareMockForSnapshot(child)).toMatchSnapshot();
      }
    },

    {
      name: "should render the result of children",
      test() {
        const component = renderer.create(
          <QueryProvider debounceTimeMs={1000} query={query}>
            {() => <div>Hello, World</div>}
          </QueryProvider>
        );
        expect(component).toMatchSnapshot();
      }
    }
  ]);
});
