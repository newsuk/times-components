import React from 'react';
import { colours } from '@times-components/ts-styleguide';
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

const ArticleFlag: React.FC<{ color?: string; title: string }> = ({
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

const NewArticleFlag: React.FC<{ color?: string }> = ({
  color = colours.functional.articleFlagNew
}) => <ArticleFlag color={color} title="new" />;

const UpdatedArticleFlag: React.FC<{ color?: string }> = ({
  color = colours.functional.articleFlagUpdated
}) => <ArticleFlag color={color} title="updated" />;

const ExclusiveArticleFlag: React.FC<{ color?: string }> = ({
  color = colours.functional.articleFlagExclusive
}) => <ArticleFlag color={color} title="exclusive" />;

const SponsoredArticleFlag: React.FC<{ color?: string }> = ({
  color = colours.functional.tertiary
}) => <ArticleFlag color={color} title="sponsored" />;

const LongReadArticleFlag: React.FC<{ color?: string }> = ({
  color = colours.functional.secondary
}) => <ArticleFlag color={color} title="long read" />;

const flagsMapping = (override = '') => {
  let colourProp;
  if (override !== '') {
    colourProp = {
      color: override
    };
  }

  return new Map([
    ['NEW', <NewArticleFlag {...colourProp} />],
    ['LIVE', <LiveArticleFlag {...colourProp} />],
    ['BREAKING', <BreakingArticleFlag {...colourProp} />],
    ['UPDATED', <UpdatedArticleFlag {...colourProp} />],
    ['EXCLUSIVE', <ExclusiveArticleFlag {...colourProp} />],
    ['SPONSORED', <SponsoredArticleFlag {...colourProp} />],
    ['LONGREAD', <LongReadArticleFlag {...colourProp} />]
  ]);
};

export type FlagType = Array<{
  expiryTime: string | null;
  type: string;
}>;

const FlagsView: React.FC<{ allFlags: FlagType; overrideColor?: string }> = ({
  allFlags,
  overrideColor = ''
}) => {
  return (
    <Flags>
      {allFlags.map(flag => (
        <FlagPadding key={flag.type} allFlags={allFlags}>
          {flagsMapping(overrideColor).get(flag.type)}
        </FlagPadding>
      ))}
    </Flags>
  );
};

const ArticleFlags: React.FC<{
  flags: FlagType;
  longRead: boolean;
  withContainer: boolean;
  color?: string;
}> = ({ flags = [], longRead = false, withContainer = false, color = '' }) => {
  const activeFlags = getActiveFlags(flags);
  const allFlags = [
    ...activeFlags,
    ...(longRead ? [{ expiryTime: null, type: 'LONGREAD' }] : [])
  ];

  if (!allFlags.length) {
    return null;
  }

  if (!withContainer) {
    return <FlagsView allFlags={allFlags} overrideColor={color} />;
  }

  return (
    <FlagsContainer>
      <FlagsView allFlags={allFlags} overrideColor={color} />
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
