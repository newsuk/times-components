import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useFetch } from '../../../helpers/fetch/FetchProvider';
import { SaveStar } from '../SaveStar';

jest.mock('../../../helpers/fetch/FetchProvider', () => ({
  ...jest.requireActual('../../../helpers/fetch/FetchProvider'),
  useFetch: jest.fn()
}));

const articleId = '12345';

const saved = { data: { isBookmarked: true } };
const unsaved = { data: { isBookmarked: false } };

describe('SaveStar', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the initial loading state correctly', () => {
    (useFetch as jest.Mock).mockReturnValue({ loading: true });

    const { asFragment, getByText } = render(
      <SaveStar articleId={articleId} />
    );

    expect(getByText('Save'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the unsaved state', async () => {
    (useFetch as jest.Mock).mockReturnValue(unsaved);

    const { asFragment, getByText } = render(
      <SaveStar articleId={articleId} />
    );

    expect(getByText('Save'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the saved state', () => {
    (useFetch as jest.Mock).mockReturnValue(saved);

    const { asFragment, getByText } = render(
      <SaveStar articleId={articleId} />
    );

    expect(getByText('Saved'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('should move from unsaved to saved state', async () => {
    (useFetch as jest.Mock)
      .mockReturnValueOnce(unsaved)
      .mockReturnValueOnce(unsaved)
      .mockReturnValueOnce(saved)
      .mockReturnValueOnce(saved);

    const { baseElement, getByText } = render(<SaveStar articleId="12345" />);

    expect(getByText('Save'));

    const button = baseElement.querySelector('button') as HTMLButtonElement;
    fireEvent.click(button);

    await expect(getByText('Saved'));
  });
});
