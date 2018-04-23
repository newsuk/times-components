import omitBy from "lodash.omitby";

const clean = obj => omitBy(obj, x => x === undefined || Number.isNaN(x));

export default clean;
