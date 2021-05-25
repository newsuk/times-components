import React from 'react';
// import { create } from "react-test-renderer";

import { delay } from '@times-components/test-utils';

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MockedProvider } from '@times-components/provider-test-tools';

import {
  getNewsletter,
  subscribeNewsletter
} from '@times-components/provider-queries';
import { InlineNewsletterPuff } from '../InlineNewsletterPuff';

// jest.mock('@times-components/image', () => ({
//   __esModule: true,
//   default: ({ uri }: any) => (
//     <div>
//       rendered with imageUri=
//       {uri}
//     </div>
//   ),
//   Placeholder: () => <div>Placeholder rendered</div>
// }));
const mockAnalyticsStream = jest.fn();
const renderComponent = (
  mocks = [
    {
      request: {
        query: getNewsletter,
        variables: {
          code: 'TNL-119'
        }
      },
      result: {
        data: {
          newsletter: {
            id: 'a2l6E000000CdHzQAK',
            isSubscribed: false,
            title: 'RED BOX',
            __typename: 'Newsletter'
          }
        }
      }
    }
  ] as any,
  addtionalProps: any = {}
) =>
  render(
    <MockedProvider mocks={mocks} {...addtionalProps}>
      <InlineNewsletterPuff
        {...{
          analyticsStream: mockAnalyticsStream,
          code: 'TNL-119',

          label: 'STRAIGHT IN YOUR INBOX',
          headline: 'Politics. Explained.',
          copy:
            'Sign up to receive our brilliant Red Box newsletter, Matt Chorley`s poke at politics delivered every weekday morning at 8am.',
          imageUri:
            'https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/2aa9050e6c3d4de682f11a4802ebba96.jpg'
        }}
      />
    </MockedProvider>
  );

describe('Inline Newsletter Puff', () => {
  it('renders placeholder when loading', () => {
    const component = renderComponent();
    expect(component.baseElement).toMatchSnapshot();
  });

  it('renders signup state', async () => {
    const component = renderComponent();

    await delay(0);

    expect(component.baseElement).toMatchSnapshot();
  });

  it('renders null when is already subscribed', async () => {
    const component = renderComponent([
      {
        request: {
          query: getNewsletter,
          variables: {
            code: 'TNL-119'
          }
        },
        result: {
          data: {
            newsletter: {
              id: 'a2l6E000000CdHzQAK',
              isSubscribed: true,
              title: 'RED BOX',
              __typename: 'Newsletter'
            }
          }
        }
      }
    ]);

    await delay(0);
    expect(component.baseElement).toMatchSnapshot();
  });

  it('renders signup view when not already subscribed', async () => {
    const component = renderComponent();

    await delay(0);

    expect(component.baseElement).toMatchSnapshot();
  });

  it("renders 'saving' when the button is clicked", async () => {
    const component = renderComponent([
      {
        request: {
          query: getNewsletter,
          variables: {
            code: 'TNL-119'
          }
        },
        result: {
          data: {
            newsletter: {
              id: 'a2l6E000000CdHzQAK',
              isSubscribed: false,
              title: 'RED BOX',
              __typename: 'Newsletter'
            }
          }
        }
      },
      {
        delay: 1000,
        request: {
          query: subscribeNewsletter,
          variables: {
            code: 'TNL-119'
          }
        },
        result: {
          data: {
            subscribeNewsletter: {
              id: 'a2l6E000000CdHzQAK',
              isSubscribed: true,
              title: 'RED BOX',
              __typename: 'Newsletter'
            }
          }
        }
      }
    ]);

    await delay(0);

    fireEvent.click(component.baseElement.querySelector('button')!);

    expect(await component.findByText('Saving…')).toBeTruthy();
    expect(component.baseElement).toMatchSnapshot();
  });

  it('renders the success view after subscribing ', async () => {
    const component = renderComponent([
      {
        request: {
          query: getNewsletter,
          variables: {
            code: 'TNL-119'
          }
        },
        result: {
          data: {
            newsletter: {
              id: 'a2l6E000000CdHzQAK',
              isSubscribed: false,
              title: 'RED BOX',
              __typename: 'Newsletter'
            }
          }
        }
      },
      {
        delay: 50,
        request: {
          query: subscribeNewsletter,
          variables: {
            code: 'TNL-119'
          }
        },
        result: {
          data: {
            subscribeNewsletter: {
              id: 'a2l6E000000CdHzQAK',
              isSubscribed: true,
              title: 'RED BOX',
              __typename: 'Newsletter'
            }
          }
        }
      }
    ]);

    await delay(0);

    fireEvent.click(await component.queryByRole('button')!);

    // await waitFor(() => {
    //   expect(
    //     component.queryByText('Manage preferences here')
    //   ).toBeInTheDocument();
    // });
    expect(await component.findByText('Manage preferences here')).toBeTruthy();
    expect(component.baseElement).toMatchSnapshot();
  });
});
