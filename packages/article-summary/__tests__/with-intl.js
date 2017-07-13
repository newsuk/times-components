import React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";

const createComponentWithIntl = (
  children,
  props = { textComponent: Text, locale: "en" }
) =>
  renderer.create(
    <IntlProvider {...props}>
      {children}
    </IntlProvider>
  );

export default createComponentWithIntl;
