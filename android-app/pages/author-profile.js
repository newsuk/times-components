import React from "react";
import PropTypes from "prop-types";
import { NativeModules } from "react-native";
import { AuthorProfile } from "@times-components/pages";

const config = NativeModules.ReactConfig;
const { track } = NativeModules.ReactAnalytics;
const { fetch } = NativeModules.NativeFetch;
const {
  onArticlePress,
  onTwitterLinkPress
} = NativeModules.AuthorProfileEvents;

const AuthorProfilePageView = AuthorProfile(config)(fetch);

const AuthorProfileView = ({ authorSlug }) => (
  <AuthorProfilePageView
    authorSlug={authorSlug}
    onTwitterLinkPress={url => onTwitterLinkPress(url)}
    onArticlePress={url => onArticlePress(url)}
    analyticsStream={track}
  />
);

AuthorProfileView.propTypes = {
  authorSlug: PropTypes.string.isRequired
};

export default AuthorProfileView;
