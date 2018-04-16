import { View, Text, StyleSheet } from "react-native";
import { Path } from "svgs";
import PropTypes from "prop-types";
import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Jest serializer", () => {
  it("should remove rnw-classnames", () => {
    const component = (
      <View className="rn-prop-hash1 rn-notprop main rn-prop-hash2 main2" />
    );
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should not remove styles", () => {
    const { colored, padded } = StyleSheet.create({
      colored: {
        color: "red"
      },
      padded: {
        padding: 1
      }
    });

    const component = <Text style={[colored, padded]} />;
    const tree = renderer.create(component);

    expect(tree).toMatchSnapshot();
  });

  it("should remove d-prop from path", () => {
    const component = <Path d="1 2 3 4 5 6" />;
    const tree = renderer.create(component);
    expect(tree).toMatchSnapshot();
  });

  it("should transform render props", () => {
    const propToRender = <Path d="1 2 3 4 5 6" />;
    const Nested = () => <Text>Nested</Text>;
    const PropRenderer = ({ prop }) => (
      <View>
        <Nested prop={prop} />
      </View>
    );

    PropRenderer.propTypes = {
      prop: PropTypes.element.isRequired
    };

    const tree = shallow(<PropRenderer prop={propToRender} />);
    expect(tree).toMatchSnapshot();
  });

  it("should remove undefined props", () => {
    const Dummy = () => null;
    const DummyRenderer = () => (
      <View> 
        <Dummy undef={undefined} False={false} Null={null} Zero={0} />
      </View>
    );

    const tree = shallow(<DummyRenderer/>);
    expect(tree).toMatchSnapshot();
  });

});
