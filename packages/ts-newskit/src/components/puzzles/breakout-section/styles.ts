import { Block, TextBlock, GridLayout, Button, styled, getMediaQueryFromTheme, BlockProps, TextBlockProps, ButtonProps } from 'newskit'
import SudokuIconD4 from '../../../assets/SudokuIconD4'
import SudokuIconD2 from '../../../assets/SudokuIconD2'
import SudokuIconA4 from '../../../assets/SudokuIconA4'
import { GridLayoutProps } from 'newskit/cjs/grid-layout/types'

export const BreakoutSectionContainer = styled(Block)<BlockProps> `
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 24px 40px 20px;
    background-color: #ffbb6a;

    ${getMediaQueryFromTheme('md')} {
        padding: 40px 28px 40px 24px;
    }
`

export const BreakoutSectionTitle = styled(TextBlock)<TextBlockProps> `
    font-size: 24px;
    font-weight: 800;
    line-height: 36px;
    text-align: center;
    color: #1d1d1b;

    ${getMediaQueryFromTheme('sm')} {
        font-size: 28px;
    }
`

export const BreakoutSectionSubtitle = styled(TextBlock)<TextBlockProps> `
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
    color: #1d1d1b;
`

export const BreakoutSectionGridLayout = styled(GridLayout)<GridLayoutProps> `
    position: relative;
`

export const BreakoutSectionBtn = styled(Button)<ButtonProps> `
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
    gap: 16px;
    border: 4px solid #01000d;
    border-radius: 0;
    background-color: #ffffff;
    box-shadow: 4px 4px 0 #01000d;
    z-index: 2;

    ${getMediaQueryFromTheme('sm')} {
        flex-direction: row;
        gap: 40px;
    }
`

export const StyledSudokuIconD4 = styled(SudokuIconD4) `
  position: absolute;
  bottom: -21px;
`

export const StyledSudokuIconD2 = styled(SudokuIconD2) `
  position: absolute;
  top: -39px;
  left: -4px;
`

export const StyledSudokuIconA4 = styled(SudokuIconA4) `
  position: absolute;
  top: -44px;
  right: -2px;
`