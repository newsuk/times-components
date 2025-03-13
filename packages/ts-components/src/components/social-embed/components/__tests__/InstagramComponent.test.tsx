import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Instagram } from '../InstagramComponent';

describe('Instagram Component', () => {
  const instagramUrl = 'https://www.instagram.com/p/1234567890';

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('injects the Instagram embed script on mount', () => {
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');

    render(<Instagram url={instagramUrl} />);

    const script = Array.from(
      document.body.getElementsByTagName('script')
    ).find(el => el.src === 'https://www.instagram.com/embed.js');

    expect(script).toBeTruthy();
    expect(appendChildSpy).toHaveBeenCalledWith(expect.any(HTMLScriptElement));
  });

  it('removes the Instagram embed script on unmount', () => {
    const removeChildSpy = jest.spyOn(document.body, 'removeChild');

    const { unmount } = render(<Instagram url={instagramUrl} />);
    unmount();

    const script = Array.from(
      document.body.getElementsByTagName('script')
    ).find(el => el.src === '//www.instagram.com/embed.js');

    expect(script).toBeFalsy();
    expect(removeChildSpy).toHaveBeenCalledWith(expect.any(HTMLScriptElement));
  });

  it('does not throw an error if the script is already removed during unmount', () => {
    jest.spyOn(document.body, 'removeChild').mockImplementation(node => {
      if (!document.body.contains(node)) {
        throw new Error('The node to be removed is not a child of this node');
      }
      return node; // Ensure the removed node is returned
    });

    const { unmount } = render(<Instagram url={instagramUrl} />);
    expect(() => unmount()).not.toThrow();
  });
});