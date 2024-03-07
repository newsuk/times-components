import React from 'react';
import { CardContent, CardLink, Stack, TextBlock, Block, Image } from 'newskit';
import {
  Wrap,
  StyledNewsKitPuzzlePlaceholder,
  PuzzleCardComposable,
  PuzzleCardImgWrapper
} from './styles';
import { PuzzlesFlag } from '../flag';
import { Puzzle } from '../archive/types';
import { convertDateToWeekday } from '../../../utils';

export interface PuzzleCardProps {
  data: Puzzle;
  isImageCropped?: boolean;
  isLazyLoading?: boolean;
  bgColor?: string;
}

export const PuzzleCard = ({
  data,
  isImageCropped = false,
  isLazyLoading = false,
  bgColor = '#FEEEDC'
}: PuzzleCardProps) => {
  const publishedDate = convertDateToWeekday(data.publishedAt);
  const imageUrl = data.image ? data.image.crops[0].url : '';
  const croppedImageUrl = isImageCropped ? `${imageUrl}&resize=500` : imageUrl;

  return (
    <PuzzleCardComposable
      key={data.id}
      overrides={{
        height: '100%',
        stylePreset: 'puzzleCard',
        maxWidth: '293px'
      }}
    >
      <PuzzleCardImgWrapper
        className={isLazyLoading ? '' : 'lcpPuzzles'}
        bgColor={bgColor}
      >
        {imageUrl ? (
          <Image
            loadingAspectRatio="3:2"
            alt={data.title || 'Puzzle thumbnail'}
            src={croppedImageUrl}
            loading={isLazyLoading ? 'lazy' : 'eager'}
            overrides={{
              stylePreset: 'puzzleCardMedia'
            }}
            data-testid="puzzle-image"
          />
        ) : (
          <StyledNewsKitPuzzlePlaceholder data-testid="puzzle-placeholder" />
        )}
        {data.status && (
          <Wrap>
            <PuzzlesFlag status={data.status} />
          </Wrap>
        )}
      </PuzzleCardImgWrapper>
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
              marginBlockStart="space030"
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
            {publishedDate && (
              <TextBlock
                as="span"
                paddingBlockStart="space010"
                paddingBlockEnd="space030"
                typographyPreset="utilityLabel010"
                stylePreset="inkBase"
              >
                {publishedDate}
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
    </PuzzleCardComposable>
  );
};
