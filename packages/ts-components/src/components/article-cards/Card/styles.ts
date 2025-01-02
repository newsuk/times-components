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
  margin-block-start: 16px;

  //   @media (max-width: 767px) {
  //   &:not(:first-child) {
  //     margin-block-start: 0px;
  //   }

  //   &:first-child {
  //     margin-block-start: 16px;
  //   }
  // }

  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 1024px) {
    ${({ $numOfArticles }) =>
      $numOfArticles === 1 &&
      `
      display: flex;
      flex-direction: column;
      justify-content: center;
    `};
  }
`;

export const StyledText = styled.span<CardProps>`
  color: rgb(105, 105, 105);
  font-family: 'Times Digital W04 Regular';
  font-size: 14px;
  font-weight: 400;
  padding: 0.5px 0px;
  margin-block-start: 16px;
  line-height: 21px;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const StyledDivider = styled.hr`
  border-style: dashed;
  border-color: rgb(204, 204, 204);
  border-width: 1px 0px 0px;
  margin-block: 20px;

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
  color: rgb(1, 0, 13);

  @media (max-width: 1024px) {
    ${({ $numOfArticles }) =>
      $numOfArticles <= 2 &&
      `
      font-size: 24px;
      line-height: 27px;
    `};
  }

  @media (min-width: 1025px) {
    font-size: 28px;
    line-height: 31.5px;

    ${({ $numOfArticles }) =>
      $numOfArticles >= 3 &&
      `
      font-size: 20px;
      line-height: 22.5px;
    `};
  }
`;
