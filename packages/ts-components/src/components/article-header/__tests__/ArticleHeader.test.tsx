import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockDate from 'mockdate';
import { mockFetch } from '../../../test-utils/mockFetch';

import ArticleHeader from '../ArticleHeader';

mockFetch(null);

describe('ArticleHeader', () => {
  describe('Same calendar day during GMT', () => {
    afterEach(() => MockDate.reset());

    const updated = '2021-12-31T06:30:00+00:00';

    it('Within a minute of updating', () => {
      MockDate.set('2021-12-31T06:30:10+00:00');

      const { getByText, queryByTestId } = render(
        <ArticleHeader updated={updated} />
      );

      expect(getByText(/6.30am/i)).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
    });

    it('Within an hour of updating', () => {
      MockDate.set('2021-12-31T07:00:00+00:00');

      const { getByText } = render(<ArticleHeader updated={updated} />);

      expect(getByText(/6.30am/i)).toBeVisible();
      expect(getByText('30 minutes ago')).toBeVisible();
    });

    it('Between 1 and 12 hours after updating', () => {
      MockDate.set('2021-12-31T08:30:00+00:00');

      const { getByText } = render(<ArticleHeader updated={updated} />);

      expect(getByText(/6.30am/i)).toBeVisible();
      expect(getByText('2 hours ago')).toBeVisible();
    });

    it('After 12 hours but same calendar day', () => {
      MockDate.set('2021-12-20T20:30:00+00:00');

      const { getByText, queryByTestId } = render(
        <ArticleHeader updated={updated} />
      );

      expect(getByText(/6.30am/i)).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
    });

    it('With breaking flag and headline', () => {
      MockDate.set('2021-12-31T07:00:00+00:00');

      const { getByText } = render(
        <ArticleHeader
          updated={updated}
          breaking="true"
          headline="This%20is%20the%20headline"
        />
      );

      expect(getByText(/6.30am/i)).toBeVisible();
      expect(getByText('30 minutes ago')).toBeVisible();
      expect(getByText('BREAKING')).toBeVisible();
      expect(getByText('This is the headline')).toBeVisible();

      // expect(baseElement).toMatchSnapshot();
    });

    it('With breaking flag expired', () => {
      MockDate.set('2021-12-31T08:30:00+00:00');

      const { getByText, queryByText } = render(
        <ArticleHeader updated={updated} breaking="true" />
      );

      expect(getByText(/6.30am/i)).toBeVisible();
      expect(getByText('2 hours ago')).toBeVisible();
      expect(queryByText('BREAKING')).toBeFalsy();
    });
  });

  describe('Same calendar day during BST', () => {
    afterEach(() => MockDate.reset());

    const updated = '2022-04-20T06:30:00+01:00';

    it('Within a minute of updating', () => {
      MockDate.set('2022-04-20T06:30:10+01:00');

      const { getByText, queryByTestId } = render(
        <ArticleHeader updated={updated} />
      );

      expect(getByText(/6.30am/i)).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
    });

    it('Within an hour of updating', () => {
      MockDate.set('2022-04-20T07:00:00+01:00');

      const { getByText } = render(<ArticleHeader updated={updated} />);

      expect(getByText(/6.30am/i)).toBeVisible();
      expect(getByText('30 minutes ago')).toBeVisible();
    });

    it('Between 1 and 12 hours after updating', () => {
      MockDate.set('2022-04-20T08:30:00+01:00');

      const { getByText } = render(<ArticleHeader updated={updated} />);

      expect(getByText(/6.30am/i)).toBeVisible();
      expect(getByText('2 hours ago')).toBeVisible();
    });

    it('After 12 hours but same calendar day', () => {
      MockDate.set('2022-04-20T20:30:00+01:00');

      const { getByText, queryByTestId } = render(
        <ArticleHeader updated={updated} />
      );

      expect(getByText(/6.30am/i)).toBeVisible();
      expect(queryByTestId('TimeSincePublishing')).toBeFalsy();
    });
  });

  describe('Different calendar days', () => {
    afterEach(() => MockDate.reset());

    const updated = '2021-12-31T22:30:00+00:00';

    it('Between 1 and 12 hours after updating', () => {
      MockDate.set('2022-01-01T02:30:00+00:00');

      const { getByText } = render(<ArticleHeader updated={updated} />);

      expect(getByText(/10.30pm/i)).toBeVisible();
      expect(getByText('4 hours ago')).toBeVisible();
      expect(getByText('December 31')).toBeVisible();
    });
  });

  describe('Article header byline', () => {
    beforeEach(() => MockDate.set('2022-01-01T02:30:00+00:00'));

    const updated = '2021-12-31T22:30:00+00:00';
    const authorData = {
      slug: 'oliver-wright',
      name: 'Oliver Wright',
      image:
        'https://www.staging-thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fstag%2Fweb%2Fbin%2Fe1ca81d9-5ef0-442e-9493-8d9705bd9d03.jpg?crop=270%2C270%2C0%2C0&resize=200',
      jobTitle: 'Business Columnist'
    };

    it('Does not display the author details if the fetch request throws an error', async () => {
      mockFetch(null);

      const { queryByText, queryByRole } = render(
        <ArticleHeader
          updated={updated}
          authorSlug={authorData.slug}
          description="Analysis"
        />
      );

      expect(queryByText(authorData.name)).not.toBeInTheDocument();
      expect(queryByText(authorData.jobTitle)).not.toBeInTheDocument();
      expect(queryByRole('img')).not.toBeInTheDocument();
    });

    it('Displays the author details on successful fetch', async () => {
      mockFetch(authorData);
      const { getByText, getByRole } = render(
        <ArticleHeader
          updated={updated}
          authorSlug={authorData.slug}
          description="Analysis"
        />
      );

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          `/api/author-profile/${authorData.slug}`
        );
      });

      expect(getByText(authorData.name)).toBeInTheDocument();
      expect(getByText(authorData.jobTitle)).toBeInTheDocument();
      expect(getByRole('img')).toHaveAttribute('src', authorData.image);
    });
  });
});
