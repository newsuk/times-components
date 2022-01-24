import React from 'react';
import {
  LiveArticleFlagContainer,
  LiveDiamondContainer,
  LiveArticleFlagTextContainer
} from './styles';

export const BaseLiveArticleFlag: React.FC<{ title: string }> = ({ title }) => (
  <LiveArticleFlagContainer>
    <LiveDiamondContainer>{'\u25c6'}</LiveDiamondContainer>
    <LiveArticleFlagTextContainer>{title}</LiveArticleFlagTextContainer>
  </LiveArticleFlagContainer>
);

export const LiveArticleFlag: React.FC = () => (
  <BaseLiveArticleFlag title="LIVE" />
);

export const BreakingArticleFlag: React.FC = () => (
  <BaseLiveArticleFlag title="BREAKING" />
);
