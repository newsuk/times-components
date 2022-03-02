import React from 'react';
import {
  LiveArticleFlagContainer,
  LiveIconContainer,
  LiveArticleFlagText,
  LiveFlagAndTimestampContainer
} from './styles';
import { UpdatedTimestamp } from '../updated-timestamp/UpdatedTimestamp';
import { useUpdatedTime } from '../../helpers/time/UpdatedTimeProvider';

export const BaseLiveArticleFlag: React.FC<{ title: string }> = ({ title }) => {
  const updatedTime = useUpdatedTime();

  return (
    <LiveFlagAndTimestampContainer>
      <LiveArticleFlagContainer>
        <LiveIconContainer>{'\u25a0'}</LiveIconContainer>
        <div>
          <LiveArticleFlagText>{title}</LiveArticleFlagText>
        </div>
      </LiveArticleFlagContainer>
      <UpdatedTimestamp updatedTime={updatedTime} />
    </LiveFlagAndTimestampContainer>
  );
};

export const LiveArticleFlag: React.FC = () => (
  <BaseLiveArticleFlag title="LIVE" />
);

export const BreakingArticleFlag: React.FC = () => (
  <BaseLiveArticleFlag title="BREAKING" />
);
