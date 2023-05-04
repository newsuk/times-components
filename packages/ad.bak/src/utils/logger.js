/* eslint-disable no-console */
export default (type, detail) => {
  switch (type) {
    case "error":
      console.error(detail);
      break;
    case "warn":
      console.warn(detail);
      break;
    case "info":
      console.info(detail);
      break;
    case "debug":
      console.debug(detail);
      break;
    case "log":
      console.log(detail);
      break;
    default:
      console.log(type);
      console.log(detail);
  }
};
