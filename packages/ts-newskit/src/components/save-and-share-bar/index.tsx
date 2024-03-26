import React from 'react';
import { Stack } from 'newskit';
import {
  SaveStar,
  TrackingContextProvider
} from '@times-components/ts-components';
import { StyledButton, PopoverContent, StyledPopover } from './styled';
import { EmailShare } from './components/email-share';
import { SaveButton } from './components/save-button';
import { ShareItem, ShareItemLabel } from './components/share-item';
import {
  IconFacebook,
  IconTwitter,
  IconCopyLink
  // @ts-ignore
} from '@times-components/icons';
import { Share } from '@emotion-icons/bootstrap/Share';

// @ts-ignore
import UserState from '@times-components/user-state';
// @ts-ignore
import { SectionContext } from '@times-components/context';

import { SharingApiUrls } from './constants';
import { styles } from './styles';

import { SaveAndShareBarProps } from './types';

const SaveAndShareBar = ({
  isPreviewMode = false,
  ...props
}: SaveAndShareBarProps) => {
  const {
    articleId,
    articleUrl,
    savingEnabled,
    sharingEnabled,
    articleHeadline,
    onCopyLink
  } = props;

  const clickEvent = (
    title: string,
    headline: string,
    fireAnalyticsEvent: any
  ) =>
    fireAnalyticsEvent && {
      action: 'Clicked',
      attrs: {
        event_navigation_action: 'navigation',
        event_navigation_name:
          title === 'Share'
            ? `share bar : ${title} : social share ${title}`
            : null,
        event_navigation_browsing_method: 'click',
        event_social_action: title !== 'Share' ? 'share start' : null,
        social_platform: title,
        article_parent_name: `article : ${headline}`
      }
    };

  const copyToClipboard = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(articleUrl);
    onCopyLink && onCopyLink();
  };

  return (
    <TrackingContextProvider>
      {({ fireAnalyticsEvent }) => (
        <Stack
          data-testid="save-and-share-bar"
          flow="horizontal-center"
          spaceInline="space050"
        >
          {sharingEnabled && (
            <StyledPopover
              placement="bottom"
              header="Share this article"
              overrides={{
                minWidth: { xs: '90%', md: 'auto' }
              }}
              content={
                <PopoverContent
                  flow={{ xs: 'vertical-left', md: 'horizontal-center' }}
                >
                  <SectionContext.Consumer>
                    {({ publicationName }: { publicationName: string }) => (
                      <UserState
                        state={UserState.showTokenisedEmailShare}
                        fallback={
                          <EmailShare
                            {...props}
                            shouldTokenise={false}
                            publicationName={publicationName}
                          />
                        }
                      >
                        <EmailShare
                          {...props}
                          shouldTokenise
                          publicationName={publicationName}
                        />
                      </UserState>
                    )}
                  </SectionContext.Consumer>

                  <ShareItem
                    testId="share-twitter"
                    tooltipContent="Share on Twitter"
                    href={`${SharingApiUrls.twitter}?text=${articleUrl}`}
                    onClick={() => {
                      clickEvent(
                        'Twitter',
                        articleHeadline,
                        fireAnalyticsEvent
                      );
                    }}
                  >
                    <ShareItemLabel
                      icon={
                        <IconTwitter
                          fillColour="currentColor"
                          height={styles.svgIcon.height}
                          title="Share on Twitter"
                        />
                      }
                    >
                      Twitter
                    </ShareItemLabel>
                  </ShareItem>

                  <ShareItem
                    testId="share-facebook"
                    tooltipContent="Share on Facebook"
                    href={`${SharingApiUrls.facebook}?u=${articleUrl}`}
                    onClick={() => {
                      clickEvent(
                        'Facebook',
                        articleHeadline,
                        fireAnalyticsEvent
                      );
                    }}
                  >
                    <ShareItemLabel
                      icon={
                        <IconFacebook
                          fillColour="currentColor"
                          height={styles.svgIcon.fb.height}
                          title="Share on Facebook"
                        />
                      }
                    >
                      Facebook
                    </ShareItemLabel>
                  </ShareItem>

                  <ShareItem
                    testId="copy-to-clipboard"
                    tooltipContent="Copy link to clipboard"
                    onClick={e => {
                      copyToClipboard(e);
                      clickEvent(
                        'Copy to clipboard',
                        articleHeadline,
                        fireAnalyticsEvent
                      );
                    }}
                  >
                    <ShareItemLabel
                      icon={
                        <IconCopyLink
                          fillColour="currentColor"
                          height={styles.svgIcon.height}
                          title="Copy link to clipboard"
                        />
                      }
                    >
                      Link
                    </ShareItemLabel>
                  </ShareItem>
                </PopoverContent>
              }
            >
              <StyledButton
                data-testid="share-button"
                size="small"
                overrides={{ stylePreset: 'buttonOutlinedPrimary' }}
              >
                <Share style={{ height: 14, width: 14 }} />
                Share
              </StyledButton>
            </StyledPopover>
          )}
          {savingEnabled ? (
            <>
              <UserState
                state={UserState.showArticleSaveButton}
                serverRender={false}
              >
                <div data-testid="save-star">
                  <SaveStar articleId={articleId}>
                    {/* @ts-ignore */}
                    <SaveButton
                      onClick={() =>
                        clickEvent(
                          'Save Article',
                          articleHeadline,
                          fireAnalyticsEvent
                        )
                      }
                    />
                  </SaveStar>
                </div>
              </UserState>
              {isPreviewMode && (
                <div data-testid="save-star-preview">
                  <SaveStar articleId={articleId} isPreviewMode>
                    {/* @ts-ignore */}
                    <SaveButton />
                  </SaveStar>
                </div>
              )}
            </>
          ) : null}
        </Stack>
      )}
    </TrackingContextProvider>
  );
};

export default SaveAndShareBar;
