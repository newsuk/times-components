import { styled, getMediaQueryFromTheme } from 'newskit';

export const MainHeader = styled.header`
  left: 0;
  ${getMediaQueryFromTheme('md')} {
    margin-top: 0;
    width: 100%;
    position: relative;
    z-index: 3;
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
  }
  ${getMediaQueryFromTheme('lg')} {
    max-width: 984px;
    margin-left: auto;
    margin-right: auto;
  }
  ${getMediaQueryFromTheme('xl')} {
    max-width: 1142px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Masthead = styled.div`
  width: 100%;
  border-bottom: 1px solid #e4e4e4;
  text-align: center;
  display: block;
`;
