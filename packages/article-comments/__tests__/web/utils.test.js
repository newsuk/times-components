import { reauthenticateUser, userShouldUpdateName } from "../../src/utils";

const unmockedFetch = global.fetch;
let  mockExecuteSSO = jest.fn(() => {
  mocklocalstoreage.setItem()
})
let mockFetchResponse = {};

jest.mock('../../src/comment-login', () => ({
  executeSSoTransaction: () => mockExecuteSSO
}));


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

describe("reauthenticateUser()", () => {
  const mockLocalStorage = {
    storage: {},
    getItem: jest.fn(key => mockLocalStorage.storage[key]),
    setItem: jest.fn((key, value) => {
      mockLocalStorage.storage[key] = value;
    }),
    removeItem: jest.fn(key => delete mockLocalStorage.storage[key])
  };

  Object.defineProperty(global.window, "localStorage", {
    value: mockLocalStorage
  });

  // it("should authenticate a new user", () => {
  //   reauthenticateUser();
  //   expect(mockLocalStorage.setItem).toHaveBeenCalledWith("isUsingRealNameCommenting", true);
  //   expect(mockExecuteSSO).toHaveBeenCalled();
  // });
  it("should not reauthenticate if user has already signed into the new service", () => {
    mockLocalStorage.setItem("isUsingRealNameCommenting", true);
    reauthenticateUser();
    expect(mockLocalStorage.getItem).toHaveBeenLastCalledWith("isUsingRealNameCommenting");
    expect(mockExecuteSSO).not.toHaveBeenCalled();
  });
  it("should delete Spot IM localStorage tokens if user is signed into the old system", () => {
    reauthenticateUser();
    expect(mockLocalStorage.getItem).not.toHaveBeenLastCalledWith("isUsingRealNameCommenting");
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("SPOTIM_DEVICE_V2");
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("SPOTIM_CURRENT_USER");
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("SPOTIM_ACCESS_TOKEN");
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("SPOT_AB");
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("SPOTIM_DEVICE_UUID_V2");
  });
  it("should call executeSSOtransaction if user is signed into the old system", () => {
    reauthenticateUser();
    expect(mockLocalStorage.getItem).not.toHaveBeenLastCalledWith("isUsingRealNameCommenting");
    expect(mockExecuteSSO).toHaveBeenCalled();
  })
})
