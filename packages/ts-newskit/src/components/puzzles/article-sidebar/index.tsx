import React, { FC } from 'react';
import {
  TextBlock,
  Block,
  CardComposable,
  CardMedia,
  CardContent,
  CardLink
} from 'newskit';
import { NewsKitChevronRightIcon } from '../../../assets';
import { TextIcon } from './styles';
import { Puzzle } from './types';

export interface ArticleSideBarProps {
  sectionTitle: string;
  data: Puzzle[];
}

export const ArticleSidebar: FC<ArticleSideBarProps> = ({
  sectionTitle,
  data
}) => {
  return (
    <Block
      stylePreset="sidebarCard"
      paddingBlock="space040"
      paddingInline="space040"
    >
      <TextBlock
        as="h3"
        marginBlockEnd="space050"
        stylePreset="inkContrast"
        typographyPreset="utilityHeading020"
      >
        {sectionTitle}
      </TextBlock>

      {data.map(({ title, url, imgUrl }) => (
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
              width: '50px',
              alt: 'Puzzle thumbnail',
              placeholderIcon: true,
              overrides: {
                marginInlineEnd: 'space060'
              }
            }}
          />
          <CardLink external={false} expand href={url} />
          <CardContent alignItems="center">
            <TextBlock
              stylePreset="inkContrast"
              typographyPreset="editorialSubheadline010"
            >
              {title}
            </TextBlock>
            <TextIcon
              stylePreset="inkInformative"
              typographyPreset="utilityButton010"
              paddingBlock="space020"
            >
              Play now
              <NewsKitChevronRightIcon
                overrides={{
                  size: 'iconSize020',
                  marginInlineStart: 'space020'
                }}
              />
            </TextIcon>
          </CardContent>
        </CardComposable>
      ))}
    </Block>
  );
};
