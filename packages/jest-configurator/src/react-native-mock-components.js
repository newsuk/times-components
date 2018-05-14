import React from "react";
import jest from "jest";

const mockReactNativeComponents = (...componentNames) =>
  componentNames.map(componentName =>
    jest.mock(componentName, () => {
      const RealComponent = require.requireActual(componentName);
      const MockComponent = props =>
        React.createElement(
          componentName,
          Object.assign({}, props, { style: null }),
          props.children
        );

      MockComponent.propTypes = RealComponent.propTypes;
      return MockComponent;
    })
  );

export default mockReactNativeComponents;
