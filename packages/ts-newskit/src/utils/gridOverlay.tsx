// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

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
    <StyledCell key={cell}>
      <StyledCellBlock>{cell + 1}</StyledCellBlock>
    </StyledCell>
  ));

  return (
    <StyledGrid xsMargin="space045" mdMargin="space050" show={show}>
      {cells}
    </StyledGrid>
  );
};
