import styled from 'styled-components';

export const MainHeader = styled.header`
  left: 0;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 768px) {
    margin-top: 0;
    width: 100%;
    position: relative;
    z-index: 3;
    max-width: 720px;
  }
  @media (min-width: 1024px) {
    max-width: 984px;
  }
  @media (min-width: 1320px) {
    max-width: 1142px;
  }
`;

export const Masthead = styled.div`
  display: none;
  @media (min-width: 768px) {
    width: 100%;
    border-bottom: 1px solid #e4e4e4;
    text-align: center;
    display: block;
  }
`;
