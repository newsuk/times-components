import React from "react";
import { create } from "react-test-renderer";
import withTrackingContext from "@times-components/tracking/__tests__/test-tracking-context";
import Button from "@times-components/button";

import NewsletterPuffButton from "../src/article-body/newsletter-puff-button";

export default () => {
  describe("NewsletterPuffButton", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("renders the button with the text `Sign up to newsletter`", () => {
      const mockedOnPress = jest.fn();

      const component = create(
        <NewsletterPuffButton
          updatingSubscription={false}
          onPress={mockedOnPress}
        />
      );

      expect(component).toMatchSnapshot();
      component.root.findByType(Button).props.onPress();
      expect(mockedOnPress).toHaveBeenCalledTimes(1);
    });

    it("renders the button with the text `Saving...`", () => {
      const mockedOnPress = jest.fn();

      const component = create(
        <NewsletterPuffButton
          updatingSubscription={true}
          onPress={mockedOnPress}
        />
      );

      component.root.findByType(Button).props.onPress();
      expect(component).toMatchSnapshot();
    });

    it("should track button clicks in analytics", () => {
      const analyticsStream = jest.fn();
      const onPress = jest.fn();
      const WithTrackingAndContext = withTrackingContext(NewsletterPuffButton);

      const testInstance = create(
        <WithTrackingAndContext
          updatingSubscription={false}
          onPress={onPress}
          analyticsStream={analyticsStream}
        />
      );

      testInstance.root.findByType(Button).props.onPress();

      expect(analyticsStream).toHaveBeenCalledWith({
        action: "onPress",
        attrs: {},
        component: "widget : puff : sign up to newsletter"
      });
    });
  });
};
