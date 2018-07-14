import React from "react";
import createItem from "./utils";
import { StandardSlice } from "../src/slice";

export default renderComponent => {
  it("should handle no child elements", () => {
    const wrapper = renderComponent(
      <StandardSlice itemCount={0} renderItems={() => []} />
    );

    expect(wrapper).toMatchSnapshot("1. should handle no child elements");
  });

  it("should render a single child element", () => {
    const wrapper = renderComponent(
      <StandardSlice
        itemCount={1}
        renderItems={() => [createItem("standard-1")]}
      />
    );

    expect(wrapper).toMatchSnapshot("2. should render a single child element");
  });

  it("should render two child elements", () => {
    const wrapper = renderComponent(
      <StandardSlice
        itemCount={2}
        renderItems={() => [createItem("standard-1"), createItem("standard-2")]}
      />
    );

    expect(wrapper).toMatchSnapshot("3. should render two child elements");
  });

  it("should render three child elements", () => {
    const wrapper = renderComponent(
      <StandardSlice
        itemCount={3}
        renderItems={() => [
          createItem("standard-1"),
          createItem("standard-2"),
          createItem("standard-3")
        ]}
      />
    );

    expect(wrapper).toMatchSnapshot("4. should render three child elements");
  });
};
