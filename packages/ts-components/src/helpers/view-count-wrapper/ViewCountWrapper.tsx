import React, { FC, useEffect, useState } from 'react';

import { hasCookieConsent } from '../../utils/cookie';
import { getStorageProvider } from '../../utils/session';
import { useIntersectionObserver } from '../../utils/intersectObserverHook';

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

  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const newViewCount = getViewCount(trackingName);
    setViewCount(newViewCount);
  }, []);

  useIntersectionObserver(
    ref,
    () => incrementViewCount && incrementViewCount(trackingName),
    {
      threshold: 0.5
    }
  );

  const display = hasCookieConsent() && displayFunction(viewCount);
  return (
    <>
      <div className="view-count-observer" ref={setRef} />
      <div
        className="view-count"
        style={{ display: display ? 'block' : 'none' }}
      >
        {children}
      </div>
    </>
  );
};
