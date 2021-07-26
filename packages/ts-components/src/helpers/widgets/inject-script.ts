export const injectScript = (scriptUrl: string) => {
  if (document.body.querySelector(`script[src="${scriptUrl}"]`)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.setAttribute('async', 'async');
    script.setAttribute('src', scriptUrl);
    script.onload = resolve;
    script.onerror = reject;

    document.body.appendChild(script);
  });
};
