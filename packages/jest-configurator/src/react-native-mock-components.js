import React from "react";

const mockReactNativeComponent = componentName => {
  const RealComponent = require.requireActual(componentName);
  const MockComponent = props =>
    React.createElement(
      componentName,
      Object.assign({}, props, { style: null }),
      props.children
    );

  MockComponent.propTypes = RealComponent.propTypes;
  return MockComponent;
};

export default mockReactNativeComponent;
