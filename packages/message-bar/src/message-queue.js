import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styleFactory from "./styles";
import MessageBar from './message-bar';
import MessageContext from "./message-context";

class MessageQueue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      showMessage: message => this.addMessage(message)
    };
    this.addMessage = this.addMessage.bind(this)
    this.removeMessage = this.removeMessage.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.addMessage('test message')
    }, 1000)
  }

  addMessage(message) {
    this.setState(state => ({
      messages: state.messages.concat([message])
    }))
  }

  removeMessage(message) {
    this.setState(state => ({
      messages: state.messages.filter(m => m !== message)
    }))
  }

  render() {
    const { scale, children } = this.props;
    const { messages } = this.state;
    const styles = styleFactory(scale);

    return [
      <MessageContext.Provider value={this.state}>
        {children}
      </MessageContext.Provider>,
      <View style={styles.MessageQueue}>
        {messages.map(m => <MessageBar close={this.removeMessage} message={m}/>)}
      </View>
    ]
  }
}

{
  const {string, element, arrayOf, oneOf} = PropTypes;
  MessageQueue.propTypes = {
    children: oneOf([
      element,
      arrayOf(element)
    ]).isRequired,
    scale: string.isRequired,
  }
}

export default MessageQueue;
