import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4
  },
  gradient: {
    margin: 4
  }
});

const Gradient = ({ angle, style }) => (
  <View style={style}>
    <LinearGradient
      start={{ x: 0, y: 1.0 }}
      end={{ x: 1.0, y: 1 - Math.sin(angle * Math.PI / 360) }}
      locations={[0.25, 1]}
      colors={["#ececec", "#f7f7f7"]}
      style={[styles.container]}
    />
  </View>
);

Gradient.defaultProps = {
  angle: 265,
  style: null
};

Gradient.propTypes = {
  angle: PropTypes.number,
  style: ViewPropTypes.style
};

const calculateRatio = ratio => {
  const [w, h] = ratio.split(":");
  return h / w;
};

class AuthorProfileLoading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ratio: calculateRatio(props.ratio)
    };

    this.handleLayout = this.handleLayout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ratio: calculateRatio(nextProps.ratio)
    });
  }

  handleLayout({ nativeEvent: { layout: { width } } }) {
    this.setState({
      width
    });
  }

  render() {
    const { ratio, width } = this.state;

    return (
      <View style={styles.container}>
        <View onLayout={this.handleLayout}>
          <Gradient
            angle={228}
            style={[
              styles.gradient,
              {
                height: width * ratio
              }
            ]}
          />
        </View>
        <Gradient
          angle={264}
          style={[
            styles.gradient,
            {
              maxWidth: 600,
              height: 24
            }
          ]}
        />
        <Gradient
          angle={267}
          style={[
            styles.gradient,
            {
              height: 10
            }
          ]}
        />
        <Gradient
          style={[
            styles.gradient,
            {
              height: 10
            }
          ]}
        />
        <Gradient
          style={[
            styles.gradient,
            {
              height: 10,
              width: 300
            }
          ]}
        />
      </View>
    );
  }
}

AuthorProfileLoading.defaultProps = {
  ratio: "3:2"
};

AuthorProfileLoading.propTypes = {
  ratio: PropTypes.string
};

export default AuthorProfileLoading;
