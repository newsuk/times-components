import merge from "lodash.merge";
import { makeAdInitMocks, adInit } from "../../fixtures/ad-init-mocks";

export default () => {
  let initOptions;

  beforeEach(() => {
    ({ initOptions } = makeAdInitMocks());
  });

  it("ADmantx is initialised", () => {
    const init = adInit(
      merge(initOptions, { data: { bidInitialiser: false } })
    );

    jest.spyOn(init.admantx, "init");
    init.init();
    expect(init.admantx.init).toHaveBeenCalledTimes(1);
  });
};
