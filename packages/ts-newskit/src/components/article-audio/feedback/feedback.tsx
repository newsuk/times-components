import React from 'react';
import { Stack, TextBlock, IconButton, LinkInline } from 'newskit';
import {
  NewsKitCloseIcon,
  NewsKitThumbsDownIcon,
  NewsKitThumbsUpIcon
} from '../../../assets';

export const FeedbackText: React.FC<{
  handleFeedback: (value: boolean) => void;
  closed: boolean;
  setClosed: (value: boolean) => void;
  showFeedback: boolean;
  feedbackMessage: string;
}> = ({ handleFeedback, closed, setClosed, showFeedback, feedbackMessage }) => {
  return (
    <>
      <Stack
        stackDistribution="space-between"
        flow="horizontal-top"
        spaceInline="space050"
      >
        <Stack
          stackDistribution="space-between"
          flow="vertical-left"
          marginInlineEnd="space000"
        >
          <TextBlock typographyPreset="utilityBody020">
            {feedbackMessage}
          </TextBlock>
          <LinkInline
            overrides={{
              stylePreset: 'feedbackPreset',
              typographyPreset: 'utilityBody020',
              paddingBlockStart: 'space010'
            }}
            external={false}
            href="mailto:comments+engagement@thetimes.co.uk"
          >
            comments+engagement@thetimes.co.uk
          </LinkInline>
        </Stack>
        <IconButton
          overrides={{
            stylePreset: 'iconButtonMinimalSecondary',
            iconSize: 'iconSize080',
            marginInline: 'space000'
          }}
          size="small"
          onClick={() => setClosed(!closed)}
          aria-label="close"
        >
          <NewsKitCloseIcon />
        </IconButton>
      </Stack>
      <Stack
        stackDistribution="flex-start"
        spaceInline="space040"
        flow="horizontal-top"
        marginBlockStart="space030"
      >
        <IconButton
          overrides={{
            stylePreset: 'iconButtonOutlinedSecondary',
            iconSize: 'iconSize080'
          }}
          size="small"
          onClick={() => handleFeedback(!showFeedback)}
          aria-label="Thumbs Down"
        >
          <NewsKitThumbsUpIcon />
        </IconButton>
        <IconButton
          overrides={{
            stylePreset: 'iconButtonOutlinedSecondary',
            iconSize: 'iconSize080'
          }}
          size="small"
          onClick={() => handleFeedback(!showFeedback)}
          aria-label="Thumbs Up"
        >
          <NewsKitThumbsDownIcon />
        </IconButton>
      </Stack>
    </>
  );
};
