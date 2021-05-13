export const getStorageProvider = () =>
  typeof window !== 'undefined' && window.sessionStorage;
