import React from 'react';
import {
  LiveArticleFlagContainer,
  LiveIconContainer,
  LiveArticleFlagText
} from './styles';
import { UpdatedTimestamp } from '../..';
import { UpdatedTimeProvider, useUpdatedTime } from '../../helpers/time/UpdatedTimeProvider';

export const BaseLiveArticleFlag: React.FC<{ title: string }> = ({ title }) => (
  <LiveArticleFlagContainer>
    <LiveIconContainer>{'\u25a0'}</LiveIconContainer>
    <div>
      <LiveArticleFlagText>{title}</LiveArticleFlagText>
    </div>
  </LiveArticleFlagContainer>
);

export const LiveArticleFlag: React.FC = () => {
  const updatedTime = useUpdatedTime();

  return (  
    <UpdatedTimeProvider updatedTime={updatedTime}>
      <BaseLiveArticleFlag title="LIVE" />
      <UpdatedTimestamp updatedTime={updatedTime} />
    </UpdatedTimeProvider>
)};

export const BreakingArticleFlag: React.FC = () => (
  <BaseLiveArticleFlag title="BREAKING" />
);
