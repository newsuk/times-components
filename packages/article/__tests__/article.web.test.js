/* eslint-env jest */

import shared from "./shared";

// Due to https://github.com/facebook/react/issues/7371
jest.mock('react-dom', () => ({
  findDOMNode: () => ({}),
}));

describe("Article test on web", () => {
  shared();
});
