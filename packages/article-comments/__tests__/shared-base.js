import renderComments from "./renderer";

export default () => {
  it("enabled comments", async done => {
    renderComments({
      enabled: true,
      onReady: testInstance => {
        expect(testInstance).toMatchSnapshot();
        done();
      }
    });
  });

  it("disabled comments", async done => {
    renderComments({
      enabled: false,
      onReady: testInstance => {
        expect(testInstance).toMatchSnapshot();
        done();
      }
    });
  });

  it("comments error", async done => {
    renderComments({
      enabled: true,
      error: () => ({ error: "Error" }),
      onReady: testInstance => {
        expect(testInstance).toMatchSnapshot();
        done();
      }
    });
  });
};
