import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { JobTitleTooltip, JobTitlePopover, JobTitle } from '../job-title';
import * as ResizeObserverModule from 'resize-observer-polyfill';

(window as any).ResizeObserver = ResizeObserverModule.default;

describe('JobTitle - Smaller Devices', () => {
  it('renders the Job title Popover', () => {
    const { asFragment, getByTestId } = render(
      <JobTitle isLargeDevice={false} contractualTitle="Contractual Title" />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId('Popover')).toBeVisible();
  });
});

describe('JobTitle - Larger Devices', () => {
  it('renders the Job title Tooltip on larger devices', () => {
    const { asFragment, getByTestId } = render(
      <JobTitle isLargeDevice={true} contractualTitle="Contractual Title" />
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
    expect(queryByTestId('Tooltip-context')).not.toBeVisible();
    expect(queryByText('Contractual Title Tooltip')).not.toBeVisible();
    fireEvent.mouseEnter(getByRole('button'));
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId('Tooltip')).toBeVisible();
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
    expect(queryByTestId('Popover-context')).not.toBeVisible();
    expect(queryByText('Contractual Title Popover')).not.toBeVisible();
    fireEvent.click(getByRole('button'));
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId('Popover')).toBeVisible();
    expect(getByText('Contractual Title Popover')).toBeVisible();
    const closeButton = getByTestId('close-button');
    expect(closeButton).toBeVisible();
  });
});
