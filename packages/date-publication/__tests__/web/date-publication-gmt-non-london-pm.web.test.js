import shared from "../shared-non-london";
import { dateGMTPM } from "../constants";

const realIntl = Intl;

shared(dateGMTPM);

global.Intl = realIntl;
