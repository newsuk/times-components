import { iterator } from "@times-components/test-utils";
import { calculateViewBox } from "../src/styles";

export default () => {
  const tests = [
    {
      name: "small config",
      test: () => {
        const height = 90;
        const width = 728;
        expect(calculateViewBox({ height, width })).toMatchSnapshot();
      }
    },
    {
      name: "mpu config",
      test: () => {
        const height = 250;
        const width = 300;
        expect(calculateViewBox({ height, width })).toMatchSnapshot();
      }
    },
    {
      name: "default config",
      test: () => {
        const height = 50;
        const width = 700;
        expect(calculateViewBox({ height, width })).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
