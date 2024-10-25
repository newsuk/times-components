import styled from 'styled-components';
import ChevronIcon from './assets/ChevronIcon';

export const ChevronRightIcon = styled(ChevronIcon)`
  transform: rotate(90deg);
  width: 16px;
  height: 16px;
`;

export const Container = styled.div`
  padding-top: 12px;
  border-style: solid none none none;
  border-width: 3px;
  border-color: #c05729;
`;

export const Description = styled.p`
  display: block;
  font-family: 'Roboto';
  font-weight: 400;
  line-height: 1.5;
  font-size: 1.4rem;
  letter-spacing: 0em;
  margin: 7px 0 4px;
`;

export const Divider = styled.hr`
  margin: 16px 0;
  border-style: dashed none none none;
  border-width: 1px;
  border-color: #01000d;
  &:first-of-type {
    margin-top: 11px;
  }
`;

export const Link = styled.a`
  display: block;
  text-decoration: none;

  &:hover {
    button {
      background-color: #e4e4e4;
    }
    h3 {
      color: #00527a;
    }
  }
  h3 {
    color: #c05729;
  }
`;

export const TitleIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.h3`
  font-family: 'Times Modern';
  font-weight: 800;
  line-height: 1.125;
  font-size: 1.8rem;
  letter-spacing: 0em;
  margin: 2px 0 0;
`;

export const ChevronButton = styled.button`
  background-color: #eeeeee;
  color: #c05729;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ItemTitle = styled.p`
  font-family: 'Times Modern';
  font-weight: 400;
  line-height: 1;
  font-size: 1.6rem;
  letter-spacing: 0em;
  margin: 12px 0;
`;

export const PuzzleContainer = styled.a`
  display: flex;
  align-items: center;
  margin-top: 16px;
  text-decoration: none;
  color: #01000d;

  :hover {
    color: #00527a;
  }
`;

export const PuzzleImage = styled.img`
  height: 40px;
  width: 40px;
  margin: 0 16px 0 0;
`;
