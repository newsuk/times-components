import React from 'react';
import { View } from 'react-native';
import styleFactory from "./styles";
import MessageBar from './message-bar';

class MessageQueue extends React.Component {
  state = {
    messages: []
  }

  constructor(props) {
    super(props)
    this.callbackContext = React.createContext({
      showMessage: message => {
        this.addMessage(message)
      }
    })
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
      children,
      <View style={styles.MessageQueue}>
        {messages}
      </View>,
    ]
  }
}

export default MessageQueue;
