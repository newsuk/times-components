import shared from "../shared-non-london";
import { dateGMTAM, dateGMTPM } from "../constants";

const realIntl = Intl;

shared(dateGMTAM);
shared(dateGMTPM);

global.Intl = realIntl;
