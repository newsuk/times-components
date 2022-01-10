import React from "react";
import { colours } from "@times-components/styleguide";
import { LiveArticleFlag } from "@times-components/ts-components";
import { Container, IconContainer, TextContainer, FlagPadding, Flags, FlagsContainer } from "./styles";
import getActiveFlags from "./get-active-flags";

const ArticleFlag: React.FC<{color: string; title: string}> = ({ title, color=colours.functional.primary }) => (
  <Container>
    <IconContainer color={color} />
    <TextContainer
      aria-label={`${title} Flag`}
      color={color}
      data-testid={`flag-${title}`}
    >
      {title.toLowerCase()}
    </TextContainer>
  </Container>
);

const NewArticleFlag: React.FC = () => 
  <ArticleFlag 
    color={colours.functional.articleFlagNew} 
    title="new" 
  />;

const UpdatedArticleFlag: React.FC = () => 
  <ArticleFlag 
    color={colours.functional.articleFlagUpdated}
    title="updated" 
  />;

const ExclusiveArticleFlag: React.FC = () => 
  <ArticleFlag 
    color={colours.functional.articleFlagExclusive} 
    title="exclusive" 
  />;

const SponsoredArticleFlag: React.FC = () => 
  <ArticleFlag 
    color={colours.functional.tertiary} 
    title="sponsored" 
  />;

const LongReadArticleFlag: React.FC = () => 
  <ArticleFlag 
    color={colours.functional.secondary} 
    title="long read" 
  />;

const flagsMapping = () =>
  new Map([
    ["NEW", <NewArticleFlag/>],
    ["LIVE", <LiveArticleFlag/>],
    ["UPDATED", <UpdatedArticleFlag/>],
    ["EXCLUSIVE", <ExclusiveArticleFlag/>],
    ["SPONSORED", <SponsoredArticleFlag/>],
    ["LONGREAD", <LongReadArticleFlag/>]
  ]);


export type FlagsType = [
  {
    expiryTime: string;
    type: string;
  }
];


const ArticleFlags: React.FC<{ flags: FlagsType, longRead: boolean, allFlags: FlagsType, withContainer: boolean }> = ({ flags=[], longRead=false, withContainer=false }) => {
  const activeFlags = getActiveFlags(flags);
  const allFlags = [
    ...activeFlags,
    ...(longRead ? [{ type: "LONGREAD" }] : [])
  ];

  if (!allFlags.length) return null;

const flagsView = (allFlags: FlagsType) => { 
  return (
    <Flags>
      {allFlags.map(flag => (
        <FlagPadding 
          key={flag.type} 
          allFlags={allFlags}
          >
          {flagsMapping().get(flag.type)}
        </FlagPadding>
      ))}
    </Flags>
   )};

  if (!withContainer) return flagsView;

  return <FlagsContainer>{flagsView}</FlagsContainer>;
};

export default ArticleFlag;

export {
  getActiveFlags,
  ArticleFlags,
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag,
  LongReadArticleFlag,
  LiveArticleFlag
};
