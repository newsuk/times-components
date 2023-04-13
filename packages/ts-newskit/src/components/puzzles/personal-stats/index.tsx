import React, { FC } from 'react';
import {
  Block,
  TextBlock,
  BlockProps,
  TextBlockProps,
  styled,
  getMediaQueryFromTheme
} from 'newskit';
import WaveBg from '../../../assets/WaveBg';

type PersonalStatsItem = {
  label: string;
  value: number;
};

interface PersonalStatsProps {
  data: PersonalStatsItem[];
}

const PersonalStatisticsContainer = styled(Block)<BlockProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 28px 20px 20px;
  background-color: #ffbb6a;
`;

const PersonalStatisticsCard = styled(Block)<BlockProps>`
  max-width: 613px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  gap: 16px;
  border: 2px solid #000000;
  background-color: #ffffff;
  box-shadow: 8px 8px 0 #000000;

  ${getMediaQueryFromTheme('sm')} {
    flex-direction: row;
    gap: 40px;
  }
`;

const PersonalStatisticsItem = styled(Block)<BlockProps>`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const PersonalStatisticsNumber = styled(TextBlock)<TextBlockProps>`
  font-size: 28px;
  font-weight: 800;
  line-height: 36px;
  color: #1d1d1b;
`;

const PersonalStatisticsLabel = styled(TextBlock)<TextBlockProps>`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #696969;
`;

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
