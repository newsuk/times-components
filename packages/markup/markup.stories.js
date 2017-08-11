/* eslint-disable react/no-array-index-key */

import { View } from "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import Markup, { builder } from "./markup";

const multiParagraph = require("./fixtures/multi-paragraph.json").fixture;
const mixture = require("./fixtures/tag-mixture.json").fixture;
const bio = require("./fixtures/bio.json").fixture;

const copyParagraph = require("./fixtures/copy-paragraph.json").fixture;
const copyMultiFields = require("./fixtures/copy-multi-fields.json").fixture;
const copyKeyFacts = require("./fixtures/copy-key-facts.json").fixture;

const story = m => <View style={{ padding: 20 }}>{m}</View>;

storiesOf("Markup", module)
  .add("Multiple paragraphs", () => story(<Markup ast={multiParagraph} />))
  .add("Mixture of tags", () => story(<Markup ast={mixture} />))
  .add("Biography", () => story(<Markup ast={bio} wrapIn="p" />))
  .add("Multiple children with styling", () =>
    story(
      <View>
        {builder({ ast: multiParagraph }).map((el, i) =>
          <View style={{ margin: 10 }} key={`paragraph-${i}`}>
            {React.cloneElement(el, {
              style: { color: "red", fontFamily: "TimesModern-Bold" }
            })}
          </View>
        )}
      </View>
    )
  )
  .add("Multiple copy paragraphs", () => story(<Markup ast={copyParagraph} />))
  .add("Multiple copy key-facts", () => story(<Markup ast={copyKeyFacts} />))
  .add("Multiple copy fields", () => story(<Markup ast={copyMultiFields} />));
