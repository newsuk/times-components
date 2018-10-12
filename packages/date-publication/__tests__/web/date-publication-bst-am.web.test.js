import shared from "../shared-london";
import { dateBSTAM } from "../constants";

const realIntl = Intl;

shared(dateBSTAM);

global.Intl = realIntl;
