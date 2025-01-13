import styled from 'styled-components';

interface HiddenProps {
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
}

export const Hidden = styled.div<HiddenProps>`
  ${({ xs }) =>
    xs &&
    `
    @media (max-width: 767px) {
      display: none;
}
  `}

  ${({ sm }) =>
    sm &&
    `
    @media (min-width: 768px) and (max-width: 1023px) {
      display: none;
    }
  `}

  ${({ md }) =>
    md &&
    `
    @media (min-width: 1024px) and (max-width: 1439px) {
      display: none;
    }
  `}

  ${({ lg }) =>
    lg &&
    `
    @media (min-width: 1440px) {
      display: none;
    }
  `}
`;

interface CardProps {
  $numOfArticles: number;
}
export const StyledCard = styled.div<CardProps>`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    position: relative;

    ${({ $numOfArticles }) =>
      $numOfArticles > 1 &&
      `
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
    `};
  }

  @media (min-width: 1024px) {
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

export const StyledMedia = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledPicture = styled.picture`
  display: block;
  width: 100%;
  height: auto;
`;

export const StyledImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: inline-block;
`;
export const StyledContent = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 375px) {
    &:nth-of-type(1) {
      margin-block-start: 16px;
    }

    &:not(:nth-of-type(1)) {
      margin-block-start: 0;
    }
  }

  @media (min-width: 768px) {
    margin-block-start: 16px;
  }

  @media (min-width: 1024px) {
    ${({ $numOfArticles }) =>
      $numOfArticles === 1 &&
      `
      display: flex;
      flex-direction: column;
      justify-content: center;
    `};
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    margin-block-start: 12px;
  }
`;

export const StyledText = styled.span<CardProps>`
  color: rgb(105, 105, 105);
  font-family: 'Times Digital W04 Regular';
  font-size: 1.4rem;
  font-weight: 400;
  padding: 0.5px 0px;
  margin-block-start: 20px;
  line-height: 2.1rem;
  letter-spacing: 0em;
  padding: 0.5px 0px;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const StyledDivider = styled.hr`
  border-style: dashed;
  border-color: #cccccc;
  border-width: 1px 0px 0px;
  margin-block: 20px;
  width: 100%;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const StyledLink = styled.a<CardProps>`
  font-weight: 700;
  font-family: 'Times Modern';
  font-size: 20px;
  line-height: 23px;
  text-decoration: none;
  color: #01000d;
  letter-spacing: 0em;
  padding: 0.5px 0px;
  font-stretch: normal;

  @media (max-width: 375px) {
    font-size: 1.25rem;
  }

  @media (max-width: 767px) {
    font-size: 2rem;
    line-height: 2.25rem;
  }

  @media (min-width: 1024px) {
    font-size: 2.8rem;
    line-height: 3.15rem;

    margin-block-start: 16px;

    ${({ $numOfArticles }) =>
      $numOfArticles >= 3 &&
      `
      font-size: 20px;
      line-height: 23px;
    `};
  }

  @media (min-width: 767px) and (max-width: 1023px) {
    font-size: 2.8rem;
    line-height: 3.15rem;

    margin-block-start: 16px;

    ${({ $numOfArticles }) =>
      $numOfArticles >= 2 &&
      `
      font-size: 20px;
      line-height: 23px;
    `};
  }
`;
