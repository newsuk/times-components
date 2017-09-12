import React, { Component } from "react";
import { TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

class TapToLaunch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLaunched: false
    };

    this.launch = this.launch.bind(this);
  }

  launch() {
    this.setState({ isLaunched: true });
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
  children: PropTypes.func.isRequired
};

export default TapToLaunch;
