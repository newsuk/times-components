import React from 'react';
import { render } from '../../../../utils/test-utils';
import { questions } from '../fixtures/data.json';
import '@testing-library/jest-dom';

import { Faq } from '../index';

describe('Faq', () => {
  it('should render Faq', () => {
    const { asFragment } = render(<Faq data={questions} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
