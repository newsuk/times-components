import shared from "../shared-non-london";
import { dateBST } from "../constants";

const realIntl = Intl;

shared(dateBST);

global.Intl = realIntl;
