import { styled, getMediaQueryFromTheme } from 'newskit';

export const MainHeader = styled.header`
  left: 0;
  margin-left: auto;
  margin-right: auto;
  ${getMediaQueryFromTheme('md')} {
    margin-top: 0;
    width: 100%;
    position: relative;
    z-index: 3;
    max-width: 720px;
  }
  ${getMediaQueryFromTheme('lg')} {
    max-width: 984px;
  }
  ${getMediaQueryFromTheme('xl')} {
    max-width: 1142px;
  }
`;

export const Masthead = styled.div`
  display: none;
  ${getMediaQueryFromTheme('md')} {
    width: 100%;
    border-bottom: 1px solid #e4e4e4;
    text-align: center;
    display: block;
  }
`;
