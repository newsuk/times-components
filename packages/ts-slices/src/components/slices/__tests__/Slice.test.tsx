import React from 'react';
import { render } from '@testing-library/react';

import { Slice } from '../Slice';

describe('<Slice/>', () => {
  const mockData = {
    name: 'LEAD_1',
    children: [
      {
        article: {
          headline: 'a headline',
          images: {
            alt: 'image alt text',
            crops: [{ ratio: '3:2', url: 'https://dummyimage.com/300' }]
          }
        }
      }
    ]
  };

  it('should render as expected', () => {
    const { getByText } = render(
      <Slice
        slice={mockData}
        styles={{ removePadding: true, lineColor: 'yellow' }}
      />
    );

    getByText('a headline');
  });
});
