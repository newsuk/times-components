import React from "react";
import { TcText, TcView } from "@times-components/utils";
import TestRenderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

export default () => {
  it("transform render props", () => {
    const Foo = () => <TcText>World</TcText>;
    const PropRenderer = () => (
      <Foo
        prop={
          <TcText dir="dir" href="href">
            Bar
          </TcText>
        }
      />
    );

    const wrapper = shallow(<PropRenderer prop={<TcText>Hello</TcText>} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("remove undefined props", () => {
    const Dummy = props => <TcText {...props} />;
    const DummyRenderer = () => (
      <TcView>
        <Dummy False={false} Null={null} Undef={undefined} Zero={0} />
      </TcView>
    );

    const testInstance = TestRenderer.create(<DummyRenderer />);

    expect(testInstance.toJSON()).toMatchSnapshot();
  });

  it("remove functions as props", () => {
    const Dummy = props => <TcText {...props} />;
    const DummyRenderer = () => (
      <TcView>
        <Dummy testFunc={() => 42} />
      </TcView>
    );

    const testInstance = TestRenderer.create(<DummyRenderer />);

    expect(testInstance.toJSON()).toMatchSnapshot();
  });

  it("remove empty objects as props", () => {
    const DummyRenderer = () => (
      <TcView>
        <TcText test={{}} />
      </TcView>
    );

    const testInstance = TestRenderer.create(<DummyRenderer />);

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
