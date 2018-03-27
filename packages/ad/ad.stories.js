/* eslint-env browser */
import React from "react";
import { Text, ScrollView, View } from "react-native";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import { spacing, fontSizes, colours } from "@times-components/styleguide";
import Ad, { AdComposer } from "./ad";
import Placeholder from "./placeholder";
import NativeDOMContext from "./dom-context";
import WebDOMContext from "./dom-context.web";
import pageTargeting from "./fixtures/page-options.json";
import biddersConfig from "./fixtures/bidders-config.json";
import domContextInit from "./ad.stories-domcontext-init";

const devNetworkId = "25436805";
const adConfigBase = { networkId: devNetworkId, adUnit: "d.thetimes.co.uk" };
const adConfig = () =>
  Object.assign(
    {},
    adConfigBase,
    { pageTargeting },
    {
      slotTargeting: {
        sec_id: "null",
        section: "news",
        path: "/edition/news/",
        zone: "current_edition",
        slot: "news"
      }
    },
    { biddersConfig },
    { bidderSlots: ["ad-header", "ad-article-inline"] }
  );
let DOMContext;
if (window.document) {
  DOMContext = WebDOMContext;
} else {
  DOMContext = NativeDOMContext;
}
const articleUrl =
  "https://www.thetimes.co.uk/edition/news/france-defies-may-over-russia-37b27qd2s";

const withOpenInNewWindow = children => {
  const link = typeof document === "object" &&
    window !== window.top && (
      <a
        href={`/iframe.html${window.top.location.search}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in new window
      </a>
    );
  return (
    <AdComposer adConfig={adConfig(children.props.pos)}>
      <View>
        {link}
        {children}
      </View>
    </AdComposer>
  );
};

storiesOf("Primitives/Advertisement", module)
  .add("render one ad - intervention", () =>
    withOpenInNewWindow(
      <Ad pos="intervention" contextUrl={articleUrl} section="news" />
    )
  )
  .add("render one ad - header", () =>
    withOpenInNewWindow(
      <Ad pos="header" contextUrl={articleUrl} section="news" />
    )
  )
  .add("render article ads - header, inline", () =>
    withOpenInNewWindow(
      <View>
        <Ad section="news" pos="header" contextUrl={articleUrl} />
        <Ad section="news" pos="inline-ad" contextUrl={articleUrl} />
      </View>
    )
  )
  .add("render pixel ads - pixel", () =>
    withOpenInNewWindow(
      <View>
        <Text>The pixel ad is below. It&rsquo;s invisible.</Text>
        <Ad section="news" pos="pixel" contextUrl={articleUrl} />
      </View>
    )
  )
  .add("render pixel ads - pixelteads", () =>
    withOpenInNewWindow(
      <View>
        <Text>The pixelteads ad is below. It&rsquo;s invisible.</Text>
        <Ad section="news" pos="pixelteads" contextUrl={articleUrl} />
      </View>
    )
  )
  .add("render pixel ads - pixelskin", () =>
    withOpenInNewWindow(
      <View>
        <Text>The pixelskin ad is below. It&rsquo;s invisible.</Text>
        <Ad section="news" pos="pixelskin" contextUrl={articleUrl} />
      </View>
    )
  )
  .add("render one ad and some text", () =>
    withOpenInNewWindow(
      <ScrollView>
        <Text style={{ color: "blue" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          elementum ex id diam eleifend convallis. Nulla faucibus nec nibh sed
          condimentum.
        </Text>
        <Ad pos="inline-ad" section="news" contextUrl={articleUrl} />
        <Text style={{ color: "red" }}>
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Curabitur non sem ut sapien viverra pharetra
          eu a nulla. Donec egestas ex quis enim porttitor consequat.
        </Text>
      </ScrollView>
    )
  )
  .add("render two ads and some text", () =>
    withOpenInNewWindow(
      <ScrollView>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          elementum ex id diam eleifend convallis. Nulla faucibus nec nibh sed
          condimentum. Maecenas id nulla a elit pulvinar hendrerit nec nec
          massa. Morbi et leo sed mauris pellentesque euismod ornare nec enim.
          Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus.
        </Text>
        <Ad pos="intervention" section="news" contextUrl={articleUrl} />
        <Text>
          Donec convallis enim sit amet elit pharetra, et aliquet augue blandit.
          Integer suscipit mollis libero, et imperdiet nunc. Aenean eu lacus
          aliquam, ullamcorper ante at, egestas orci. Aliquam finibus, nulla in
          convallis mollis, elit nisi pretium neque, sed congue tortor erat
          vitae erat. Nulla eget nulla rhoncus, sollicitudin ipsum et, volutpat
          ligula.
        </Text>
        <Ad pos="inline-ad" section="news" contextUrl={articleUrl} />
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
    )
  )
  .add("Placeholder (300x250 - MPU)", () => (
    <Placeholder width={300} height={250} />
  ))
  .add("Placeholder (728x90 - Default)", () => (
    <Placeholder width={728} height={90} />
  ))
  .add("Placeholder (970x250 - Billboard)", () => (
    <Placeholder width={970} height={250} />
  ))
  .add("DOMContext", () =>
    withOpenInNewWindow(
      <DOMContext
        data={{
          message: "data value",
          heading: fontSizes.smallHeadline,
          padding: spacing(2),
          background: colours.functional.backgroundPrimary
        }}
        init={domContextInit}
        onRenderComplete={action("onRenderComplete")}
        width={300}
        height={200}
      />
    )
  )
  .add("DOMContext with internal error", () => (
    <DOMContext
      init={() => {
        throw new Error("Example error message");
      }}
    />
  ));
