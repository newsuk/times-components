import React from 'react';
import { render } from '../../../../utils/test-utils';
import { LiveTag } from '../live-tag';
import '@testing-library/jest-dom';

describe('LiveTag', () => {
  it('renders nothing when liveTag is an empty string', () => {
    const { container } = render(<LiveTag liveTag="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when liveTag is not provided', () => {
    const { container } = render(<LiveTag />);
    expect(container.firstChild).toBeNull();
  });

  it('renders liveTag content when liveTag is provided', () => {
    const liveTagContent = 'LIVE';
    const { getByText } = render(<LiveTag liveTag={liveTagContent} />);
    const liveTagElement = getByText(liveTagContent);
    expect(liveTagElement).toBeInTheDocument();
  });
});
