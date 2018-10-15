import shared from "../shared-non-london";
import { dateBSTAM } from "../constants";

const realIntl = Intl;

shared(dateBSTAM);

global.Intl = realIntl;
