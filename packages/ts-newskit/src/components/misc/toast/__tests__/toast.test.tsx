import React from 'react';
import { render } from '../../../utils/test-utils';

import { Toast } from '../toast';

const renderComponent = () => render(<Toast />);

describe('Render Toast', () => {
  it('should render the component', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
