import "../mocks.web";
import shared from "../shared-tracking";

beforeEach(() => {
  const nuk = {
    user: {
      isLoggedIn: true
    }
  };
  global.nuk = nuk;
});

afterEach(() => {
  global.nuk = {};
});

shared();
