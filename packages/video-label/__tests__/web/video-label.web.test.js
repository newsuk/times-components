import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import VideoLabel from "../../src/video-label";

describe("Video Label", () => {
  it("shows the default text of VIDEO when no title is passed to the component", () => {
    const { baseElement, getByText } = render(<VideoLabel />);
    expect(baseElement).toMatchSnapshot();
    expect(getByText("VIDEO")).toBeVisible();
  });

  it("renders the title that is passed to the component", () => {
    const { baseElement, getByText } = render(<VideoLabel title="swimming" />);
    expect(baseElement).toMatchSnapshot();
    expect(getByText("SWIMMING")).toBeVisible();
  });

  it("renders the component in the color passed to it", () => {
    const { baseElement } = render(<VideoLabel color="blue" />);
    expect(baseElement).toMatchSnapshot();
  });
});
