import React from 'react';
import { WidgetButton } from './styles';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false
}) => (
  <WidgetButton onClick={onClick} disabled={disabled}>
    {children}
  </WidgetButton>
);

export default Button;
