import React from "react";
import renderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  print
} from "@times-components/jest-serializer";
import IsPaidSubscriber from "../../src/is-paid-subscriber";
import Video, { isPaidOnly } from "../../src/video";
import videoProps from "../default-video-props";

addSerializers(
  expect,
  compose(print, minimaliseTransform((value, key) => key === "style"))
);

const testSubscriberAndVideoPaidStatus = ({
  subscriberIsPaid = true,
  videoIsPaidOnly = true
}) => {
  const tree = renderer
    .create(
      <IsPaidSubscriber.Provider value={subscriberIsPaid}>
        <Video {...videoProps} paidOnly={videoIsPaidOnly} />
      </IsPaidSubscriber.Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
};

it("renders a paidOnly video correctly for unpaid users", () => {
  testSubscriberAndVideoPaidStatus({ subscriberIsPaid: false });
});

it("renders a paidOnly video correctly for paid users", () => {
  testSubscriberAndVideoPaidStatus({});
});

it("renders a non-paidOnly video correctly for unpaid users", () => {
  testSubscriberAndVideoPaidStatus({
    subscriberIsPaid: false,
    videoIsPaidOnly: false
  });
});

it("renders a non-paidOnly video correctly for paid users", () => {
  testSubscriberAndVideoPaidStatus({ videoIsPaidOnly: false });
});

it("Allows stringified booleans as well as truthiness/falsiness to determine paidonly status", () => {
  expect(isPaidOnly(true)).toBe(true);
  expect(isPaidOnly(false)).toBe(false);
  expect(isPaidOnly("true")).toBe(true);
  expect(isPaidOnly("false")).toBe(false);
  expect(isPaidOnly(1)).toBe(true);
  expect(isPaidOnly(0)).toBe(false);
  expect(isPaidOnly(undefined)).toBe(false);
  expect(isPaidOnly(null)).toBe(false);
});
