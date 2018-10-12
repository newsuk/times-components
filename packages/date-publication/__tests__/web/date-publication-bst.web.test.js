import shared from "../shared-london";
import { dateBSTAM, dateBSTPM } from "../constants";

const realIntl = Intl;

shared(dateBSTAM);
shared(dateBSTPM);

global.Intl = realIntl;
