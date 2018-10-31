import React from "react";
import {
  addSerializers,
  enzymeRenderedSerializer,
  minimalise
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import gql from "graphql-tag";
import omit from "lodash.omit";
import connectGraphql, { QueryProvider } from "../src/connect";

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

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  minimalise((_, key) =>
    ["query", "propsToVariable", "results", "propsToVariables"].includes(key)
  )
);

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

const propsToVariables = () => ({});

const prepareMockForSnapshot = fn => ({
  ...fn.mock.calls[0][0],
  debouncedProps: omit(fn.mock.calls[0][0].debouncedProps, "children")
});

iterator([
  {
    name: "connectGraphql renders the correct QueryProvider component",
    test() {
      const ConnectedComponent = connectGraphql(query, propsToVariables);
      const component = shallow(
        <ConnectedComponent debounceTimeMs={1000} foo="baz">
          {() => null}
        </ConnectedComponent>
      );

      expect(component).toMatchSnapshot();
    }
  },
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
  },

  {
    name:
      "connectGraphql HOC passes the correct query and propsToVariables to the QueryProvider",
    test() {
      const ConnectedComponent = connectGraphql(query, propsToVariables);
      const component = shallow(
        <ConnectedComponent debounceTimeMs={1000} foo="baz">
          {() => null}
        </ConnectedComponent>
      );

      expect(component.find(QueryProvider).props()).toEqual(
        expect.objectContaining({
          propsToVariables,
          query
        })
      );
    }
  }
]);
