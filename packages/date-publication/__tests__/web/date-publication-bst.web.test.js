import shared from "../shared-london";
import { dateBST } from "../constants";

const realIntl = Intl;

shared(dateBST);

global.Intl = realIntl;
