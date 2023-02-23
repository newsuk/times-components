import { styled, getMediaQueryFromTheme } from 'newskit';

export const MainHeader = styled.header`
  width: 100%;
  ${getMediaQueryFromTheme('md')} {
    margin-left: auto;
    margin-right: auto;
  }
  ${getMediaQueryFromTheme('lg')} {
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
