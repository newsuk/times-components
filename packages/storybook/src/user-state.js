/* eslint-disable import/prefer-default-export */

/* eslint-env browser */
export function addUserStateKnobs({ boolean }, defaults = { isLoggedIn: true }) {
  window.nuk = window.nuk || {};

  Object.defineProperty(
    window.nuk,
    "user",
    {
      enumerable: true,
      configurable: true,
      get() {
        const groupId = "User State";
        const isLoggedIn = boolean("Is Logged In", defaults.isLoggedIn || false, groupId);
        const isMetered = boolean("Is Metered", defaults.isMetered || false, groupId);
        const isMeteredExpired = boolean("Is Metered Expired", defaults.isMeteredExpired || false, groupId);
        const isShared = boolean("Is Shared", defaults.isShared || false, groupId);

        return { isLoggedIn, isMetered, isMeteredExpired, isShared };
      }
    }
  );
}
