/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import format from "date-fns/format";
import DatePublication from "../date-publication";

Enzyme.configure({ adapter: new React16Adapter() });

describe("Date Publication test", () => {
  const props = {
    date: new Date(2017, 6, 1, 2, 35, 0, 0),
    publication: "TIMES"
  };

  it("renders a DatePublication component with Times publication and Relevant date", () => {
    const tree = renderer.create(<DatePublication {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a DatePublication component with Sunday Times publication and Relevant date", () => {
    const sundayTimesProps = {
      ...props,
      publication: "SUNDAYTIMES"
    };
    const tree = renderer
      .create(<DatePublication {...sundayTimesProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("date should follow the correct format", () => {
    const component = shallow(<DatePublication {...props} />);
    expect(component.text()).toContain(
      format(props.date, "MMMM DD YYYY, hh:mma")
    );
  });

  it("without providing a publication, The Times will be set as default", () => {
    const removePubProps = props;
    delete removePubProps.publication;

    const component = shallow(<DatePublication {...removePubProps} />);
    expect(component.text()).toContain("The Times");
  });
});
