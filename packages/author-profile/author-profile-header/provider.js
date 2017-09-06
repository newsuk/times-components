import React from "react";
import PropTypes from "prop-types";
import { AuthorHeadProvider } from "@times-components/provider";

const AuthorProfileHeader = ({ slug, children }) => (
  <AuthorHeadProvider slug={slug}>{children}</AuthorHeadProvider>
);

AuthorProfileHeader.propTypes = {
  slug: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};

export default AuthorProfileHeader;
