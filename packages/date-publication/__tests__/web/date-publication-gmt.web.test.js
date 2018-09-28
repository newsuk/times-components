import shared from "../shared-london";
import { dateGMT } from "../constants";

const realIntl = Intl;

shared(dateGMT);

global.Intl = realIntl;
