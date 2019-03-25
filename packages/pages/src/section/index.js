import React from "react";
import PropTypes from "prop-types";
import Section from "./section";

const SectionPage = ({
  publicationName,
  recentlyOpenedPuzzleCount,
  section
}) => (
  <Section
    publicationName={publicationName}
    recentlyOpenedPuzzleCount={recentlyOpenedPuzzleCount}
    section={JSON.parse(section)}
  />
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
