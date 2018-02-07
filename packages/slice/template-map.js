export default template => {
  const templateObject = {
    DEFAULT: "default",
    LEAD_AND_TWO: "leadandtwo",
    OPINION_AND_TWO: "opinionandtwo"
  };

  return templateObject[template];
};
