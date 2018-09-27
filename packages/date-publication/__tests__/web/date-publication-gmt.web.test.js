import shared from "../shared-london";

const realIntl = Intl;

const dateGMT = "2017-07-01T14:32:00.000Z";

shared(dateGMT);

global.Intl = realIntl;
