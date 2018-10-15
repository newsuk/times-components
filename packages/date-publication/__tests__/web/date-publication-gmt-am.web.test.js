import shared from "../shared-london";
import { dateGMTAM } from "../constants";

const realIntl = Intl;

shared(dateGMTAM);

global.Intl = realIntl;
