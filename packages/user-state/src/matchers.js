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
  hasAccessLoggedInUser(userState) && isMeteredUser(userState);

/* Entitlements */

export const showSaveAndShareBar = userState =>
  hasAccessLoggedInOrSharedUser(userState);

export const showArticleExtras = userState =>
  hasAccessLoggedInOrSharedUser(userState);

export const showTopicTags = userState =>
  hasAccessLoggedInOrSharedUser(userState);

export const showArticleSaveButton = userState =>
  hasAccessLoggedInUser(userState);

export const showTokenisedEmailShare = userState =>
  hasAccessLoggedInNonMeteredUser(userState);

export const showCommentingModule = userState =>
  hasAccessLoggedInNonMeteredUser(userState);

export const showJoinTheConversationDialog = userState =>
  hasAccessLoggedInMeteredUser(userState);
