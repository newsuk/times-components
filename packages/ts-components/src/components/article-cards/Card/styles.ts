import {
  CardComposable,
  getMediaQueryFromTheme,
  CardContent,
  CardContentProps,
  CardComposableProps,
  CardMedia,
  TextBlock,
  TextBlockProps
} from 'newskit';
import styled from 'styled-components';

export const StyledCardComposable = styled(CardComposable)<
  CardComposableProps & { $numOfArticles: number }
>`
  display: flex;
  flex-direction: column;

  ${getMediaQueryFromTheme('md')} {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: -16px;
      width: 1px;
      height: 100%;
      background-color: #e4e4e4;
    }

    &:nth-of-type(4n),
    &:last-child {
      &::after {
        display: none;
      }
    }
  }

  ${getMediaQueryFromTheme('lg')} {
    ${({ $numOfArticles }) =>
      $numOfArticles === 1 &&
      `
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas: 'media content';
      column-gap: 32px;
    `};
  }
`;

export const StyledCardMedia = styled(CardMedia)`
  & > picture > img {
    display: inline;
  }
`;

export const StyledCardContent = styled(CardContent)<
  CardContentProps & { $numOfArticles: number }
>`
  ${getMediaQueryFromTheme('lg')} {
    ${({ $numOfArticles }) =>
      $numOfArticles === 1 &&
      `
      display: flex;
      flex-direction: column;
      justify-content: center;
    `};
  }
`;

export const StyledSummaryText = styled(TextBlock)<
  TextBlockProps & { $numOfArticles: number }
>`
  ${({ $numOfArticles }) =>
    $numOfArticles > 1 &&
    `
  display: none;
`} ${getMediaQueryFromTheme('md')} {
    display: block;
  }
`;
