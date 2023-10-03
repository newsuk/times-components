import React, { FC, useState } from 'react';
import { HintButton } from '../hint-button';
import { HintDisplay } from '../hints';

interface HintProps {
  title?: string;
  hints: Array<{ text: string }>;
}

export const HintContainer: FC<HintProps> = ({
  title,
  hints: initialHints
}) => {
  const [hints, setHints] = useState<Array<{ info: string; text: string }>>([]);
  const totalHints = initialHints.length;
  const [hintIndex, setHintIndex] = useState(0);

  const getNextHint = () => {
    if (hintIndex < totalHints) {
      const hintNumber = hintIndex + 1;
      const hintInfo = `Hint ${hintNumber} of ${totalHints}`;
      const hintText = initialHints[hintIndex].text;
      setHintIndex(hintNumber);
      setHints(prevHints => [...prevHints, { info: hintInfo, text: hintText }]);
    }
  };

  return (
    <>
      <HintButton
        onClick={getNextHint}
        disabled={hintIndex >= totalHints}
        title={title}
      />
      <HintDisplay hints={hints} />
    </>
  );
};
