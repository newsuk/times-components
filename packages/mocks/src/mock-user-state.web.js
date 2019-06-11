/* eslint-disable no-undef,global-require,import/no-extraneous-dependencies */

export default () => {
  jest.mock("@times-components/utils", () => {
    const utils = require.requireActual("@times-components/utils");
    const RealUserState = utils.UserState;

    function MockUserState({ state, children = null, fallback = null }) {
      return MockUserState.mockStates.find(s => s === state)
        ? children
        : fallback;
    }

    Object.entries(RealUserState).reduce((acc, [key, val]) => {
      acc[key] = val;

      return acc;
    }, MockUserState);

    MockUserState.mockReset = () => {
      MockUserState.mockStates = [
        RealUserState.fullArticle,
        RealUserState.loggedIn,
        RealUserState.loggedInOrShared,
        RealUserState.subscriber
      ];
    };

    MockUserState.mockReset();

    return {
      __esModule: true,
      ...utils,
      UserState: MockUserState
    };
  });

  const { UserState } = require("@times-components/utils");

  beforeEach(() => {
    UserState.mockReset();
  });

  return UserState;
};
