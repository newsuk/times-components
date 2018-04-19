import React from "react";
import renderer from "react-test-renderer";


import shared, { defaultVideoProps } from "../shared";
import IsPaidSubscriber from "../../src/is-paid-subscriber";
import BrightcoveVideo from "../../src/brightcove-video";

describe("BrightcoveVideo on web", () => {
  shared();


  const testSubscriberAndVideoPaidStatus = (
    subscriberIsPaid,
    videoIsPaidOnly
  ) => {
    const tree = renderer
      .create(
        <IsPaidSubscriber.Provider value={subscriberIsPaid}>
          <BrightcoveVideo {...defaultVideoProps} paidonly={videoIsPaidOnly} />
        </IsPaidSubscriber.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  };

  it("renders a paidonly video correctly for unpaid users", () => {
    testSubscriberAndVideoPaidStatus(false, true);
  });

  it("renders a paidonly video correctly for paid users", () => {
    testSubscriberAndVideoPaidStatus(true, true);
  });

  it("renders a non-paidonly video correctly for unpaid users", () => {
    testSubscriberAndVideoPaidStatus(false, false);
  });

  it("renders a non-paidonly video correctly for paid users", () => {
    testSubscriberAndVideoPaidStatus(true, false);
  });
});
