import React, { useEffect } from 'react';

export const TikTok = ({ url }: { url: string }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const videoId = new URL(url).pathname.split('/').pop();
  const citeUrl = new URL(url).origin + url;

  return (
    <blockquote
      className="tiktok-embed"
      cite={citeUrl}
      data-video-id={videoId}
      style={{ maxWidth: '605px', minWidth: '325px' }}
      data-testid="tiktok-embed"
    >
      <section />
    </blockquote>
  );
};
