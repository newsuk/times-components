/* eslint-disable react/prop-types */
import React from "react";
import Responsive from "@times-components/responsive";
import KeyFacts from "./src/key-facts";

const renderKeyFacts = ({ ast }) => (
  <Responsive>
    <KeyFacts ast={ast} onLinkPress={() => {}} />
  </Responsive>
);

export default renderKeyFacts;
