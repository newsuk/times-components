import React from 'react';
import {
  LiveArticleFlagContainer,
  LiveDiamondContainer,
  LiveArticleFlagText
} from './styles';

export const BaseLiveArticleFlag: React.FC<{ title: string }> = ({ title }) => (
  <LiveArticleFlagContainer>
    <LiveDiamondContainer>{'\u25a0'}</LiveDiamondContainer>
    <div>
      <LiveArticleFlagText>
      {title}
      </LiveArticleFlagText>
    </div>
  </LiveArticleFlagContainer>
);

export const LiveArticleFlag: React.FC = () => (
  <BaseLiveArticleFlag title="LIVE" />
);

export const BreakingArticleFlag: React.FC = () => (
  <BaseLiveArticleFlag title="BREAKING" />
);
