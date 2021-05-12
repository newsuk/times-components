import React, { FC, useEffect, useRef, useState } from 'react';

import { hasCookieConsent } from '../../utils/cookie';
import { getStorageProvider } from '../../utils/session';

const STORAGE_KEY = 'view-count';

const setCounter = (trackingName: string, value: string) => {
  const storageProvider = getStorageProvider();
  if (storageProvider) {
    const jsonCount = storageProvider.getItem(STORAGE_KEY);
    const viewCounts = jsonCount !== null && JSON.parse(jsonCount);
    const newViewCounts = {
      ...(viewCounts || {}),
      [trackingName]: value
    };
    storageProvider.setItem(STORAGE_KEY, JSON.stringify(newViewCounts));
  }
};

const getCounter = (trackingName: string) => {
  const storageProvider = getStorageProvider();
  if (storageProvider) {
    const value = storageProvider.getItem(STORAGE_KEY);
    const viewCounts = value !== null && JSON.parse(value);
    return (viewCounts && viewCounts[trackingName]) || 1;
  }
  return null;
};

const getViewCount = (trackingName: string) => {
  const count = getCounter(trackingName);
  setCounter(trackingName, count);
  return count;
};

const incrementViewCount = (trackingName: string) => {
  const count = getCounter(trackingName);
  setCounter(trackingName, count + 1);
};

export const ViewCountWrapper: FC<{
  displayFunction?: (count?: number) => boolean;
  trackingName: string;
}> = ({ displayFunction = () => true, trackingName, children }) => {
  const [viewCount, setViewCount] = useState();
  const ref = useRef<HTMLDivElement | null>(null);
  let observer: IntersectionObserver | null;

  useEffect(() => {
    const newViewCount = getViewCount(trackingName);
    setViewCount(newViewCount);
  }, []);

  useEffect(
    () => {
      observer =
        (typeof window !== 'undefined' &&
          window.IntersectionObserver &&
          new window.IntersectionObserver(
            entries => {
              if (entries[0].isIntersecting) {
                observer && observer.disconnect();
                incrementViewCount(trackingName);
              }
            },
            {
              threshold: 0.5
            }
          )) ||
        null;
      if (ref.current) {
        const { current } = ref;
        observer && observer.observe(current);
      }
    },
    [ref]
  );

  const display = hasCookieConsent() && displayFunction(viewCount);

  return (
    <>
      <div className="view-count-observer" ref={ref} />
      <div
        className="view-count"
        style={{ display: display ? 'block' : 'none' }}
      >
        {children}
      </div>
    </>
  );
};
