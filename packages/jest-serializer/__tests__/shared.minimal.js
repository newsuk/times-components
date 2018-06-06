import { View, Text } from "react-native";
import { Path } from "svgs";
import PropTypes from "prop-types";
import React from "react";
import renderer from "react-test-renderer";

export default () => {
  it("remove d-prop from path", () => {
    const component = <Path d="1 2 3 4 5 6" />;
    const tree = renderer.create(component);
    expect(tree).toMatchSnapshot();
  });

  it("transform render props", () => {
    const propToRender = <Path d="1 2 3 4 5 6" />;
    const Nested = props => <Text {...props}>Nested</Text>;
    const PropRenderer = ({ prop }) => (
      <View>
        <Nested prop={prop} />
      </View>
    );

    PropRenderer.propTypes = {
      prop: PropTypes.element.isRequired
    };

    const tree = renderer.create(<PropRenderer prop={propToRender} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("remove undefined props", () => {
    const Dummy = props => <Text {...props} />;
    const DummyRenderer = () => (
      <View>
        <Dummy undef={undefined} False={false} Null={null} Zero={0} />
      </View>
    );

    const tree = renderer.create(<DummyRenderer />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("remove functions as props", () => {
    const Dummy = props => <Text {...props} />;
    const DummyRenderer = () => (
      <View>
        <Dummy testFunc={() => 42} />
      </View>
    );

    const tree = renderer.create(<DummyRenderer />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("remove empty objects as props", () => {
    const DummyRenderer = () => (
      <View>
        <Text test={{}} />
      </View>
    );

    const tree = renderer.create(<DummyRenderer />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
};
