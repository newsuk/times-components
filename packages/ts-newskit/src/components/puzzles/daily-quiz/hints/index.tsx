import React, { FC } from 'react';
import { Block } from 'newskit';
import { StyledTextBlock } from './styles';

interface HintDisplayProps {
  hints: Array<{ text: string }>;
  totalHints?: number;
}

export const HintDisplay: FC<HintDisplayProps> = ({ hints, totalHints }) => {
  const hintstotal = totalHints ? totalHints : hints.length;

  return (
    <Block>
      {hints.map((hint, index) => (
        <React.Fragment key={index}>
          <StyledTextBlock
            key={`info_${index}`}
            as="h4"
            typographyPreset="utilityHeading010"
            stylePreset="inkBase"
            marginBlockStart="space050"
          >
            {`Hint ${index + 1} of ${hintstotal}`}
          </StyledTextBlock>
          <StyledTextBlock
            key={`text_${index}`}
            as="p"
            data-testid="hint"
            typographyPreset="utilityMeta010"
            stylePreset="inkBase"
            marginBlock="space030"
          >
            {hint.text}
          </StyledTextBlock>
        </React.Fragment>
      ))}
    </Block>
  );
};
