export const getEnvironmentName = () => {
  const environment = window.__TIMES_CONFIG__.environmentName;
  return environment;
}

export const changeCommunityGuidelinesUrl = () => {
  const environment = getEnvironmentName();
  const url = "https://www.thetimes.co.uk/article/f4024fbe-d989-11e6-9063-500e6740fc32";

  return (environment === "uat") ? url.replace("thetimes", "uat-thetimes") : (environment === "staging") ? url.replace("thetimes", "staging-thetimes") : url;
}
