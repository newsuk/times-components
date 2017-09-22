/* eslint-env jest */

import shared from "./shared";

jest.mock('react-dom', () => ({
  findDOMNode: () => ({}),
}));

describe("Article test on web", () => {
  shared();
});
