import React from 'react';
import { View } from 'react-native';
import styleFactory from "./styles";
import MessageBar from './message-bar';
import MessageContext from "./message-context";

class MessageQueue extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      showMessage: message => this.addMessage(message)
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.addMessage('test message')
    }, 1000)
  }

  addMessage(message) {
    const messageEl = <MessageBar message={message} />
    this.setState(state => ({
      messages: state.messages.concat([messageEl])
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
        {messages}
      </View>
    ]
  }
}

export default MessageQueue;
