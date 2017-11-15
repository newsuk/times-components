import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import ArticleSummary from "@times-components/article-summary";
import Image from "@times-components/image";
import Loading from "./card-loading";
import { ImageContainer, SummaryContainer, CardContainer } from "./card-styles";

const CardComponent = ({
  isLoading,
  date,
  headline,
  image,
  label,
  publication,
  style,
  text
}) => {
  if (isLoading) {
    return (
      <View>
        <Loading />
      </View>
    );
  }

  const imageComponent =
    image && image.uri ? (
      <ImageContainer>
        <Image uri={image.uri} aspectRatio={3 / 2} />
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
};

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
