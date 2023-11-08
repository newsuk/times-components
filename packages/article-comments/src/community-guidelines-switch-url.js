export const getEnvironmentName = () => {
  const environment = window.__TIMES_CONFIG__.environmentName;
  console.log('***environment', environment)
  return environment;
}
