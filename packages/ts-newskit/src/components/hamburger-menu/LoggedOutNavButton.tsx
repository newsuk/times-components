import React from 'react';
import { Button } from 'newskit';

const LoggedOutNavButton: React.FC<{}> = ({ title, preset }) => (
  <Button size="small" overrides={{stylePreset: preset}}>{title}</Button>
);

export default LoggedOutNavButton;