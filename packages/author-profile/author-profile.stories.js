import React from "react";
import { StyleSheet, View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from "@storybook/addon-actions";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import { withPageState } from "@times-components/pagination";
import {
  addTrackingContext,
  createConsoleReporter,
  tealiumTransformer
} from "@times-components/tracking";
import AuthorProfile, { AuthorProfileWithTracking } from "./author-profile";
import example from "./example.json";

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#f5efeb",
    alignItems: "center"
  },
  container: {
    backgroundColor: "#fff",
    alignSelf: "stretch"
  }
});

const story = m => (
  <View style={styles.background}>
    <View style={styles.container}>{m}</View>
  </View>
);

storiesOf("AuthorProfile", module)
  .add("AuthorProfile", () => {
    const props = {
      data: Object.assign({}, example, {
        count: example.articles.count,
        pageSize: 10,
        page: 1
      }),
      isLoading: false
    };

    props.data.articles.list.forEach(article => {
      // eslint-disable-next-line
      article.publishedTime = new Date(article.publishedTime);
    });

    return story(<AuthorProfile {...props} />);
  })
  .add("AuthorProfile Loading", () => {
    const props = {
      isLoading: true
    };

    return story(<AuthorProfile {...props} />);
  })
  .add("AuthorProfile Empty State", () => {
    const props = {
      isLoading: false
    };

    return story(<AuthorProfile {...props} />);
  })
  .add("AuthorProfile with tracking", () => {
    const props = {
      data: Object.assign({}, example, {
        count: example.articles.count,
        pageSize: 10,
        page: 1
      }),
      isLoading: false
    };

    props.data.articles.list.forEach(article => {
      // eslint-disable-next-line
      article.publishedTime = new Date(article.publishedTime);
    });

    const AuthProfileWithPageStateAndTracking = addTrackingContext(
      withPageState(AuthorProfileWithTracking),
      {
        attrs: {
          pageName: targetProps => `profile:${targetProps.data.name}`,
          name: targetProps => targetProps.data.name,
          siteArea: "profile",
          pageType: "listing"
        }
      }
    );

    const storybookReporter = action("analytics-event");
    const tealiumReporter = createConsoleReporter(tealiumTransformer);
    const log = e => {
      storybookReporter(e);
      tealiumReporter.analytics(e);
    };

    return story(
      <AuthProfileWithPageStateAndTracking {...props} analyticsStream={log} />
    );
  });
