import { Block, Cell, Grid, styled } from 'newskit';
import React from 'react';

const StyledGrid = styled(Grid)<{ show?: boolean }>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: fixed;
  height: 100vh;
  text-align: center;
  top: 0;
  z-index: 1;
  & {
    margin: 0;
    width: 100%;
  }
`;
const StyledCellBlock = styled(Block)`
  background-color: rgba(0, 0, 0, 0.1);
  height: 100%;
  width: 100%;
`;

const StyledCell = styled(Cell)`
  & {
    padding: 0 16px;
    width: 100%;
  }
`;

export const GridOverlay = ({ show }: { show?: boolean }) => {
  const cellsArray = [...Array(12).keys()];
  const cells = cellsArray.map(cell => (
    <StyledCell>
      <StyledCellBlock>{cell + 1}</StyledCellBlock>
    </StyledCell>
  ));

  return (
    <StyledGrid xsMargin="space045" mdMargin="space050" show={show}>
      {cells}
    </StyledGrid>
  );
};
