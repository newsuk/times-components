//@flow

import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import ArticleSummary from "@times-components/article-summary";
import Card from "@times-components/card";
import Link, { TextLink } from "@times-components/link";
import { IconChevronRight } from "@times-components/icons";
import withResponsiveStyles from "@times-components/responsive-styles";
import styles from "./styles";

const TextContainer = withResponsiveStyles(View, {
  base: () => `
    padding-top: 0px;
  `,
  mediumUp: () => `
    padding-top: 10px;
    padding-left: 0;
  `
});

type PuffType = {|
  headline: string,
  label?: string,
  text: *, // @TODO: What is the type of "markup"?
  link: string,
  linkText?: string,
  sectionName: string,
  image?: string,
  imageRatio?: number,
  imageSize?: number,
  onPress: Event => void
|};

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
}: PuffType) => (
  <View style={[styles.root, styles[`section${sectionName}`]]}>
    <Link url={link} onPress={onPress}>
      <Card
        image={image}
        imageRatio={imageRatio}
        imageSize={imageSize}
        showImage={!!image}
      >
        <TextContainer style={styles.textContainer}>
          <ArticleSummary label={label} headline={headline} text={text} />

          <Text style={styles.link}>
            {linkText}{" "}
            <IconChevronRight width={10} height={10} fillColour="#CD0000" />
          </Text>
        </TextContainer>
      </Card>
    </Link>
  </View>
);

export default Puff;
