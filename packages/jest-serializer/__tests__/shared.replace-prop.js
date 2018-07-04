import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

export default () => {
  it("replace the expected prop", () => {
    const Bar = () => null;

    const Foo = () => <Bar test1="test1" test2="test2" />;

    expect(shallow(<Foo />)).toMatchSnapshot();
  });
};
