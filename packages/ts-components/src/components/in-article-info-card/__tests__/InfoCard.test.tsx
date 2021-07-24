import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InfoCard } from '../InfoCard';
import { useFetch } from '../../../helpers/fetch/FetchProvider';

jest.mock('../../../helpers/fetch/FetchProvider', () => ({
  useFetch: jest.fn()
}));


const requiredProps = {
  sectionColour: '#636C17'
};

const renderInfocard = () =>
  render(
    <InfoCard {...requiredProps} />
  );


describe('<InfoCard>', () => {
  const realIntl = Intl;

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        // @ts-ignore
        resolvedOptions: () => ({ timeZone: 'Europe/London' })
      })
    };
  });

  afterEach(() => {
    global.Intl = realIntl;
  });

  describe('<InfoCard>', () => {
    it('click previous button', async () => {
      const analyticsStream = jest.fn();

      const { getAllByTestId } = renderInfocard();

      const previousButton = getAllByTestId('Previous button')[0];
      const nextButton = getAllByTestId('Next Button')[0];

      fireEvent.click(nextButton);

      expect(previousButton).not.toHaveAttribute('disabled');
      expect(nextButton).toHaveAttribute('disabled');

      analyticsStream.mockClear();

      fireEvent.click(previousButton);

      expect(analyticsStream).toHaveBeenCalledTimes(1);
      expect(analyticsStream).toHaveBeenCalledWith({
        attrs: {
          article_name: 'Headline',
          component_name: 'Headline 1',
          component_type: 'in-article component : gallery : interactive',
          eventTime: '2021-05-03T00:00:00.000Z',
          event_navigation_action: 'navigation',
          event_navigation_name: 'button : left',
          section_details: 'Section'
        },
        component: 'ArticleSkeleton',
        object: 'GalleryCarousel'
      });

      expect(previousButton).toHaveAttribute('disabled');
      expect(nextButton).not.toHaveAttribute('disabled');
    });
    it('click next button', async () => {
      const analyticsStream = jest.fn();

      const { getAllByTestId } = renderInfocard();

      const previousButton = getAllByTestId('Previous button')[0];
      const nextButton = getAllByTestId('Next Button')[0];

      expect(previousButton).toHaveAttribute('disabled');
      expect(nextButton).not.toHaveAttribute('disabled');

      fireEvent.click(nextButton);

      expect(analyticsStream).toHaveBeenCalledTimes(1);
      expect(analyticsStream).toHaveBeenCalledWith({
        attrs: {
          article_name: 'Headline',
          component_name: 'Headline 1',
          component_type: 'in-article component : gallery : interactive',
          eventTime: '2021-05-03T00:00:00.000Z',
          event_navigation_action: 'navigation',
          event_navigation_name: 'button : right',
          section_details: 'Section'
        },
        component: 'ArticleSkeleton',
        object: 'GalleryCarousel'
      });
      expect(previousButton).not.toHaveAttribute('disabled');
      expect(nextButton).toHaveAttribute('disabled');
    });

    it('should render the initial loading state correctly', () => {
      (useFetch as jest.Mock).mockReturnValue({ loading: true });

      const { asFragment } = render(<InfoCard {...requiredProps} />);

      expect(asFragment()).toMatchSnapshot();
    });

    it('renders', () => {
      const { baseElement } = render(
        <InfoCard {...requiredProps} />
      );
      expect(baseElement).toMatchSnapshot();
    });
    it('renders no image', () => {
      const { baseElement } = render(
        <InfoCard
          sectionColour="#636C17"
        />
      );
      expect(baseElement).toMatchSnapshot();
    });
  });
});