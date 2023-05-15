import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '../../../../utils/test-utils';
import { useBreakpointKey } from 'newskit';
import { JobTitleTooltip, JobTitlePopover, JobTitle } from '../job-title';
import * as ResizeObserverModule from 'resize-observer-polyfill';

(window as any).ResizeObserver = ResizeObserverModule.default;

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xs')
}));

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe('JobTitle - Smaller Devices', () => {
  beforeEach(() => {
    (useBreakpointKey as any).mockReturnValue('xs');
  });
  it('renders the Job title Popover', () => {
    const { asFragment, getByTestId } = render(
      <JobTitle contractualTitle="Contractual Title" />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId('Popover')).toBeVisible();
  });
});

describe('JobTitle - Larger Devices', () => {
  beforeEach(() => {
    (useBreakpointKey as any).mockReturnValue('lg');
  });
  it('renders the Job title Tooltip on larger devices', () => {
    const { asFragment, getByTestId } = render(
      <JobTitle contractualTitle="Contractual Title" />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId('Tooltip')).toBeVisible();
  });
});

describe('JobTitleTooltip', () => {
  it('Renders the tooltip when clicked', async () => {
    const {
      getByRole,
      asFragment,
      getByTestId,
      getByText,
      queryByTestId,
      queryByText
    } = render(
      <JobTitleTooltip contractualTitle="Contractual Title Tooltip" />
    );
    expect(queryByTestId('floating-element-panel')).toBeFalsy();
    expect(queryByText('Contractual Title Tooltip')).toBeFalsy();
    fireEvent.mouseEnter(getByRole('button'));
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId('floating-element-panel')).toBeVisible();
    expect(getByText('Contractual Title Tooltip')).toBeVisible();
  });
});

describe('JobTitlePopover', () => {
  it('Renders the Popover when clicked', () => {
    const {
      asFragment,
      getByRole,
      getByText,
      queryByText,
      queryByTestId,
      getByTestId
    } = render(
      <JobTitlePopover contractualTitle="Contractual Title Popover" />
    );
    expect(queryByTestId('floating-element-panel')).toBeFalsy();
    expect(queryByText('Contractual Title Popover')).toBeFalsy();
    fireEvent.click(getByRole('button'));
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId('floating-element-panel')).toBeVisible();
    expect(getByText('Contractual Title Popover')).toBeVisible();
    const closeButton = getByTestId('close-button');
    expect(closeButton).toBeVisible();
  });
});
