import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

class ErrorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
    this.onError = this.onError.bind(this);
  }

  onError(err) {
    const errors = [...this.state.errors, err];
    this.setState({ errors });
    this.props.onError(err);
  }

  getErrorStyles() {
    const errorStyles = {
      backgroundColor: "red",
      width: this.props.width,
      height: this.props.height
    };

    return errorStyles;
  }

  render() {
    if (this.state.errors.length) {
      const errorItems = this.state.errors.map(error =>
        <Text key={`${error.code}_${error.message}`} style={{ color: "white" }}>
          {error.code} - {error.message}
        </Text>
      );

      return (
        <View style={this.getErrorStyles()}>
          {errorItems}
        </View>
      );
    }

    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        onChange: this.props.onChange,
        onError: this.onError,
        height: this.props.height,
        width: this.props.width
      })
    );

    return <View>{childrenWithProps}</View>;
  }
}

ErrorComponent.propTypes = {
  children: React.PropTypes.element.isRequired,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number
};

ErrorComponent.defaultProps = {
  onChange: () => {},
  onError: () => {},
  height: 180,
  width: 320
};

export default ErrorComponent;
