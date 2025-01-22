import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1144px;
  margin: 0 auto;
  padding-block-end: 24px;

  @media (max-width: 767px) {
    padding-inline: 10px;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    padding-inline: 24px;
  }

  @media (min-width: 1024px) and (max-width: 1319px) {
    padding-inline: 20px;
  }
`;

export const Title = styled.span`
  display: block;
  margin-block: 24px 23px;
  font-family: 'Times Modern';
  font-size: 2.4rem;
  font-weight: 800;
  color: #01000d;
  letter-spacing: 0em;

  &::before {
    display: block;
    content: '';
    margin-top: -0.2035em;
  }

  &::after {
    display: block;
    content: '';
    margin-top: -0.2215em;
  }

  @media (min-width: 768px) {
    font-size: 2.8rem;
    line-height: 3.15rem;
  }

  @media (max-width: 767px) {
    margin-block: 20px 19px;
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
  border-bottom: 1px solid #01000d;
  border-top: 0px;
  margin: 0px;
  align-self: stretch;
  border-radius: 0px;

  @media (max-width: 767px) {
    border-bottom: 3px solid rgb(1, 0, 13);
  }
`;
