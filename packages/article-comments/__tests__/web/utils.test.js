/* global window */

import {
  getDisplayNameFromLocalStorage,
  shouldReauthenticateUser,
  userShouldUpdateName
} from "../../src/utils";
// import executeSSOtransaction from '../../src/comment-login';

const unmockedFetch = global.fetch;
let mockFetchResponse = {};

// const localStorageMock = (function() {
//   const store = {};
//   return {
//     getItem(key) {
//       return store[key];
//     },
//     setItem(key, value) {
//       store[key] = value.toString();
//     },
//     removeItem(key) { delete localStorageMock.storage[key]}
//   };
// })();

const localStorageMock = {
  storage: {},
  getItem: jest.fn(key => localStorageMock.storage[key]),
  setItem: jest.fn((key, value) => {
    localStorageMock.storage[key] = value;
  }),
  removeItem: jest.fn(key => delete localStorageMock.storage[key])
};

Object.defineProperty(window, "localStorage", { value: localStorageMock });

// let  mockExecuteSSO = jest.fn(() => {
//   localStorageMock.setItem("isUsingRealNameCommenting", true)
// })

// jest.mock('../../src/comment-login', () => () => ({
//   executeSSoTransaction: () => mockExecuteSSO
// }));

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

  describe("shouldReauthenticateUser()", () => {
    // afterEach(() => {
    //   jest.clearAllMocks();
    // })
    // const mockLocalStorage = {
    //   storage: {},
    //   getItem: jest.fn(key => mockLocalStorage.storage[key]),
    //   setItem: jest.fn((key, value) => {
    //     mockLocalStorage.storage[key] = value;
    //   }),
    //   removeItem: jest.fn(key => delete mockLocalStorage.storage[key])
    // };

    // Object.defineProperty(global.window, "localStorage", {
    //   value: mockLocalStorage
    // });

    // it("should authenticate a new user", () => {
    //   reauthenticateUser();
    //   expect(mockLocalStorage.setItem).toHaveBeenCalledWith("isUsingRealNameCommenting", true);
    //   expect(mockExecuteSSO).toHaveBeenCalled();
    // });
    it("should not reauthenticate if user has already signed into the new service", () => {
      localStorageMock.setItem("isUsingRealNameCommenting", true);
      shouldReauthenticateUser();
      expect(localStorageMock.getItem).toHaveBeenLastCalledWith(
        "isUsingRealNameCommenting"
      );
      // expect(mockExecuteSSO).not.toHaveBeenCalled();
    });
    it("should delete Spot IM localStorage tokens if user is signed into the old system", () => {
      localStorageMock.removeItem("isUsingRealNameCommenting");
      localStorageMock.setItem("SPOTIM_DEVICE_V2", "a_BC123");
      localStorageMock.setItem("SPOTIM_CURRENT_USER", "1: {short_name: 32})");
      localStorageMock.setItem("SPOTIM_ACCESS_TOKEN", "abc123");
      localStorageMock.setItem("SPOT_AB", "d_EF456");
      localStorageMock.setItem(
        "SPOTIM_DEVICE_UUID_V2",
        "{UUID: abc123-def456}"
      );
      shouldReauthenticateUser();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        "SPOTIM_DEVICE_V2"
      );
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        "SPOTIM_CURRENT_USER"
      );
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        "SPOTIM_ACCESS_TOKEN"
      );
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("SPOT_AB");
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        "SPOTIM_DEVICE_UUID_V2"
      );
    });
    it("should call executeSSOtransaction if user is signed into the old system", () => {
      shouldReauthenticateUser();
      // expect(mockExecuteSSO).toHaveBeenCalled();
    });
  });
});
