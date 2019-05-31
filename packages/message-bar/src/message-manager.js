/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import { View, Platform } from "react-native";
import PropTypes from "prop-types";
import { ResponsiveContext } from "@times-components/responsive";
import styleFactory from "./styles";
import MessageBar from "./message-bar";
import MessageContext from "./message-context";

// MessageManager implements the pattern found here:
// https://reactjs.org/docs/context.html#updating-context-from-a-nested-component
class MessageManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      showMessage: message => this.addMessage(message),
      offsetTop: 0
    };
    this.addMessage = this.addMessage.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    this.onLayout = this.onLayout.bind(this);
  }

  onLayout(e) {
    const {
      nativeEvent: {
        layout: { y }
      }
    } = e;
    this.setState({
      offsetTop: y
    });
  }

  removeMessage() {
    this.setState({
      message: null
    });
  }

  addMessage(message) {
    this.setState({
      message
    });
  }

  render() {
    const { scale, children, delay, animate } = this.props;
    const { message, offsetTop } = this.state;
    const styles = styleFactory(scale);
    const offsetStyle = offsetTop
      ? {
          position: Platform.OS === "web" ? "fixed" : "absolute",
          top: offsetTop,
          height: message ? 50 : 0
        }
      : {};

    return (
      <View>
        <View style={[styles.messageManager, offsetStyle]}>
          {message && (
            <ResponsiveContext.Consumer>
              {({ editionBreakpoint }) => (
                <MessageBar
                  animate={animate}
                  close={this.removeMessage}
                  delay={delay}
                  message={message}
                  scale={scale}
                  breakpoint={editionBreakpoint}
                />
              )}
            </ResponsiveContext.Consumer>
          )}
        </View>
        <View onLayout={this.onLayout}>
          <MessageContext.Provider value={this.state}>
            {children}
          </MessageContext.Provider>
        </View>
      </View>
    );
  }
}

{
  const { string, node, number, bool } = PropTypes;
  MessageManager.propTypes = {
    animate: bool.isRequired,
    children: node.isRequired,
    delay: number.isRequired,
    scale: string.isRequired
  };
}

export default MessageManager;
