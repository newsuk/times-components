import React, { Fragment } from "react";
import Gradient from "@times-components-native/gradient";
import styles from "./styles";

export default () => (
  <Fragment>
    <Gradient degrees={264} style={[styles.headerContainer]} />
    <Gradient degrees={267} style={[styles.textContainer]} />
    <Gradient degrees={267} style={[styles.textContainer]} />
    <Gradient degrees={267} style={[styles.textContainer, styles.lastBar]} />
  </Fragment>
);
