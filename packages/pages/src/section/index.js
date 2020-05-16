import React from "react";
import PropTypes from "prop-types";

import { ErrorBoundary } from '../error-boundary';
import Section from "./section";

const SectionPage = ({
  publicationName,
  recentlyOpenedPuzzleCount,
  section
}) => (
  <ErrorBoundary>
    <Section
      publicationName={publicationName}
      recentlyOpenedPuzzleCount={recentlyOpenedPuzzleCount}
      section={JSON.parse(section)}
    />
  </ErrorBoundary>
);

SectionPage.propTypes = {
  publicationName: PropTypes.string,
  recentlyOpenedPuzzleCount: PropTypes.number,
  section: PropTypes.string.isRequired
};

SectionPage.defaultProps = {
  publicationName: "TIMES",
  recentlyOpenedPuzzleCount: 0
};

export default SectionPage;
