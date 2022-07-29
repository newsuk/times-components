import {
  isLoggedIn,
  isMeteredExpired,
  isShared,
  isMetered,
  isNonMeteredExpiredUser,
  isSubscriber,
  shouldShowFullArticle,
  isLoggedInOrShared,
  hasAccess
} from "../src/matchers";

const defaultUserState = {
  isLoggedIn: false,
  isMetered: false,
  isMeteredExpired: false,
  isShared: false,
  hasAccess: false
};

describe("user state should", () => {
  describe("isLoggedIn", () => {
    it("return true if userState isLoggedIn is true", () => {
      const userState = { ...defaultUserState, isLoggedIn: true };
      expect(isLoggedIn(userState)).toBe(true);
    });

    it("return false if userState isLoggedIn is false", () => {
      const userState = { ...defaultUserState, isLoggedIn: false };
      expect(isLoggedIn(userState)).toBe(false);
    });
  });

  describe("isMeteredExpired", () => {
    it("return true if user.isLoggedIn equals true and user.isMeteredExpired equals true", () => {
      const userState = {
        ...defaultUserState,
        isLoggedIn: true,
        isMetered: true,
        isMeteredExpired: true
      };
      expect(isMeteredExpired(userState)).toBe(true);
    });

    it("return false if user.isLoggedIn equals true and iuser.isMeteredExpired equals false", () => {
      expect(
        isMeteredExpired({
          ...defaultUserState,
          isLoggedIn: true,
          isMetered: true
        })
      ).toBe(false);
    });
  });

  describe("isShared", () => {
    it("return true if userState.isShared equals true", () => {
      const userState = { ...defaultUserState, isShared: true };
      expect(isShared(userState)).toBe(true);
    });

    it("return false if userState.isShared equals true", () => {
      const userState = { ...defaultUserState, isShared: false };
      expect(isShared(userState)).toBe(false);
    });
  });

  describe("isMetered", () => {
    it("return true if user.isLoggedIn equals true and user.isMetered equals true", () => {
      const userState = {
        ...defaultUserState,
        isLoggedIn: true,
        isMetered: true
      };
      expect(isMetered(userState)).toBe(true);
    });

    it("return false if user.isLoggedIn equals true and user.isMetered equals false", () => {
      const userState = {
        ...defaultUserState,
        isLoggedIn: true,
        isMetered: false
      };
      expect(isMetered(userState)).toBe(false);
    });
  });

  describe("isNonMeteredExpiredUser", () => {
    it("returns true when user is a subscriber", () => {
      const userState = { ...defaultUserState, isLoggedIn: true };
      expect(isNonMeteredExpiredUser(userState)).toBe(true);
    });

    it("returns true when user is a metered", () => {
      const userState = {
        ...defaultUserState,
        isLoggedIn: true,
        isMetered: false
      };
      expect(isNonMeteredExpiredUser(userState)).toBe(true);
    });

    it("returns false when user is a metered expired", () => {
      const userState = {
        ...defaultUserState,
        isLoggedIn: true,
        isMetered: false,
        isMeteredExpired: false
      };
      expect(isNonMeteredExpiredUser(userState)).toBe(true);
    });

    it("returns false when user is guest", () => {
      const userState = { ...defaultUserState, isLoggedIn: false };
      expect(isNonMeteredExpiredUser(userState)).toBe(false);
    });
  });

  describe("isSubscriber", () => {
    it("returns true when user is subscriber", () => {
      const userState = { ...defaultUserState, isLoggedIn: true };
      expect(isSubscriber(userState)).toBe(true);
    });

    it("returns false when user is metered", () => {
      const userState = {
        ...defaultUserState,
        isLoggedIn: true,
        isMetered: true
      };
      expect(isSubscriber(userState)).toBe(false);
    });

    it("returns false when user is guest", () => {
      const userState = { ...defaultUserState };
      expect(isSubscriber(userState)).toBe(false);
    });
  });

  describe("hasAccess", () => {
    it("return true if userState hasAccess is true", () => {
      const userState = { ...defaultUserState, hasAccess: true };
      expect(hasAccess(userState)).toBe(true);
    });

    it("return false if userState hasAccess is false", () => {
      const userState = { ...defaultUserState, hasAccess: false };
      expect(hasAccess(userState)).toBe(false);
    });
  });

  describe("isLoggedInOrShared", () => {
    it("returns true when user is subscriber", () => {
      const userState = { ...defaultUserState, isLoggedIn: true };
      expect(isLoggedInOrShared(userState)).toBe(true);
    });

    it("returns true when user is metered", () => {
      const userState = {
        ...defaultUserState,
        isLoggedIn: true,
        isMetered: true
      };
      expect(isLoggedInOrShared(userState)).toBe(true);
    });

    it("returns true when user is metered expired", () => {
      const userState = {
        ...defaultUserState,
        isLoggedIn: true,
        isMetered: true,
        isMeteredExpired: true
      };
      expect(isLoggedInOrShared(userState)).toBe(true);
    });

    it("returns true when user is on share token", () => {
      const userState = { ...defaultUserState, isShared: true };
      expect(isLoggedInOrShared(userState)).toBe(true);
    });

    it("returns false when user is guest", () => {
      const userState = { ...defaultUserState };
      expect(isLoggedInOrShared(userState)).toBe(false);
    });
  });

  describe("shouldShowFullArticle", () => {
    it("returns true when user is subscriber", () => {
      const userState = { ...defaultUserState, isLoggedIn: true };
      expect(shouldShowFullArticle(userState)).toBe(true);
    });

    it("returns true when user is metered", () => {
      const userState = {
        ...defaultUserState,
        isLoggedIn: true,
        isMetered: true
      };
      expect(shouldShowFullArticle(userState)).toBe(true);
    });

    it("returns true when user is on share token", () => {
      const userState = { ...defaultUserState, isShared: true };
      expect(shouldShowFullArticle(userState)).toBe(true);
    });

    it("returns true when user hasAccess", () => {
      const userState = { ...defaultUserState, hasAccess: true };
      expect(shouldShowFullArticle(userState)).toBe(true);
    });

    it("returns false when user is guest", () => {
      const userState = { ...defaultUserState };
      expect(shouldShowFullArticle(userState)).toBe(false);
    });

    it("returns false when user is metered expired", () => {
      const userState = {
        ...defaultUserState,
        isLoggedIn: true,
        isMetered: true,
        isMeteredExpired: true
      };
      expect(shouldShowFullArticle(userState)).toBe(false);
    });
  });
});
