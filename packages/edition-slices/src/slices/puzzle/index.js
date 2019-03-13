import React, { Fragment } from "react";
import { View } from "react-native";
import Link from "@times-components/link";
import Image from "@times-components/image";
import { ArticleSummaryHeadline } from "@times-components/article-summary";
import propTypes from "./proptypes";
import styles from "./styles";
import withTracking from "./puzzle-tracking-events";

const Puzzle = ({ onPress, slice: { tiles } }) => {
  const { main, header, headLine, body } = styles;

  return (
    <Fragment>
      {tiles.map(({ id, title, url, image }) => (
        <Link onPress={e => onPress(e, { url })} url={url} key={id}>
          <View style={main}>
            <View style={header}>
              <ArticleSummaryHeadline headline={title} style={headLine} />
            </View>
            <View style={body}>
              <Image aspectRatio={3 / 2} uri={image.crop32.url} />
            </View>
          </View>
        </Link>
      ))}
    </Fragment>
  );
};

Puzzle.propTypes = propTypes;

export default withTracking(Puzzle);
