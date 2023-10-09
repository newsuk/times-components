import { Modal, styled, getMediaQueryFromTheme } from 'newskit';

export const StyledModal = styled(Modal)`
  ${getMediaQueryFromTheme('xs')} {
    bottom: 0;
  }
  ${getMediaQueryFromTheme('sm')} {
    bottom: 0;
  }
  ${getMediaQueryFromTheme('md')} {
    bottom: auto;
  }
`;
