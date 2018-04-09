import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import ModalImage from "../modal-image";

export default () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ModalImage uri="http://example.com/image.jpg" aspectRatio={3 / 2} />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("shows modal on click", () => {
    const component = shallow(
      <ModalImage uri="http://example.com/image.jpg" aspectRatio={3 / 2} />
    );

    const imageLink = component
      .dive()
      .find("Link")
      .at(1);

    imageLink.simulate("press");
    component.update();

    const modal = component.childAt(0);
    expect(modal.props().visible).toBe(true);
  });

  it("closes modal on click", () => {
    const component = shallow(
      <ModalImage uri="http://example.com/image.jpg" aspectRatio={3 / 2} />
    );
    component.setState({ showModal: true });

    const closeButton = component
      .dive()
      .find("Link")
      .at(0);
    closeButton.simulate("press");
    component.update();

    const modal = component.childAt(0);
    expect(modal.props().visible).toBe(false);
  });
};
