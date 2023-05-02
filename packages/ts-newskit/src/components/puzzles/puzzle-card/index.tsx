import React from 'react';
import {
  CardComposable,
  CardContent,
  CardLink,
  CardMedia,
  Stack,
  TextBlock,
  Block
} from 'newskit';
import { Wrap, StyledNewsKitPuzzlePlaceholder } from './styles';
import { Image } from './types';
import { PuzzlesFlag } from '../flag';

export interface PuzzleCardProps {
  id: number;
  shortIdentifier: string;
  title: string;
  publishedAt: string;
  status: 'COMPLETE' | 'IN PROGRESS' | string;
  url: string;
  image?: Image;
}

export const PuzzleCard = ({
  id,
  shortIdentifier,
  title,
  publishedAt,
  status,
  url,
  image
}: PuzzleCardProps) => {
  const timestamp = new Date(publishedAt);
  const dayOfWeek = timestamp.toLocaleString('en-us', { weekday: 'long' });
  const imageUrl = image ? image.src : '';

  return (
    <CardComposable
      key={id}
      overrides={{
        minHeight: {
          xs: '186.67px',
          sm: '201.33px',
          md: '186.67px',
          lg: '211.33px',
          xl: '261.33px'
        },
        stylePreset: 'puzzleCard'
      }}
    >
      <Block style={{ position: 'relative' }}>
        {imageUrl ? (
          <CardMedia
            media={{
              loadingAspectRatio: '3:2',
              alt: title || 'Puzzle thumbnail',
              src: imageUrl,
              placeholderIcon: true,
              overrides: {
                stylePreset: 'puzzleCardMedia'
              }
            }}
            data-testid="puzzle-image"
          />
        ) : (
          <StyledNewsKitPuzzlePlaceholder data-testid="puzzle-placeholder" />
        )}
        {status && (
          <Wrap>
            <PuzzlesFlag status={status} />
          </Wrap>
        )}
      </Block>
      <CardContent justifyItems="center">
        <CardLink
          expand
          href={url}
          data-testid="puzzleCard-link"
          overrides={{
            externalIcon: { size: '0' },
            stylePreset: 'puzzleCardLink'
          }}
        >
          {title && (
            <TextBlock
              as="div"
              marginBlock="space020"
              marginInline="space020"
              stylePreset="inkContrast"
              typographyPreset={{
                xs: 'editorialHeadline010',
                lg: 'editorialHeadline020'
              }}
            >
              {title}
            </TextBlock>
          )}
        </CardLink>
        <Stack
          flow="vertical-center"
          stackDistribution="flex-start"
          height="auto"
        >
          <Block>
            {dayOfWeek && (
              <TextBlock
                as="span"
                paddingBlockStart="space010"
                paddingBlockEnd="space030"
                typographyPreset="utilityLabel010"
                stylePreset="inkBase"
              >
                {dayOfWeek}
              </TextBlock>
            )}
            {shortIdentifier && (
              <TextBlock
                as="span"
                paddingBlockStart="space010"
                paddingBlockEnd="space030"
                paddingInlineStart="space010"
                typographyPreset="utilityBody010"
                stylePreset="inkSubtle"
              >
                {` | ${shortIdentifier}`}
              </TextBlock>
            )}
          </Block>
        </Stack>
      </CardContent>
    </CardComposable>
  );
};
