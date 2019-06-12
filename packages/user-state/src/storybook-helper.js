/* eslint-env browser */

import { select, boolean } from "@storybook/addon-knobs/react";
import { SUBSCRIBER, RA, RA_EXPIRED, GUEST } from "./states";

const activeStatesPerUserState = {
  [SUBSCRIBER]: ["isLoggedIn"],
  [RA]: ["isLoggedIn", "isMetered"],
  [RA_EXPIRED]: ["isLoggedIn", "isMetered", "isMeteredExpired"],
  [GUEST]: []
};

const userStatesOptions = [SUBSCRIBER, RA, RA_EXPIRED, GUEST];

function addUserStateKnobs(defaultState = SUBSCRIBER) {
  window.nuk = window.nuk || {};

  Object.defineProperty(window.nuk, "user", {
    enumerable: true,
    configurable: true,
    get() {
      const groupId = "User State";
      const userStateName = select(
        "Current User State",
        userStatesOptions,
        defaultState,
        groupId
      );
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

export default addUserStateKnobs;
