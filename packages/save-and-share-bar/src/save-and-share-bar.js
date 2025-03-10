/* eslint-env browser */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  IconFacebook,
  IconTwitter,
  IconCopyLink
} from "@times-components/icons";
import UserState from "@times-components/user-state";
import { SectionContext } from "@times-components/context";
import { SaveStar } from "@times-components/ts-components";

import { checkForSymphonyExperiment } from "@times-components/utils";
import getTokenisedArticleUrlApi from "./get-tokenised-article-url-api";
import withTrackEvents from "./tracking/with-track-events";
import SharingApiUrls from "./constants";
import styles from "./styles";

import {
  SaveAndShareBarContainer,
  ShareButtonContainer,
  ShareButtonHighlightContainer,
  ShareButtonHighlight,
  OutlineButton,
  Popover,
  PopoverHeader,
  PopoverContent,
  CloseButton
} from "./styled";
import CloseIcon from "./assets/close-icon";
import EmailShare from "./components/email-share";
import SaveButton from "./components/save-button";
import { ShareItem, ShareItemLabel } from "./components/share-item";
import ShareIcon from "./assets/share-icon";

function SaveAndShareBar(props) {
  const {
    articleId,
    articleUrl,
    savingEnabled,
    sharingEnabled,
    onShareBarExpend,
    onShareBarClose,
    onShareOnFB,
    onShareOnTwitter,
    onSaveToMyArticles,
    onRemoveFromMyArticles,
    isPreviewMode
  } = props;

  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [windowHeight, setWindowHeight] = React.useState(null);
  const [windowWidth, setWindowWidth] = React.useState(null);
  const [shareButtonClicked, setShareButtonClicked] = React.useState(false);

  const barRef = React.useRef();
  const shareBtnRef = React.useRef();
  const popoverRef = React.useRef();

  // Set window height after hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    }
  }, []);

  // Add event listener to close popover when clicked outside
  useEffect(() => {
    if (!popoverRef.current) return undefined;
    function clickHandler(event) {
      // Close popover if clicked outside popover or on share button
      if (
        !popoverRef.current.contains(event.target) &&
        event.target !== shareBtnRef.current
      ) {
        setPopoverOpen(false);
      }
    }

    document.body.addEventListener("click", clickHandler);

    return () => {
      document.body.removeEventListener("click", clickHandler);
    };
  }, []);

  const barPosition = barRef.current
    ? barRef.current.getBoundingClientRect().bottom
    : windowHeight;

  // Position the popover at the top if the bar length is less than 400px from the bottom
  function getPosition() {
    const isLargeDevice = windowWidth && windowWidth > 449;
    const threshold = isLargeDevice ? 250 : 400;
    if (!windowHeight) return "bottom";
    if (windowHeight - barPosition > threshold) {
      return "bottom";
    }
    return "top";
  }

  const togglePopover = () => {
    if (!popoverOpen) {
      onShareBarExpend();
    } else {
      onShareBarClose();
    }
    setPopoverOpen(prev => !prev);
  };

  const handleClick = e => {
    e.preventDefault();
    setShareButtonClicked(true);
    togglePopover();
  };

  function copyToClipboard(e) {
    const { onCopyLink } = props;
    e.preventDefault();

    navigator.clipboard.writeText(articleUrl);
    onCopyLink();
  }

  const isSymphonyExperiment = checkForSymphonyExperiment();
  const showShareButtonHighlight = isSymphonyExperiment && !shareButtonClicked;

  return (
    <SaveAndShareBarContainer data-testid="save-and-share-bar" ref={barRef}>
      {sharingEnabled && (
        <ShareButtonContainer>
          <OutlineButton
            ref={shareBtnRef}
            isPopoverOpen={popoverOpen}
            onClick={handleClick}
          >
            <ShareIcon height={14} width={14} />
            Share
          </OutlineButton>
          {showShareButtonHighlight && (
            <ShareButtonHighlightContainer data-testId="share-button-highlight">
              <ShareButtonHighlight />
            </ShareButtonHighlightContainer>
          )}
          <Popover
            ref={popoverRef}
            position={getPosition()}
            isOpen={popoverOpen}
            aria-expanded={popoverOpen}
          >
            <PopoverHeader>
              <h3>Share this article</h3>
              <CloseButton onClick={togglePopover}>
                <CloseIcon />
              </CloseButton>
            </PopoverHeader>
            <PopoverContent>
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
                      ariaLabel=""
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
                onClick={onShareOnFB}
              >
                <ShareItemLabel
                  icon={
                    <IconFacebook
                      ariaLabel=""
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
                      ariaLabel=""
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
          </Popover>
        </ShareButtonContainer>
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
                  onSaveToMyArticles={onSaveToMyArticles}
                  onRemoveFromMyArticles={onRemoveFromMyArticles}
                />
              </SaveStar>
            </div>
          </UserState>
          {isPreviewMode && (
            <div data-testid="save-star-preview">
              <SaveStar isPreviewMode>
                <SaveButton />
              </SaveStar>
            </div>
          )}
        </>
      ) : null}
    </SaveAndShareBarContainer>
  );
}

SaveAndShareBar.propTypes = {
  articleId: PropTypes.string.isRequired,
  articleUrl: PropTypes.string.isRequired,
  articleHeadline: PropTypes.string.isRequired,
  getTokenisedShareUrl: PropTypes.func,
  onCopyLink: PropTypes.func.isRequired,
  onShareBarExpend: PropTypes.func,
  onShareBarClose: PropTypes.func,
  onShareOnFB: PropTypes.func,
  onShareEmail: PropTypes.func,
  onShareOnTwitter: PropTypes.func,
  onSaveToMyArticles: PropTypes.func,
  onRemoveFromMyArticles: PropTypes.func,
  savingEnabled: PropTypes.bool.isRequired,
  sharingEnabled: PropTypes.bool.isRequired,
  isPreviewMode: PropTypes.bool,
  hostName: PropTypes.string.isRequired
};

/* Serves as an indication when share links are clicked for tracking and analytics */
SaveAndShareBar.defaultProps = {
  onShareBarExpend: () => {},
  onShareBarClose: () => {},
  onShareOnFB: () => {},
  onShareOnTwitter: () => {},
  onShareEmail: () => {},
  onSaveToMyArticles: () => {},
  onRemoveFromMyArticles: () => {},
  getTokenisedShareUrl: getTokenisedArticleUrlApi,
  isPreviewMode: (PropTypes.bool = false)
};

export default withTrackEvents(SaveAndShareBar);
