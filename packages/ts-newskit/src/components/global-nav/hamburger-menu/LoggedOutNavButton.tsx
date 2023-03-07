import React from 'react';
import { Button } from 'newskit';

const LoggedOutNavButton: React.FC<{ title: string; preset: string }> = ({
  title,
  preset
}) => (
  <Button
    overrides={{ stylePreset: preset, width: '100%', height: '40px' }}
    size="medium"
  >
    {title}
  </Button>
);

export default LoggedOutNavButton;
