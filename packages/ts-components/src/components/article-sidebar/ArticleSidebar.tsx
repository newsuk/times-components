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
  return (
    <Container>
      <Link href={pageLink}>
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
          <PuzzleContainer href={url}>
            <PuzzleImage src={imgUrl} alt="Puzzle thumbnail" />
            <ItemTitle>{title}</ItemTitle>
          </PuzzleContainer>
          <Divider />
        </React.Fragment>
      ))}
    </Container>
  );
};
