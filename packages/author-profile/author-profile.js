import React from "react";
import PropTypes from "prop-types";
import { ScrollView, StyleSheet } from "react-native";
import { withPageState } from "@times-components/pagination";
import AuthorProfileArticles from "./author-profile-articles";
import AuthorProfileHeader from "./author-profile-header";
import AuthorProfilePagination from "./author-profile-pagination";

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    maxWidth: 800
  }
});

const AuthorProfile = ({ onNext, onPrev, ...props }) => (
  <ScrollView containerStyle={styles.container}>
    <AuthorProfileHeader {...props} />
    <AuthorProfilePagination {...props} onNext={onNext} onPrev={onPrev} />
    <AuthorProfileArticles {...props} />
    <AuthorProfilePagination {...props} onNext={onNext} onPrev={onPrev} />
  </ScrollView>
);

AuthorProfile.propTypes = {
  onNext: PropTypes.func,
  onPrev: PropTypes.func
};

AuthorProfile.defaultProps = {
  result: null,
  error: null,
  loading: true,
  onNext: () => {},
  onPrev: () => {},
  page: 1,
  pageSize: 10
};

export default withPageState(AuthorProfile);
