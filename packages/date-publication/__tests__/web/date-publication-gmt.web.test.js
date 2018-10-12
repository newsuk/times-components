import shared from "../shared-london";
import { dateGMTAM, dateGMTPM } from "../constants";

const realIntl = Intl;

shared(dateGMTAM);
shared(dateGMTPM);

global.Intl = realIntl;
