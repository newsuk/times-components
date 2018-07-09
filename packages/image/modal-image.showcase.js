/* eslint-disable react/no-danger */
import React from "react";
import { View } from "react-native";
import ModalImage from "./src/modal-image";

const uri =
  "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F7d2fd06c-a460-11e7-8955-1ad2a9a7928d.jpg?crop=1500%2C844%2C0%2C78&resize=685";

export default {
  name: "Primitives/ModalImage",
  children: [
    {
      type: "story",
      name: "Default",
      platform: "native",
      component: () => (
        <View>
          <ModalImage aspectRatio={16 / 9} uri={uri} />
        </View>
      )
    }
  ]
};
