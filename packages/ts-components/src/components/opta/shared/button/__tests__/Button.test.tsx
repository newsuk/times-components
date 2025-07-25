import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import Button from '../Button';

describe('Button', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Click me</Button>);
    act(() => {
      getByText('Click me').click();
    });
    expect(onClick).toHaveBeenCalled();
  });

  it('does not call onClick when disabled', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button onClick={onClick} disabled>
        Click me
      </Button>
    );
    act(() => {
      getByText('Click me').click();
    });
    expect(onClick).not.toHaveBeenCalled();
  });

  it('passes disabled prop to WidgetButton', () => {
    const { getByText } = render(<Button disabled>Disabled</Button>);
    expect(getByText('Disabled').closest('button')).toBeDisabled();
  });

  it('defaults disabled to false', () => {
    const { getByText } = render(<Button>Default</Button>);
    expect(getByText('Default').closest('button')).not.toBeDisabled();
  });
});
