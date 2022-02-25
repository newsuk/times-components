import React from 'react';
import {
  LiveArticleFlagContainer,
  LiveIconContainer,
  LiveArticleFlagText
} from './styles';

export const BaseLiveArticleFlag: React.FC<{ title: string }> = ({ title }) => (
  <LiveArticleFlagContainer>
    <LiveIconContainer>{'\u25a0'}</LiveIconContainer>
    <div>
      <LiveArticleFlagText>{title}</LiveArticleFlagText>
    </div>
  </LiveArticleFlagContainer>
);

export const LiveArticleFlag: React.FC = () => (
  <BaseLiveArticleFlag title="LIVE" />
);

export const BreakingArticleFlag: React.FC = () => (
  <BaseLiveArticleFlag title="BREAKING" />
);
