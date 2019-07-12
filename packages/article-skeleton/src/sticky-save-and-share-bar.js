import React from "react";
import styled, { css } from "styled-components";
import { rgba } from "polished";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import Sticky, {
  computeProgressStyles,
  selectors,
  mediaQuery
} from "@times-components/sticky";
import { breakpoints, colours } from "@times-components/styleguide";
import { ArticleKeylineItem } from "./keylines";

export const SaveShareContainer = styled.div`
  background-color: ${colours.functional.white};
  height: 60px;

  ${[
    selectors.sizer(css`
      border-bottom: 1px solid transparent;
      will-change: border-bottom-color;
    `),
    selectors.sticky(css`
      will-change: height, box-shadow;
    `),
    computeProgressStyles(
      progress => css`
        height: ${60 - progress * 10}px;
        box-shadow: 0 2px 5px 0 ${rgba(0, 0, 0, 0.2 * progress)};

        ${selectors.stickySizer(css`
          border-bottom-color: ${rgba(
            colours.functional.keyline,
            Math.max(0, 1 - 2 * progress)
          )};
        `)};
      `
    )
  ]};
`;

const StyledKeylineItem = styled(ArticleKeylineItem)`
  ${selectors.containsSticky(css`
    border-bottom-color: transparent;
  `)};
`;

const shouldBeSticky = mediaQuery(`(max-width: ${breakpoints.huge}px)`);

function StickySaveAndShareBar(props) {
  return (
    <StyledKeylineItem>
      <Sticky
        Component={SaveShareContainer}
        shouldBeSticky={shouldBeSticky}
        outDelay={150}
      >
        <SaveAndShareBar {...props} />
      </Sticky>
    </StyledKeylineItem>
  );
}

export default StickySaveAndShareBar;
