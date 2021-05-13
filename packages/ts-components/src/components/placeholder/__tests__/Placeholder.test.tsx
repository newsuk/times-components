import React from 'react';
import { render } from '@testing-library/react';

import { Placeholder } from '../Placeholder';

jest.mock('@times-components/image', () => ({
  Placeholder: () => <div>Placeholder</div>
}));

describe('Placeholder', () => {
  it('renders the component', () => {
    const { asFragment } = render(<Placeholder height={'100px'} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
