import "./mocks";
import renderExtras from "./renderer";

export default () => {
  it("article extras", async done => {
    renderExtras({
      onReady: testInstance => {
        expect(testInstance).toMatchSnapshot();
        done();
      }
    });
  });

  it("comments error", async done => {
    renderExtras({
      error: () => ({ error: "Error" }),
      onReady: testInstance => {
        expect(testInstance).toMatchSnapshot();
        done();
      }
    });
  });
};
