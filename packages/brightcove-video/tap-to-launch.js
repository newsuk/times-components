import React, { Component } from "react";
import { TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

class TapToLaunch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLaunched: props.launched
    };

    this.launch = this.launch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isLaunched !== nextProps.launched) {
      this.setState({ isLaunched: nextProps.launched });
    }
  }

  launch() {
    if (!this.state.isLaunched) {
      this.setState({ isLaunched: true });
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.launch}>
        {this.props.children(this.state.isLaunched)}
      </TouchableWithoutFeedback>
    );
  }
}

TapToLaunch.propTypes = {
  launched: PropTypes.bool,
  children: PropTypes.func.isRequired
};

TapToLaunch.defaultProps = {
  launched: false
};

export default TapToLaunch;
