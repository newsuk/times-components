import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import ReactStyleProp from "react-style-proptype";

const styles = StyleSheet.create({
  text: { color: "white" },
  background: {
    backgroundColor: "red"
  }
});

const ErrorView = ({ style, errors }) => {
  const errorItems = errors.map(error =>
    <Text key={`${error.code}_${error.message}`} style={styles.text}>
      {error.code} - {error.message}
    </Text>
  );

  return (
    <View style={[style, styles.background]}>
      {errorItems}
    </View>
  );
};
const errorPropType = PropTypes.shape({
  code: PropTypes.string,
  message: PropTypes.string
});
ErrorView.defaultProps = { style: {} };
ErrorView.propTypes = {
  style: ReactStyleProp,
  errors: PropTypes.arrayOf(errorPropType).isRequired
};
export default ErrorView;

export const addErrorHandler = WrappedComponent => {
  class ErrorHandler extends Component {
    constructor(props) {
      super(props);
      this.state = { errors: [] };
    }
    render() {
      const { errors } = this.state;
      const { onError, style, ...passThroughProps } = this.props;

      if (errors.length) {
        return <ErrorView style={style} errors={errors} />;
      }
      return (
        <WrappedComponent
          style={style}
          onError={err => {
            this.setState(prevState => ({
              errors: [...prevState.errors, err]
            }));
            // bubble up errors if parent is listening
            if (onError) onError(err);
          }}
          {...passThroughProps}
        />
      );
    }
  }
  ErrorHandler.propTypes = WrappedComponent.propTypes;
  return ErrorHandler;
};
