import { View, Text } from "react-native";
import React from "react";
import TestRenderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

export default () => {
  it("transform render props", () => {
    const Foo = () => <Text>World</Text>;
    const PropRenderer = () => (
      <Foo
        prop={
          <Text dir="dir" href="href">
            Bar
          </Text>
        }
      />
    );

    const wrapper = shallow(<PropRenderer prop={<Text>Hello</Text>} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("remove undefined props", () => {
    const Dummy = props => <Text {...props} />;
    const DummyRenderer = () => (
      <View>
        <Dummy False={false} Null={null} Undef={undefined} Zero={0} />
      </View>
    );

    const testInstance = TestRenderer.create(<DummyRenderer />);

    expect(testInstance.toJSON()).toMatchSnapshot();
  });

  it("remove functions as props", () => {
    const Dummy = props => <Text {...props} />;
    const DummyRenderer = () => (
      <View>
        <Dummy testFunc={() => 42} />
      </View>
    );

    const testInstance = TestRenderer.create(<DummyRenderer />);

    expect(testInstance.toJSON()).toMatchSnapshot();
  });

  it("remove empty objects as props", () => {
    const DummyRenderer = () => (
      <View>
        <Text test={{}} />
      </View>
    );

    const testInstance = TestRenderer.create(<DummyRenderer />);

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
