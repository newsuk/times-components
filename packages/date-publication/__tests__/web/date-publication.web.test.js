import shared from "../shared";

const realIntl = Intl;

describe("Date Publication test on Web when the user has the same time zone as London time zone", () => {
  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
  });
  afterEach(() => {
    global.Intl = realIntl;
  });
  shared();
});

describe("Date Publication test on Web when the user has a different time zone than London time zone", () => {
  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/Kiev" })
      })
    };
  });
  afterEach(() => {
    global.Intl = realIntl;
  });
  shared();
});
