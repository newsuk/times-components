import React from 'react';
import { Button, Stack } from 'newskit';

type LoadMoreButtonProps = {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  href: string;
};
const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  title,
  onClick,
  disabled,
  href
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
        href={href}
      >
        {title}
      </Button>
    </Stack>
  );
};

export default LoadMoreButton;
