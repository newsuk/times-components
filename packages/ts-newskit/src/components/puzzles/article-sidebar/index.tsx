import React, { FC } from 'react';
import {
  TextBlock,
  CardComposable,
  CardContent,
  CardLink,
  Stack,
  IconButton
} from 'newskit';
import { NewsKitChevronRightIcon } from '../../../assets';
import { Puzzle } from './types';
import {Container, Description, Divider, StyledCardComposable, StyledCardMedia } from './styles';

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
        <div>
          <StyledCardComposable
            overrides={{
              marginBlockEnd: 'space030',
              stylePreset: 'cardTitleIcon'
            }}
          >
            <CardLink external={false} expand href={pageLink} />

            <Stack flow="horizontal-center" stackDistribution="space-between">
              <TextBlock as="h3" typographyPreset="editorialDisplay002">
                {sectionTitle}
              </TextBlock>

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
          </StyledCardComposable>

          <Description
          >
            Challenge yourself with today’s puzzles.
          </Description>
        </div>
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
              <TextBlock typographyPreset="editorialSubheadline010">
                {title}
              </TextBlock>
            </CardContent>
          </CardComposable>
          <Divider />
        </React.Fragment>
      ))}
    </Container>
  );
};
