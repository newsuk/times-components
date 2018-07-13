import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  print,
  rnwTransform
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import IsPaidSubscriber from "../../src/is-paid-subscriber";
import Video from "../../src/video";
import defaultVideoProps from "../default-video-props";

jest.mock("@times-components/image", () => "Image");

addSerializers(
  expect,
  compose(
    print,
    minimaliseTransform((value, key) => key === "style"),
    minimalWebTransform,
    rnwTransform()
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
  }
];

iterator(tests);
