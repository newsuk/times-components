import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1144px;
  margin: 0 auto;
  padding-block-end: 24px;
  padding-inline: 10px;

  @media (min-width: 1024px) {
    padding: 20px;
  }
  @media (min-width: 768px) {
    padding: 24px;
  }
`;

export const Title = styled.span`
  display: block;
  margin-block: 24px;
  font-family: 'Arial, sans-serif';
  font-size: 24px;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 28px;
    margin-bottom: 30px;
  }

  @media (min-width: 1024px) {
    font-size: 32px;
  }

  @media (max-width: 767px) {
    margin-block: 20px;
  }
`;

export const Grid = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  gap: 20px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 0px;
  }

  @media (min-width: 768px) {
    gap: 32px;
  }
`;

export const Divider = styled.hr`
  border: 2px solid #01000d;
  align-self: stretch;
`;
