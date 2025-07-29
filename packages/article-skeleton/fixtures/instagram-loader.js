let instagramScriptLoading = null;

export function loadInstagramEmbedScript() {
  if (typeof window === 'undefined') return Promise.resolve(); // SSR safety

  if (window.instgrm && window.instgrm.Embeds) {
    return Promise.resolve(); // already loaded
  }

  // prevent injecting the script multiple times
  if (instagramScriptLoading) return instagramScriptLoading;

  instagramScriptLoading = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[src="//platform.instagram.com/en_US/embeds.js"]');

    if (existingScript) {
      existingScript.addEventListener('load', resolve);
      existingScript.addEventListener('error', reject);
      return;
    }

    const script = document.createElement('script');
    script.src = "//platform.instagram.com/en_US/embeds.js";
    script.async = true;
    script.defer = true;

    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Instagram embed script"));

    document.body.appendChild(script);
  });

  return instagramScriptLoading;
}
