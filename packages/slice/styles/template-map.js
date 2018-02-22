// @TODO: delete this file when related articles wired up properly
export default template => {
  const templateObject = {
    DEFAULT: "default",
    LEAD_AND_TWO: "lead-and-two",
    OPINION_AND_TWO: "opinion-and-two"
  };

  return templateObject[template];
};
