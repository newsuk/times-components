import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import Link from "@times-components/link";
import { PuzzleSlice } from "@times-components/slice-layout";
import { fonts } from "@times-components/styleguide";
import { ArticleSummaryHeadline } from "@times-components/article-summary";

const Puzzle = ({ onPress, slice: { title, url, image } }) => (
  <Link onPress={e => onPress(e, { url })} url={url}>
    <PuzzleSlice
      renderBody={() => <Image aspectRatio={3 / 2} uri={image} />}
      renderHeader={() => (
        <ArticleSummaryHeadline
          headline={title}
          style={{ fontFamily: fonts.headline, fontSize: 25 }}
        />
      )}
    />
  </Link>
);

Puzzle.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string
  }).isRequired
};

export default Puzzle;
