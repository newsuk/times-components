/* eslint-disable react/prop-types */
import React from "react";
import Responsive from "@times-components/responsive";
import storybookReporter from "@times-components/tealium-utils";
import KeyFacts from "./src/key-facts";

const renderKeyFacts = ({ ast }) => (
  <Responsive>
    <KeyFacts ast={ast} analyticsStream={storybookReporter} />
    <KeyFacts ast={ast} analyticsStream={storybookReporter} />
    <KeyFacts ast={ast} analyticsStream={storybookReporter} />
  </Responsive>
);

export default renderKeyFacts;
