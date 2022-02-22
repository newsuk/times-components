/* eslint-disable react/prop-types */
import React from "react";
import Responsive from "@times-components/responsive";
import KeyFacts from "./src/key-facts";
import storybookReporter from "@times-components/tealium-utils";

const renderKeyFacts = ({ ast }) => (
  <Responsive>
    <KeyFacts ast={ast} analyticsStream={storybookReporter} />
  </Responsive>
);

export default renderKeyFacts;
