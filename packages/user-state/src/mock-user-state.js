/* eslint-disable no-undef,global-require,import/no-extraneous-dependencies */
function mockUserState() {
  jest.mock("@times-components/user-state", () => {
    const RealUserState = require.requireActual("@times-components/user-state")
      .default;

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

    return MockUserState;
  });

  const UserState = require("@times-components/user-state");

  beforeEach(() => {
    UserState.mockReset();
  });

  return UserState;
}

export default mockUserState;
