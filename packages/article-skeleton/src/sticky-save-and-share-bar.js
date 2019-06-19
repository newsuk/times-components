import React from "react";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import Sticky from "@times-components/sticky";
import { breakpoints } from "@times-components/styleguide";
import {
  SaveShareContainer,
  SaveShareInnerContainer
} from "./styles/responsive";

function StickySaveAndShareBar(props) {
  const mql = window.matchMedia(`(max-width: ${breakpoints.huge}px)`);

  return (
    <Sticky Component={SaveShareContainer} shouldBeSticky={() => mql.matches}>
      <SaveShareInnerContainer>
        <SaveAndShareBar {...props} />
      </SaveShareInnerContainer>
    </Sticky>
  );
}

export default StickySaveAndShareBar;
