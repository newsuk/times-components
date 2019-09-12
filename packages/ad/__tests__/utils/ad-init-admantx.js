import merge from "lodash.merge";
import { makeAdInitMocks, adInit } from "../../fixtures/ad-init-mocks";

export default () => {
  let initOptions;

  beforeEach(() => {
    ({ initOptions } = makeAdInitMocks());
  });

  it("initialises admantx", () => {
    const init = adInit(
      merge(initOptions, { data: { bidInitialiser: false } })
    );

    jest.spyOn(init.admantx, "init");
    init.init();
    expect(init.admantx.init).toHaveBeenCalledTimes(1);
  });

  it("extracts names correctly", () => {
    const init = adInit(initOptions);

    const input = [
      { score: 6, origin: "NORMAL", name: "foo", type: "MAINLEMMAS" },
      { score: 1, origin: "NORMAL", name: "Bar", type: "PLACES" },
      { score: 2, origin: "NORMAL", name: "Foo Bar    ", type: "MAINLEMMAS" },
      { score: 2, origin: "NORMAL", name: "Foo Bar    ", type: "PLACES" },
      {
        score: 1,
        origin: "NORMAL",
        name: "Foo Foo Bar['=!+#*~;^()<>[],& ",
        type: "PLACES"
      }
    ];

    const output = "foo,bar,foo_bar,foo_foo_bar";

    expect(init.admantx.extractNames(input)).toEqual(output);
  });
};
