export default template => {
  const templateObject = {
    DEFAULT: "default",
    LEAD_AND_TWO: "lead",
    OPINION_AND_TWO: "opinion"
  };

  return templateObject[template];
};
