import merge from "lodash.merge";
import { makeAdInitMocks, adInit } from "../../fixtures/ad-init-mocks";

export default () => {
  let mock;
  let initOptions;

  beforeEach(() => {
    ({ mock, initOptions } = makeAdInitMocks());
  });

  it("perform bidding request for web", () => {
    const init = adInit(
      merge(initOptions, { data: { bidInitialiser: false } })
    );
    jest.spyOn(init.prebid, "process");
    init.init();
    expect(init.prebid.process).toHaveBeenCalledTimes(1);
  });

  it("requestPrebidBids fetches bids using pbjs", done => {
    const init = adInit(initOptions);
    mock.window.pbjs.addAdUnits = jest.fn();
    mock.window.pbjs.requestBids = jest
      .fn()
      .mockImplementation(options => options.bidsBackHandler([]));
    mock.window.pbjs.removeAdUnit = jest.fn();
    init.prebid
      .bid({ slots: [{ code: "A" }] })
      .then(() => done())
      .catch(error => done(error));

    mock.processPrebidCommandQueue();

    expect(mock.window.pbjs.removeAdUnit).toHaveBeenCalled();
    expect(mock.window.pbjs.addAdUnits).toHaveBeenCalled();
  });
};
