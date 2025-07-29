import React from 'react';

export const Twitter = ({ url }: { url: string }) => {

  // eslint-disable-next-line no-console
  console.log('lol twitter url', url);
  return (
    <blockquote className="twitter-tweet" data-testid="twitter-embed">
      <a href={url} />
    </blockquote>
  );
};
