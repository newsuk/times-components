import { styled, getMediaQueryFromTheme, Stack } from 'newskit';

export const StyledIconWrapper = styled(Stack)`
  background: #feefd9;
  .puzzle-icon {
    height: auto;
    ${getMediaQueryFromTheme('xs')} {
      width: 75px;
    }
    ${getMediaQueryFromTheme('sm')} {
      width: 75px;
    }
    ${getMediaQueryFromTheme('md')} {
      width: 65px;
    }
    ${getMediaQueryFromTheme('lg')} {
      width: 82px;
    }
    ${getMediaQueryFromTheme('xl')} {
      width: 120px;
    }
  }
`;
