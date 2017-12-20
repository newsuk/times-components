/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import Image from "../../image/image";
import { activatePreviewImage } from "../activatePreviewImage";

export default () => {
  it("renders ImageWithoutPreview without a context", () => {
    const tree = renderer
      .create(<Image uri="http://example.com/image.jpg" aspectRatio={3 / 2} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders ImageWithPreview if feature is activated", () => {
    const ImageWithContext = activatePreviewImage(Image);
    const tree = renderer
      .create(
        <ImageWithContext
          uri="http://example.com/image.jpg"
          aspectRatio={3 / 2}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
};
