import React from "react";
import { shallow } from "enzyme";
import { AuthorProfileHeadBase as AuthorProfileHeadBaseWithoutTracking } from "../src/author-profile-head-base";
import AuthorProfileHeadTwitter from "../src/author-profile-head-twitter";

export default () => {
  const headProps = {
    isLoading: false,
    jobTitle: "testJobTitle",
    onTwitterLinkPress: () => null,
    renderBiography: () => null,
    renderImage: () => null,
    renderName: () => null,
    twitter: "testTwitterHandle"
  };

  it("should not re-render when twitter is changed", () => {
    const wrapper = shallow(
      <AuthorProfileHeadBaseWithoutTracking {...headProps} />
    );

    expect(wrapper.find("AuthorProfileHeadTwitter")).toMatchSnapshot(
      "1. Should not re-render when twitter prop is changed"
    );

    wrapper.setProps({
      twitter: "newTestTwitter"
    });

    expect(wrapper.find("AuthorProfileHeadTwitter")).toMatchSnapshot(
      "2. Should not re-render when twitter prop is changed"
    );
  });

  it("should only re-render when isLoading is changed", () => {
    const wrapper = shallow(
      <AuthorProfileHeadBaseWithoutTracking {...headProps} />
    );

    expect(wrapper).toMatchSnapshot(
      "3. Should re-render when isLoading prop is changed"
    );

    wrapper.setProps({
      isLoading: true
    });

    expect(wrapper).toMatchSnapshot(
      "4. Should re-render when isLoading prop is changed"
    );
  });

  const mockOnPress = jest.fn();
  const twitterProps = {
    isLoading: false,
    onTwitterLinkPress: mockOnPress,
    twitter: "testTwitterHandle",
    url: "https://twitter.com/testTwitterHandle"
  };

  it("should handle the twitter link when pressed", () => {
    const wrapper = shallow(<AuthorProfileHeadTwitter {...twitterProps} />);

    wrapper.find("TextLink").simulate("press");

    expect(mockOnPress).toHaveBeenCalled();
  });
};
