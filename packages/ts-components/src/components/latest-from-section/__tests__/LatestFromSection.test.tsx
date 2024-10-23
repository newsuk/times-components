import { latestFromSection } from '../fixtures/fixtures';
import { render } from '@testing-library/react';
import React from 'react';
import { LatestFromSection } from '../LatestFromSection';
describe('<LatestFromSection>', () => {
  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        // @ts-ignore
        resolvedOptions: () => ({ timeZone: 'Europe/London' })
      })
    };
  });

  xit('renders ', () => {
    const { asFragment } = render(
      <LatestFromSection
        analyticsStream={jest.fn()}
        latestFromSection={latestFromSection[4]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  xit('no data ', () => {
    const { asFragment } = render(
      <LatestFromSection
        analyticsStream={jest.fn()}
        latestFromSection={{ section: 'Sport', items: [] }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
