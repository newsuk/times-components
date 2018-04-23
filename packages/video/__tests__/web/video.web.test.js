import React from "react";
import renderer from "react-test-renderer";

import shared, { defaultVideoProps } from "../shared";
import IsPaidSubscriber from "../../src/is-paid-subscriber";
import Video, { isPaidOnly } from "../../src/video";

describe("Video on web", () => {
  shared();

  const testSubscriberAndVideoPaidStatus = (
    subscriberIsPaid,
    videoIsPaidOnly
  ) => {
    const tree = renderer
      .create(
        <IsPaidSubscriber.Provider value={subscriberIsPaid}>
          <Video {...defaultVideoProps} paidOnly={videoIsPaidOnly} />
        </IsPaidSubscriber.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  };

  it("renders a paidOnly video correctly for unpaid users", () => {
    testSubscriberAndVideoPaidStatus(false, true);
  });

  it("renders a paidOnly video correctly for paid users", () => {
    testSubscriberAndVideoPaidStatus(true, true);
  });

  it("renders a non-paidOnly video correctly for unpaid users", () => {
    testSubscriberAndVideoPaidStatus(false, false);
  });

  it("renders a non-paidOnly video correctly for paid users", () => {
    testSubscriberAndVideoPaidStatus(true, false);
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
});
