import React, { useEffect, FC } from 'react';

type PalinPollsProps = {
  source: string;
};

export const PalinPolls: FC<PalinPollsProps> = ({ source }) => {
  if (!source) {
    return null;
  }

  useEffect(() => {
    const appendPalinPoll = () => {
      const decodedSource = atob(source);

      const src = new DOMParser()
        .parseFromString(decodedSource, 'text/html')
        .head.getElementsByTagName('script')[0]
        .getAttribute('src');

      const pollParent = document.getElementById('poll-parent');

      if (pollParent && src) {
        let poll = document.createElement('script');

        poll.setAttribute('src', src);
        pollParent.appendChild(poll);
      }
    };

    setTimeout(appendPalinPoll, 0);
  }, []);

  return <div id="poll-parent" data-testid="poll-parent" />;
};
