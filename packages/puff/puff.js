// @flow

import React from "react";
import { View, Text } from "react-native";
import ArticleSummary from "@times-components/article-summary";
import Card from "@times-components/card";
import Link from "@times-components/link";
import { IconChevronRight } from "@times-components/icons";
import styles from "./styles";

import type { PuffProps } from "./puff.flow";

const Puff = ({
  headline,
  label,
  text,
  link,
  linkText = "Read more",
  sectionName,
  image,
  imageRatio,
  imageSize,
  onPress
}: PuffProps) => (
  <View style={[styles.root, styles[`section${sectionName}`]]}>
    <Link url={link} onPress={onPress}>
      <Card
        image={image}
        imageRatio={imageRatio}
        imageSize={imageSize}
        showImage={!!image}
      >
        <ArticleSummary label={label} headline={headline} text={text} />

        <View style={styles.linkContainer}>
          <Text style={styles.link}>{linkText}</Text>
          <IconChevronRight width={10} height={10} fillColour="#CD0000" />
        </View>
      </Card>
    </Link>
  </View>
);

export default Puff;
