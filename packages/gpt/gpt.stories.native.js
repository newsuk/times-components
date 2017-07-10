import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View, Text } from "react-native";

import Ad from "./ad.native";

export default () =>
  storiesOf("GPT", module)
    .add("render one native ad", () =>
      <Ad code="ad-header" section="article" />
    )
    .add("render one native ad and some article text", () =>
      <View>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          elementum ex id diam eleifend convallis. Nulla faucibus nec nibh sed
          condimentum. Maecenas id nulla a elit pulvinar hendrerit nec nec
          massa. Morbi et leo sed mauris pellentesque euismod ornare nec enim.
          Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Cras facilisis risus a laoreet faucibus.
          Mauris ultricies volutpat blandit. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos. Curabitur
          non sem ut sapien viverra pharetra eu a nulla. Donec egestas ex quis
          enim porttitor consequat.
        </Text>
        <Ad code="ad-header" section="article" />
        <Text>
          Nam gravida, mauris at tincidunt gravida, arcu odio consequat turpis,
          ac pulvinar ipsum lacus vitae felis. Donec convallis enim sit amet
          elit pharetra, et aliquet augue blandit. Integer suscipit mollis
          libero, et imperdiet nunc. Aenean eu lacus aliquam, ullamcorper ante
          at, egestas orci. Aliquam finibus, nulla in convallis mollis, elit
          nisi pretium neque, sed congue tortor erat vitae erat. Nulla eget
          nulla rhoncus, sollicitudin ipsum et, volutpat ligula. Maecenas
          sodales risus sit amet nibh maximus auctor. Vivamus molestie nulla
          sem, nec fringilla est aliquet ac. Vivamus eros sapien, commodo sit
          amet tristique sit amet, eleifend eget felis. Proin mattis velit nec
          mi dapibus hendrerit. Suspendisse vel orci scelerisque, porttitor orci
          ultricies, dapibus tellus. Curabitur eget lorem sit amet enim
          tristique egestas. Vestibulum vestibulum mauris id libero laoreet
          pellentesque. Sed varius justo dictum tortor lobortis porta.
        </Text>
      </View>
    )
    .add("render two native ads", () =>
      <View>
        <Ad code="ad-header" section="article" />
        <Ad code="ad-header" section="article" />
      </View>
    )
    .add("render two native ads and some text", () =>
      <View>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          elementum ex id diam eleifend convallis. Nulla faucibus nec nibh sed
          condimentum. Maecenas id nulla a elit pulvinar hendrerit nec nec
          massa. Morbi et leo sed mauris pellentesque euismod ornare nec enim.
          Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Cras facilisis risus a laoreet faucibus.
          Mauris ultricies volutpat blandit. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos. Curabitur
          non sem ut sapien viverra pharetra eu a nulla. Donec egestas ex quis
          enim porttitor consequat.
        </Text>
        <Ad code="ad-header" section="article" />
        <Text>
          Nam gravida, mauris at tincidunt gravida, arcu odio consequat turpis,
          ac pulvinar ipsum lacus vitae felis. Donec convallis enim sit amet
          elit pharetra, et aliquet augue blandit. Integer suscipit mollis
          libero, et imperdiet nunc. Aenean eu lacus aliquam, ullamcorper ante
          at, egestas orci. Aliquam finibus, nulla in convallis mollis, elit
          nisi pretium neque, sed congue tortor erat vitae erat. Nulla eget
          nulla rhoncus, sollicitudin ipsum et, volutpat ligula. Maecenas
          sodales risus sit amet nibh maximus auctor. Vivamus molestie nulla
          sem, nec fringilla est aliquet ac. Vivamus eros sapien, commodo sit
          amet tristique sit amet, eleifend eget felis. Proin mattis velit nec
          mi dapibus hendrerit. Suspendisse vel orci scelerisque, porttitor orci
          ultricies, dapibus tellus. Curabitur eget lorem sit amet enim
          tristique egestas. Vestibulum vestibulum mauris id libero laoreet
          pellentesque. Sed varius justo dictum tortor lobortis porta.
        </Text>
        <Ad code="ad-header" section="article" />
        <Text>
          Aliquam dapibus risus a leo euismod, sed dignissim nibh commodo. Donec
          vitae justo aliquam, pellentesque risus laoreet, hendrerit augue.
          Proin faucibus ex non felis euismod, et vulputate mi placerat. Donec
          maximus sem sapien, vel accumsan dui molestie at. Proin sit amet leo
          quam. Praesent risus magna, dapibus eget velit sed, placerat
          vestibulum leo. Suspendisse luctus vitae dui vitae fermentum. Nam
          lobortis mattis enim, eu porta mi.
        </Text>
      </View>
    );
