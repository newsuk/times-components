import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import ArticleSummary from "@times-components/article-summary";
import Image from "@times-components/image";
import Loading from "./card-loading";
import styles from "./card-styles";

const horizontalBreakpoint = 500;
const isOrientationHorizontal = width => width > horizontalBreakpoint;

class CardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleLayout = this.handleLayout.bind(this);
    this.state = {
      isHorizontal: false,
      isLoaded: false
    };
  }

  handleLayout(event) {
    const { nativeEvent: { layout: { width } } } = event;
    const isHorizontal = isOrientationHorizontal(width);
    const isLoaded = this.state.isLoaded;
    if (!isLoaded || isHorizontal !== this.state.isHorizontal) {
      this.setState({ isHorizontal, isLoaded: true });
    }
  }
  render() {
    const { isLoaded, isHorizontal } = this.state;

    if (this.props.isLoading) {
      return (
        <View onLayout={this.handleLayout}>
          {isLoaded ? <Loading horizontal={isHorizontal} /> : null}
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
      text
    } = this.props;

    const layoutStyles = isHorizontal ? styles.horizontal : styles.vertical;
    const imageComponent =
      image && image.uri ? (
        <View
          style={[layoutStyles.childrenContainer, layoutStyles.imageContainer]}
        >
          <Image
            style={layoutStyles.image}
            uri={image.uri}
            aspectRatio={3 / 2}
          />
        </View>
      ) : null;

    return (
      <View onLayout={this.handleLayout}>
        {isLoaded ? (
          <View style={[layoutStyles.container, style]}>
            {imageComponent}
            <View
              style={[
                layoutStyles.childrenContainer,
                layoutStyles.summaryContainer
              ]}
            >
              <ArticleSummary
                label={label}
                headline={headline}
                text={text}
                date={date}
                publication={publication}
              />
            </View>
          </View>
        ) : null}
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
