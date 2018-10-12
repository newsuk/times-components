import shared from "../shared-non-london";
import { dateBSTAM, dateBSTPM } from "../constants";

const realIntl = Intl;

shared(dateBSTAM);
shared(dateBSTPM);

global.Intl = realIntl;
