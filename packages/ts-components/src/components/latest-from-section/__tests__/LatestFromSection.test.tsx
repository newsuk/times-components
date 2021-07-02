import { latestFromSection } from '../fixtures/fixtures';
import { render } from '@testing-library/react';
import React from 'react';
import { LatestFromSection } from '../LatestFromSection';
describe('<LatestFromSection>', () => {
  it('renders ', () => {
    const { asFragment } = render(
      <LatestFromSection
        section="sport"
        analyticsStream={jest.fn()}
        latestFromSection={latestFromSection}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('no data ', () => {
    const { asFragment } = render(
      <LatestFromSection
        section="sport"
        analyticsStream={jest.fn()}
        latestFromSection={[{ section: 'sport', title: 'Sport', items: [] }]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('non matching section ', () => {
    const { asFragment } = render(
      <LatestFromSection
        section="nothing"
        analyticsStream={jest.fn()}
        latestFromSection={[{ section: 'sport', title: 'Sport', items: [] }]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('no data ', () => {
    const { asFragment } = render(
      <LatestFromSection
        section="sport"
        analyticsStream={jest.fn()}
        latestFromSection={[{ section: 'sport', title: 'Sport', items: [] }]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
