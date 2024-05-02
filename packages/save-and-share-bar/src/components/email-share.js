/* eslint-env browser */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { IconEmail, IconActivityIndicator } from "@times-components/icons";
import { ShareItem, ShareItemLabel } from "./share-item";
import { EmailSpinnerContainer } from "../styled";
import styles from "../styles";

class EmailShare extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
    this.onShare = this.onShare.bind(this);
  }

  onShare(e) {
    const {
      articleId,
      getTokenisedShareUrl,
      shouldTokenise,
      articleUrl,
      onShareEmail,
      articleHeadline,
      getDomainSpecificUrl,
      hostName
    } = this.props;

    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(
      { articleId, articleUrl, articleHeadline, getDomainSpecificUrl },
      "email-share.js 1"
    );

    onShareEmail({ articleId, articleUrl, articleHeadline });

    if (shouldTokenise) {
      this.setState({ isLoading: true });
      // eslint-disable-next-line no-console
      console.log("it came just before getTokenisedShareUrl");
      getTokenisedShareUrl(articleId)
        .then(res => {
          const { data } = res;
          // eslint-disable-next-line no-console
          console.log(res, "email-share.js 2");
          if (data && data.article) {
            // eslint-disable-next-line no-console
            console.log(data, "email-share.js 3");
            this.setState({ isLoading: false });
            // eslint-disable-next-line no-console
            console.log(hostName, "email-share.js 4");
            // eslint-disable-next-line no-console
            console.log(
              getDomainSpecificUrl,
              "getDomainSpecificUrl email-share.js 4"
            );
            this.openMailClient(
              getDomainSpecificUrl(hostName, data.article.tokenisedUrl)
            );
          }
        })
        .catch(() => {
          this.setState({ isLoading: false });
        });
    } else {
      const matches = window.location.search.match(/[?&]shareToken=([^&]+)/);

      this.openMailClient(
        matches ? `${articleUrl}?shareToken=${matches[1]}` : articleUrl
      );
    }
  }

  openMailClient(url) {
    // eslint-disable-next-line no-console
    console.log(url, "email-share.js 5");
    const { articleHeadline, publicationName } = this.props;
    const publication =
      publicationName !== "TIMES" ? "The Sunday Times" : "The Times";

    const mailtoEmailUrl = `mailto:?subject=${articleHeadline} from ${publication}&body=I thought you would be interested in this story from ${publication}%0A%0A${articleHeadline}%0A%0A${url}`;
    // eslint-disable-next-line no-console
    console.log(mailtoEmailUrl, "email-share.js 6");
    window.location.assign(mailtoEmailUrl);
  }

  render() {
    const { isLoading } = this.state;
    const { hostName, getDomainSpecificUrl } = this.props;
    // eslint-disable-next-line no-console
    console.log(this.props, "Props from email");
    // eslint-disable-next-line no-console
    console.log(
      'Test GetDomainSpecificUrl with "https://www.uat-thetimes.co.uk/article/22a4d6ab-ecac-4515-bea7-c72eb2207417?shareToken=16bf168b3b9d0d682b6c92dc768eee85"',
      getDomainSpecificUrl
        ? getDomainSpecificUrl(
            hostName,
            "https://www.uat-thetimes.co.uk/article/22a4d6ab-ecac-4515-bea7-c72eb2207417?shareToken=16bf168b3b9d0d682b6c92dc768eee85"
          )
        : "No getDomainSpecificUrl"
    );
    return (
      <ShareItem
        tooltipContent="Share by email"
        onClick={this.onShare}
        testId="email-share"
      >
        <ShareItemLabel
          icon={
            isLoading ? (
              <EmailSpinnerContainer>
                <IconActivityIndicator size="small" />
              </EmailSpinnerContainer>
            ) : (
              <IconEmail
                fillColour="currentColor"
                height={styles.svgIcon.height}
                title="Share by email"
              />
            )
          }
        >
          Email
        </ShareItemLabel>
      </ShareItem>
    );
  }
}

EmailShare.propTypes = {
  getTokenisedShareUrl: PropTypes.func.isRequired,
  onShareEmail: PropTypes.func.isRequired,
  articleUrl: PropTypes.string.isRequired,
  articleHeadline: PropTypes.string.isRequired,
  articleId: PropTypes.string.isRequired,
  shouldTokenise: PropTypes.bool.isRequired,
  publicationName: PropTypes.string,
  getDomainSpecificUrl: PropTypes.func.isRequired,
  hostName: PropTypes.string.isRequired
};

EmailShare.defaultProps = {
  publicationName: "TIMES"
};

export default EmailShare;
