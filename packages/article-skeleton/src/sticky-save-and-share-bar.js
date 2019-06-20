import React from "react";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import Sticky from "@times-components/sticky";
import { breakpoints } from "@times-components/styleguide";
import { OuterSaveShareContainer, SaveShareContainer } from "./styles/responsive";

function StickySaveAndShareBar(props) {
  const mql = typeof window !== 'undefined' && window.matchMedia(`(max-width: ${breakpoints.huge}px)`);

  return (
    <Sticky Component={OuterSaveShareContainer} shouldBeSticky={() => mql.matches}>
      <SaveShareContainer>
        <SaveAndShareBar {...props} />
      </SaveShareContainer>
    </Sticky>
  );
}

export default StickySaveAndShareBar;
