import React from "react";
import { Image } from "react-native";
import { shallow } from "enzyme";
import { iterator } from "@times-components/test-utils";
import { AuthorProfileHeadBase as AuthorProfileHeadBaseWithoutTracking } from "../src/author-profile-head-base";
import AuthorProfileHeadTwitter from "../src/author-profile-head-twitter";

export default () => {
  const headProps = {
    isLoading: false,
    jobTitle: "testJobTitle",
    onTwitterLinkPress: () => null,
    renderBiography: () => null,
    image: <Image />,
    renderName: () => null,
    twitter: "testTwitterHandle"
  };

  const tests = [
    {
      name: "should not re-render when twitter is changed",
      test: () => {
        const wrapper = shallow(
          <AuthorProfileHeadBaseWithoutTracking {...headProps} />
        );

        expect(wrapper.find("AuthorProfileHeadTwitter")).toMatchSnapshot();

        wrapper.setProps({
          twitter: "newTestTwitter"
        });

        expect(wrapper.find("AuthorProfileHeadTwitter")).toMatchSnapshot();
      }
    },
    {
      name: "should only re-render when isLoading is changed",
      test: () => {
        const wrapper = shallow(
          <AuthorProfileHeadBaseWithoutTracking {...headProps} />
        );

        expect(wrapper).toMatchSnapshot();

        wrapper.setProps({
          isLoading: true
        });

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "should handle the twitter link when pressed",
      test: () => {
        const mockOnPress = jest.fn();
        const twitterProps = {
          isLoading: false,
          onTwitterLinkPress: mockOnPress,
          twitter: "testTwitterHandle",
          url: "https://twitter.com/testTwitterHandle"
        };

        const wrapper = shallow(<AuthorProfileHeadTwitter {...twitterProps} />);

        wrapper.find("TextLink").simulate("press");

        expect(mockOnPress).toHaveBeenCalled();
      }
    }
  ];

  iterator(tests);
};
