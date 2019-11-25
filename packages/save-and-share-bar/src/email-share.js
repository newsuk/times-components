/* eslint-env browser */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator } from "react-native";
import { IconEmail } from "@times-components/icons";
import styles from "./styles";
import BarItem from "./bar-item";

class EmailShare extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
    this.onShare = this.onShare.bind(this);
  }

  onShare() {
    const {
      articleId,
      getTokenisedShareUrl,
      shouldTokenise,
      articleUrl,
      onShareEmail,
      articleHeadline
    } = this.props;

    onShareEmail({ articleId, articleUrl, articleHeadline });

    if (shouldTokenise) {
      this.setState({ isLoading: true });

      getTokenisedShareUrl(articleId)
        .then(res => {
          const { data } = res;
          if (data && data.article) {
            this.setState({ isLoading: false });
            this.openMailClient(data.article.tokenisedUrl);
          }
        })
        .catch(error => {
          this.setState({ isLoading: false });
          console.error("Error in connecting to api", error);
        });
    } else {
      const matches = window.location.search.match(/[?&]shareToken=([^&]+)/);

      this.openMailClient(
        matches ? `${articleUrl}?shareToken=${matches[1]}` : articleUrl
      );
    }
  }

  openMailClient(url) {
    const { articleHeadline, publicationName } = this.props;
    const publication =
      publicationName !== "TIMES" ? "The Sunday Times" : "The Times";

    const mailtoEmailUrl = `mailto:?subject=${articleHeadline} from ${publication}&body=I thought you would be interested in this story from ${publication}%0A%0A${articleHeadline}%0A%0A${url}`;

    window.location.assign(mailtoEmailUrl);
  }

  render() {
    const { isLoading } = this.state;

    return (
      <BarItem onPress={this.onShare} dataTestId="email-share">
        {isLoading ? (
          <ActivityIndicator size="small" style={styles.activityLoader} />
        ) : (
          <IconEmail
            fillColour="currentColor"
            height={styles.svgIcon.height}
            title="Share by email"
          />
        )}
      </BarItem>
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
  publicationName: PropTypes.string
};

EmailShare.defaultProps = {
  publicationName: "TIMES"
};

export default EmailShare;
