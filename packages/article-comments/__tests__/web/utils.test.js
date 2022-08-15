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
    reauthenticateUser();
    expect(mockLocalStorage.getItem).toHaveBeenLastCalledWith("isUsingRealNameCommenting");
    expect(mockExecuteSSO).not.toHaveBeenCalled();
  });
  it("should reauthenticate user if signed into the old system", () => {
    // should test that SSO fires again
    // should expect there is no localStorage token
    // should set localStorage token to say that user is already in new system
  });

})
