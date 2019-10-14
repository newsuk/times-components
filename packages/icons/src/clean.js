/* eslint-disable import/prefer-default-export */
import omitBy from "lodash.omitby";

export const clean = obj =>
  omitBy(obj, x => x === undefined || Number.isNaN(x));
