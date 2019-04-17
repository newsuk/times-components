import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import Link from "@times-components/link";
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
      copyColour: styles.svgIcon.fillColour,
      emailClicked: false,
      emailColour: styles.svgIcon.fillColour,
      fbClicked: false,
      fbColour: styles.svgIcon.fillColour,
      saveClicked: false,
      saveColour: styles.svgIcon.save.strokeColour,
      twClicked: false,
      twColour: styles.svgIcon.fillColour
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

  updateIconStyle(iconColour, colour) {
    this.setState({
      [iconColour]: colour
    });
  }

  render() {
    const { articleUrl } = this.props;

    const {
      copyClicked,
      copyColour,
      emailClicked,
      emailColour,
      fbClicked,
      fbColour,
      saveClicked,
      saveColour,
      twClicked,
      twColour
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Share</Text>
          <View
            onMouseEnter={() =>
              this.updateIconStyle(
                "emailColour",
                styles.svgIcon.hoverFillColour
              )
            }
            onMouseLeave={() =>
              this.updateIconStyle("emailColour", styles.svgIcon.fillColour)
            }
          >
            <Link
              onPress={this.onShareOnEmail}
              responsiveLinkStyles={
                emailClicked ? styles.clickedLink : styles.link
              }
            >
              <IconEmail
                fillColour={emailColour}
                height={styles.svgIcon.height}
                title="Share by email client"
              />
            </Link>
          </View>
          <View
            onMouseEnter={() =>
              this.updateIconStyle("twColour", styles.svgIcon.hoverFillColour)
            }
            onMouseLeave={() =>
              this.updateIconStyle("twColour", styles.svgIcon.fillColour)
            }
          >
            <Link
              onPress={this.onTwClick}
              responsiveLinkStyles={
                twClicked ? styles.clickedLink : styles.link
              }
              target="_blank"
              url={`${SharingApiUrls.twitter}?text=${articleUrl}`}
            >
              <IconTwitter
                fillColour={twColour}
                height={styles.svgIcon.height}
                title="Share on tweeter"
              />
            </Link>
          </View>
          <View
            onMouseEnter={() =>
              this.updateIconStyle("fbColour", styles.svgIcon.hoverFillColour)
            }
            onMouseLeave={() =>
              this.updateIconStyle("fbColour", styles.svgIcon.fillColour)
            }
          >
            <Link
              onPress={this.onFbClick}
              responsiveLinkStyles={
                fbClicked ? styles.clickedLink : styles.link
              }
              target="_blank"
              url={`${SharingApiUrls.facebook}?text=${articleUrl}`}
            >
              <IconFacebook
                fillColour={fbColour}
                height={styles.svgIcon.fb.height}
                title="Share on facebook"
              />
            </Link>
          </View>
          <View
            onMouseEnter={() =>
              this.updateIconStyle("copyColour", styles.svgIcon.hoverFillColour)
            }
            onMouseLeave={() =>
              this.updateIconStyle("copyColour", styles.svgIcon.fillColour)
            }
          >
            <Link
              onPress={this.onCopyLink}
              responsiveLinkStyles={
                copyClicked ? styles.clickedLink : styles.link
              }
            >
              <IconCopyLink
                fillColour={copyColour}
                height={styles.svgIcon.height}
                title="Copy link on clipboard"
              />
            </Link>
          </View>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Save</Text>
          <View
            onMouseEnter={() =>
              this.updateIconStyle("saveColour", styles.svgIcon.hoverFillColour)
            }
            onMouseLeave={() =>
              this.updateIconStyle(
                "saveColour",
                styles.svgIcon.save.strokeColour
              )
            }
          >
            <Link
              onPress={this.onSaveToMyArticles}
              responsiveLinkStyles={
                saveClicked ? styles.clickedLink : styles.link
              }
            >
              <IconSaveBookmark
                fillColour={styles.svgIcon.save.fillColour}
                strokeColour={saveColour}
                title="Save to My Articles"
              />
            </Link>
          </View>
        </View>
      </View>
    );
  }
}

SaveAndShareBar.propTypes = {
  articleUrl: PropTypes.string.isRequired,
  onCopyLink: PropTypes.func.isRequired,
  onSaveToMyArticles: PropTypes.func.isRequired,
  onShareOnEmail: PropTypes.func.isRequired
};

export default SaveAndShareBar;
