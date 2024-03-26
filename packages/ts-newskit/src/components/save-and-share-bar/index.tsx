import React from "react";
import {
  IconFacebook,
  IconTwitter,
  IconCopyLink
} from "@times-components/icons";
import UserState from "@times-components/user-state";
import { SectionContext } from "@times-components/context";
import { Stack } from "newskit";
import { SaveStar, TrackingContextProvider } from "@times-components/ts-components";
import { Share } from "@emotion-icons/bootstrap/Share";

import SharingApiUrls from "./constants";
import styles from "./styles";

import { StyledButton, PopoverContent, StyledPopover } from "./style";
import EmailShare from "./email-share";
import SaveButton from "./save-button";
import { ShareItem, ShareItemLabel } from "./share-item";

const SaveAndShareBar =(props:any) => {
 const clickEvent = (title:string,articleHeadline:string,fireAnalyticsEvent:any) => {
    if(fireAnalyticsEvent){
      return {
        action: 'Clicked',
        attrs: {
          event_navigation_action: 'navigation',
          event_navigation_name: title === "Share" ? `share bar : ${title} : social share ${title}` : null,
          event_navigation_browsing_method: 'click',
          event_social_action: title !== "Share" ? 'share start' : null,
          social_platform: title,
          article_parent_name: `article : ${articleHeadline}`
        }
      };
    }
    return
  }


 const copyToClipboard =(e:any) => {
    const { onCopyLink, articleUrl } = props;
    e.preventDefault();

    navigator.clipboard.writeText(articleUrl);
    onCopyLink();
  }

    const {
      articleId,
      articleUrl,
      savingEnabled,
      sharingEnabled,
      onShareOnFB,
      onShareOnTwitter,
      isPreviewMode,
      articleHeadline
    } = props;

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
              minWidth: { xs: "90%", md: "auto" }
            }}
            content={
              <PopoverContent
                flow={{ xs: "vertical-left", md: "horizontal-center" }}
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
                  onClick={onShareOnTwitter}
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
                  onClick={()=>{
                      onShareOnFB;
                      clickEvent("Facebook",articleHeadline,fireAnalyticsEvent)
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
                  onClick={copyToClipboard}
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
                  <SaveButton />
                </SaveStar>
              </div>
            </UserState>
            {isPreviewMode && (
              <div data-testid="save-star-preview">
                <SaveStar articleId={articleId} isPreviewMode>
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
  }


export default SaveAndShareBar;
