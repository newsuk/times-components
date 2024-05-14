import React from "react";
import styled, { css } from "styled-components";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import Sticky, {
  computeProgressStyles,
  selectors,
  mediaQuery
} from "@times-components/sticky";
import { breakpoints, colours, spacing } from "@times-components/ts-styleguide";
import { ServerClientRender } from "@times-components/utils";

const SaveShareContainer = styled.div`
  background-color: ${colours.functional.white};
  height: 60px;
  display: flex;
  align-items: center;

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

const SaveShareItem = styled.div`
  order: 3;
  & + & {
    margin-top: -1px !important;
  }

  @media (min-width: ${breakpoints.medium}px) {
    margin: 0 auto;
  }

  &:last-child {
    margin-bottom: ${spacing(2)};
  }

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }

  margin-left: ${spacing(2)};
  margin-right: ${spacing(2)};
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

const shouldBeSticky = mediaQuery(`(max-width: ${breakpoints.huge}px)`);

function StickySaveAndShareBar(props) {
  return (
    <SaveShareItem>
      <Sticky
        Component={SaveShareContainerWrapper}
        shouldBeSticky={shouldBeSticky}
      >
        <SaveAndShareBar {...props} />
      </Sticky>
    </SaveShareItem>
  );
}

export default StickySaveAndShareBar;
