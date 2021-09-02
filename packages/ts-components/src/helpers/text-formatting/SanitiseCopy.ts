import sanitizeHtml from 'sanitize-html';

export const sanitiseCopy = (copy: string, allowedTags: string[] = []) =>
  sanitizeHtml(copy, { allowedTags, allowedAttributes: {} });
