import React from "react";
import { View } from "react-native";
import Link from "@times-components/link";
import Image from "@times-components/image";
import { ArticleSummaryHeadline } from "@times-components/article-summary";
import { editionBreakpoints } from "@times-components/styleguide";
import propTypes from "./proptypes";
import stylesFactory from "./styles";
import { ResponsiveSlice } from "../shared";
import withTracking from "./puzzle-tracking-events";

const Puzzle = ({ onPress, slice: { puzzles } }) => {
  const renderPuzzles = (breakpoint = editionBreakpoints.small) => {
    const {
      container,
      puzzleContainer,
      header,
      headLine,
      imageContainer,
      link
    } = stylesFactory(breakpoint);

    return (
      <View style={container}>
        {puzzles.map(({ id, title, url, image }) => (
          <Link
            key={id}
            linkStyle={link}
            onPress={e => onPress(e, { url })}
            url={url}
          >
            <View style={puzzleContainer}>
              <View style={header}>
                <ArticleSummaryHeadline headline={title} style={headLine} />
              </View>
              <View style={imageContainer}>
                <Image aspectRatio={3 / 2} uri={image.crop32.url} />
              </View>
            </View>
          </Link>
        ))}
      </View>
    );
  };

  return (
    <ResponsiveSlice
      renderMedium={breakpoint => renderPuzzles(breakpoint)}
      renderSmall={breakpoint => renderPuzzles(breakpoint)}
    />
  );
};

Puzzle.propTypes = propTypes;

export default withTracking(Puzzle);
