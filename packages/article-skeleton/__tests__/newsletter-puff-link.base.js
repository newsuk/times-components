import React from "react";
import { create } from "react-test-renderer";
import Link from "@times-components/link";
import mockDate from "mockdate";

import NewsletterPuffLink from "../src/article-body/newsletter-puff-link";

export default () => {
  describe("NewsletterPuffLink", () => {
    beforeEach(() => {
      mockDate.set(1514764800000, 0);
    });

    afterEach(() => {
      jest.clearAllMocks();
      mockDate.reset();
    });

    afterEach(() => {});

    it("renders the link with the text `Manage preferences here`", () => {
      const mockedOnPress = jest.fn();
      const mockedAnalyticsStream = jest.fn();

      const component = create(
        <NewsletterPuffLink
          analyticsStream={mockedAnalyticsStream}
          onPress={mockedOnPress}
        />
      );

      expect(component).toMatchSnapshot();
    });

    it("should track link viewed in analytics", () => {
      const mockedAnalyticsStream = jest.fn();
      const onPress = jest.fn();

      create(
        <NewsletterPuffLink
          onPress={onPress}
          analyticsStream={mockedAnalyticsStream}
        />
      );

      expect(mockedAnalyticsStream.mock.calls).toMatchSnapshot({});
    });

    it("should track link viewed and clicked in analytics", () => {
      const mockedAnalyticsStream = jest.fn();
      const onPress = jest.fn();

      const testInstance = create(
        <NewsletterPuffLink
          onPress={onPress}
          analyticsStream={mockedAnalyticsStream}
        />
      );

      testInstance.root.findByType(Link).props.onPress();

      expect(mockedAnalyticsStream.mock.calls).toMatchSnapshot({});
    });
  });
};
