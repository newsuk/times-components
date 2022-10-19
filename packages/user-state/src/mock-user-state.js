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

    Object.keys(RealUserState).reduce((acc, key) => {
      acc[key] = RealUserState[key];

      return acc;
    }, MockUserState);

    MockUserState.mockReset = () => {
      MockUserState.mockStates = [
        RealUserState.showSaveAndShareBar,
        RealUserState.showArticleExtras,
        RealUserState.showArticleSaveButton,
        RealUserState.showCommentingModule
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
