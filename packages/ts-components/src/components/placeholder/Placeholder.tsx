import React from 'react';
import { Placeholder as ImagePlaceholder } from '@times-components/image';

export const Placeholder: React.FC<{ height: string }> = ({ height }) => {
  return (
    <div style={{ height }}>
      <ImagePlaceholder />
    </div>
  );
};
