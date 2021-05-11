import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
// tslint:disable-next-line:no-submodule-imports
import '@testing-library/jest-dom/extend-expect';

import InArticlePuff from '../in-article-puff/InArticlePuff';

const baseProps = {
  label: 'INTERACTIVE',
  headline: 'Where can I get a Covid vaccine in England?',
  copy:
    'Enter your postcode in our tool to find your nearest vacination centre',
  link: 'https://www.thetimes.co.uk/',
  linkText: 'Read more',
  sectionColour: '#13354E'
};

describe('InArticlePuff', () => {
  afterEach(() => {
    cleanup();
  });
  describe('Without an image', () => {
    it('renders the component', () => {
      const { baseElement } = render(<InArticlePuff {...{ ...baseProps }} />);
      expect(baseElement).toBeTruthy();
    });
    it('matches the snapshot', () => {
      const { asFragment } = render(<InArticlePuff {...{ ...baseProps }} />);
      expect(asFragment()).toMatchSnapshot();
    });
    it('renders the props correctly', () => {
      const { getByText, getAllByRole, queryByRole, getByTestId } = render(
        <InArticlePuff {...{ ...baseProps }} />
      );
      expect(getByTestId('InArticlePuff - Container')).toHaveStyle(
        `border-top: 2px ${baseProps.sectionColour} solid`
      );
      expect(getByText('INTERACTIVE')).toBeVisible();
      expect(getByText('INTERACTIVE')).toHaveStyle(
        `color: ${baseProps.sectionColour}`
      );
      expect(
        getByText('Where can I get a Covid vaccine in England?')
      ).toBeVisible();
      expect(
        getByText(
          'Enter your postcode in our tool to find your nearest vacination centre'
        )
      ).toBeVisible();
      expect(getByText('Read more')).toBeVisible();
      expect(getAllByRole('link')).toHaveLength(2);
      const links = getAllByRole('link');
      for (const link of links) {
        expect(link).toHaveAttribute('href', 'https://www.thetimes.co.uk/');
      }
      expect(queryByRole('img')).toBeFalsy();
    });
  });
  describe('With an Image', () => {
    it('renders', () => {
      const { baseElement } = render(
        <InArticlePuff
          {...{
            ...baseProps,
            imageUri:
              'https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/b309b4cc1fe7a2d9a940f93e29701615.jpg'
          }}
        />
      );
      expect(baseElement).toBeTruthy();
    });
    it('matches the snapshot', () => {
      const { asFragment } = render(
        <InArticlePuff
          {...{
            ...baseProps,
            imageUri:
              'https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/b309b4cc1fe7a2d9a940f93e29701615.jpg'
          }}
        />
      );
      expect(asFragment()).toMatchSnapshot();
    });
    it('renders the props correctly', () => {
      const { getByText, getAllByRole, getByRole, getByTestId } = render(
        <InArticlePuff
          {...{
            ...baseProps,
            imageUri:
              'https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/b309b4cc1fe7a2d9a940f93e29701615.jpg'
          }}
        />
      );
      expect(getByTestId('InArticlePuff - Container')).toHaveStyle(
        `border-top: 2px ${baseProps.sectionColour} solid`
      );
      expect(getByText('INTERACTIVE')).toBeVisible();
      expect(getByText('INTERACTIVE')).toHaveStyle(
        `color: ${baseProps.sectionColour}`
      );
      expect(
        getByText('Where can I get a Covid vaccine in England?')
      ).toBeVisible();
      expect(
        getByText(
          'Enter your postcode in our tool to find your nearest vacination centre'
        )
      ).toBeVisible();
      expect(getByText('Read more')).toBeVisible();
      expect(getByRole('img')).toBeVisible();
      expect(getByRole('img')).toHaveAttribute(
        'src',
        'https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/b309b4cc1fe7a2d9a940f93e29701615.jpg'
      );
      expect(getAllByRole('link')).toHaveLength(3);
      const links = getAllByRole('link');
      for (const link of links) {
        expect(link).toHaveAttribute('href', 'https://www.thetimes.co.uk/');
      }
    });
  });
});
