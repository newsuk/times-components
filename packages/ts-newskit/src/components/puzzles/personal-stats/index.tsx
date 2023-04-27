import React, { FC } from 'react';
import { Block, GridLayout, GridLayoutItem, TextBlock } from 'newskit';
import { PersonalStatsItem } from './types';
import {
  PersonalStatisticsCard,
  PersonalStatisticsContainer,
  StyledNewskitWaveBg
} from './styles';

interface PersonalStatsProps {
  data: PersonalStatsItem[];
}

export const PersonalStats: FC<PersonalStatsProps> = ({ data }) => {
  return (
    <Block as="section">
      <PersonalStatisticsContainer
        flow="vertical-stretch"
        paddingBlock="space045"
        paddingInlineStart="space045"
        paddingInlineEnd="space050"
      >
        <PersonalStatisticsCard
          columns={{ sm: 'repeat(3, max-content)' }}
          rowGap="space040"
          columnGap="space070"
          overrides={{
            paddingBlock: 'space060',
            paddingInline: 'space060',
            marginInline: 'auto',
            width: '100%',
            maxWidth: '613px'
          }}
          justifyContent="center"
        >
          {data.map(({ value, label }) => (
            <GridLayout
              as="article"
              columns={{ xs: 'auto auto', sm: 'auto' }}
              columnGap="space040"
              rowGap="space040"
              alignItems="center"
              justifyContent="center"
            >
              <GridLayoutItem justifySelf="center">
                <TextBlock
                  as="span"
                  typographyPreset="editorialDisplay004"
                  stylePreset="inkContrast"
                >
                  {value}
                </TextBlock>
              </GridLayoutItem>
              <GridLayoutItem justifySelf="center">
                <TextBlock
                  as="span"
                  typographyPreset="utilityLabel020"
                  stylePreset="inkSubtle"
                >
                  {label}
                </TextBlock>
              </GridLayoutItem>
            </GridLayout>
          ))}
        </PersonalStatisticsCard>
      </PersonalStatisticsContainer>
      <StyledNewskitWaveBg />
    </Block>
  );
};
