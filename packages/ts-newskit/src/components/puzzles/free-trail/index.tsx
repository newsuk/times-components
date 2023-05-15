import React, { FC } from 'react';
import { Block, TextBlock, Button } from 'newskit';
import {
  FreeTrailContainer,
  StyledBlock,
  StyledIconA4,
  StyledIconD2,
  StyledWrapper
} from './styles';

export interface FreeTrailProps {
  freeTrailHeader: string;
  freeTrailSubheadline: string;
  url: string;
  title: string;
}

export const FreeTrail: FC<FreeTrailProps> = ({
  freeTrailHeader,
  freeTrailSubheadline,
  url,
  title
}) => {
  return (
    <Block as="section">
      <FreeTrailContainer paddingBlock="space090" paddingInline="space045">
        <StyledBlock marginBlock="space000" marginInline="auto">
          <StyledWrapper>
            <TextBlock
              as="h2"
              typographyPreset={{
                xs: 'editorialHeadline050',
                md: 'editorialHeadline080'
              }}
              stylePreset="inkContrast"
            >
              {freeTrailHeader}
            </TextBlock>
            <TextBlock
              as="p"
              typographyPreset={{
                xs: 'editorialSubheadline020',
                md: 'editorialSubheadline040'
              }}
              stylePreset="inkBase"
              marginBlockStart="space045"
            >
              {freeTrailSubheadline}
            </TextBlock>
            <Button
              size="medium"
              href={url}
              overrides={{
                stylePreset: 'freeTrailShadowBtn',
                typographyPreset: 'utilityButton020',
                paddingBlock: 'space030',
                paddingInline: 'space040',
                marginBlockStart: 'space045',
                minWidth: {
                  xs: '167px',
                  lg: '199px'
                },
                height: 'sizing.sizing050'
              }}
            >
              {title}
            </Button>
          </StyledWrapper>
          <StyledIconD2 />
          <StyledIconA4 />
        </StyledBlock>
      </FreeTrailContainer>
    </Block>
  );
};
