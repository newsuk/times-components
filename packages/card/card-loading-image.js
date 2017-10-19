import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import Gradient from "./card-loading-gradient";
import T from "./t";

const styles = StyleSheet.create({
  t: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class CardImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleLayout = this.handleLayout.bind(this);
  }

  handleLayout({ nativeEvent: { layout: { width } } }) {
    this.setState({
      width
    });
  }

  render() {
    const { ratio, style } = this.props;

    const { width } = this.state;

    const tComponent = width ? (
      <View style={styles.t}>
        <T width={width * 0.15} height={width * 0.15} />
      </View>
    ) : null;

    return (
      <View style={style} onLayout={this.handleLayout}>
        <Gradient
          angle={264}
          style={[
            styles.gradient,
            {
              width,
              height: width / ratio
            }
          ]}
        >
          {tComponent}
        </Gradient>
      </View>
    );
  }
}

CardImage.defaultProps = {
  style: null
};

CardImage.propTypes = {
  ratio: PropTypes.number.isRequired,
  style: ViewPropTypes.style
};

export default CardImage;
