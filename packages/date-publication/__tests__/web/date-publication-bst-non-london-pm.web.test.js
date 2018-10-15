import shared from "../shared-non-london";
import { dateBSTPM } from "../constants";

const realIntl = Intl;

shared(dateBSTPM);

global.Intl = realIntl;
