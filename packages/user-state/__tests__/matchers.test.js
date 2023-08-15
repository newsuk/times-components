import {
  showSaveAndShareBar,
  showArticleExtras,
  showTopicTags,
  showArticleSaveButton,
  showTokenisedEmailShare,
  showCommentingModule,
  showJoinTheConversationDialog
} from "../src/matchers";

const defaultUserState = {
  hasAccess: false,
  isLoggedIn: false,
  isMetered: false,
  isShared: false,
  isLightPackUser: false,
  isRegisteredUser: false
};

const hasAccessLoggedInOrSharedUser = func => {
  it("should return true if hasAccess and isLoggedIn", () => {
    const userState = {
      ...defaultUserState,
      hasAccess: true,
      isLoggedIn: true
    };
    expect(func(userState)).toBe(true);
  });

  it("should return true if hasAccess and isShared", () => {
    const userState = {
      ...defaultUserState,
      hasAccess: true,
      isShared: true
    };
    expect(func(userState)).toBe(true);
  });

  it("should return false if not hasAccess", () => {
    const userState = { ...defaultUserState };
    expect(func(userState)).toBe(false);
  });

  it("should return false if not isLoggedIn and not isShared", () => {
    const userState = { ...defaultUserState, hasAccess: true };
    expect(func(userState)).toBe(false);
  });
};

const hasAccessLoggedInUser = func => {
  it("should return true if hasAccess and isLoggedIn", () => {
    const userState = {
      ...defaultUserState,
      hasAccess: true,
      isLoggedIn: true
    };
    expect(func(userState)).toBe(true);
  });

  it("should return false if not hasAccess", () => {
    const userState = { ...defaultUserState };
    expect(func(userState)).toBe(false);
  });

  it("should return false if not isLoggedIn", () => {
    const userState = { ...defaultUserState, hasAccess: true };
    expect(func(userState)).toBe(false);
  });
};

const hasAccessLoggedInNonMeteredUser = func => {
  it("should return true if hasAccess and isLoggedIn", () => {
    const userState = {
      ...defaultUserState,
      hasAccess: true,
      isLoggedIn: true
    };
    expect(func(userState)).toBe(true);
  });

  it("should return false if not hasAccess", () => {
    const userState = { ...defaultUserState };
    expect(func(userState)).toBe(false);
  });

  it("should return false if hasAccess and not isLoggedIn", () => {
    const userState = { ...defaultUserState, hasAccess: true };
    expect(func(userState)).toBe(false);
  });

  it("should return false if isMetered", () => {
    const userState = {
      ...defaultUserState,
      hasAccess: true,
      isLoggedIn: true,
      isMetered: true
    };
    expect(func(userState)).toBe(false);
  });

  it("should return false if isLightPackUser", () => {
    const userState = {
      ...defaultUserState,
      hasAccess: true,
      isLoggedIn: true,
      isLightPackUser: true
    };
    expect(func(userState)).toBe(false);
  });

  it("should return false if isRegisteredUser", () => {
    const userState = {
      ...defaultUserState,
      hasAccess: true,
      isLoggedIn: true,
      isRegisteredUser: true
    };
    expect(func(userState)).toBe(false);
  });
};

const hasAccessLoggedInMeteredUser = func => {
  it("should return true if hasAccess, isLoggedIn and isMetered", () => {
    const userState = {
      ...defaultUserState,
      hasAccess: true,
      isLoggedIn: true,
      isMetered: true
    };
    expect(func(userState)).toBe(true);
  });

  it("should return true if hasAccess, isLoggedIn and isLightPackUser", () => {
    const userState = {
      ...defaultUserState,
      hasAccess: true,
      isLoggedIn: true,
      isLightPackUser: true
    };
    expect(func(userState)).toBe(true);
  });

  it("should return true if hasAccess, isLoggedIn and isRegisteredUser", () => {
    const userState = {
      ...defaultUserState,
      hasAccess: true,
      isLoggedIn: true,
      isRegisteredUser: true
    };
    expect(func(userState)).toBe(true);
  });

  it("should return false if not hasAccess", () => {
    const userState = { ...defaultUserState };
    expect(func(userState)).toBe(false);
  });

  it("should return false if not isLoggedIn", () => {
    const userState = { ...defaultUserState, hasAccess: true };
    expect(func(userState)).toBe(false);
  });

  it("should return false if not metered user", () => {
    const userState = {
      ...defaultUserState,
      hasAccess: true,
      isLoggedIn: true
    };
    expect(func(userState)).toBe(false);
  });
};

describe("user state should", () => {
  describe("showSaveAndShareBar", () => {
    hasAccessLoggedInOrSharedUser(showSaveAndShareBar);
  });

  describe("showArticleExtras", () => {
    hasAccessLoggedInOrSharedUser(showArticleExtras);
  });

  describe("showTopicTags", () => {
    hasAccessLoggedInOrSharedUser(showTopicTags);
  });

  describe("showArticleSaveButton", () => {
    hasAccessLoggedInUser(showArticleSaveButton);
  });

  describe("showTokenisedEmailShare", () => {
    hasAccessLoggedInNonMeteredUser(showTokenisedEmailShare);
  });

  describe("showCommentingModule", () => {
    hasAccessLoggedInNonMeteredUser(showCommentingModule);
  });

  describe("showJoinTheConversationDialog", () => {
    hasAccessLoggedInMeteredUser(showJoinTheConversationDialog);
  });
});
