import React, { FC } from 'react'
import { Block, GridLayoutItem } from 'newskit'
import WaveBg from '../../../assets/WaveBg'
import { BreakoutSectionBtn, BreakoutSectionContainer, BreakoutSectionGridLayout, BreakoutSectionSubtitle, BreakoutSectionTitle, StyledSudokuIconA4, StyledSudokuIconD2, StyledSudokuIconD4 } from './styles';
import { BreakoutSectionItem } from './types'

interface BreakoutSectionProps {
  data: BreakoutSectionItem[];
}

export const BreakoutSection: FC<BreakoutSectionProps> = ({ data }) => {
  return (
    <Block as='section'>
      <BreakoutSectionContainer>
        <BreakoutSectionTitle as="h2">Add a challenge to your day</BreakoutSectionTitle>
        <BreakoutSectionSubtitle as="p">Play exclusive Word puzzles, Number puzzles, Quizzes and more</BreakoutSectionSubtitle>
        <BreakoutSectionGridLayout columns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} rowGap={{ xs: '20px', sm: '28px', md: '24px' }} columnGap={{ sm: '28px', md: '36px' }} overrides={{ marginBlockStart: { xs: '40px', sm: '44px', md: '52px' }, width: '100%', maxWidth: '1272px' }}>
            <StyledSudokuIconD2 />
            <StyledSudokuIconA4 />
            {data.map(({ id, title, url }) => (
                <GridLayoutItem id={id}>
                    <BreakoutSectionBtn size="medium" href={url} overrides={{ stylePreset: 'breakoutSectionBtn' }}>{title}</BreakoutSectionBtn>
                </GridLayoutItem>
            ))}
        </BreakoutSectionGridLayout>
        <StyledSudokuIconD4 />
      </BreakoutSectionContainer>
      <WaveBg fill="#FFBB6A" />
    </Block>
  )
}
