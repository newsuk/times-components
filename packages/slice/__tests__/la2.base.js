import React from "react";
import createItem from "./utils";
import { LeadAndTwoSlice } from "../src/slice";

export default renderComponent => {
  it("should render a single child element", () => {
    const output = renderComponent(
      <LeadAndTwoSlice lead={() => createItem("lead")} />
    );

    expect(output).toMatchSnapshot("1. should render a single child element");
  });

  it("should render two child elements", () => {
    const output = renderComponent(
      <LeadAndTwoSlice
        lead={() => createItem("lead")}
        renderSupports={() => [createItem("support-1")]}
      />
    );

    expect(output).toMatchSnapshot("2. should render two child elements");
  });

  it("should render three child elements", () => {
    const output = renderComponent(
      <LeadAndTwoSlice
        lead={() => createItem("lead")}
        renderSupports={() => [
          createItem("support-1"),
          createItem("support-2")
        ]}
      />
    );

    expect(output).toMatchSnapshot("3. should render three child elements");
  });
};
