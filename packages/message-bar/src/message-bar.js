import React, { Component } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { TcView, TcText } from "@times-components/utils";
import PropTypes from "prop-types";
import { CloseIcon } from "@times-components/icons";
import styleFactory from "./styles";

class MessageBar extends Component {
  state = {
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
    this.timeout = setTimeout(() => {
      this.animateClosed(() => {
        close();
      });
    }, delay);
  }

  componentDidUpdate(prevProps) {
    const { message: newMessage } = this.props;
    const { message, delay, close } = prevProps;

    if (message === newMessage) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.animateClosed(() => {
          close();
        });
      }, delay);
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
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
    clearTimeout(this.timeout);
    this.timeout = null;
    this.animateClosed(() => {
      close();
    });
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
        <TcView data-testid="message-bar" style={styles.messageBarBodyContainer}>
          <TcView style={styles.messageBarBody}>
            <TcText style={styles.messageBarText}>{message}</TcText>
            <TcView style={styles.messageBarCloseButton}>
              <TouchableOpacity onPress={this.close}>
                <CloseIcon width="28" height="28" onPress={this.close}/>
              </TouchableOpacity>
            </TcView>
          </TcView>
        </TcView>
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
