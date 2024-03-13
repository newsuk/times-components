const transformDomainCom = data => {
  const replaceObj = {
    "www.thetimes.co.uk": "www.thetimes.com",
    "-thetimes.co.uk": "-thetimes.com"
  };
  const transformedData = data.replace(
    /www.thetimes.co.uk|-thetimes.co.uk/g,
    match => replaceObj[match]
  );

  return transformedData;
};

export default transformDomainCom;
