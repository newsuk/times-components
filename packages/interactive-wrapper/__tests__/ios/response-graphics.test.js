import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import fetchMock from "fetch-mock";

import ResponsiveImageInteractive from "../../src/responsive-image";

const fakeResponse = {
  deck_id: 28462,
  deck_name: "IRAN2",
  deck_type: "Responsive graphics",
  version: 2,
  updated_at: {
    date: "2020-01-04 19:31:14.000000",
    timezone_type: 3,
    timezone: "UTC"
  },
  fields: {
    altText: "IRAN2",
    bgColor: ""
  },
  body: {
    data: [
      {
        type: "image",
        data: {
          Image:
            "https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/a291571a5862aa96def7e82799971d8d.jpg",
          Size: "664"
        }
      },
      {
        type: "image",
        data: {
          Image:
            "https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/d3f58e82bbc03979bae491caa4cbd6ea.jpg",
          Size: "498"
        }
      },
      {
        type: "image",
        data: {
          Image:
            "https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/cc81d530b84a09bc19462bd61cdac975.jpg",
          Size: "300"
        }
      }
    ]
  }
};

jest.useFakeTimers();

it("render correctly", () => {
  const testInstance = TestRenderer.create(
    <ResponsiveImageInteractive deckId={100} />
  );
  expect(testInstance.toJSON()).toMatchSnapshot();
});

it("render images", async () => {
  fetchMock.mock(
    "https://gobble.timesdev.tools/deck/api/deck-post-action/100",
    fakeResponse,
    200
  );
  const testInstance = TestRenderer.create(
    <ResponsiveImageInteractive deckId={100} />
  );
  await act(async () => {
    await jest.runAllImmediates();
  });
  expect(testInstance.toJSON()).toMatchSnapshot();
});
