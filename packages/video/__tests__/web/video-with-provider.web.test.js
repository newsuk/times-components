import React from "react";
import { AppRegistry } from "react-native-web";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  replacePropTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { hash, iterator } from "@times-components/test-utils";
import IsPaidSubscriber from "../../src/is-paid-subscriber";
import Video from "../../src/video";
import defaultVideoProps from "../default-video-props";

jest.mock("@times-components/image", () => "Image");

const omitProps = new Set(["className", "style"]);

addSerializers(
  expect,
  compose(
    stylePrinter,
    minimaliseTransform(
      (value, key) => omitProps.has(key) || key.includes("data-")
    ),
    minimalWebTransform,
    replacePropTransform(
      (value, key) => (key === "uri" || key === "poster" ? hash(value) : value)
    ),
    rnwTransform(AppRegistry)
  )
);

const testSubscriberAndVideoPaidStatus = ({
  subscriberIsPaid = true,
  videoIsPaidOnly = true
}) => {
  const testInstance = TestRenderer.create(
    <IsPaidSubscriber.Provider value={subscriberIsPaid}>
      <Video {...defaultVideoProps} paidOnly={videoIsPaidOnly} />
    </IsPaidSubscriber.Provider>
  );

  expect(testInstance.toJSON()).toMatchSnapshot();
};

const tests = [
  {
    name: "paidOnly video for unpaid users",
    test: () => {
      testSubscriberAndVideoPaidStatus({ subscriberIsPaid: false });
    }
  },
  {
    name: "paidOnly video for paid users",
    test: () => {
      testSubscriberAndVideoPaidStatus({});
    }
  },
  {
    name: "non-paidOnly video for unpaid users",
    test: () => {
      testSubscriberAndVideoPaidStatus({
        subscriberIsPaid: false,
        videoIsPaidOnly: false
      });
    }
  },
  {
    name: "non-paidOnly video for paid users",
    test: () => {
      testSubscriberAndVideoPaidStatus({ videoIsPaidOnly: false });
    }
  },
  {
    name: "video without a poster image",
    test: () => {
      const testInstance = TestRenderer.create(
        <IsPaidSubscriber.Provider value>
          <Video {...defaultVideoProps} paidOnly={false} poster={null} />
        </IsPaidSubscriber.Provider>
      );

      expect(testInstance.toJSON()).toMatchSnapshot();
    }
  }
];

iterator(tests);
