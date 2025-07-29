// instagram-loader.js
let instagramScriptLoading;

export function loadInstagramEmbedScript() {
    console.log('lol uslo', window.instgrm, window.instgrm.Embeds);
  if (window.instgrm && window.instgrm.Embeds) {
    console.log('lol promise');
    return Promise.resolve();
  }

  if (!instagramScriptLoading) {
    console.log('lol uslo 22', window.instgrm, window.instgrm.Embeds);
    instagramScriptLoading = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
      console.log('lol zavrseno', window.instgrm, window.instgrm.Embeds);
    });
  }

  return instagramScriptLoading;
}
