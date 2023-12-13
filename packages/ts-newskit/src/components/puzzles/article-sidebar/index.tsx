import React, { FC } from 'react';
import {
  TextBlock,
  Block,
  CardComposable,
  CardMedia,
  CardContent,
  CardLink,
  Divider,
  Stack,
  IconButton,
  useInstrumentation
} from 'newskit';
import { NewsKitChevronRightIcon } from '../../../assets';
import { Puzzle } from './types';
import { StyledCardComposable } from './styles';
import { sidebarClickEvent } from './tracking/tealium';

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

  const { fireEvent } = useInstrumentation();
  const onClickSidebarHeader = () => {
    fireEvent(sidebarClickEvent());
  };

  return (
    <Block stylePreset="sidebarCard" paddingBlockStart="space030">
      <Block>
        <Block>
          <StyledCardComposable
            overrides={{
              marginBlockEnd: 'space030',
              stylePreset: 'cardTitleIcon'
            }}
          >
            <CardLink external={false} expand href={pageLink} />
            <Stack flow="horizontal-center" stackDistribution="space-between">
              <TextBlock as="h3" typographyPreset="editorialDisplay002" onClick={onClickSidebarHeader}>
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
            <CardMedia
              media={{
                src: imgUrl,
                width: '40px',
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
          <Divider
            overrides={{
              marginBlock: 'space040',
              stylePreset: 'dashedDivider'
            }}
          />
        </React.Fragment>
      ))}
    </Block>
  );
};
