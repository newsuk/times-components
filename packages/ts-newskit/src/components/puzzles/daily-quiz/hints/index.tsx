import React, { FC } from 'react';
import { Block } from 'newskit';
import { StyledTextBlock } from './styles';

interface HintDisplayProps {
  hints: Array<{ text: string }>;
}

export const HintDisplay: FC<HintDisplayProps> = ({ hints }) => {
  return (
    <Block>
      {hints.map((hint, index) => (
        <React.Fragment key={index}>
          <StyledTextBlock
            key={`info_${index}`}
            as="h4"
            typographyPreset="utilityHeading010"
            stylePreset="register080"
            marginBlockStart="space050"
          >
            {`Hint ${index + 1} of ${hints.length}`}
          </StyledTextBlock>
          <StyledTextBlock
            key={`text_${index}`}
            as="p"
            data-testid="hint"
            typographyPreset="utilityMeta010"
            stylePreset="register080"
            marginBlock="space030"
          >
            {hint.text}
          </StyledTextBlock>
        </React.Fragment>
      ))}
    </Block>
  );
};
