import React from 'react';
import { Block, toNewsKitIcon } from 'newskit';
import { StyledTextBlock, StyledBlock } from './styles';
import { DoneOutline } from '@emotion-icons/material/DoneOutline';
import { NewsKitCrossIcon } from '../../../../assets';
const IconDoneOutline = toNewsKitIcon(DoneOutline);

export interface FinalScreenProps {
  message: string;
  hints: number;
  ans: string;
  status: 'Win' | 'Lose' | string;
}

export const FinalScreen = ({
  message,
  hints,
  ans,
  status
}: FinalScreenProps) => {
  const insertBoldTag = (text: string) => {
    return { __html: text };
  };
  return (
    <Block>
      <StyledBlock>
        {status === 'Win' ? (
          <IconDoneOutline
            overrides={{ stylePreset: 'inkPositive', size: 'iconSize020' }}
          />
        ) : (
          <NewsKitCrossIcon />
        )}
      </StyledBlock>
      <StyledTextBlock
        as="h3"
        typographyPreset="utilitySubheading050"
        stylePreset={status === 'Win' ? 'inkPositive' : 'inkNotice'}
        marginBlockStart="space030"
        marginBlockEnd="space050"
      >
        {ans}
      </StyledTextBlock>
      {status === 'Lose' ? (
        <StyledTextBlock
          as="p"
          typographyPreset="utilityBody020"
          stylePreset="inkContrast"
        >
          You didn't get it this time.
        </StyledTextBlock>
      ) : (
        <StyledTextBlock
          as="p"
          typographyPreset="utilityBody020"
          stylePreset="inkContrast"
        >
          <div dangerouslySetInnerHTML={insertBoldTag(message)} />
          You did it with {hints} hints.
        </StyledTextBlock>
      )}
    </Block>
  );
};
