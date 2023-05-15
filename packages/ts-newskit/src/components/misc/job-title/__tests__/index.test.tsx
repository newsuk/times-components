import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../../utils/test-utils';
import { JobTitleTooltip, JobTitlePopover } from '../job-title';

describe('JobTitleTooltip', () => {
  it('Renders the component', ()  => {
    const { asFragment } = render(
      <JobTitleTooltip contractualTitle='Contractual Title' />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('JobTitlePopover', () => {
  it('Renders the component', ()  => {
    const { asFragment } = render(
      <JobTitlePopover contractualTitle='Contractual Title' />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});