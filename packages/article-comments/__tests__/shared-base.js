import renderComments from "./renderer";

export default () => {
  it("enabled comments", () => {
    const testInstance = renderComments({ count: 123, enabled: true });
    expect(testInstance).toMatchSnapshot();
  });

  it("disabled comments", () => {
    const testInstance = renderComments({ count: 123, enabled: false });
    expect(testInstance).toMatchSnapshot();
  });
};
