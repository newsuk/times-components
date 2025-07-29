// instagram-loader.js
let instagramScriptLoading;

export function loadInstagramEmbedScript() {
  if (window.instgrm && window.instgrm.Embeds) {
    return Promise.resolve();
  }

  if (!instagramScriptLoading) {
    instagramScriptLoading = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  return instagramScriptLoading;
}
