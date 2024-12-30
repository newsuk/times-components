import styled from 'styled-components';

interface CardProps {
  $numOfArticles: number;
}

export const StyledCard = styled.div<CardProps>`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    /* Assuming 'md' is 768px */
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
    /* Assuming 'lg' is 1024px */
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

  @media (min-width: 768px) {
    display: block;
  }
`;

export const StyledDivider = styled.hr`
  border-style: dashed;

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
