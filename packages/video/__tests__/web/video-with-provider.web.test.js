import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  print,
  rnwTransform
} from "@times-components/jest-serializer";
import iterator from "@times-components/test-utils";
import IsPaidSubscriber from "../../src/is-paid-subscriber";
import Video from "../../src/video";
import videoProps from "../default-video-props";

addSerializers(
  expect,
  compose(
    print,
    minimaliseTransform((value, key) => key === "style"),
    rnwTransform()
  )
);

const testSubscriberAndVideoPaidStatus = ({
  subscriberIsPaid = true,
  videoIsPaidOnly = true
}) => {
  const testInstance = TestRenderer.create(
    <IsPaidSubscriber.Provider value={subscriberIsPaid}>
      <Video {...videoProps} paidOnly={videoIsPaidOnly} />
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
