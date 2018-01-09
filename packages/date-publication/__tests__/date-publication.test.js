/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import format from "date-fns/format";
import DatePublication from "../date-publication";

Enzyme.configure({ adapter: new React16Adapter() });

function gmtTests(gmtOffset, dateFormat) {
  const { getTimezoneOffset } = Date.prototype;

  beforeEach(() => {
    global.Date.prototype.getTimezoneOffset = jest
      .genMockFunction()
      .mockReturnValue(gmtOffset); // eslint-disable-line no-extend-native
  });

  const props = {
    date: new Date("2017-07-01T14:35:00.000Z"),
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
    const UTCDate = new Date(
      props.date.getUTCFullYear(),
      props.date.getUTCMonth(),
      props.date.getUTCDate(),
      props.date.getUTCHours(),
      props.date.getUTCMinutes()
    );
    expect(component.text()).toContain(format(UTCDate, dateFormat));
  });

  it("without providing a publication, The Times will be set as default", () => {
    const removePubProps = props;
    delete removePubProps.publication;

    const component = shallow(<DatePublication {...removePubProps} />);
    expect(component.text()).toContain("The Times");
  });

  afterEach(() => {
    global.Date.prototype.getTimezoneOffset = getTimezoneOffset; // eslint-disable-line no-extend-native
  });
}

describe("Date Publication test GMT timezone", () => {
  gmtTests(0, "dddd MMMM DD YYYY, hh:mma");
});

describe("Date Publication test non GMT timezone", () => {
  gmtTests(60, "dddd MMMM DD YYYY, hh:mma [GMT]");
});
