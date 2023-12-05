import React from "react";
import { TcText, checkStylesForUnits } from "@times-components/utils";
import PropTypes from "prop-types";
import renderTrees, {
  propTypes as treePropTypes
} from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";
import styles from "./styles";

const AuthorProfileHeadBiography = ({ biography }) => (
  <TcText
    style={checkStylesForUnits(styles.biography)}
    data-testid="author-bio"
  >
    {renderTrees(biography, coreRenderers)}
  </TcText>
);

AuthorProfileHeadBiography.propTypes = {
  biography: PropTypes.arrayOf(treePropTypes).isRequired
};

export default AuthorProfileHeadBiography;
