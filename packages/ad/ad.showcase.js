/* eslint-env browser */
import React from "react";
import { Text, ScrollView, View } from "react-native";
import { spacing, fontSizes, colours } from "@times-components/styleguide";
import Ad, { AdComposer } from "./src/ad";
import Placeholder from "./src/placeholder";
import NativeDOMContext from "./src/dom-context";
import WebDOMContext from "./src/dom-context.web";
import pageTargeting from "./fixtures/page-options.json";
import topicPageTargeting from "./fixtures/topic-page-options.json";
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

const topicAdConfig = () =>
  Object.assign(
    {},
    adConfigBase,
    { topicPageTargeting },
    {
      slotTargeting: {
        sec_id: "null",
        section: "topic/chelsea",
        path: "/topic/chelsea/",
        zone: "topic",
        slot: "home"
      }
    },
    { biddersConfig },
    { bidderSlots: ["ad-inline"] }
  );

let DOMContext;
if (window.document) {
  DOMContext = WebDOMContext;
} else {
  DOMContext = NativeDOMContext;
}
const articleUrl =
  "https://www.thetimes.co.uk/edition/news/france-defies-may-over-russia-37b27qd2s";
const topicUrl = "https://www.thetimes.co.uk/topic/chelsea";

const withOpenInNewWindow = (children, page) => {
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

  const config = page === "topic" ? topicAdConfig : adConfig;
  return (
    <AdComposer adConfig={config(children.props.pos)}>
      <View>
        {link}
        {children}
      </View>
    </AdComposer>
  );
};

export default {
  name: "Primitives/Advertisement",
  children: [
    {
      type: "story",
      name: "Placeholder (300x250 - MPU)",
      component: () => <Placeholder width={300} height={250} />
    },
    {
      type: "story",
      name: "Placeholder (728x90 - Default)",
      component: () => <Placeholder width={728} height={90} />
    },
    {
      type: "story",
      name: "Placeholder (970x250 - Billboard)",
      component: () => <Placeholder width={970} height={250} />
    },
    {
      type: "story",
      name: "render one ad - intervention",
      component: () =>
        withOpenInNewWindow(
          <Ad slotName="intervention" contextUrl={articleUrl} section="news" />
        )
    },
    {
      type: "story",
      name: "render one ad - header",
      component: () =>
        withOpenInNewWindow(
          <Ad slotName="header" contextUrl={articleUrl} section="news" />
        )
    },
    {
      type: "story",
      name: "render article ads - header, inline",
      component: () =>
        withOpenInNewWindow(
          <View>
            <Ad section="news" slotName="header" contextUrl={articleUrl} />
            <Ad section="news" slotName="inline-ad" contextUrl={articleUrl} />
          </View>
        )
    },
    {
      type: "story",
      name: "render topic ad - inline",
      component: () =>
        withOpenInNewWindow(
          <View>
            <Ad section="news" slotName="inline-ad" contextUrl={topicUrl} />
          </View>,
          "topic"
        )
    },
    {
      type: "story",
      name: "render pixel ads - pixel",
      component: () =>
        withOpenInNewWindow(
          <View>
            <Text>The pixel ad is below. It&rsquo;s invisible.</Text>
            <Ad section="news" slotName="pixel" contextUrl={articleUrl} />
          </View>
        )
    },
    {
      type: "story",
      name: "render pixel ads - pixelteads",
      component: () =>
        withOpenInNewWindow(
          <View>
            <Text>The pixelteads ad is below. It&rsquo;s invisible.</Text>
            <Ad section="news" slotName="pixelteads" contextUrl={articleUrl} />
          </View>
        )
    },
    {
      type: "story",
      name: "render pixel ads - pixelskin",
      component: () =>
        withOpenInNewWindow(
          <View>
            <Text>The pixelskin ad is below. It&rsquo;s invisible.</Text>
            <Ad section="news" slotName="pixelskin" contextUrl={articleUrl} />
          </View>
        )
    },
    {
      type: "story",
      name: "render one ad and some text",
      component: () =>
        withOpenInNewWindow(
          <ScrollView>
            <Text style={{ color: "blue" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              elementum ex id diam eleifend convallis. Nulla faucibus nec nibh
              sed condimentum.
            </Text>
            <Ad slotName="inline-ad" section="news" contextUrl={articleUrl} />
            <Text style={{ color: "red" }}>
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Curabitur non sem ut sapien
              viverra pharetra eu a nulla. Donec egestas ex quis enim porttitor
              consequat.
            </Text>
          </ScrollView>
        )
    },
    {
      type: "story",
      name: "render two ads and some text",
      component: () =>
        withOpenInNewWindow(
          <ScrollView>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              elementum ex id diam eleifend convallis. Nulla faucibus nec nibh
              sed condimentum. Maecenas id nulla a elit pulvinar hendrerit nec
              nec massa. Morbi et leo sed mauris pellentesque euismod ornare nec
              enim. Orci varius natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus.
            </Text>
            <Ad
              slotName="intervention"
              section="news"
              contextUrl={articleUrl}
            />
            <Text>
              Donec convallis enim sit amet elit pharetra, et aliquet augue
              blandit. Integer suscipit mollis libero, et imperdiet nunc. Aenean
              eu lacus aliquam, ullamcorper ante at, egestas orci. Aliquam
              finibus, nulla in convallis mollis, elit nisi pretium neque, sed
              congue tortor erat vitae erat. Nulla eget nulla rhoncus,
              sollicitudin ipsum et, volutpat ligula.
            </Text>
            <Ad slotName="inline-ad" section="news" contextUrl={articleUrl} />
            <Text>
              Aliquam dapibus risus a leo euismod, sed dignissim nibh commodo.
              Donec vitae justo aliquam, pellentesque risus laoreet, hendrerit
              augue. Proin faucibus ex non felis euismod, et vulputate mi
              placerat. Donec maximus sem sapien, vel accumsan dui molestie at.
              Proin sit amet leo quam. Praesent risus magna, dapibus eget velit
              sed, placerat vestibulum leo. Suspendisse luctus vitae dui vitae
              fermentum. Nam lobortis mattis enim, eu porta mi.
            </Text>
          </ScrollView>
        )
    },
    {
      type: "story",
      name: "DOMContext",
      platform: "web",
      component: (_, { action }) =>
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
    },
    {
      type: "story",
      name: "DOMContext with internal error",
      platform: "web",
      component: () => (
        <DOMContext
          init={() => {
            throw new Error("Example error message");
          }}
        />
      )
    }
  ]
};
