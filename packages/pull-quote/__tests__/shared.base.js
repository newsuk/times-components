import React from "react";
import { shallow } from "enzyme";
import { iterator } from "@times-components/test-utils";
import PullQuotes from "../src/pull-quote";
import PullQuoteTwitterLink from "../src/pull-quote-twitter-link";
import testParagraph from "./fixtures/paragraph.json";

const content = ["Some content", testParagraph];
const caption = "A caption";
const text = "Some extra text";
const twitter = "@twitter";

export default renderComponent => {
  const tests = [
    {
      name: "with a caption and a text",
      test() {
        const output = renderComponent(
          <PullQuotes
            caption={caption}
            onTwitterLinkPress={() => null}
            renderedChildren={["Some content"]}
            text={text}
          >
            {content}
          </PullQuotes>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "with a caption but no text",
      test() {
        const output = renderComponent(
          <PullQuotes
            onTwitterLinkPress={() => null}
            renderedChildren={["Some content"]}
            text={text}
          >
            {content}
          </PullQuotes>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "with a text but no caption",
      test() {
        const output = renderComponent(
          <PullQuotes
            onTwitterLinkPress={() => null}
            renderedChildren={["Some content"]}
            text={text}
          >
            {content}
          </PullQuotes>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "without a caption or a text",
      test() {
        const output = renderComponent(
          <PullQuotes
            onTwitterLinkPress={() => null}
            renderedChildren={["Some content"]}
          >
            {content}
          </PullQuotes>
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
            onTwitterLinkPress={() => null}
            renderedChildren={["Some content"]}
            twitter={twitter}
          >
            {content}
          </PullQuotes>
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
            renderedChildren={["Some content"]}
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
