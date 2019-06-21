import React from "react";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import Sticky from "@times-components/sticky";
import { breakpoints } from "@times-components/styleguide";
import {
  OuterSaveShareContainer,
  SaveShareContainer
} from "./styles/responsive";

const shouldBeSticky = Sticky.mediaQuery(`(max-width: ${breakpoints.huge}px)`);

function StickySaveAndShareBar(props) {
  return (
    <Sticky Component={OuterSaveShareContainer} shouldBeSticky={shouldBeSticky}>
      <SaveShareContainer>
        <SaveAndShareBar {...props} />
      </SaveShareContainer>
    </Sticky>
  );
}

export default StickySaveAndShareBar;
