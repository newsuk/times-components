import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Link from "../../src/link";

describe("Link", () => {
  it("renders the link", () => {
    const { baseElement, getByText, getByRole } = render(
      <Link onPress={() => {}} url="http://thetimes.co.uk">
        The Times
      </Link>
    );
    expect(baseElement).toMatchSnapshot();
    expect(getByText("The Times")).toBeVisible();
    expect(getByRole("link")).not.toHaveAttribute("target", "_blank");
  });
  it("renders the link with a target", () => {
    const { baseElement, getByRole } = render(
      <Link onPress={() => {}} target="_blank" url="http://thetimes.co.uk">
        The Times
      </Link>
    );
    expect(baseElement).toMatchSnapshot();
    expect(getByRole("link")).toHaveAttribute("target", "_blank");
  });
  it("calls onPress prop when clicked", () => {
    const mockOnPress = jest.fn();
    const { getByRole } = render(
      <Link onPress={mockOnPress} target="_blank" url="http://thetimes.co.uk">
        The Times
      </Link>
    );
    fireEvent.click(getByRole("link"));
    expect(mockOnPress).toHaveBeenCalled();
  });
});
