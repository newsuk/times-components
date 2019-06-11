/* eslint-env browser */
export function addUserStateKnobs(knobs, defaults = { isLoggedIn: true }) {
  const { boolean } = knobs;

  const groupId = "User State";
  const isLoggedIn = boolean("Is Logged In", defaults.isLoggedIn || false, groupId);
  const isMetered = boolean("Is Metered", defaults.isMetered || false, groupId);
  const isMeteredExpired = boolean("Is Metered Expired", defaults.isMeteredExpired || false, groupId);
  const isShared = boolean("Is Shared", defaults.isShared || false, groupId);

  window.nuk = window.nuk || {};
  window.nuk.user = { isLoggedIn, isMetered, isMeteredExpired, isShared };
}
