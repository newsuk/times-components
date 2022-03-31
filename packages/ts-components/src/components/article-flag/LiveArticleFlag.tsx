import React from 'react';
import {
  LiveArticleFlagContainer,
  LiveIconContainer,
  LiveArticleFlagText,
  LiveFlagAndTimestampContainer
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
        <LiveIconContainer>{'\u25a0'}</LiveIconContainer>
        <div>
          <LiveArticleFlagText>{title}</LiveArticleFlagText>
        </div>
      </LiveArticleFlagContainer>
      <UpdatedTimestamp updatedTime={updatedTime} timeStampTextColor={timeStampTextColor} />
    </LiveFlagAndTimestampContainer>
  );
};

export const LiveArticleFlag: React.FC<{ color?: string }> = ({ color }) => (
  <BaseLiveArticleFlag timeStampTextColor={color} title="LIVE" />
);

export const BreakingArticleFlag: React.FC<{ color?: string }> = ({
  color
}) => <BaseLiveArticleFlag timeStampTextColor={color} title="BREAKING" />;
