/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import Gradient from "../gradient";

it("renders a Gradient", () => {
  const tree = renderer.create(<Gradient />);

  expect(tree).toMatchSnapshot();
});

it("renders a Gradient and uses prop styles", () => {
  const tree = renderer.create(
    <Gradient
      style={{
        height: 200,
        width: 200
      }}
    />
  );

  expect(tree).toMatchSnapshot();
});

it("renders a Gradient and uses array prop styles", () => {
  const tree = renderer.create(
    <Gradient
      style={[
        {
          height: 200
        },
        {
          width: 200
        }
      ]}
    />
  );

  expect(tree).toMatchSnapshot();
});

it("renders a Gradient with an angle (-45)", () => {
  const tree = renderer.create(<Gradient degrees={-45} />);

  expect(tree).toMatchSnapshot();
});

it("renders a Gradient with an angle (45)", () => {
  const tree = renderer.create(<Gradient degrees={45} />);

  expect(tree).toMatchSnapshot();
});

it("renders a Gradient with an angle (90)", () => {
  const tree = renderer.create(<Gradient degrees={90} />);

  expect(tree).toMatchSnapshot();
});

it("renders a Gradient with an angle (180)", () => {
  const tree = renderer.create(<Gradient degrees={180} />);

  expect(tree).toMatchSnapshot();
});

it("renders a Gradient with an angle (270)", () => {
  const tree = renderer.create(<Gradient degrees={270} />);

  expect(tree).toMatchSnapshot();
});
