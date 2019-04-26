import React, { Component } from "react";
import { View, Text, Image, Animated, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styleFactory from "./styles";

const CloseIcon = require("../assets/close-button.png");

class MessageBar extends Component {
  state = {
    timeout: null,
    yValue: new Animated.Value(0)
  };

  constructor(props) {
    super(props);
    this.animateClosed = this.animateClosed.bind(this);
    this.animateOpen = this.animateOpen.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    const { delay } = this.props;

    this.animateOpen(() => {});
    this.setState({
      timeout: setTimeout(() => {
        this.animateClosed();
      }, delay)
    });
  }

  componentWillReceiveProps(props) {
    const { message, delay } = props;
    const { message: oldMessage } = this.props;

    if (message === oldMessage) {
      const { timeout } = this.state;
      clearTimeout(timeout);
      this.setState({
        timeout: setTimeout(() => {
          this.animateClosed();
        }, delay)
      });
    }
  }

  animateOpen(cb) {
    const { yValue } = this.state;
    Animated.spring(yValue, {
      toValue: 1
    }).start(cb);
  }

  animateClosed(cb) {
    const { yValue } = this.state;
    Animated.spring(yValue, {
      toValue: 0
    }).start(cb);
  }

  close() {
    const { close } = this.props;
    const { timeout } = this.state;
    clearTimeout(timeout);
    this.setState(
      {
        timeout: null
      },
      () => {
        this.animateClosed(() => {
          close();
        });
      }
    );
  }

  render() {
    const { message, scale } = this.props;
    const { yValue } = this.state;
    const styles = styleFactory(scale);

    return (
      <Animated.View
        style={{
          transform: [
            {
              translateY: yValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0]
              })
            }
          ]
        }}
      >
        <View style={styles.MessageBarBody}>
          <Text style={styles.MessageBarText}>{message}</Text>
          <View style={styles.MessageBarCloseButton}>
            <TouchableOpacity onPress={this.close}>
              <Image resizeMode="contain" source={CloseIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }
}

MessageBar.propTypes = {
  close: PropTypes.func.isRequired,
  delay: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  scale: PropTypes.string.isRequired
};

export default MessageBar;
