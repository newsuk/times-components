import 'react';
import '@testing-library/react';

import { convertChannelSlice } from '../convertChannelSlice';

describe('convertChannelSlice(', () => {
  const mockData = {
    name: 'slice',
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

  it('should convert channel slice', () => {
    expect(convertChannelSlice('channel name', mockData)).toEqual({
      children: [
        {
          article: {
            headline: 'a headline',
            images: {
              alt: 'image alt text',
              crops: [
                {
                  ratio: '3:2',
                  url: 'https://dummyimage.com/300'
                }
              ]
            },
            label: ''
          }
        }
      ],
      name: 'slice'
    });
  });
  it('should return undefined when insufficient data is provided', () => {
    expect(
      convertChannelSlice('channel name', { name: 'slice', children: [{}] })
    ).toEqual({ children: [{ article: undefined }], name: 'slice' });
  });
});
