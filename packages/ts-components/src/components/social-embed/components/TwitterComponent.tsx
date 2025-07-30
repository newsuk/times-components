import React from 'react';

export const Twitter = ({ url }: { url: string }) => {
  return (
    <blockquote className="twitter-tweet" data-testid="twitter-embed">
      <a href={url} />
    </blockquote>
  );
};
