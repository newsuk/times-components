import React from "react";
import BaseLabel from "./article-header-label.base";
import { LabelContainer } from "../styles/article-header/responsive";

export default BaseLabel((props, label) => (
  <LabelContainer {...props}>{label}</LabelContainer>
));
