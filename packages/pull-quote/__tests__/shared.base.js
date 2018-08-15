import React from "react";
import { shallow } from "enzyme";
import { iterator } from "@times-components/test-utils";
import PullQuotes from "../src/pull-quote";
import PullQuoteTwitterLink from "../src/pull-quote-twitter-link";

const content = "Some content";
const caption = "A caption";
const twitter = "@twitter";

export default renderComponent => {
  const tests = [
    {
      name: "with a caption",
      test() {
        const output = renderComponent(
          <PullQuotes
            caption={caption}
            content={content}
            onTwitterLinkPress={() => null}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "without a caption",
      test() {
        const output = renderComponent(
          <PullQuotes content={content} onTwitterLinkPress={() => null} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "with a twitter handle",
      test() {
        const output = renderComponent(
          <PullQuotes
            caption={caption}
            content={content}
            onTwitterLinkPress={() => null}
            twitter={twitter}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "twitter handle can be clicked",
      test() {
        const onTwitterLinkPressMock = jest.fn();

        const wrapper = shallow(
          <PullQuoteTwitterLink
            onTwitterLinkPress={onTwitterLinkPressMock}
            twitter={twitter}
          />
        );

        wrapper.find("TextLink").simulate("press", {});

        expect(onTwitterLinkPressMock).toHaveBeenCalled();
      }
    }
  ];

  iterator(tests);
};
