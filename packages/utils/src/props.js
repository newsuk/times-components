import omitBy from "lodash.omitby";

const clean = obj => omitBy(obj, x => x === undefined);

export default clean;
