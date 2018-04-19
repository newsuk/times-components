import React from "react";
import { shallow } from "enzyme";

import BrightcoveVideo from "../../src/brightcove-video";
import shared from "../shared";


import { defaultVideoProps } from "../shared";

describe("BrightcoveVideo on ios", () => {
  shared();

  it("calls onVideoPress when the component is pressed", () => {
    onVideoPress = jest.fn();
    const component = shallow(<BrightcoveVideo {...defaultVideoProps} onVideoPress={onVideoPress} />);
    expect(onVideoPress).not.toHaveBeenCalled();
    component.simulate("press");
    expect(onVideoPress).toHaveBeenCalled();
  });

  it("does not crash if not given an onVideoPress handler", () => {
    const component = shallow(<BrightcoveVideo {...defaultVideoProps} onVideoPress={undefined} />);
    component.simulate("press");
  });
});
