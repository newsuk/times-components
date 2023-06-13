import React, { FC } from 'react';
import { Block, TextBlock, Button } from 'newskit';
import {
  FreeTrialContainer,
  StyledBlock,
  StyledIconA4,
  StyledIconD2,
  StyledWrapper
} from './styles';

export interface FreeTrialProps {
  freeTrialHeader: string;
  freeTrialSubheadline: string;
  url: string;
  title: string;
}

export const FreeTrial: FC<FreeTrialProps> = ({
  freeTrialHeader,
  freeTrialSubheadline,
  url,
  title
}) => {
  return (
    <Block as="section">
      <FreeTrialContainer paddingBlock="space090" paddingInline="space045">
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
              {freeTrialHeader}
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
              {freeTrialSubheadline}
            </TextBlock>
            <Button
              size="medium"
              href={url}
              overrides={{
                stylePreset: 'freeTrialShadowBtn',
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
      </FreeTrialContainer>
    </Block>
  );
};
