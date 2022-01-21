import React from 'react';
import { colours } from '@times-components/styleguide';
import { LiveArticleFlag, BreakingArticleFlag } from './LiveArticleFlag';
import {
  ArticleFlagContainer,
  ArticleFlagBullet,
  ArticleFlagTextContainer,
  FlagPadding,
  Flags,
  FlagsContainer
} from './styles';
import getActiveFlags from './getActiveFlags';

const ArticleFlag: React.FC<{ color: string; title: string }> = ({
  color = colours.functional.primary,
  title
}) => (
  <ArticleFlagContainer>
    <ArticleFlagBullet color={color} />
    <ArticleFlagTextContainer
      aria-label={`${title} Flag`}
      color={color}
      data-testid={`flag-${title}`}
    >
      {title.toLowerCase()}
    </ArticleFlagTextContainer>
  </ArticleFlagContainer>
);

const NewArticleFlag: React.FC = () => (
  <ArticleFlag color={colours.functional.articleFlagNew} title="new" />
);

const UpdatedArticleFlag: React.FC = () => (
  <ArticleFlag color={colours.functional.articleFlagUpdated} title="updated" />
);

const ExclusiveArticleFlag: React.FC = () => (
  <ArticleFlag
    color={colours.functional.articleFlagExclusive}
    title="exclusive"
  />
);

const SponsoredArticleFlag: React.FC = () => (
  <ArticleFlag color={colours.functional.tertiary} title="sponsored" />
);

const LongReadArticleFlag: React.FC = () => (
  <ArticleFlag color={colours.functional.secondary} title="long read" />
);

const flagsMapping = () =>
  new Map([
    ['NEW', <NewArticleFlag />],
    ['LIVE', <LiveArticleFlag />],
    ['BREAKING', <BreakingArticleFlag />],
    ['UPDATED', <UpdatedArticleFlag />],
    ['EXCLUSIVE', <ExclusiveArticleFlag />],
    ['SPONSORED', <SponsoredArticleFlag />],
    ['LONGREAD', <LongReadArticleFlag />]
  ]);

export type FlagType = Array<{
  expiryTime: string | null;
  type: string;
}>;

const FlagsView: React.FC<{ allFlags: FlagType }> = ({ allFlags }) => {
  return (
    <Flags>
      {allFlags.map(flag => (
        <FlagPadding key={flag.type} allFlags={allFlags}>
          {flagsMapping().get(flag.type)}
        </FlagPadding>
      ))}
    </Flags>
  );
};

const ArticleFlags: React.FC<{
  flags: FlagType;
  longRead: boolean;
  withContainer: boolean;
}> = ({ flags = [], longRead = false, withContainer = false }) => {
  const activeFlags = getActiveFlags(flags);
  const allFlags = [
    ...activeFlags,
    ...(longRead ? [{ expiryTime: null, type: 'LONGREAD' }] : [])
  ];

  if (!allFlags.length) {
    return null;
  }

  if (!withContainer) {
    return <FlagsView allFlags={allFlags} />;
  }

  return (
    <FlagsContainer>
      <FlagsView allFlags={allFlags} />
    </FlagsContainer>
  );
};

export default ArticleFlag;

export {
  getActiveFlags,
  ArticleFlag,
  ArticleFlags,
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag,
  LongReadArticleFlag
};
