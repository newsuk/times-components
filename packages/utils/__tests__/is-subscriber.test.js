/* global window */
import { isSubscriber } from "../is-subscriber";

describe("isSubscriber", () => {
  beforeAll(() => {
    window.nuk = {
      user: {
        isLoggedIn: true,
        isMeteredExpired: false
      }
    };
  });
  it("is subscriber", () => {
    expect(isSubscriber()).toBe(true);
  });

  afterAll(() => {
    window.nuk = {};
  });
});
