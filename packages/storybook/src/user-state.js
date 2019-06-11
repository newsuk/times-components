/* eslint-env browser */

const SUBSCRIBER = "Subscriber";
const RA = "Registered Access";
const RA_EXPIRED = "Registered Access (Expired)";
const GUEST = "Guest";

export const USER_STATES = { SUBSCRIBER, RA, RA_EXPIRED, GUEST };

const activeStatesPerUserState = {
  [SUBSCRIBER]: ["isLoggedIn"],
  [RA]: ["isLoggedIn", "isMetered"],
  [RA_EXPIRED]: ["isLoggedIn", "isMetered", "isMeteredExpired"],
  [GUEST]: []
};

const userStatesOptions = [SUBSCRIBER, RA, RA_EXPIRED, GUEST];

export function addUserStateKnobs(
  { boolean, select },
  defaultState = SUBSCRIBER
) {
  window.nuk = window.nuk || {};

  Object.defineProperty(window.nuk, "user", {
    enumerable: true,
    configurable: true,
    get() {
      const groupId = "User State";
      const userStateIdx = select(
        "Current User State",
        userStatesOptions,
        `${userStatesOptions.indexOf(defaultState)}`,
        groupId
      );
      const userStateName = userStatesOptions[userStateIdx];
      const isShared = boolean("Is Shared", false, groupId);
      const activeStateNames = activeStatesPerUserState[userStateName];
      const activeStates = activeStateNames.reduce(
        (acc, name) => ({
          ...acc,
          [name]: true
        }),
        {}
      );

      return {
        isLoggedIn: false,
        isMetered: false,
        isMeteredExpired: false,
        isShared,
        ...activeStates
      };
    }
  });
}
