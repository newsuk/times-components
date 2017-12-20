/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import {activatePreviewImage} from "../../image/activatePreviewImage";

export default () => {
  it("renders correctly", () => {
    const View = () => null;
    const TestView = activatePreviewImage(View);
    const tree = renderer
      .create(<TestView />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes props to wrapped component correctly", () => {
    const Component = ({something}) => (something);
    const TestView = activatePreviewImage(Component);
    const tree = renderer
      .create(<TestView something="hello world" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
};
