import React from "react";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import Sticky from "@times-components/sticky";
import {
  SaveShareContainer,
  SaveShareInnerContainer
} from "./styles/responsive";

const StickySaveAndShareBar = ({ ...props }) => (
  <Sticky Component={SaveShareContainer}>
    <SaveShareInnerContainer>
      <SaveAndShareBar {...props} />
    </SaveShareInnerContainer>
  </Sticky>
);

export default StickySaveAndShareBar;
