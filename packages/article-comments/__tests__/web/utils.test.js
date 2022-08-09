import { userShouldUpdateName } from "../../src/utils";

const mockLocalStorage = {
  storage: {},
  getItem: jest.fn(key => mockLocalStorage.storage[key]),
  setItem: jest.fn((key, value) => {
    mockLocalStorage.storage[key] = value;
  })
};
Object.defineProperty(global.window, "localStorage", {
  value: mockLocalStorage
});

const unmockedFetch = global.fetch;
let mockFetchResponse = {};

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
    expect(mockLocalStorage.setItem).not.toBeCalled();
  });

  it("it should return false if the username is valid", async () => {
    mockFetchResponse = { isPseudonym: false };

    const result = await userShouldUpdateName("john");

    expect(result).toEqual(false);
    expect(mockLocalStorage.setItem).not.toBeCalledWith();
  });

  it("should set local storage values if they do not already exist and the user is on the banned list", async () => {
    mockFetchResponse = { isPseudonym: true };

    const result = await userShouldUpdateName("MockBannedName");

    expect(result).toEqual(true);
    expect(mockLocalStorage.setItem).toBeCalledWith(
      "realNameCommentingBannerViewCount",
      3
    );
    expect(mockLocalStorage.setItem).toBeCalledWith(
      "isRealNameCommentingBannerVisible",
      false
    );
  });

  it("should return true when localStorage is not set but the user is on the banned list", async () => {
    mockFetchResponse = { isPseudonym: true };
    const result = await userShouldUpdateName("MockBannedName");

    expect(result).toEqual(true);
    expect(mockLocalStorage.setItem).not.toBeCalledWith();
  });
});
