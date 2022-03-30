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
  timeStampColor?: string;
}> = ({ title, timeStampColor }) => {
  const updatedTime = useUpdatedTime();

  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', timeStampColor, 'live article flag')
console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')

  return (
    <LiveFlagAndTimestampContainer>
      <LiveArticleFlagContainer>
        <LiveIconContainer>{'\u25a0'}</LiveIconContainer>
        <div>
          <LiveArticleFlagText>{title}</LiveArticleFlagText>
        </div>
      </LiveArticleFlagContainer>
      <UpdatedTimestamp updatedTime={updatedTime} timeStampColor={timeStampColor} />
    </LiveFlagAndTimestampContainer>
  );
};

export const LiveArticleFlag: React.FC<{ timeStampColor?: string }> = ({ timeStampColor }) => (
  <BaseLiveArticleFlag timeStampColor={timeStampColor} title="LIVE" />
);

export const BreakingArticleFlag: React.FC<{ timeStampColor?: string }> = ({
  timeStampColor
}) => <BaseLiveArticleFlag timeStampColor={timeStampColor} title="BREAKING" />;
