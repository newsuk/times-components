/* User states */

const hasAccessLoggedInOrSharedUser = userState =>
  userState.hasAccess && (userState.isLoggedIn || userState.isShared);

const hasAccessLoggedInUser = userState =>
  userState.hasAccess && userState.isLoggedIn;

const isMeteredUser = userState =>
  userState.isMetered || userState.isLightPackUser;

const hasAccessLoggedInNonMeteredUser = userState =>
  hasAccessLoggedInUser(userState) && !isMeteredUser(userState);

const hasAccessLoggedInMeteredUser = userState =>
  hasAccessLoggedInUser(userState) &&
  isMeteredUser(userState) &&
  userState.isRegisteredUser;

const hasAccessRegisteredUser = userState =>
  hasAccessLoggedInOrSharedUser(userState) && !userState.isRegisteredUser;

const hasAccessLoggedInRegisteredUser = userState =>
  hasAccessLoggedInNonMeteredUser(userState) && !userState.isRegisteredUser;

/* Entitlements */

export const showSaveAndShareBar = userState =>
  hasAccessRegisteredUser(userState);

export const showArticleExtras = userState =>
  hasAccessLoggedInOrSharedUser(userState);

export const showTopicTags = userState =>
  hasAccessLoggedInOrSharedUser(userState);

export const showArticleSaveButton = userState =>
  hasAccessLoggedInUser(userState);

export const showTokenisedEmailShare = userState =>
  hasAccessLoggedInNonMeteredUser(userState);

export const showCommentingModule = userState =>
  hasAccessLoggedInRegisteredUser(userState);

export const showJoinTheConversationDialog = userState =>
  hasAccessLoggedInMeteredUser(userState);
