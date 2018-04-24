import { delayAndAdvance, delay, advance } from "../src";

describe("faketimer tests", () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useFakeTimers());

  it("should advance time instantly", async () => {
    await delayAndAdvance(10 * 60 * 1000);
  });

  it("should advance time in steps", async () => {
    const events = [];
    delay(1000).then(() => events.push(2));
    delay(500).then(() => events.push(1));

    await advance(500);
    expect(events).toEqual([1]);
    await advance(500);
    expect(events).toEqual([1, 2]);
  });
});
