import React from "react";

const mockReactNativeComponent = componentName => {
  const RealComponent = require.requireActual(componentName);
  const MockComponent = props => {
    const { children } = props;
    return React.createElement(
      componentName,
      Object.assign({}, props, { style: null }),
      children
    );
  };

  MockComponent.propTypes = RealComponent.propTypes;
  return MockComponent;
};

export default mockReactNativeComponent;
