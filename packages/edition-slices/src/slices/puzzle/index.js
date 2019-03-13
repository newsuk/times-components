import React from "react";
import { View } from "react-native";
import Link from "@times-components/link";
import Image from "@times-components/image";
import { ArticleSummaryHeadline } from "@times-components/article-summary";
import propTypes from "./proptypes";
import styles from "./styles";
import withTracking from "./puzzle-tracking-events";

const Puzzle = ({ onPress, slice: { id, title, url, image } }) => {
  const { main, header, headLine, body } = styles;

  return (
    <Link onPress={e => onPress({ id, title, url })} url={url}>
      <View style={main}>
        <View style={header}>
          <ArticleSummaryHeadline headline={title} style={headLine} />
        </View>
        <View style={body}>
          <Image aspectRatio={3 / 2} uri={image.crop32.url} />
        </View>
      </View>
    </Link>
  );
};

Puzzle.propTypes = propTypes;

export default withTracking(Puzzle);
