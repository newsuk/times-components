import React from 'react';
import { act, waitFor, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  SocialEmbedsProvider,
  useSocialEmbedsContext
} from '../SocialEmbedsProvider';
import { renderHook } from '@testing-library/react-hooks';

describe('SocialEmbedsProvider and useSocialEmbedsContext', () => {
  it('provides default values for isSocialEmbedAllowed and isAllowedOnce', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SocialEmbedsProvider>{children}</SocialEmbedsProvider>
    );

    const { result } = renderHook(() => useSocialEmbedsContext(), { wrapper });

    expect(result.current.isSocialEmbedAllowed).toEqual({
      twitter: false,
      tiktok: false,
      youtube: false,
      instagram: false
    });

    expect(result.current.isAllowedOnce).toEqual({
      twitter: false,
      tiktok: false,
      youtube: false,
      instagram: false
    });
  });

  it('updates isSocialEmbedAllowed correctly', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SocialEmbedsProvider>{children}</SocialEmbedsProvider>
    );

    const { result } = renderHook(() => useSocialEmbedsContext(), { wrapper });

    act(() => {
      result.current.setIsSocialEmbedAllowed(prev => ({
        ...prev,
        twitter: true
      }));
    });

    expect(result.current.isSocialEmbedAllowed.twitter).toBe(true);
  });

  it('syncs isAllowedOnce with isSocialEmbedAllowed on change', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SocialEmbedsProvider>{children}</SocialEmbedsProvider>
    );

    const { result } = renderHook(() => useSocialEmbedsContext(), { wrapper });

    act(() => {
      result.current.setIsSocialEmbedAllowed(prev => ({
        ...prev,
        youtube: true
      }));
    });

    await waitFor(() => {
      expect(result.current.isAllowedOnce.youtube).toBe(true);
    });
  });

  it('throws an error if useSocialEmbedsContext is used outside of provider', () => {
    const { result } = renderHook(() => useSocialEmbedsContext());

    expect(result.error).toEqual(
      new Error(
        'useSocialEmbedsContext must be used within a SocialEmbedsProvider'
      )
    );
  });

  it('renders children correctly within the provider', () => {
    render(
      <SocialEmbedsProvider>
        <div data-testid="child-element">Test Child</div>
      </SocialEmbedsProvider>
    );

    expect(screen.getByTestId('child-element')).toBeInTheDocument();
  });
});
