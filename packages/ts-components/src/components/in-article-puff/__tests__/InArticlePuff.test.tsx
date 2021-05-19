import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useFetch } from '../../../helpers/fetch/FetchProvider';

import { InArticlePuff } from '../InArticlePuff';

jest.mock('@times-components/image', () => ({
  Placeholder: () => <div>Placeholder</div>
}));

jest.mock('@times-components/icons', () => ({
  IconForwardChevron: () => <div>IconForwardChevron</div>
}));

jest.mock('../../../helpers/fetch/FetchProvider', () => ({
  useFetch: jest.fn()
}));

const deckApiPayloadWrapper = (data: { [name: string]: string }) => ({
  data: { body: { data: [{ data }] } }
});

const requiredFields = {
  label: 'interactive',
  headline: 'Where can I get a Covid vaccine in England?',
  link: 'https://www.thetimes.co.uk'
};

const optionalFields = {
  ...requiredFields,
  image: 'https://via.placeholder.com/150',
  copy: 'Enter your postcode to find your nearest centre',
  linkText: 'Read the full article'
};

const requiredProps = {
  sectionColour: '#13354E'
};

describe('InArticlePuff', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the initial loading state correctly', () => {
    (useFetch as jest.Mock).mockReturnValue({ loading: true });

    const { asFragment } = render(<InArticlePuff {...requiredProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render required fields correctly', () => {
    (useFetch as jest.Mock).mockReturnValue(
      deckApiPayloadWrapper(requiredFields)
    );

    const { asFragment, getByText, queryByRole, getAllByRole } = render(
      <InArticlePuff {...requiredProps} />
    );

    expect(queryByRole('img')).toBeFalsy();
    expect(getByText(requiredFields.label));
    expect(getByText(requiredFields.headline));
    expect(getByText('Read more'));

    const links = getAllByRole('link');
    expect(links).toHaveLength(2);
    links.forEach(a => expect(a).toHaveAttribute('href', requiredFields.link));

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render optional fields correctly', () => {
    (useFetch as jest.Mock).mockReturnValue(
      deckApiPayloadWrapper(optionalFields)
    );

    const { asFragment, getByText, getByRole, getAllByRole } = render(
      <InArticlePuff {...requiredProps} />
    );

    expect(getByRole('img')).toHaveAttribute('src', optionalFields.image);
    expect(getByText(optionalFields.copy));
    expect(getByText(optionalFields.linkText));

    const links = getAllByRole('link');
    expect(links).toHaveLength(3);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the error state correctly', () => {
    (useFetch as jest.Mock).mockReturnValue({ error: 'Some error occurred' });

    const { asFragment } = render(<InArticlePuff {...requiredProps} />);

    expect(asFragment().firstChild).toBeNull();
  });
});
