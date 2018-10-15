import shared from "../shared-non-london";
import { dateGMTAM } from "../constants";

const realIntl = Intl;

shared(dateGMTAM);

global.Intl = realIntl;
