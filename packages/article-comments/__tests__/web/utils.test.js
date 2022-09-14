/* global window */

import {
  getDisplayNameFromLocalStorage,
  userShouldUpdateName
} from "../../src/utils";

const unmockedFetch = global.fetch;
let mockFetchResponse = {};

const localStorageMock = {
  storage: {},
  getItem: jest.fn(key => localStorageMock.storage[key]),
  setItem: jest.fn((key, value) => {
    localStorageMock.storage[key] = value;
  }),
  removeItem: jest.fn(key => delete localStorageMock.storage[key])
};

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("utils", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getDisplayNameFromLocalStorage()", () => {
    it("should return false if user it not signed in", () => {
      expect(getDisplayNameFromLocalStorage()).toEqual(false);
    });

    it("should return false if there is no display name", () => {
      window.localStorage.setItem(
        "SPOTIM_CURRENT_USER",
        '{"data":{"id":"u_sgCrqrs7KNLv","imageId":"#Grey-Cactus","username":"JohnSmith750","isRegistered":true}}'
      );
      expect(getDisplayNameFromLocalStorage()).toEqual(false);
    });
    it("should return the display name ", () => {
      window.localStorage.setItem(
        "SPOTIM_CURRENT_USER",
        '{"data":{"id":"u_sgCrqrs7KNLv","displayName":"John Smith","imageId":"#Grey-Cactus","username":"JohnSmith750","isRegistered":true}}'
      );
      expect(getDisplayNameFromLocalStorage()).toEqual("John Smith");
    });
  });

  describe("userShouldUpdateName()", () => {
    beforeAll(() => {
      global.fetch = () =>
        Promise.resolve({
          json: () => Promise.resolve(mockFetchResponse)
        });
    });

    afterAll(() => {
      global.fetch = unmockedFetch;
    });
    it("it should return false if no username", async () => {
      const result = await userShouldUpdateName();

      expect(result).toEqual(false);
    });

    it("it should return false if the username is valid", async () => {
      mockFetchResponse = { isPseudonym: false };

      const result = await userShouldUpdateName("john");

      expect(result).toEqual(false);
    });

    it("should set local storage values if they do not already exist and the user is on the banned list", async () => {
      mockFetchResponse = { isPseudonym: true };

      const result = await userShouldUpdateName("MockBannedName");

      expect(result).toEqual(true);
    });
  });
});
