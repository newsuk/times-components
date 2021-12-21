import xss from 'xss';

export const sanitiseCopy = (copy: string = '', allowedTags: {} = {}) => {
  const decodeEntities = (inputString: string) => {
    let decodedString = document.createElement('textarea');
    decodedString.innerHTML = inputString;
    return decodedString.value;
  };

  let options = {
    whiteList: allowedTags,
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script']
  };

  let decodedCopy = decodeEntities(copy);

  return xss(decodedCopy, options);
};
