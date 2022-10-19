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
  isLoggedIn: false,
  isMetered: false,
  isMeteredExpired: false,
  isShared: false,
  isLightPackUser: false
};

describe("user state should", () => {
  describe("showSaveAndShareBar", () => {
    it("should return true if isLoggedIn", () => {
      const userState = { ...defaultUserState, isLoggedIn: true };
      expect(showSaveAndShareBar(userState)).toBe(true);
    });

    it("should return true if isShared", () => {
      const userState = { ...defaultUserState, isShared: true };
      expect(showSaveAndShareBar(userState)).toBe(true);
    });

    it("should return false if not isLoggedIn and not isShared", () => {
      const userState = { ...defaultUserState };
      expect(showSaveAndShareBar(userState)).toBe(false);
    });
  });

  describe("showArticleExtras", () => {
    it("should return true if isLoggedIn and not isMeteredExpiredUser", () => {
      const userState = { ...defaultUserState, isLoggedIn: true };
      expect(showArticleExtras(userState)).toBe(true);
    });

    it("should return true if isShared", () => {
      const userState = { ...defaultUserState, isShared: true };
      expect(showArticleExtras(userState)).toBe(true);
    });

    it("should return true if isLoggedIn and isLightPackExpired", () => {
      const userState = {
        ...defaultUserState,
        isLoggedIn: true,
        isLightPackUser: true,
        viewsRemaining: 1
      };
      expect(showArticleExtras(userState)).toBe(true);
    });

    it("should return false if not isLoggedIn and not isShared", () => {
      const userState = { ...defaultUserState };
      expect(showArticleExtras(userState)).toBe(false);
    });

    it("should return false if isLoggedIn and isMeteredExpired", () => {
      const userState = {
        ...defaultUserState,
        isLoggedIn: true,
        isMeteredExpired: true
      };
      expect(showArticleExtras(userState)).toBe(false);
    });

    it("should return false if isLoggedIn and isLightPackExpired", () => {
      const userState = {
        ...defaultUserState,
        isLoggedIn: true,
        isLightPackUser: true,
        viewsRemaining: 0
      };
      expect(showArticleExtras(userState)).toBe(false);
    });
  });

  describe("showTopicTags", () => {
    it("should return true if isLoggedIn", () => {
      const userState = { ...defaultUserState, isLoggedIn: true };
      expect(showTopicTags(userState)).toBe(true);
    });

    it("should return true if isShared", () => {
      const userState = { ...defaultUserState, isShared: true };
      expect(showTopicTags(userState)).toBe(true);
    });

    it("should return false if not isLoggedIn and not isShared", () => {
      const userState = { ...defaultUserState };
      expect(showTopicTags(userState)).toBe(false);
    });
  });

  describe("showArticleSaveButton", () => {
    it("should return true if isLoggedIn", () => {
      const userState = { ...defaultUserState, isLoggedIn: true };
      expect(showArticleSaveButton(userState)).toBe(true);
    });

    it("should return false if not isLoggedIn", () => {
      const userState = { ...defaultUserState };
      expect(showArticleSaveButton(userState)).toBe(false);
    });
  });

  describe("showJoinTheConversationDialog", () => {
    it("should return true if isLoggedIn and isMetered", () => {
      const userState = {
        ...defaultUserState,
        isLoggedIn: true,
        isMetered: true
      };
      expect(showJoinTheConversationDialog(userState)).toBe(true);
    });

    it("should return true if isLoggedIn and isLightPackUser", () => {
      const userState = {
        ...defaultUserState,
        isLoggedIn: true,
        isLightPackUser: true
      };
      expect(showJoinTheConversationDialog(userState)).toBe(true);
    });

    it("should return false if not isLoggedIn", () => {
      const userState = { ...defaultUserState };
      expect(showJoinTheConversationDialog(userState)).toBe(false);
    });

    it("should return false if isLoggedIn and not isMeteredUser", () => {
      const userState = { ...defaultUserState, isLoggedIn: true };
      expect(showJoinTheConversationDialog(userState)).toBe(false);
    });
  });

  describe("showCommentingModule", () => {
    it("should return true if isLoggedIn and not isMeteredUser", () => {
      const userState = { ...defaultUserState, isLoggedIn: true };
      expect(showCommentingModule(userState)).toBe(true);
    });

    it("should return false if not isLoggedIn", () => {
      const userState = { ...defaultUserState };
      expect(showCommentingModule(userState)).toBe(false);
    });

    it("should return false if isLoggedIn and isMetered", () => {
      const userState = {
        ...defaultUserState,
        isLoggedIn: true,
        isMetered: true
      };
      expect(showCommentingModule(userState)).toBe(false);
    });

    it("should return false if isLoggedIn and isLightPackUser", () => {
      const userState = {
        ...defaultUserState,
        isLoggedIn: true,
        isLightPackUser: true
      };
      expect(showCommentingModule(userState)).toBe(false);
    });
  });

  describe("showTokenisedEmailShare", () => {
    it("should return true if isLoggedIn and not isMeteredUser", () => {
      const userState = { ...defaultUserState, isLoggedIn: true };
      expect(showTokenisedEmailShare(userState)).toBe(true);
    });

    it("should return false if not isLoggedIn", () => {
      const userState = { ...defaultUserState };
      expect(showTokenisedEmailShare(userState)).toBe(false);
    });

    it("should return false if isLoggedIn and isMetered", () => {
      const userState = {
        ...defaultUserState,
        isLoggedIn: true,
        isMetered: true
      };
      expect(showTokenisedEmailShare(userState)).toBe(false);
    });

    it("should return false if isLoggedIn and isLightPackUser", () => {
      const userState = {
        ...defaultUserState,
        isLoggedIn: true,
        isLightPackUser: true
      };
      expect(showTokenisedEmailShare(userState)).toBe(false);
    });
  });
});
