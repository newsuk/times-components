import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import AuthorHead from "@times-components/author-head";
import { addTrackingContext } from "@times-components/tracking";
import Pagination, {
  PaginationWithTracking
} from "@times-components/pagination";

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "center"
  },
  spacing: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    maxWidth: 800
  }
});

const makeAuthorProfileHeader = Page => {
  const AuthorProfileHeader = ({
    count,
    biography: bio,
    page,
    generatePageLink,
    image: uri,
    jobTitle: title,
    name,
    onNext,
    onPrev,
    pageSize,
    twitter
  }) => {
    const authorProps = {
      bio,
      name,
      uri,
      title,
      twitter
    };

    const paginationProps = {
      count,
      generatePageLink,
      onNext,
      onPrev,
      page,
      pageSize
    };

    return (
      <View>
        <AuthorHead {...authorProps} />
        <View style={styles.container}>
          <View style={styles.spacing}>
            <Page {...paginationProps} />
          </View>
        </View>
      </View>
    );
  };

  AuthorProfileHeader.propTypes = {
    biography: AuthorHead.propTypes.bio,
    count: Page.propTypes.count,
    image: AuthorHead.propTypes.uri,
    generatePageLink: Page.propTypes.generatePageLink,
    jobTitle: AuthorHead.propTypes.title,
    name: AuthorHead.propTypes.name,
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    page: Page.propTypes.page,
    pageSize: Page.propTypes.pageSize,
    twitter: AuthorHead.propTypes.twitter
  };

  AuthorProfileHeader.defaultProps = {
    count: 0,
    biography: null,
    page: 0,
    generatePageLink: page => `?page=${page}`,
    image: null,
    jobTitle: null,
    name: null,
    onNext: () => {},
    onPrev: () => {},
    pageSize: 20,
    twitter: null
  };

  return AuthorProfileHeader;
};

export const AuthorProfileHeaderWithTracking = addTrackingContext(
  makeAuthorProfileHeader(PaginationWithTracking)
);

export default makeAuthorProfileHeader(Pagination);
