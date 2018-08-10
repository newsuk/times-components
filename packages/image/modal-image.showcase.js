/* eslint-disable react/no-danger, react/prop-types */
import React, { Fragment } from "react";
import { Text } from "react-native";
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
      component: ({ text }) => (
        <Fragment>
          <Text>Click on the image to open the modal</Text>
          <ModalImage
            aspectRatio={16 / 9}
            caption={text("Caption: ", "An example caption")}
            credits={text("Credits: ", "Example credits")}
            uri={uri}
          />
        </Fragment>
      )
    }
  ]
};
