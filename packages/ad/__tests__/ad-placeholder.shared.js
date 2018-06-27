import { calculateViewBox } from "../src/styles";

export default () => {
  it("should return a small ViewBox config", () => {
    const height = 90;
    const width = 728;
    expect(calculateViewBox({ height, width })).toMatchSnapshot(
      "2. Small ViewBox config"
    );
  });

  it("should return a mpu ViewBox config", () => {
    const height = 250;
    const width = 300;
    expect(calculateViewBox({ height, width })).toMatchSnapshot(
      "3. MPU ViewBox config"
    );
  });

  it("should return a billboard ViewBox config", () => {
    const height = 250;
    const width = 970;
    expect(calculateViewBox({ height, width })).toMatchSnapshot(
      "3. Billboard ViewBox config"
    );
  });

  it("should return a default ViewBox config", () => {
    const height = 50;
    const width = 700;
    expect(calculateViewBox({ height, width })).toMatchSnapshot(
      "4. Default ViewBox config"
    );
  });
};
