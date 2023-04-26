import React from 'react';
import { render } from '../../../utils/test-utils';

import { AccordionGroup } from '../accordion-group';

const renderComponent = () =>
  render(<AccordionGroup group={[{ header: 'header', content: 'content' }]} />);

describe('Render Toast', () => {
  it('should render the component', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
