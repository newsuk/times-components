import { calculateViewBox } from "../src/styles";

export default () => {
  it("should return a small viewbox config", () => {
    const height = 90;
    const width = 728;
    expect(calculateViewBox({ height, width })).toMatchSnapshot();
  });

  it("should return a mpu viewbox config", () => {
    const height = 250;
    const width = 300;
    expect(calculateViewBox({ height, width })).toMatchSnapshot();
  });

  it("should return a billboard viewbox config", () => {
    const height = 250;
    const width = 970;
    expect(calculateViewBox({ height, width })).toMatchSnapshot();
  });

  it("should return a default viewbox config", () => {
    const height = 50;
    const width = 700;
    expect(calculateViewBox({ height, width })).toMatchSnapshot();
  });
};
