import React from "react";
import { shallow } from "enzyme";
import { iterator } from "@times-components/test-utils";
import Image, { ModalImage } from "../src";

export default () => {
  const props = {
    aspectRatio: 3 / 2,
    uri: "http://example.com/image.jpg"
  };

  const tests = [
    {
      name: "prepend https schema",
      test: () => {
        const wrapper = shallow(
          <Image {...props} uri="//example.com/image.jpg" />
        );

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "image url with a correctly formatted query string",
      test: () => {
        const wrapper = shallow(<Image {...props} />);

        expect(wrapper.find("ImageBackground").props().source.uri).toEqual(
          "http://example.com/image.jpg?resize=1440"
        );
      }
    },
    {
      name: "data image url without a query string",
      test: () => {
        const dataUri =
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        const wrapper = shallow(<Image {...props} uri={dataUri} />);

        expect(wrapper.find("ImageBackground").props().source.uri).toEqual(
          dataUri
        );
      }
    },
    {
      name: "handle onPress event on the link",
      test: () => {
        const wrapper = shallow(<ModalImage {...props} />);
        const imageLink = wrapper
          .dive()
          .find("Link")
          .at(1);

        imageLink.simulate("press");
        wrapper.update();

        const modal = wrapper.childAt(0);

        expect(modal.props().visible).toBe(true);
      }
    },
    {
      name: "handle onPress event on the close button",
      test: () => {
        const wrapper = shallow(<ModalImage {...props} />);
        wrapper.setState({ showModal: true });

        const closeButton = wrapper
          .dive()
          .find("Link")
          .at(0);
        closeButton.simulate("press");
        wrapper.update();

        const modal = wrapper.childAt(0);

        expect(modal.props().visible).toBe(false);
      }
    },
    {
      name: "show as not loaded when first created",
      test: () => {
        const wrapper = shallow(<Image {...props} />);

        expect(wrapper.state("isLoaded")).toEqual(false);
      }
    },
    {
      name: "handle onload event",
      test: () => {
        const wrapper = shallow(<Image {...props} />);
        wrapper.instance().handleLoad();

        expect(wrapper.state("isLoaded")).toEqual(true);
      }
    },
    {
      name: "handle handlePreviewLoad event if it exists",
      test: () => {
        const wrapper = shallow(<Image {...props} />);
        const { handlePreviewLoad } = wrapper.instance();
        if (handlePreviewLoad) {
          handlePreviewLoad();

          expect(wrapper.state("isLoaded")).toEqual(true);
        }
      }
    }
  ];

  iterator(tests);
};
