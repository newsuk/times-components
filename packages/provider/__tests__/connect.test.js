import React from "react";
import {
  addSerializers,
  enzymeRenderedSerializer,
  minimalise
} from "@times-components/jest-serializer";
import { shallow } from "enzyme";
import gql from "graphql-tag";
import QueryProvider from '../src/query-provider';
import connectGraphql from "../src/provider";

addSerializers(expect, enzymeRenderedSerializer(), minimalise((value, key) => key === "query"));

const query = gql`
  {
    author(slug: "fiona-hamilton") {
      name
    }
  }
`;


const propsToVariables = () => ({});

describe("connectGraphql", () => {
  it("renders the correct QueryProvider component", () => {
    const ConnectedComponent = connectGraphql(query, propsToVariables);
    const component = shallow(
      <ConnectedComponent debounceTimeMs={1000} foo="baz">
        {() => null}
      </ConnectedComponent>
    );

    expect(component).toMatchSnapshot();
    expect(component.find(QueryProvider).props()).toEqual(expect.objectContaining({
      propsToVariables,
      query
    }))
  });
});
