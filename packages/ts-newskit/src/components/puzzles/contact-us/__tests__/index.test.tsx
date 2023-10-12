import React from 'react';
import { ContactUs } from '../index';
import { render } from '../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { contactItems } from '../fixtures/data.json';

describe('ContactUs', () => {
  it('should render Contact Us section', () => {
    const { asFragment } = render(<ContactUs data={contactItems} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Contact Us section header', () => {
    const { getByText } = render(<ContactUs data={contactItems} />);
    const header = getByText('Need more help?');
    expect(header).toBeInTheDocument();
  });

  it('should render contact item title', () => {
    const { getByText } = render(<ContactUs data={contactItems} />);
    const title = getByText('Call us (UK)');
    expect(title).toBeInTheDocument();
  });

  it('should render contact item phone number', () => {
    const { getByText } = render(<ContactUs data={contactItems} />);
    const phoneNumber = getByText('0800 068 4965');
    expect(phoneNumber).toBeInTheDocument();
  });

  it('should render contact Us section header if provided', () => {
    const { getByText } = render(
      <ContactUs data={contactItems} header="Custom Header" />
    );
    const CustomHeader = getByText('Custom Header');
    expect(CustomHeader).toBeInTheDocument();
  });
});
