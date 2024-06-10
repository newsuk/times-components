import xss from 'xss';

const decodeEntities = (str: string) =>
  str
    .replace(/&#(\d+);/g, (__: string, d: number) => String.fromCharCode(d))
    .replace(/\s+/g, ' ');

export const sanitiseCopy = (copy: string = '', allowedTags: {} = {}) =>
  xss(decodeEntities(copy), {
    whiteList: allowedTags,
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script']
  });
