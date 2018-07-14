import React from "react";
import createItem from "./utils";
import { OpinionAndTwoSlice } from "../src/slice";

export default renderComponent => {
  it("should render a single child element", () => {
    const wrapper = renderComponent(
      <OpinionAndTwoSlice opinion={() => createItem("opinion")} />
    );

    expect(wrapper).toMatchSnapshot("1. should render a single child element");
  });

  it("should render two child elements", () => {
    const wrapper = renderComponent(
      <OpinionAndTwoSlice
        opinion={() => createItem("opinion")}
        renderSupports={() => [createItem("support-1")]}
      />
    );

    expect(wrapper).toMatchSnapshot("2. should render two child elements");
  });

  it("should render three child elements", () => {
    const wrapper = renderComponent(
      <OpinionAndTwoSlice
        opinion={() => createItem("opinion")}
        renderSupports={() => [
          createItem("support-1"),
          createItem("support-2")
        ]}
      />
    );

    expect(wrapper).toMatchSnapshot("3. should render three child elements");
  });
};
