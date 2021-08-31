import renderComments from "./renderer";

export default () => {
  it("enabled comments", () => {
    const { asFragment, baseElement } = renderComments({
      count: 123,
      enabled: true
    });
    expect(baseElement.getElementsByTagName("script")[0].src).toEqual(
      "https://launcher.spot.im/spot/CurrentSpotID"
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("pre-switchover comments", () => {
    const { asFragment, baseElement } = renderComments({
      count: 123,
      enabled: true,
      publishedTime: "2019-08-10T16:00:00.000Z"
    });
    expect(baseElement.getElementsByTagName("script")[0].src).toEqual(
      "https://launcher.spot.im/spot/ReadOnlySpotID"
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("disabled comments", () => {
    const { asFragment } = renderComments({ count: 123, enabled: false });
    expect(asFragment()).toMatchSnapshot();
  });
};
