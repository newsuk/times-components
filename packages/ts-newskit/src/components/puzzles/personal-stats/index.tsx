import React, { FC } from 'react';
import { Block } from 'newskit';
import WaveBg from '../../../assets/WaveBg';
import { PersonalStatsItem } from './types';
import {
  PersonalStatisticsCard,
  PersonalStatisticsContainer,
  PersonalStatisticsItem,
  PersonalStatisticsLabel,
  PersonalStatisticsNumber
} from './styles';

interface PersonalStatsProps {
  data: PersonalStatsItem[];
}

export const PersonalStats: FC<PersonalStatsProps> = ({ data }) => {
  return (
    <Block as="section">
      <PersonalStatisticsContainer>
        <PersonalStatisticsCard>
          {data.map(({ value, label }) => (
            <PersonalStatisticsItem as="article">
              <PersonalStatisticsNumber as="span">
                {value}
              </PersonalStatisticsNumber>
              <PersonalStatisticsLabel as="span">
                {label}
              </PersonalStatisticsLabel>
            </PersonalStatisticsItem>
          ))}
        </PersonalStatisticsCard>
      </PersonalStatisticsContainer>
      <WaveBg fill="#FFBB6A" />
    </Block>
  );
};
