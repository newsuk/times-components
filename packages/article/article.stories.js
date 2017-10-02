/* eslint-env browser */
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { Platform } from "react-native";
import Article from "./article";

const fullArticleFixture = require("./fixtures/full-article.json");
const articleFixtureNoStandfirst = require("./fixtures/no-standfirst.json");
const articleFixtureNoLabel = require("./fixtures/no-label.json");
const articleFixtureNoAds = require("./fixtures/no-ads.json");
const articleFixtureNoFlags = require("./fixtures/no-flags.json");
const articleFixtureNoStandfirstNoLabel = require("./fixtures/no-standfirst-no-label.json");
const articleFixtureNoStandfirstNoFlags = require("./fixtures/no-standfirst-no-flags.json");
const articleFixtureNoLabelNoFlags = require("./fixtures/no-label-no-flags.json");
const articleFixtureNoLabelNoFlagsNoStandFirst = require("./fixtures/no-label-no-flags-no-standfirst.json");

storiesOf("Article", module)
  .add("Fixtures - Full", () => {
    // Hack, render ads inside storybook's iframe
    if (Platform.OS === "web") {
      return (
        <div>
          <a
            href={`/iframe.html${window.top.location.search}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Click to render the ads
          </a>
          <Article {...fullArticleFixture} />
        </div>
      );
    }
    return <Article {...fullArticleFixture} />;
  })
  .add("Fixtures - No ads", () => <Article {...articleFixtureNoAds} />)
  .add("Fixtures - No standfirst", () => (
    <Article {...articleFixtureNoStandfirst} />
  ))
  .add("Fixtures - No label", () => <Article {...articleFixtureNoLabel} />)
  .add("Fixtures - No flags", () => <Article {...articleFixtureNoFlags} />)
  .add("Fixtures - No standfirst, no label", () => (
    <Article {...articleFixtureNoStandfirstNoLabel} />
  ))
  .add("Fixtures - No standfirst, no flags", () => (
    <Article {...articleFixtureNoStandfirstNoFlags} />
  ))
  .add("Fixtures - No label, no flags", () => (
    <Article {...articleFixtureNoLabelNoFlags} />
  ))
  .add("Fixtures - No label, no flags, no standfirst", () => (
    <Article {...articleFixtureNoLabelNoFlagsNoStandFirst} />
  ));
