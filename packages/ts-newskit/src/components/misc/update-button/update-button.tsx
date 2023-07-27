import React from 'react';
import { Button } from 'newskit';
import {
  NewsKitFilledArrowIcon,
  NewsKitFilledArrowIconDown
} from '../../../assets';

type UpdateButtonProps = {
  loading: boolean;
  label: string;
  handleClick: () => void;
  arrowUp: boolean;
};

export const UpdateButton = ({
  loading,
  label,
  handleClick,
  arrowUp
}: UpdateButtonProps) => {
  return (
    <Button
      size="small"
      loading={loading}
      overrides={{
        stylePreset: 'updateButton',
        paddingBlock: 'space020',
        paddingInline: 'space030',
        typographyPreset: 'utilityButton010',
        width: loading ? 'sizing060' : 'fit-content'
      }}
      onClick={() => handleClick()}
    >
      {arrowUp ? (
        <NewsKitFilledArrowIcon data-testid="upward-arrow" />
      ) : (
        <NewsKitFilledArrowIconDown data-testid="downward-arrow" />
      )}
      {label}
    </Button>
  );
};
