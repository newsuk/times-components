import React from 'react';
import {
  LiveArticleFlagContainer,
  LiveArticleFlagText,
  LiveFlagAndTimestampContainer,
  LiveArticleFlagIconContainer,
  LiveArticleFlagIcon
} from './styles';
import { UpdatedTimestamp } from '../updated-timestamp/UpdatedTimestamp';
import { useUpdatedTime } from '../../helpers/time/UpdatedTimeProvider';

export const BaseLiveArticleFlag: React.FC<{
  title: string;
  timeStampTextColor?: string;
}> = ({ title, timeStampTextColor }) => {
  const updatedTime = useUpdatedTime();

  return (
    <LiveFlagAndTimestampContainer>
      <LiveArticleFlagContainer>
        <LiveArticleFlagIconContainer>
          <LiveArticleFlagIcon />
        </LiveArticleFlagIconContainer>
        <LiveArticleFlagText>{title}</LiveArticleFlagText>
      </LiveArticleFlagContainer>
      <UpdatedTimestamp updatedTime={updatedTime} color={timeStampTextColor} />
    </LiveFlagAndTimestampContainer>
  );
};

export const LiveArticleFlag: React.FC<{ color?: string }> = ({ color }) => (
  <BaseLiveArticleFlag timeStampTextColor={color} title="LIVE" />
);

export const BreakingArticleFlag: React.FC<{ color?: string }> = ({
  color
}) => <BaseLiveArticleFlag timeStampTextColor={color} title="BREAKING" />;
