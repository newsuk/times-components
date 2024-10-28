import React, { FC } from 'react';
import { Puzzle } from './types';
import {
  ChevronButton,
  ChevronRightIcon,
  Container,
  Description,
  Divider,
  ItemTitle,
  Link,
  PuzzleContainer,
  PuzzleImage,
  Title,
  TitleIconContainer
} from './styles';
import { useTrackingContext } from '../../helpers/tracking/TrackingContextProvider';
import { handleClick } from './tracking-helpers';

export interface ArticleSideBarProps {
  sectionTitle: string;
  data: Puzzle[];
  pageLink: string;
}

export const ArticleSidebar: FC<ArticleSideBarProps> = ({
  sectionTitle,
  data,
  pageLink
}) => {
  const { fireAnalyticsEvent } = useTrackingContext();

  return (
    <Container>
      <Link
        href={pageLink}
        onClick={() =>
          handleClick(fireAnalyticsEvent, 'puzzle sidebar: header selected')
        }
        className="trigger"
      >
        <TitleIconContainer>
          <Title>{sectionTitle}</Title>
          <ChevronButton>
            <ChevronRightIcon />
          </ChevronButton>
        </TitleIconContainer>
      </Link>

      <Description>Challenge yourself with today’s puzzles.</Description>
      <Divider />

      {data.map(({ title, url, imgUrl }) => (
        <React.Fragment key={title}>
          <PuzzleContainer
            href={url}
            onClick={() =>
              handleClick(
                fireAnalyticsEvent,
                'puzzle sidebar: puzzle selected',
                `${title}`
              )
            }
            className="trigger-card-link"
          >
            <PuzzleImage src={imgUrl} alt="Puzzle category thumbnail" />
            <ItemTitle>{title}</ItemTitle>
          </PuzzleContainer>
          <Divider />
        </React.Fragment>
      ))}
    </Container>
  );
};
