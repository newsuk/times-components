import shared from "../shared-non-london";
import { dateGMT } from "../constants";

const realIntl = Intl;

shared(dateGMT);

global.Intl = realIntl;
