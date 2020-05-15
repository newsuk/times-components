import React, { useState } from "react";
import { WebView } from "react-native-webview";
import { ActivityIndicator } from "react-native";

export default url => {
  const [isSpinnerShown, hideSpinner] = useState(true);
  return (
    <>
      <WebView source={{ uri: url }} onLoad={() => hideSpinner(false)} />
      {isSpinnerShown && <ActivityIndicator size="large" />}
    </>
  );
};
