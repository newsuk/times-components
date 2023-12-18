import React from 'react';
import { Button, Stack } from 'newskit';

type LoadMoreButtonProps = {
  title: string;
  onClick: () => void;
  disabled?: boolean;
};
const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  title,
  onClick,
  disabled
}) => {
  return (
    <Stack
      flow="horizontal-center"
      stackDistribution="center"
      marginBlockStart="space060"
    >
      <Button
        size="medium"
        overrides={{
          stylePreset: 'buttonOutlinedSecondary',
          width: '375px'
        }}
        onClick={onClick}
        disabled={disabled}
      >
        {title}
      </Button>
    </Stack>
  );
};

export default LoadMoreButton;
