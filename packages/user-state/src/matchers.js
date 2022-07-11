export const isLoggedIn = userState => userState.isLoggedIn;

export const hasAccess = userState => userState.hasAccess;

export const isMeteredExpired = userState =>
  isLoggedIn(userState) && userState.isMeteredExpired;

export const isShared = userState => userState.isShared;

export const isMetered = userState =>
  isLoggedIn(userState) && userState.isMetered;

export const isSubscriber = userState =>
  isLoggedIn(userState) && !userState.isMetered && !userState.isMeteredExpired;

export const isNonMeteredExpiredUser = user =>
  isLoggedIn(user) && !isMeteredExpired(user);

export const shouldShowFullArticle = user =>
  isShared(user) || isNonMeteredExpiredUser(user) || hasAccess(user);

export const isLoggedInOrShared = user => isShared(user) || isLoggedIn(user);
