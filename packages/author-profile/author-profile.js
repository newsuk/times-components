import get from "lodash.get";
import PropTypes from "prop-types";
import React from "react";
import { ScrollView } from "react-native";
import AuthorProfileContent from "./author-profile-content";
import AuthorProfileHeader from "./author-profile-header";

const Component = props => {
  const headerProps = {
    count: get(props, "data.count", 0),
    onNext: props.onNext,
    onPrev: props.onPrev,
    page: props.page,
    pageSize: props.pageSize,
    slug: props.slug
  };

  return (
    <ScrollView>
      <AuthorProfileHeader {...headerProps} />
      <AuthorProfileContent {...props} />
    </ScrollView>
  );
};

Component.propTypes = {
  slug: PropTypes.string.isRequired,
  onNext: AuthorProfileHeader.propTypes.onNext,
  onPrev: AuthorProfileHeader.propTypes.onPrev,
  page: AuthorProfileHeader.propTypes.page,
  pageSize: AuthorProfileHeader.propTypes.pageSize
};

Component.defaultProps = {
  onNext: () => {},
  onPrev: () => {},
  page: 1,
  pageSize: 10
};

export default Component;
