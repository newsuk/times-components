import React from "react";
import renderer from "react-test-renderer";

import GPT from "../gpt.web";
import AdManager from "../ad-manager";
import { getSlotConfig } from "../generate-config";
import gptManager from "../gpt-manager";
import pbjs from "../pbjs-manager";
import { pbjs as pbjsConfig } from "../config";

const pbjsManager = pbjs(pbjsConfig);

describe("Gpt test", () => {
  let adManager;

  beforeEach(() => {
    adManager = new AdManager({
      networkId: "25436805",
      adUnit: "d.thetimes.co.uk",
      section: "article",
      gptManager,
      pbjsManager,
      getSlotConfig
    });
  });

  it("renders a snapshot", () => {
    const tree = renderer
      .create(<GPT adManager={adManager} code="ad-header" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders a snapshot for pixel", () => {
    const tree = renderer
      .create(<GPT adManager={adManager} code="ad-pixel" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders a snapshot on a unmounted component", () => {
    const code = "ad-header";
    const tree = renderer.create(<GPT adManager={adManager} code={code} />);

    adManager.unregisterAd = jest.fn();
    tree.unmount();
    expect(adManager.unregisterAd).toHaveBeenCalledWith(code);
  });
});
