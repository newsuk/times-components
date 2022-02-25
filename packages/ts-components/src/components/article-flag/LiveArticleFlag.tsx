import React from 'react';
import {
  LiveArticleFlagContainer,
  LiveIconContainer,
  LiveArticleFlagText
} from './styles';
import { UpdatedTimestamp } from '../..';
import { useUpdatedTime } from '../../helpers/time/UpdatedTimeProvider';

export const BaseLiveArticleFlag: React.FC<{ title: string }> = ({ title }) => {
  const updatedTime = useUpdatedTime();

  return (
    <div>
      <LiveArticleFlagContainer>
      <LiveIconContainer>{'\u25a0'}</LiveIconContainer>
        <div>
          <LiveArticleFlagText>{title}</LiveArticleFlagText>
        </div>
      </LiveArticleFlagContainer>
      <UpdatedTimestamp updatedTime={updatedTime} />
    </div>
  )
};

export const LiveArticleFlag: React.FC = () => (
  <BaseLiveArticleFlag title="LIVE" />  
);

export const BreakingArticleFlag: React.FC = () => (
  <BaseLiveArticleFlag title="BREAKING" />
);
