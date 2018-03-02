export default (template, index) => {
  const templateObject = {
    DEFAULT: ["default-1", "default-2", "default-3"],
    "LEAD-AND-TWO": ["lead", "lead-supporting-1", "lead-supporting-2"],
    "OPINION-AND-TWO": [
      "opinion",
      "opinion-supporting-1",
      "opinion-supporting-2"
    ]
  };

  const roles = templateObject[template];

  if (!roles)
    throw new Error(`template "${template}" does not have any roles specified`);

  const role = roles[index];

  if (!role)
    throw new Error(
      `template "${template}" does not have a role for index "${index}"`
    );

  return role;
};
