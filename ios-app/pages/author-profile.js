import React from "react";
import PropTypes from "prop-types";
import { NativeModules } from "react-native";
import { AuthorProfile } from "@times-components/pages";

const { onArticlePress } = NativeModules.NativeModuleArticleActions;
const { onTwitterLinkPress } = NativeModules.NativeModuleSocialActions;
const config = NativeModules.NativeModuleReactConfig;
const { fetch } = NativeModules.NativeModuleFetch;
const { track } = NativeModules.NativeModuleAnalytics;

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
