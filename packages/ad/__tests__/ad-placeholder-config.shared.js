import { calculateViewBox } from "../src/styles";

export default () => {
  it("should return a small ViewBox config", () => {
    const height = 90;
    const width = 728;
    expect(calculateViewBox({ height, width })).toMatchSnapshot(
      "1. small ViewBox config"
    );
  });

  it("should return a mpu ViewBox config", () => {
    const height = 250;
    const width = 300;
    expect(calculateViewBox({ height, width })).toMatchSnapshot(
      "2. mpu ViewBox config"
    );
  });

  it("should return a billboard ViewBox config", () => {
    const height = 250;
    const width = 970;
    expect(calculateViewBox({ height, width })).toMatchSnapshot(
      "3. billboard ViewBox config"
    );
  });

  it("should return a default ViewBox config", () => {
    const height = 50;
    const width = 700;
    expect(calculateViewBox({ height, width })).toMatchSnapshot(
      "4. default ViewBox config"
    );
  });
};
