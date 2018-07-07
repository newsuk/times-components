import { calculateViewBox } from "../src/styles";

export default () => {
  it("should return a small viewBox config", () => {
    const height = 90;
    const width = 728;
    expect(calculateViewBox({ height, width })).toMatchSnapshot(
      "1. small viewBox config"
    );
  });

  it("should return a mpu viewBox config", () => {
    const height = 250;
    const width = 300;
    expect(calculateViewBox({ height, width })).toMatchSnapshot(
      "2. mpu viewBox config"
    );
  });

  it("should return a default viewBox config", () => {
    const height = 50;
    const width = 700;
    expect(calculateViewBox({ height, width })).toMatchSnapshot(
      "3. default viewBox config"
    );
  });
};
