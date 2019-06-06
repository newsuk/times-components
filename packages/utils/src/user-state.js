export const isLoggedIn = userState => userState.isLoggedIn;

export const isMeteredExpired = userState =>
  isLoggedIn(userState) && userState.isMeteredExpired;

export const isShared = userState => userState.isShared;

export const isMetered = userState =>
  isLoggedIn(userState) && userState.isMetered;

export const isNonExpiredUser = user =>
  isLoggedIn(user) && !isMeteredExpired(user);

export const shouldShowFullArticle = user =>
  isShared(user) || isNonExpiredUser(user);
