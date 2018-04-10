import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import "jest-styled-components";
import { colours, fonts, fontSizes } from "@times-components/styleguide";
import test from "../shared";
import Link, { TextLink } from "../../link";

describe("Link tests on Web", () => {
  it("renders with responsive styles", () => {
    const responsiveLinkStyles = {
      base: `
      color: ${colours.functional.action};
      font-family: "${fonts.bodyRegular}";
      line-height: 26px;
      font-size: ${fontSizes.bodyMobile}px;
      margin-bottom: 25px;
      margin-top: 0;
  `,
      medium: `
      font-size: ${fontSizes.body}px;
      line-height: 30px;
  `
    };

    const component = mount(
      <Link
        url="http://thetimes.co.uk"
        onPress={() => {}}
        responsiveLinkStyles={responsiveLinkStyles}
      >
        The Times
      </Link>
    );

    expect(component.render()).toMatchSnapshot();
  });

  it("renders with a target", () => {
    const tree = renderer
      .create(
        <Link url="http://thetimes.co.uk" onPress={() => {}} target="_blank">
          The Times
        </Link>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test(Link, TextLink, "p");
});
