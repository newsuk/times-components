/* User states */

const isMeteredUser = userState =>
  userState.isMetered || userState.isLightPackUser;

const isLightPackExpired = userState =>
  userState.isLightPackUser && userState.viewsRemaining === 0;

const isMeteredExpiredUser = userState =>
  userState.isMeteredExpired || isLightPackExpired(userState);

const isLoggedInWithAccess = userState =>
  userState.isLoggedIn && !isMeteredExpiredUser(userState);

const isSubscriber = userState =>
  userState.isLoggedIn && !isMeteredUser(userState);

/* Entitlements */

export const showSaveAndShareBar = userState =>
  userState.isLoggedIn || userState.isShared;

export const showArticleExtras = userState =>
  isLoggedInWithAccess(userState) || userState.isShared;

export const showTopicTags = userState =>
  userState.isLoggedIn || userState.isShared;

export const showArticleSaveButton = userState => userState.isLoggedIn;

export const showTokenisedEmailShare = userState => isSubscriber(userState);
export const showCommentingModule = userState => isSubscriber(userState);

export const showJoinTheConversationDialog = userState =>
  userState.isLoggedIn && isMeteredUser(userState);
