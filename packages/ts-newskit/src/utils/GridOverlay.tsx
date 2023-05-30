import { Block, Cell, Grid, styled } from 'newskit'
import React from 'react'

const StyledGrid = styled(Grid)<{show?: boolean}>`
  display: ${({show}) => show ? 'flex' : 'none'};
  position: fixed;
  height: 100vh;
  width: 100%;
  text-align: center;
  top: 0;
  z-index: 1;
`
const StyledCellBlock = styled(Block)`
  background-color: rgba(0,0,0,0.1);
  height: 100%;
  width: 100%;
`

export const GridOverlay = ({ show }: { show?: boolean }) => {
  const cellsArray = [...Array(12).keys()]
  const cells = cellsArray.map(cell => (
    <Cell>
      <StyledCellBlock>{cell + 1}</StyledCellBlock>
    </Cell>
  ))

  return (
    <StyledGrid xsMargin="space045" mdMargin="space050" show={show}>
      {cells}
    </StyledGrid>
  )
}
