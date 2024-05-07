import React, { FC } from 'react';
import {
  CardComposable,
  CardContent,
  CardLink,
  Stack,
  IconButton
} from 'newskit';
import { NewsKitChevronRightIcon } from '../../../assets';
import { Puzzle } from './types';
import {
  Container,
  Description,
  Divider,
  ItemTitle,
  Link,
  StyledCardMedia,
  Title
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
      <div>
        <Link href={pageLink}>
          <Stack flow="horizontal-center" stackDistribution="space-between">
            <Title>{sectionTitle}</Title>

            <IconButton
              overrides={{
                stylePreset: 'iconPreset',
                width: 'sizing050',
                height: 'sizing050'
              }}
            >
              <NewsKitChevronRightIcon />
            </IconButton>
          </Stack>
        </Link>

        <Description>Challenge yourself with today’s puzzles.</Description>
      </div>
      <Divider />

      {data.map(({ title, url, imgUrl }) => (
        <React.Fragment key={title}>
          <CardComposable
            columns="0fr 1fr"
            overrides={{
              stylePreset: 'transparentCard',
              marginBlockStart: 'space040'
            }}
            areas={`
           media content          
         `}
          >
            <StyledCardMedia
              media={{
                src: imgUrl,
                height: '40px',
                width: 'auto',
                alt: 'Puzzle thumbnail',
                placeholderIcon: true,
                overrides: {
                  marginInlineEnd: 'space040',
                  maxWidth: 'initial'
                }
              }}
            />
            <CardLink external={false} expand href={url} />
            <CardContent alignItems="center">
              <ItemTitle>{title}</ItemTitle>
            </CardContent>
          </CardComposable>
          <Divider />
        </React.Fragment>
      ))}
    </Container>
  );
};
