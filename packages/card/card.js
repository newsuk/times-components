import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import ArticleSummary from "@times-components/article-summary";
import Image from "@times-components/image";
import Loading from "./card-loading";

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 10
  }
});

class CardComponent extends React.Component {
  render() {
    if (this.props.isLoading) {
      return (
        <View>
          <Loading aspectRatio={this.props.imageRatio} />
        </View>
      );
    }

    const {
      date,
      headline,
      image,
      label,
      publication,
      style,
      text,
      imageRatio,
      imageSize
    } = this.props;

    const imageComponent =
      image && image.uri ? (
        <View style={styles.imageContainer}>
          <Image
            uri={`${image.uri}&resize=${imageSize}`}
            aspectRatio={imageRatio}
          />
        </View>
      ) : null;

    return (
      <View onLayout={this.handleLayout}>
        <View style={style}>
          {imageComponent}
          <View>
            <ArticleSummary
              label={label}
              headline={headline}
              text={text}
              date={date}
              publication={publication}
            />
          </View>
        </View>
      </View>
    );
  }
}

CardComponent.propTypes = {
  image: PropTypes.shape({ uri: PropTypes.string }),
  ...ArticleSummary.propTypes,
  isLoading: PropTypes.bool
};

CardComponent.defaultProps = {
  image: {
    uri: ""
  },
  isLoading: false,
  ...ArticleSummary.defaultProps
};

export default CardComponent;
