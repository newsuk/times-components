import React, { Component } from "react";
import { View, Text, Image, Animated, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styleFactory from "./styles";

const CloseIcon = require("../assets/close-button.png");

class MessageBar extends Component {
  state = {
    timeout: null,
    yValue: new Animated.Value(0),
  }

  constructor(props) {
    super(props);
    this.animateClosed = this.animateClosed.bind(this);
    this.animateOpen = this.animateOpen.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    this.animateOpen(() => {
      this.setState({
        timeout: setTimeout(() => {
          this.animateClosed()
        }, 3000)
      })
    })
  }

  animateOpen(cb) {
    const { yValue } = this.state;
    Animated.spring(
      yValue,
      {
        toValue: 1,
        useNativeDriver: true
      }
    ).start(cb)
  }

  animateClosed(cb) {
    const { yValue } = this.state;
    Animated.spring(
      yValue,
      {
        toValue: 0,
        useNativeDriver: true
      }
    ).start(cb)
  }

  close() {
    const { close, message } = this.props;
    const { timeout } = this.state;
    clearTimeout(timeout);
    this.setState({
      timeout: null
    }, () => {
      this.animateClosed(() => {
        close(message)
      })
    })
  }

  render() {
    const { message, scale } = this.props;
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
          <TouchableOpacity onPress={this.close}>
            <Image
              resizeMode="contain"
              source={CloseIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>)
  }
}

MessageBar.propTypes = {
  close: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  scale: PropTypes.string.isRequired,
};

export default MessageBar;
