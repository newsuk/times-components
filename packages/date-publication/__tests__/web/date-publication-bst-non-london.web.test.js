import shared from "../shared-non-london";

const realIntl = Intl;

const dateBST = "2017-01-01T14:32:00.000Z";

shared(dateBST);

global.Intl = realIntl;
