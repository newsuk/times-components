/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styleFactory from "./styles";
import MessageBar from "./message-bar";
import MessageContext from "./message-context";

class MessageQueue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      showMessage: message => this.addMessage(message)
    };
    this.addMessage = this.addMessage.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
  }

  addMessage(message) {
    this.setState({
      message
    });
  }

  removeMessage() {
    this.setState({
      message: null
    });
  }

  render() {
    const { scale, children, delay } = this.props;
    const { message } = this.state;
    const styles = styleFactory(scale);

    return (
      <Fragment>
        <MessageContext.Provider value={this.state}>
          {children}
        </MessageContext.Provider>
        ,
        <View style={styles.MessageQueue}>
          {message && (
            <MessageBar
              close={this.removeMessage}
              delay={delay}
              message={message}
              scale={scale}
            />
          )}
        </View>
      </Fragment>
    );
  }
}

{
  const { string, node, number } = PropTypes;
  MessageQueue.propTypes = {
    children: node.isRequired,
    delay: number.isRequired,
    scale: string.isRequired
  };
}

export default MessageQueue;
