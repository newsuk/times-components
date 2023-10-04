import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HintDisplay } from '../index';

jest.mock('../styles', () => ({
  StyledTextBlock: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )
}));

describe('HintDisplay', () => {
  it('should render the HintDisplay component', () => {
    const hints = [
      { text: 'This is the first hint.' },
      { text: 'This is the second hint.' },
      { text: 'This is the third hint.' }
    ];
    const { asFragment } = render(<HintDisplay hints={hints} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render hints', () => {
    const hints = [
      { text: 'This is the first hint.' },
      { text: 'This is the second hint.' },
      { text: 'This is the third hint.' }
    ];

    const { getByText } = render(<HintDisplay hints={hints} />);

    hints.forEach(hint => {
      expect(getByText(hint.text)).toBeInTheDocument();
    });
  });

  it('should display the "Hint n of N" text for each hint', () => {
    const hints = [
      { text: 'This is the first hint.' },
      { text: 'This is the second hint.' },
      { text: 'This is the third hint.' }
    ];

    const { getByText } = render(<HintDisplay hints={hints} />);

    hints.forEach((_, index) => {
      const hintNumber = index + 1;
      const totalHints = hints.length;
      const hintInfo = `Hint ${hintNumber} of ${totalHints}`;
      expect(getByText(hintInfo)).toBeInTheDocument();
    });
  });
});
