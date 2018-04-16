import {View, Text, StyleSheet} from "react-native";
import {Path} from "svgs";
import React from "react";
import renderer from "react-test-renderer";
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("jest serializer", () => {
  it("removes rnw-classnames", () => {
    const component = <View className="rn-prop-hash1 main rn-prop-hash2 main2" />
    const tree = renderer.create(
      component
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("adds styles", () => {
    const {colored, padded} = StyleSheet.create({
      colored: {
        color: "red",
      },
      padded: {
        padding: 1
      }
    });

    const component = <Text style={[colored, padded]} />
    const tree = renderer.create(component);

    expect(tree).toMatchSnapshot();
  });

  it("removes paths d props", () => {
    const component = <Path d="1 2 3 4 5 6"/>
    const tree = renderer.create(component);
    expect(tree).toMatchSnapshot();
  });

  it("transforms render props", () => {
    const prop = <Path d="1 2 3 4 5 6"/>
    const Nested = () => <Text> </Text>
    const PropRenderer = ({prop}) => <View><Nested prop={prop} /></View>;
    const tree = shallow(<PropRenderer prop={prop} />);
    expect(tree).toMatchSnapshot();
  });
});
