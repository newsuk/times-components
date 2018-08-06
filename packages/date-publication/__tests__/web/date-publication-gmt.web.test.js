import shared from "../shared";

const realIntl = Intl;

const londonTimezone = () => {
  global.Intl = {
    DateTimeFormat: () => ({
      resolvedOptions: () => ({ timeZone: "Europe/London" })
    })
  };
};

const nonLondonTimezone = () => {
  global.Intl = {
    DateTimeFormat: () => ({
      resolvedOptions: () => ({ timeZone: "Europe/Kiev" })
    })
  };
};

const dateGMT = "2017-07-01T14:32:00.000Z";

shared(dateGMT, { londonTimezone, nonLondonTimezone });

global.Intl = realIntl;
