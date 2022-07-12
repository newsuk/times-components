import React, { Component } from "react";
import { TcView, TcText } from "@times-components/utils";
import PropTypes from "prop-types";
import { CloseIcon } from "@times-components/icons";
import styleFactory, { CloseButton, StyledAnimation } from "./styles";

class MessageBar extends Component {
  constructor(props) {
    super(props);
    this.closeMessage = this.closeMessage.bind(this);
    this.state = {
      closeActive: false
    };
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
    this.setState({ closeActive: true });
    this.timeout = setTimeout(() => {
      close();
    }, 250);
  }

  render() {
    const { message, scale, breakpoint } = this.props;
    const styles = styleFactory(scale, breakpoint);
    const { closeActive } = this.state;
    return (
      <StyledAnimation
        data-testid="Styled Animation"
        className={closeActive ? " close" : ""}
      >
        <TcView
          data-testid="message-bar"
          style={styles.messageBarBodyContainer}
        >
          <TcView style={styles.messageBarBody}>
            <TcText style={styles.messageBarText}>{message}</TcText>
            <CloseButton
              style={styles.messageBarCloseButton}
              className={closeActive ? " active" : ""}
              onClick={this.closeMessage}
            >
              <CloseIcon width={28} height={28} onClick={this.closeMessage} />
            </CloseButton>
          </TcView>
        </TcView>
      </StyledAnimation>
    );
  }
}

MessageBar.propTypes = {
  breakpoint: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  delay: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  scale: PropTypes.string.isRequired
};

export default MessageBar;
