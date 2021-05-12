export const hasCookieConsent = () =>
  typeof window !== 'undefined' &&
  window.document.cookie.indexOf('nuk-consent-personalisation=1') >= 0;
