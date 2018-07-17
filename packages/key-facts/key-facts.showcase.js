/* eslint-disable react/prop-types */
import React from "react";
import { ScrollView, Text } from "react-native";
import { LateralSpacingDecorator } from "@times-components/storybook";
import KeyFacts, { KeyFactsBullet } from "./src/key-facts";

const renderKeyFacts = text => (
  <KeyFacts title={text("Key facts title: ", "New Brexit referendum")}>
    <KeyFactsBullet>
      <Text>
        Another ministerial aide, Robert Courts, resigned saying that he could
        not look himself in the mirror if he backed the Chequers proposals.
      </Text>
    </KeyFactsBullet>
    <KeyFactsBullet>
      <Text>
        Downing Street and Conservative Party bosses were seeking to assess the
        scale of a grassroots rebellion.
      </Text>
    </KeyFactsBullet>
    <KeyFactsBullet>
      <Text>
        Dennis Mitchell&apos;s high levels of testosterone in 1998 were caused
        by having sex with his wife &quot;at least four times&quot; on her
        birthday, according to the sprinter.
      </Text>
      <Text>&nbsp;USA Track and Field believed him, the IAAF did not.</Text>
    </KeyFactsBullet>
  </KeyFacts>
);

export default {
  name: "Composed/Key Facts",
  children: [
    {
      type: "decorator",
      decorator: LateralSpacingDecorator
    },
    {
      type: "story",
      name: "default",
      platform: "native",
      component: ({ text }) => (
        <ScrollView style={{ width: "100%" }}>
          {renderKeyFacts(text)}
        </ScrollView>
      )
    },
    {
      type: "story",
      name: "default",
      platform: "web",
      component: ({ text }) => renderKeyFacts(text)
    }
  ]
};
