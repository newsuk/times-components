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

  if (!roles) {
    return null;
  }

  return roles[index] || null;
};
