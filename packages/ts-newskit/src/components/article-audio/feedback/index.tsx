import React, { useState } from 'react';
import { Stack, TextBlock, Block, IconButton, LinkInline } from 'newskit';
import {
  NewsKitCloseIcon,
  NewsKitThumbsDownIcon,
  NewsKitThumbsUpIcon
} from '../../../assets';

export const Feedback = () => {
  const [closed, setClosed] = useState(false);
  const [showFeedback, setShowFeedback] = useState(true);

  const feedbackText =
    'Want to listen to more articles? Give your feedback below or email';
  const feedbackSubmittedText =
    "Thank you for your feedback. We're always trying to give you the best possible experience – your feedback helps us do this.";

  const handleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  return (
    <>
      {!closed && (
        <>
          <Block
            stylePreset="feedbackContainerPreset"
            paddingInline="space040"
            paddingBlock="space040"
          >
            {showFeedback ? (
              <>
                <Stack
                  stackDistribution="space-between"
                  flow="horizontal-top"
                  spaceInline="space050"
                >
                  <Stack stackDistribution="space-between" flow="vertical-left">
                    <TextBlock typographyPreset="utilityBody020">
                      {feedbackText}
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
                      stylePreset: 'feedbackIconButtonOutlineSecondary',
                      iconSize: 'iconSize080'
                    }}
                    onClick={() => setClosed(!closed)}
                    aria-label="Feedback Close"
                  >
                    <NewsKitCloseIcon />
                  </IconButton>
                </Stack>
                <Stack
                  stackDistribution="flex-start"
                  spaceInline="space040"
                  flow="horizontal-top"
                  marginBlockStart="space040"
                >
                  <IconButton
                    overrides={{
                      stylePreset: 'feedbackIconButtonOutlineSecondary',
                      iconSize: 'iconSize080'
                    }}
                    onClick={() => handleFeedback()}
                    aria-label="Thumbs Down"
                  >
                    <NewsKitThumbsUpIcon />
                  </IconButton>
                  <IconButton
                    overrides={{
                      stylePreset: 'feedbackIconButtonOutlineSecondary',
                      iconSize: 'iconSize080'
                    }}
                    onClick={() => handleFeedback()}
                    aria-label="Thumbs Up"
                  >
                    <NewsKitThumbsDownIcon />
                  </IconButton>
                </Stack>
              </>
            ) : (
              <Stack
                stackDistribution="space-between"
                flow="horizontal-top"
                spaceInline="space050"
              >
                <TextBlock typographyPreset="utilityBody020">
                  {feedbackSubmittedText}
                </TextBlock>
                <IconButton
                  overrides={{
                    stylePreset: 'feedbackIconButtonOutlineSecondary',
                    iconSize: 'iconSize080'
                  }}
                  onClick={() => setClosed(!closed)}
                  aria-label="Thank you Close"
                >
                  <NewsKitCloseIcon />
                </IconButton>
              </Stack>
            )}
          </Block>
        </>
      )}
    </>
  );
};
