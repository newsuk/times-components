import React from "react";
import { create } from "react-test-renderer";
import Button from "@times-components/button";
import mockDate from "mockdate";

import NewsletterPuffButton from "../src/article-body/newsletter-puff-button";

export default () => {
  describe("NewsletterPuffButton", () => {
    beforeEach(() => {
      mockDate.set(1514764800000, 0);
    });

    afterEach(() => {
      jest.clearAllMocks();
      mockDate.reset();
    });

    afterEach(() => {});

    it("renders the button with the text `Sign up to newsletter`", () => {
      const mockedOnPress = jest.fn();
      const mockedAnalyticsStream = jest.fn();

      const component = create(
        <NewsletterPuffButton
          analyticsStream={mockedAnalyticsStream}
          updatingSubscription={false}
          onPress={mockedOnPress}
          newsletterPuffName="RED BOX"
        />
      );

      expect(component).toMatchSnapshot();
      component.root.findByType(Button).props.onPress();
      expect(mockedOnPress).toHaveBeenCalledTimes(1);
    });

    it("renders the button with the text `Saving...`", () => {
      const mockedOnPress = jest.fn();
      const mockedAnalyticsStream = jest.fn();

      const component = create(
        <NewsletterPuffButton
          analyticsStream={mockedAnalyticsStream}
          updatingSubscription
          onPress={mockedOnPress}
          newsletterPuffName="RED BOX"
        />
      );

      component.root.findByType(Button).props.onPress();
      expect(component).toMatchSnapshot();
    });

    it("should track button viewed in analytics", () => {
      const mockedAnalyticsStream = jest.fn();
      const onPress = jest.fn();

      create(
        <NewsletterPuffButton
          updatingSubscription={false}
          onPress={onPress}
          analyticsStream={mockedAnalyticsStream}
          newsletterPuffName="RED BOX"
        />
      );

      expect(mockedAnalyticsStream.mock.calls).toMatchSnapshot();
    });

    it("should track button viewed and clicked in analytics", () => {
      const mockedAnalyticsStream = jest.fn();
      const onPress = jest.fn();

      const testInstance = create(
        <NewsletterPuffButton
          updatingSubscription={false}
          onPress={onPress}
          analyticsStream={mockedAnalyticsStream}
          newsletterPuffName="RED BOX"
        />
      );

      testInstance.root.findByType(Button).props.onPress();

      expect(mockedAnalyticsStream.mock.calls).toMatchSnapshot();
    });
  });
};
