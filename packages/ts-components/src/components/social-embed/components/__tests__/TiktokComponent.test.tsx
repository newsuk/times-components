import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { TikTok } from '../TiktokComponent';

describe('TikTok Component', () => {
  const tiktokUrl = 'https://www.tiktok.com/@user/video/1234567890123456789';

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('injects the TikTok embed script on mount', () => {
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');

    render(<TikTok url={tiktokUrl} />);

    const script = Array.from(
      document.body.getElementsByTagName('script')
    ).find((el) => el.src === 'https://www.tiktok.com/embed.js');

    expect(script).toBeTruthy();
    expect(appendChildSpy).toHaveBeenCalledWith(expect.any(HTMLScriptElement));
  });

  it('removes the TikTok embed script on unmount', () => {
    const removeChildSpy = jest.spyOn(document.body, 'removeChild');

    const { unmount } = render(<TikTok url={tiktokUrl} />);
    unmount();

    const script = Array.from(
      document.body.getElementsByTagName('script')
    ).find((el) => el.src === 'https://www.tiktok.com/embed.js');

    expect(script).toBeFalsy();
    expect(removeChildSpy).toHaveBeenCalledWith(expect.any(HTMLScriptElement));
  });

  it('does not throw an error if the script is already removed during unmount', () => {
    jest.spyOn(document.body, 'removeChild').mockImplementation((node) => {
      if (!document.body.contains(node)) {
        throw new Error('The node to be removed is not a child of this node');
      }
      return node; // Ensure the removed node is returned
    });

    const { unmount } = render(<TikTok url={tiktokUrl} />);
    expect(() => unmount()).not.toThrow();
  });
});
