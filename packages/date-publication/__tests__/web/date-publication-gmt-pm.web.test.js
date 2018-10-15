import shared from "../shared-london";
import { dateGMTPM } from "../constants";

const realIntl = Intl;

shared(dateGMTPM);

global.Intl = realIntl;
