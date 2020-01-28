export const publications = {
  SUNDAYTIMES: "The Sunday Times",
  TIMES: "The Times"
};

export const getPublicationComma = publication =>
  publication && publications[publication] ? ", " : "";

export const getPublicationName = publication =>
  publication && publications[publication] ? publications[publication] : "";

export default publication =>
  publication && publications[publication]
    ? `, ${publications[publication]}`
    : "";
