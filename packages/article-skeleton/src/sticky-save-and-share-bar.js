import React from "react";
import styled from "styled-components";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import Sticky, { STICKY_CLASS_NAME } from "@times-components/sticky";
import { breakpoints, colours } from "@times-components/styleguide";
import { ArticleKeylineItem } from "./keylines";

export const SaveShareContainer = styled.div`
  background-color: ${colours.functional.white};
  height: 60px;

  &.${STICKY_CLASS_NAME} {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
  }
`;

const shouldBeSticky = Sticky.mediaQuery(`(max-width: ${breakpoints.huge}px)`);

function StickySaveAndShareBar(props) {
  return (
    <ArticleKeylineItem>
      <Sticky Component={SaveShareContainer} shouldBeSticky={shouldBeSticky}>
        <SaveAndShareBar {...props} />
      </Sticky>
    </ArticleKeylineItem>
  );
}

export default StickySaveAndShareBar;
