import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextLink from "../../src/text-link";

describe("Test Link", () => {
  it("renders the link", () => {
    const { baseElement, getByText, getByRole } = render(
      <TextLink onPress={() => {}} url="http://thetimes.co.uk">
        The Times
      </TextLink>
    );
    expect(baseElement).toMatchSnapshot();
    expect(getByText("The Times")).toBeVisible();
    expect(getByRole("link")).toHaveAttribute("href", "http://thetimes.co.uk");
  });
  it("renders the link with the styles passed down", () => {
    const { baseElement, getByText, getByRole } = render(
      <TextLink
        onPress={() => {}}
        style={{ color: "#006699", backgroundColor: "#006699" }}
        url="http://thetimes.co.uk"
      >
        The Times
      </TextLink>
    );
    expect(baseElement).toMatchSnapshot();
    expect(getByText("The Times")).toBeVisible();
    expect(getByRole("link")).toHaveStyle({
      color: "#006699",
      backgroundColor: "#0066799"
    });
  });
  it("calls onPress when clicked", () => {
    const mockOnPress = jest.fn();
    const { baseElement, getByRole } = render(
      <TextLink
        onPress={mockOnPress}
        style={{ color: "#006699", backgroundColor: "#006699" }}
        url="http://thetimes.co.uk"
      >
        The Times
      </TextLink>
    );
    expect(baseElement).toMatchSnapshot();
    fireEvent.click(getByRole("link"));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
  it("renders the link with children", () => {
    const { baseElement, getByText, getByRole } = render(
      <TextLink onPress={() => {}} url="http://thetimes.co.uk">
        <p>Children</p>
      </TextLink>
    );
    expect(baseElement).toMatchSnapshot();
    expect(getByText("Children")).toBeVisible();
    expect(getByRole("link")).toHaveAttribute("href", "http://thetimes.co.uk");
  });
  it("renders the text link with target passed to it", () => {
    const { baseElement, getByText, getByRole } = render(
      <TextLink onPress={() => {}} url="http://thetimes.co.uk" target="_blank">
        <p>Children</p>
      </TextLink>
    );
    expect(baseElement).toMatchSnapshot();
    expect(getByText("Children")).toBeVisible();
    expect(getByRole("link")).toHaveAttribute("href", "http://thetimes.co.uk");
    expect(getByRole("link")).toHaveAttribute("target", "_blank");
  });
});
