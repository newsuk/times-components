import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import { Text, ScrollView } from "react-native";

import Ad from "./ad";
import Placeholder from "./placeholder";
import TimesWatermark from "./times-watermark";

export default () =>
  storiesOf("Ad", module)
    .add("render one native ad", () => (
      <ScrollView>
        <Ad code="intervention" section="article" />
      </ScrollView>
    ))
    .add("render one native ad and some text", () => (
      <ScrollView>
        <Text style={{ color: "blue" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          elementum ex id diam eleifend convallis. Nulla faucibus nec nibh sed
          condimentum.
        </Text>
        <Ad code="intervention" section="article" />
        <Text style={{ color: "red" }}>
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Curabitur non sem ut sapien viverra pharetra
          eu a nulla. Donec egestas ex quis enim porttitor consequat.
        </Text>
      </ScrollView>
    ))
    .add("render two native ads", () => (
      <ScrollView>
        <Ad code="intervention" section="article" />
        <Ad code="intervention" section="article" />
      </ScrollView>
    ))
    .add("render two native ads and some text", () => (
      <ScrollView>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          elementum ex id diam eleifend convallis. Nulla faucibus nec nibh sed
          condimentum. Maecenas id nulla a elit pulvinar hendrerit nec nec
          massa. Morbi et leo sed mauris pellentesque euismod ornare nec enim.
          Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus.
        </Text>
        <Ad code="intervention" section="article" />
        <Text>
          Donec convallis enim sit amet elit pharetra, et aliquet augue blandit.
          Integer suscipit mollis libero, et imperdiet nunc. Aenean eu lacus
          aliquam, ullamcorper ante at, egestas orci. Aliquam finibus, nulla in
          convallis mollis, elit nisi pretium neque, sed congue tortor erat
          vitae erat. Nulla eget nulla rhoncus, sollicitudin ipsum et, volutpat
          ligula.
        </Text>
        <Ad code="intervention" section="article" />
        <Text>
          Aliquam dapibus risus a leo euismod, sed dignissim nibh commodo. Donec
          vitae justo aliquam, pellentesque risus laoreet, hendrerit augue.
          Proin faucibus ex non felis euismod, et vulputate mi placerat. Donec
          maximus sem sapien, vel accumsan dui molestie at. Proin sit amet leo
          quam. Praesent risus magna, dapibus eget velit sed, placerat
          vestibulum leo. Suspendisse luctus vitae dui vitae fermentum. Nam
          lobortis mattis enim, eu porta mi.
        </Text>
      </ScrollView>
    ))
    .add("Placeholder", () => <Placeholder width={300} height={250} />)
    .add("TimesWatermark (MPU)", () => (
      <TimesWatermark width={300} height={250} />
    ));
