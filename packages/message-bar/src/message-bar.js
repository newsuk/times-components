import React, { Component } from "react";
import { View, Text, Image, Animated } from "react-native";
import PropTypes from "prop-types";
import styleFactory from "./styles";

const CloseIcon = require("../assets/close-button.png");

class MessageBar extends Component {
  state = {
    timeout: null,
    yValue: new Animated.Value(0),
  }

  componentDidMount() {
    const { yValue } = this.state;
    Animated.spring(
      yValue,
      {
        toValue: 1,
      }
    ).start(() => {
      this.setState({
        timeout: setTimeout(() => {
          Animated.spring(
            yValue,
            {
              toValue: 0
            }
          ).start()
        }, 3000)
      })
    })
  }

  render() {
    const { scale, message } = this.props;
    const { yValue } = this.state;
    const styles = styleFactory(scale);

    return (<Animated.View style={{
      transform: [{
        translateY: yValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 0]
        })
      }]
    }}>
      <View style={styles.MessageBarBody}>
        <Text style={styles.MessageBarText}>
          {message}
        </Text>
        <View style={styles.MessageBarCloseButton}>
          <Image
            resizeMode="contain"
            source={CloseIcon}
          />
        </View>
      </View>
    </Animated.View>)
  }
}

MessageBar.propTypes = {
  scale: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default MessageBar;
