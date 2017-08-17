/* eslint import/no-unresolved: "off" */

import React from "react";
import { TouchableWithoutFeedback, View, Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { decorateAction } from "@storybook/addon-actions";
import PropTypes from "prop-types";
import StylePropTypes from "react-style-proptype";
import BrightcoveVideo from "@times-components/brightcove-video";

import ErrorView, { addErrorHandler } from "./error-view";

const stringifyAction = decorateAction([args => [JSON.stringify(args[0])]]);

const ErrorOnClick = ({ style, onError, ...otherProps }) =>
  <TouchableWithoutFeedback
    onPress={() => onError({ code: "000", message: "Oh no!" })}
  >
    <View style={[{ backgroundColor: "green" }, style]} {...otherProps}>
      <Text style={{ color: "white" }}>Click me for an error</Text>
    </View>
  </TouchableWithoutFeedback>;
ErrorOnClick.defaultProps = { style: {}, onError: () => {} };
ErrorOnClick.propTypes = {
  style: StylePropTypes,
  onError: PropTypes.func
};

const WrappedErrorOnClick = addErrorHandler(ErrorOnClick);
const WrappedBrightcoveVideo = addErrorHandler(BrightcoveVideo);

storiesOf("ErrorView", module)
  .add("on its own", () =>
    <ErrorView
      style={{ width: 100, height: 100 }}
      errors={[{ code: "code", message: "message" }]}
    />
  )
  .add("handling a component's errors", () =>
    <WrappedErrorOnClick style={{ width: 100, height: 100 }} />
  )
  .add("handling a larger component's errors", () =>
    <WrappedErrorOnClick style={{ width: 200, height: 300 }} />
  )
  .add("handling with an error logger", () =>
    <WrappedErrorOnClick
      style={{ width: 100, height: 100 }}
      onError={stringifyAction("Error: ")}
    />
  )
  .add("handling a broken video", () =>
    <WrappedBrightcoveVideo
      style={{ width: 400, height: 300 }}
      width={400}
      height={300}
      policyId="x"
      videoId="y"
      accountId="z"
    />
  );
