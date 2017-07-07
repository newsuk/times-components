import React from "react";
import { View, StyleSheet } from "react-native";
import ArticleSummary from "@times-components/article-summary";
import Image from "@times-components/image";

const horizontalBreakpoint = 500;

const getStyles = isHorizontal =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: isHorizontal ? "row" : "column"
    },
    imageContainer: {
      width: isHorizontal ? "40%" : "100%",
      paddingRight: isHorizontal ? 17 : 0
    },
    summaryContainer: {
      paddingRight: isHorizontal ? "8%" : 0,
      width: isHorizontal ? "60%" : "100%"
    }
  });

class CardComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleLayout = this.handleLayout.bind(this);
    this.state = {
      isHorizontal: false
    };
  }
  handleLayout(event) {
    const width = event.nativeEvent.layout.width;
    const isHorizontal = width > horizontalBreakpoint;
    if (isHorizontal !== this.state.isHorizontal) {
      this.setState({ isHorizontal });
    }
  }
  render() {
    const { label, headline, text, date, publication, image } = this.props;
    const styles = getStyles(this.state.isHorizontal);
    return (
      <View onLayout={this.handleLayout} style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={image} />
        </View>
        <View style={styles.summaryContainer}>
          <ArticleSummary
            label={label}
            headline={headline}
            text={text}
            date={date}
            publication={publication}
          />
        </View>
      </View>
    );
  }
}

CardComponent.propTypes = Object.assign(
  {},
  {
    image: Image.propTypes.source
  },
  ArticleSummary.propTypes
);

CardComponent.defaultProps = {
  image: {
    uri: ""
  }
};

export default CardComponent;
