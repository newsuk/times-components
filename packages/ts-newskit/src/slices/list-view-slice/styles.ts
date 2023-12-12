import { Block, styled, getMediaQueryFromTheme } from 'newskit';

export const StyledBlock = styled(Block)`
  .lead-image-container {
    display: none;
  }

  ${getMediaQueryFromTheme('md')} {
    width: 579px;
    .lead-image-container {
      display: inline;
    }
  }
  ${getMediaQueryFromTheme('lg')} {
    width: 501px;
    .lead-image-container {
      display: inline;
    }
  }
  ${getMediaQueryFromTheme('xl')} {
    width: 683px;
    .lead-image-container {
      display: inline;
    }
  }
`;

export const StyledMainDivider = styled(Block)`
  ${getMediaQueryFromTheme('md')} {
    width: 719px;
  }
  ${getMediaQueryFromTheme('lg')} {
    width: 642px;
  }
  ${getMediaQueryFromTheme('xl')} {
    width: 840px;
  }
`;

export const StyledAdContainer = styled(Block)`
  ${getMediaQueryFromTheme('md')} {
    display: none;
  }
  ${getMediaQueryFromTheme('lg')} {
    display: inline;
  }
`;

export const StyledAdBlock = styled(Block)`
  height: 250px;
  width: 100%;
  background: #ff5858;
  margin: 16px 0 30px 0;
  font-size: 30px;
  ${getMediaQueryFromTheme('md')} {
    height: 250px;
    width: 100%;
    background: #ff5858;
    margin: 16px 0 30px 0;
    font-size: 30px;
  }
  ${getMediaQueryFromTheme('lg')} {
    display: none;
  }
`;
