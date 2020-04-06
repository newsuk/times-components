import React from "react";
import styled, { css } from "styled-components";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import Sticky, {
  computeProgressStyles,
  selectors,
  mediaQuery
} from "@times-components/sticky";
import { breakpoints, colours } from "@times-components/styleguide";
import { ServerClientRender } from "@times-components/utils";
import { ArticleKeylineItem } from "./keylines";

const SaveShareContainer = styled.div`
  background-color: ${colours.functional.white};
  height: 60px;

  ${props =>
    props.isClient && [
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
          box-shadow: 0 2px 5px 0 ${colours.functional.greyStickyBarBoxShadow};

          ${selectors.stickySizer(css`
            border-bottom-color: ${colours.functional
              .greyStickyBarBorderBottom};
          `)};
        `
      )
    ]};
`;

// This is to avoid transition styles being server side rendered which we
// do not need. They'll be quite large and are unnecessary on initial render
function SaveShareContainerWrapper(props) {
  return (
    <ServerClientRender
      client={() => <SaveShareContainer isClient {...props} />}
      server={() => <SaveShareContainer {...props} />}
    />
  );
}

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
        Component={SaveShareContainerWrapper}
        shouldBeSticky={shouldBeSticky}
      >
        <SaveAndShareBar {...props} />
      </Sticky>
    </StyledKeylineItem>
  );
}

export default StickySaveAndShareBar;
