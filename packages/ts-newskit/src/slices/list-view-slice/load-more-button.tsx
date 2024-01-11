import React from 'react';
import { Button, Stack } from 'newskit';

type LoadMoreButtonProps = {
  title: string;
  currentPage: number;
  handlePageChange: (page: number) => void;
  disabled?: boolean;
  href: string;
};
const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  title,
  currentPage,
  handlePageChange,
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
          width: '100%'
        }}
        onClick={(event: React.MouseEvent) => {
          event.preventDefault();
          handlePageChange(currentPage + 1);
        }}
        disabled={disabled}
        href={href}
      >
        {title}
      </Button>
    </Stack>
  );
};

export default LoadMoreButton;
