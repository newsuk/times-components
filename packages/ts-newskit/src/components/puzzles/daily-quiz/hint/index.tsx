import React, { FC, useState } from 'react';
import { Button, Block, TextBlock } from 'newskit';
import { StyledTextBlock } from './styles';
import { Hints } from './fixtures/data.json';

export interface HintProps {
  title?: string;
}

export const Hint: FC<HintProps> = ({ title }) => {
  const [hints, setHints] = useState<Array<{ info: string; text: string }>>([]);
  const totalHints = Hints.length;
  const [hintIndex, setHintIndex] = useState(0);

  const getNextHint = () => {
    if (hintIndex < totalHints) {
      const hintNumber = hintIndex + 1;
      const hintInfo = `Hint ${hintNumber} of ${totalHints}`;
      const hintText = Hints[hintIndex].text;
      setHintIndex(hintNumber);
      setHints(prevHints => [...prevHints, { info: hintInfo, text: hintText }]);
    }
  };

  return (
    <Block>
      <Button
        size="medium"
        onClick={getNextHint}
        overrides={{
          stylePreset: `HintBtn`,
          typographyPreset: 'utilityButton020',
          paddingBlock: 'space040',
          paddingInline: 'space040',
          minWidth: {
            xs: '167px',
            lg: '196px'
          },
          height: '48px'
        }}
        disabled={hintIndex >= totalHints}
      >
        <TextBlock
          stylePreset="interactiveLink030"
          typographyPreset="utilityButton020"
        >
          {title ? title : 'Give me a hint'}
        </TextBlock>
      </Button>
      {hints.map((hint, index) => (
        <React.Fragment key={index}>
          <StyledTextBlock
            key={`info_${index}`}
            as="h4"
            typographyPreset="utilityHeading010"
            stylePreset="register080"
            marginBlockStart="space050"
          >
            {hint.info}
          </StyledTextBlock>
          <StyledTextBlock
            key={`text_${index}`}
            as="p"
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
