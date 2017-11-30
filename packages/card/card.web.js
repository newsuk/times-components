import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import ArticleSummary from "@times-components/article-summary";
import Image from "@times-components/image";
import Loading from "./card-loading";
import {
  ImageContainer,
  SummaryContainer,
  CardContainer
} from "./card-styles.web";

class CardComponent extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { image: { uri }, imageSize, isLoading } = this.props;
    return (
      uri !== nextProps.image.uri ||
      imageSize !== nextProps.imageSize ||
      isLoading !== nextProps.isLoading
    );
  }
  render() {
    const {
      isLoading,
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

    if (isLoading) {
      return (
        <View>
          <Loading imageRatio={imageRatio} />
        </View>
      );
    }

    const imageComponent =
      image && image.uri ? (
        <ImageContainer>
          <Image
            uri={`${image.uri}&resize=${imageSize || 100}`}
            aspectRatio={imageRatio}
          />
        </ImageContainer>
      ) : null;

    return (
      <View>
        <CardContainer style={style}>
          {imageComponent}
          <SummaryContainer>
            <ArticleSummary
              label={label}
              headline={headline}
              text={text}
              date={date}
              publication={publication}
            />
          </SummaryContainer>
        </CardContainer>
      </View>
    );
  }
}

CardComponent.propTypes = {
  image: PropTypes.shape({ uri: PropTypes.string }),
  ...ArticleSummary.propTypes
};

CardComponent.defaultProps = {
  image: {
    uri: ""
  }
};

export default CardComponent;
