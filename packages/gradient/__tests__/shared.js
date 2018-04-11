import React from "react";
import { StyleSheet } from "react-native";
import renderer from "react-test-renderer";
import Gradient from "../src/gradient";

module.exports = () => {
  const styles = StyleSheet.create({
    container: {
      margin: 10
    }
  });

  it("renders a Gradient", () => {
    const tree = renderer.create(<Gradient />);

    expect(tree).toMatchSnapshot();
  });

  it("renders a Gradient using prop styles", () => {
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

  it("renders a Gradient using array prop styles", () => {
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

  it("renders a Gradient using stylesheets", () => {
    const tree = renderer.create(
      <Gradient
        style={[
          styles.container,
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
};
