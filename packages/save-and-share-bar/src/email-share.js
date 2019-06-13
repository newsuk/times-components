/* eslint-env browser */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, Text } from "react-native";
import { IconEmail } from "@times-components/icons";
import styles from "./styles";
import BarItem from "./bar-item";
import withTrackEvents from "./tracking/with-track-events";

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
          if (data) {
            this.setState({ isLoading: false });
            const { url } = data.article.tokenisedUrl;
            this.openMailClient(url);
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
    const { articleHeadline } = this.props;
    const mailtoEmailUrl = `mailto:?subject=${articleHeadline} from The Times&body=I thought you would be interested in this story from The Times%0A%0A${articleHeadline}%0A%0A${url}`;

    window.location.assign(mailtoEmailUrl);
  }

  render() {
    const { isLoading } = this.state;

    return (
      <Fragment>
        <Text style={styles.label}>Share</Text>
        <BarItem onPress={this.onShare}>
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
      </Fragment>
    );
  }
}

EmailShare.propTypes = {
  getTokenisedShareUrl: PropTypes.func.isRequired,
  onShareEmail: PropTypes.func.isRequired,
  articleUrl: PropTypes.string.isRequired,
  articleHeadline: PropTypes.string.isRequired,
  articleId: PropTypes.string.isRequired,
  shouldTokenise: PropTypes.bool.isRequired
};

export default withTrackEvents(EmailShare);
