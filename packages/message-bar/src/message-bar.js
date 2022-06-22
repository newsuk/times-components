import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { TcView, TcText } from "@times-components/utils";
import PropTypes from "prop-types";
import { CloseIcon } from "@times-components/icons";
import styleFactory from "./styles";
import styled, { keyframes } from 'styled-components';

class MessageBar extends Component {
  constructor(props) {
    super(props);
    this.closeMessage = this.closeMessage.bind(this);
    this.state = {
      closeActive: false,
    }
  }

  componentDidMount() {
    const { delay } = this.props;
    this.timeout = setTimeout(() => {
        this.closeMessage();
    }, delay);
  }

  componentDidUpdate(prevProps) {
    const { message: newMessage } = this.props;
    const { message, delay } = prevProps;

    if (message === newMessage) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
          this.closeMessage();
      }, delay);
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  closeMessage() {
    const { close } = this.props;
    this.setState({ closeActive: true })
    this.timeout = setTimeout(() => {
      close();
  }, 500);
  }

  render() {
    const { message, scale, breakpoint } = this.props;
    const styles = styleFactory(scale, breakpoint);
    return (
      <StyledAnimation className={this.state.closeActive ? ' close' : ''}>
        <TcView data-testid="message-bar" style={styles.messageBarBodyContainer}>
          <TcView style={styles.messageBarBody}>
            <TcText style={styles.messageBarText}>{message}</TcText>
            <TcView style={styles.messageBarCloseButton}>
              <TouchableOpacity onPress={this.closeMessage}>
                <CloseIcon width="28" height="28" onPress={this.closeMessage}/>
              </TouchableOpacity>
            </TcView>
          </TcView>
        </TcView>
        </StyledAnimation>
    );
  }
}

const AnimationIn = keyframes`
  0% { transform: translateY(-51px)}
  90% { transform: translateY(5px)}
  100% { transform: translateY(0px)}
`;

const AnimationOut = keyframes`
  0% { transform: translateY(0px)}
  100% { transform: translateY(-51px)}
`

const StyledAnimation = styled(TcView)`
  animation-name: ${AnimationIn};
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  &.close {
    transform: translateY(-51px);
    animation-name: ${AnimationOut};
    animation-duration: 0.5s;
  }
`;

MessageBar.propTypes = {
  breakpoint: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  delay: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  scale: PropTypes.string.isRequired
};

export default MessageBar;
