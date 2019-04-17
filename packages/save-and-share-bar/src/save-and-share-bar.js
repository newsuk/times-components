import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import Link from "@times-components/link";
import styled from "styled-components";
import {
  IconEmail,
  IconFacebook,
  IconTwitter,
  IconCopyLink,
  IconSaveBookmark
} from "@times-components/icons";
import SharingApiUrls from "./constants";
import styles from "./styles";

/* eslint-disable jsx-a11y/anchor-is-valid */
class SaveAndShareBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copyClicked: false,
      emailClicked: false,
      fbClicked: false,
      saveClicked: false,
      twClicked: false
    };

    this.onCopyLink = this.onCopyLink.bind(this);
    this.onShareOnEmail = this.onShareOnEmail.bind(this);
    this.onSaveToMyArticles = this.onSaveToMyArticles.bind(this);
    this.onFbClick = this.onFbClick.bind(this);
    this.onTwClick = this.onTwClick.bind(this);
  }

  onClick(iconClicked) {
    this.setState({
      [iconClicked]: true
    });

    setTimeout(() => {
      this.setState({
        [iconClicked]: false
      });
    }, 1000);
  }

  onCopyLink(e) {
    this.onClick("copyClicked");
    const { onCopyLink } = this.props;
    onCopyLink(e);
  }

  onShareOnEmail(e) {
    this.onClick("emailClicked");
    const { onShareOnEmail } = this.props;
    onShareOnEmail(e);
  }

  onSaveToMyArticles(e) {
    this.onClick("saveClicked");
    const { onSaveToMyArticles } = this.props;
    onSaveToMyArticles(e);
  }

  onFbClick() {
    this.onClick("fbClicked");
  }

  onTwClick() {
    this.onClick("twClicked");
  }

  render() {
    const { articleUrl } = this.props;

    const {
      copyClicked,
      emailClicked,
      fbClicked,
      saveClicked,
      twClicked
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Share</Text>
          <Link
            onPress={this.onShareOnEmail}
            responsiveLinkStyles={
              emailClicked ? styles.clickedLink : styles.link
            }
          >
            <HoverIcon
              color={styles.svgIcon.fillColour}
              hoverColor={styles.svgIcon.hoverFillColour}
            >
              <IconEmail
                fillColour="currentColor"
                height={styles.svgIcon.height}
                title="Share by email client"
              />
            </HoverIcon>
          </Link>
          <Link
            onPress={this.onTwClick}
            responsiveLinkStyles={twClicked ? styles.clickedLink : styles.link}
            target="_blank"
            url={`${SharingApiUrls.twitter}?text=${articleUrl}`}
          >
            <HoverIcon
              color={styles.svgIcon.fillColour}
              hoverColor={styles.svgIcon.hoverFillColour}
            >
              <IconTwitter
                fillColour="currentColor"
                height={styles.svgIcon.height}
                title="Share on tweeter"
              />
            </HoverIcon>
          </Link>
          <Link
            onPress={this.onFbClick}
            responsiveLinkStyles={fbClicked ? styles.clickedLink : styles.link}
            target="_blank"
            url={`${SharingApiUrls.facebook}?text=${articleUrl}`}
          >
            <HoverIcon
              color={styles.svgIcon.fillColour}
              hoverColor={styles.svgIcon.hoverFillColour}
            >
              <IconFacebook
                fillColour="currentColor"
                height={styles.svgIcon.fb.height}
                title="Share on facebook"
              />
            </HoverIcon>
          </Link>
          <Link
            onPress={this.onCopyLink}
            responsiveLinkStyles={
              copyClicked ? styles.clickedLink : styles.link
            }
          >
            <HoverIcon
              color={styles.svgIcon.fillColour}
              hoverColor={styles.svgIcon.hoverFillColour}
            >
              <IconCopyLink
                fillColour="currentColor"
                height={styles.svgIcon.height}
                title="Copy link on clipboard"
              />
            </HoverIcon>
          </Link>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Save</Text>
          <Link
            onPress={this.onSaveToMyArticles}
            responsiveLinkStyles={
              saveClicked ? styles.clickedLink : styles.link
            }
          >
            <HoverIcon
              color={styles.svgIcon.save.strokeColour}
              hoverColor={styles.svgIcon.hoverFillColour}
            >
              <IconSaveBookmark
                fillColour={styles.svgIcon.save.fillColour}
                strokeColour="currentColor"
                title="Save to My Articles"
              />
            </HoverIcon>
          </Link>
        </View>
      </View>
    );
  }
}

const HoverIcon = styled.div`
  color: ${props => props.color};

  &:hover {
    color: ${props => props.hoverColor || props.color};
  }
`;

SaveAndShareBar.propTypes = {
  articleUrl: PropTypes.string.isRequired,
  onCopyLink: PropTypes.func.isRequired,
  onSaveToMyArticles: PropTypes.func.isRequired,
  onShareOnEmail: PropTypes.func.isRequired
};

export default SaveAndShareBar;
