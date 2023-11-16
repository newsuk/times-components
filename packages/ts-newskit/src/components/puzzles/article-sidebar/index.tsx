import React, { FC } from 'react';
import {
  TextBlock,
  Block,
  CardComposable,
  CardMedia,
  CardContent,
  CardLink,
  Divider,
  Button,
  Stack
} from 'newskit';
import { NewsKitChevronRightIcon } from '../../../assets';
import { Puzzle } from './types';

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
    <Block stylePreset="sidebarCard" paddingBlockStart="space030">
      <Block>
        <Block>
          <CardComposable
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
              <Button
                overrides={{
                  width: 'iconSize020',
                  height: 'iconSize020',
                  paddingInline: 'space000',
                  paddingBlock: 'space000',
                  stylePreset: 'circleIconButton'
                }}
              >
                <NewsKitChevronRightIcon
                  overrides={{
                    size: 'iconSize010'
                  }}
                />
              </Button>
            </Stack>
          </CardComposable>

          <TextBlock
            as="p"
            marginBlockEnd="space030"
            stylePreset="inkBase"
            typographyPreset="utilityBody010"
          >
            Challenge yourself with today’s puzzles.
          </TextBlock>
        </Block>
      </Block>
      <Divider
        overrides={{ marginBlock: 'space040', stylePreset: 'dashedDivider' }}
      />

      {data.map(({ title, url, imgUrl }) => (
        <>
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
            <CardMedia
              media={{
                src: imgUrl,
                width: '40px',
                alt: 'Puzzle thumbnail',
                placeholderIcon: true,
                overrides: {
                  marginInlineEnd: 'space040'
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
          <Divider
            overrides={{
              marginBlock: 'space040',
              stylePreset: 'dashedDivider'
            }}
          />
        </>
      ))}
    </Block>
  );
};
