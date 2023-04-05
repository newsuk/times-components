import { Block } from 'newskit';
import React from 'react';
import {
  StyledTextBlock,
  JournalistImage,
  JournalistImageContainer,
  JournalistName,
  QuoteText,
  JournalistContainer
} from './styles';

type Journalist = {
  name: string;
  image?: string;
};

export interface JournalistQuoteProps {
  journalist: Journalist;
  heading?: string;
  quote: string;
  sectionColour: string;
  textColour?: string;
}

export const JournalistQuote = ({
  journalist,
  heading,
  quote,
  sectionColour,
  textColour
}: JournalistQuoteProps) => {
  return (
    <>
      <JournalistContainer flow="horizontal-center" inline>
        <JournalistImageContainer marginInlineEnd="space045">
          <JournalistImage
            src={journalist.image}
            alt={journalist.name}
            height={77}
            width={77}
            loadingAspectRatio="1:1"
          />
        </JournalistImageContainer>
        <Block>
          <StyledTextBlock
            as="h4"
            typographyPreset={{
              xs: 'editorialSubheadline030',
              sm: 'editorialHeadline030'
            }}
            marginBlockEnd="space030"
          >
            {heading}
            <JournalistName
              as="span"
              $color={sectionColour}
              marginInlineStart={heading ? 'space020' : 'space000'}
              marginInlineEnd="space020"
            >
              {journalist.name}
            </JournalistName>
          </StyledTextBlock>
          <QuoteText
            $color={textColour}
            typographyPreset={{
              xs: 'editorialItalic060',
              sm: 'editorialItalic050'
            }}
          >
            {quote}
          </QuoteText>
        </Block>
      </JournalistContainer>
    </>
  );
};
