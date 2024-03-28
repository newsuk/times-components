/* eslint-env browser */
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  IconFacebook,
  IconTwitter,
  IconCopyLink
} from "@times-components/icons";
import UserState from "@times-components/user-state";
import { SectionContext } from "@times-components/context";
import { Stack } from "newskit";
import {
  SaveStar,
  TrackingContextProvider
} from "@times-components/ts-components";
import { Share } from "@emotion-icons/bootstrap/Share";

import getTokenisedArticleUrlApi from "./get-tokenised-article-url-api";
import SharingApiUrls from "./constants";
import styles from "./styles";

import { StyledButton, PopoverContent, StyledPopover } from "./styled";
import EmailShare from "./components/email-share";
import SaveButton from "./components/save-button";
import { ShareItem, ShareItemLabel } from "./components/share-item";

const SaveAndShareBar = props => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const {
    articleId,
    articleUrl,
    savingEnabled,
    sharingEnabled,
    onShareOnFB,
    onShareOnTwitter,
    isPreviewMode,
    onCopyLink,
    articleHeadline
  } = props;

  const clickEvent = (title, fireAnalyticsEvent) =>
    fireAnalyticsEvent &&
    fireAnalyticsEvent({
      action: "Clicked",
      attrs: {
        event_navigation_action: "navigation",
        event_navigation_name:
          title === "Share"
            ? `share bar : ${title} : social share ${title}`
            : null,
        event_navigation_browsing_method: "click",
        event_social_action: title !== "Share" ? "share start" : null,
        social_platform: title,
        article_parent_name: `article : ${articleHeadline}`
      }
    });

  const copyToClipboard = e => {
    e.preventDefault();
    navigator.clipboard.writeText(articleUrl);
    onCopyLink();
  };

  const togglePopover = (statu, fireAnalyticsEvent) => {
    setIsPopoverOpen(prevState => !prevState);
    clickEvent(`Share: ${statu}`, fireAnalyticsEvent);
  };

  return (
    <TrackingContextProvider
      context="SaveAndSharBar"
    >
      {({ fireAnalyticsEvent }) => (
        <Stack
          data-testid="save-and-share-bar"
          flow="horizontal-center"
          spaceInline="space050"
          overrides={{ paddingBlock: "14px" }}
        >
          {sharingEnabled && (
            <StyledPopover
              placement="bottom"
              header="Share this article"
              overrides={{
                minWidth: { xs: "90%", md: "auto" }
              }}
              open={isPopoverOpen}
              onClick={() => togglePopover("Close", fireAnalyticsEvent)}
              content={
                <PopoverContent
                  flow={{ xs: "vertical-start", md: "horizontal-center" }}
                >
                  <SectionContext.Consumer>
                    {({ publicationName }) => (
                      <UserState
                        state={UserState.showTokenisedEmailShare}
                        fallback={
                          <EmailShare
                            {...props}
                            shouldTokenise={false}
                            publicationName={publicationName}
                            handleClick={() =>
                              clickEvent("Email", fireAnalyticsEvent)
                            }
                          />
                        }
                      >
                        <EmailShare
                          {...props}
                          shouldTokenise
                          publicationName={publicationName}
                          handleClick={() =>
                            clickEvent("Email", fireAnalyticsEvent)
                          }
                        />
                      </UserState>
                    )}
                  </SectionContext.Consumer>

                  <ShareItem
                    testId="share-twitter"
                    tooltipContent="Share on Twitter"
                    href={`${SharingApiUrls.twitter}?text=${articleUrl}`}
                    onClick={() => {
                      onShareOnTwitter();
                      clickEvent("Twitter", fireAnalyticsEvent);
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
                      onShareOnFB();
                      clickEvent("Facebook", fireAnalyticsEvent);
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
                    testId="copy-to-clickboard"
                    tooltipContent="Copy link to clipboard"
                    href={`${SharingApiUrls.facebook}?u=${articleUrl}`}
                    onClick={e => {
                      copyToClipboard(e);
                      clickEvent("Copy to clipboard", fireAnalyticsEvent);
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
                size="small"
                overrides={{ stylePreset: "buttonOutlinedPrimary" }}
                onClick={() =>
                  togglePopover(
                    !isPopoverOpen ? "Open" : "Close",
                    fireAnalyticsEvent
                  )
                }
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
                    <SaveButton
                      onClick={() => clickEvent("Save", fireAnalyticsEvent)}
                    />
                  </SaveStar>
                </div>
              </UserState>
              {isPreviewMode && (
                <div data-testid="save-star-preview">
                  <SaveStar articleId={articleId} isPreviewMode>
                    <SaveButton
                      onClick={() => clickEvent("Save", fireAnalyticsEvent)}
                    />
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

SaveAndShareBar.propTypes = {
  articleId: PropTypes.string.isRequired,
  articleUrl: PropTypes.string.isRequired,
  articleHeadline: PropTypes.string.isRequired,
  getTokenisedShareUrl: PropTypes.func,
  onCopyLink: PropTypes.func.isRequired,
  onShareOnFB: PropTypes.func,
  onShareEmail: PropTypes.func,
  onShareOnTwitter: PropTypes.func,
  savingEnabled: PropTypes.bool.isRequired,
  sharingEnabled: PropTypes.bool.isRequired,
  isPreviewMode: PropTypes.bool
};

/* Serves as an indication when share links are clicked for tracking and analytics */
SaveAndShareBar.defaultProps = {
  onShareOnFB: () => {},
  onShareOnTwitter: () => {},
  onShareEmail: () => {},
  getTokenisedShareUrl: getTokenisedArticleUrlApi,
  isPreviewMode: (PropTypes.bool = false)
};

export default SaveAndShareBar;
