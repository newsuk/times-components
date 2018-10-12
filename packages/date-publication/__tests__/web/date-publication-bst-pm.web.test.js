import shared from "../shared-london";
import { dateBSTPM } from "../constants";

const realIntl = Intl;

shared(dateBSTPM);

global.Intl = realIntl;
