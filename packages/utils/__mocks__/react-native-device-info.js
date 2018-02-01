let timezone = "Europe/London";

module.exports = {
  setMockTimezone: t => {
    timezone = t;
  },
  getTimezone: jest.fn(() => timezone)
};
