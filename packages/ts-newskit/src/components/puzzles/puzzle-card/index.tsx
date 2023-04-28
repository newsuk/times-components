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
import { Wrap } from './styles';
import { PuzzleCardItem } from './types';
import { NewsKitPuzzlePlaceholder } from './assets';
import { PuzzlesFlag } from '../flag';

interface PuzzleCardProps {
  data: PuzzleCardItem;
}

export const PuzzleCard = ({ data }: PuzzleCardProps) => {
  const timestamp = new Date(data.publishedAt);
  const dayOfWeek = timestamp.toLocaleString('en-us', { weekday: 'long' });
  const imageUrl = data.image && data.image.src ? data.image.src : '';

  return (
    <CardComposable
      key={data.id}
      overrides={{
        minHeight: {
          xs: '186.67px',
          sm: '201.33px',
          md: '186.67px',
          lg: '211.33px',
          xl: '261.33px'
        },
        width: {
          xs: '126px',
          sm: '206px',
          md: '154px',
          lg: '218px',
          xl: '293px'
        },
        stylePreset: 'puzzleCard'
      }}
    >
      <Block style={{ position: 'relative' }}>
        {imageUrl ? (
          <CardMedia
            media={{
              loadingAspectRatio: '3:2',
              alt: data.title || 'Puzzle thumbnail',
              src: imageUrl,
              placeholderIcon: true,
              overrides: {
                maxHeight: {
                  xs: '84px',
                  sm: '137.33px',
                  md: '102.67px',
                  lg: '145.33px',
                  xl: '195.33px'
                }
              }
            }}
            data-testid="puzzle-image"
          />
        ) : (
          <NewsKitPuzzlePlaceholder data-testid="puzzle-placeholder" />
        )}
        {data.status && (
          <Wrap>
            <PuzzlesFlag status={data.status} />
          </Wrap>
        )}
      </Block>
      <CardContent justifyItems="center">
        <CardLink
          expand
          href={data.url}
          data-testid="puzzleCard-link"
          overrides={{
            externalIcon: { size: '0' },
            stylePreset: 'puzzleCardLink'
          }}
        >
          {data.title && (
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
              {data.title}
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
            {data.shortIdentifier && (
              <TextBlock
                as="span"
                paddingBlockStart="space010"
                paddingBlockEnd="space030"
                paddingInlineStart="space010"
                typographyPreset="utilityBody010"
                stylePreset="inkSubtle"
              >
                {` | ${data.shortIdentifier}`}
              </TextBlock>
            )}
          </Block>
        </Stack>
      </CardContent>
    </CardComposable>
  );
};
