import shared from "../shared-non-london";

const realIntl = Intl;

const dateBST = "2017-07-01T14:32:00.000Z";

shared(dateBST);

global.Intl = realIntl;
