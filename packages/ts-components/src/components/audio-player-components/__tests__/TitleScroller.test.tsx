import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TitleScroller } from '../TitleScroller';

// Mocking styled-components
jest.mock('../styles', () => ({
  Row: ({ children }: any) => <div data-testid="row">{children}</div>,
  Title: ({ children }: any) => <div data-testid="title">{children}</div>,
}));

describe('TitleScroller', () => {
  test('renders without crashing', () => {
    const { getByTestId } = render(<TitleScroller title="Sample Title" />);

    expect(getByTestId('row')).toBeInTheDocument();
    expect(getByTestId('title')).toBeInTheDocument();
  });

  test('displays the correct title', () => {
    const sampleTitle = 'Understanding React Testing';
    const { getByTestId } = render(<TitleScroller title={sampleTitle} />);

    const titleElement = getByTestId('title').querySelector('div');
    expect(titleElement).toHaveTextContent(sampleTitle);
  });

  test('handles empty title gracefully', () => {
    const { getByTestId } = render(<TitleScroller title="" />);

    const titleElement = getByTestId('title').querySelector('div');
    expect(titleElement).toHaveTextContent('');
  });

  test('displays long titles appropriately', () => {
    const longTitle =
      'This is a very long title intended to test how the TitleScroller component handles overflow and ensures that the text is displayed correctly without breaking the layout or causing any visual issues.';
    const { getByTestId } = render(<TitleScroller title={longTitle} />);

    const titleElement = getByTestId('title').querySelector('div');
    expect(titleElement).toHaveTextContent(longTitle);
  });

  test('accessibility: contains semantic HTML elements', () => {
    const sampleTitle = 'Accessible Title';
    const { getByTestId } = render(<TitleScroller title={sampleTitle} />);

    const row = getByTestId('row');
    const title = getByTestId('title');

    expect(row.tagName).toBe('DIV');
    expect(title.tagName).toBe('DIV');
  });

  test('matches the snapshot', () => {
    const sampleTitle = 'Snapshot Test Title';
    const { asFragment } = render(<TitleScroller title={sampleTitle} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
