const transformDomainCom = (data, hostName) => {
  if (!hostName || hostName.includes("thetimes.com")) {
    const stringifiedData = JSON.stringify(data);

    const transformedData = stringifiedData.replace(
      /(www.(|uat-|staging-?)thetimes).co.uk/gm,
      match => match.replace(".co.uk", ".com")
    );

    return JSON.parse(transformedData);
  }

  return data;
};

export default transformDomainCom;
