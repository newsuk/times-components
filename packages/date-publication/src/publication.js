export const publications = {
  SUNDAYTIMES: "The Sunday Times",
  TIMES: "The Times"
};

export default publication =>
  publication && publications[publication]
    ? `, ${publications[publication]}`
    : ``;
