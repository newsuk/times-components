import React from "react";
import {
  addSerializers,
  enzymeRenderedSerializer
} from "@times-components/jest-serializer";
import { shallow } from "enzyme";
import gql from "graphql-tag";
import connectGraphql from "../src/provider";

addSerializers(expect, enzymeRenderedSerializer());

const query = gql`
  {
    author(slug: "fiona-hamilton") {
      name
    }
  }
`;

describe("connectGraphql", () => {
  it("renders the correct QueryProvider component", () => {
    const ConnectedComponent = connectGraphql(query, () => ({}));
    const component = shallow(
      <ConnectedComponent debounceTimeMs={1000} foo="baz">
        {() => null}
      </ConnectedComponent>
    );

    expect(component).toMatchSnapshot();
  });
});
