import React, { Component } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { CloseIcon } from "@times-components/icons";
import styleFactory from "./styles";

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
    const { delay, close } = this.props;

    this.animateOpen(() => {});
    this.setState({
      timeout: setTimeout(() => {
        this.animateClosed(() => {
          close();
        });
      }, delay)
    });
  }

  componentWillReceiveProps(props) {
    const { message, delay, close } = props;
    const { message: oldMessage } = this.props;

    if (message === oldMessage) {
      const { timeout } = this.state;
      clearTimeout(timeout);
      this.setState({
        timeout: setTimeout(() => {
          this.animateClosed(() => {
            close();
          });
        }, delay)
      });
    }
  }

  componentWillUnmount() {
    const { timeout } = this.state;
    if (timeout) {
      clearTimeout(timeout);
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
    const { message, scale, animate, breakpoint } = this.props;
    const { yValue } = this.state;
    const styles = styleFactory(scale, breakpoint);

    return (
      <Animated.View
        style={
          animate && {
            transform: [
              {
                translateY: yValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 0]
                })
              }
            ]
          }
        }
      >
        <View style={styles.messageBarBodyContainer}>
          <View style={styles.messageBarBody}>
            <Text style={styles.messageBarText}>{message}</Text>
            <View style={styles.messageBarCloseButton}>
              <TouchableOpacity onPress={this.close}>
                <CloseIcon width="28" height="28" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  }
}

MessageBar.propTypes = {
  animate: PropTypes.bool.isRequired,
  breakpoint: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  delay: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  scale: PropTypes.string.isRequired
};

export default MessageBar;
