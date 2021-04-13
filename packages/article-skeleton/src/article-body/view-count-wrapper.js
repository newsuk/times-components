import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const STORAGE_KEY = "view-count";

const hasCookieConsent = () =>
  typeof window !== "undefined" &&
  window.document.cookie.indexOf("nuk-consent-personalisation=1") >= 0;

const storeCount = (storageProvider, trackingName, value) => {
  const viewCounts = JSON.parse(storageProvider.getItem(STORAGE_KEY));
  const newViewCounts = {
    ...(viewCounts || {}),
    [trackingName]: value
  };
  storageProvider.setItem(STORAGE_KEY, JSON.stringify(newViewCounts));
};
const getCount = (storageProvider, trackingName) => {
  const viewCounts = JSON.parse(storageProvider.getItem(STORAGE_KEY));
  return (viewCounts && viewCounts[trackingName]) || 1;
};
const getViewCount = (storageProvider, trackingName) => {
  const count = getCount(storageProvider, trackingName);
  storeCount(storageProvider, trackingName, count);
  return count;
};

const incrementViewCount = (storageProvider, trackingName) => {
  const count = getCount(storageProvider, trackingName);
  storeCount(storageProvider, trackingName, count + 1);
};

const getStorageProvider = () =>
  typeof window !== "undefined" && window.sessionStorage;

const ViewCountWrapper = ({
  displayFunction = () => true,
  trackingName,
  children
}) => {
  const [viewCount, setViewCount] = useState();
  const ref = useRef(null);
  let observer;

  useEffect(() => {
    const newViewCount = getViewCount(getStorageProvider(), trackingName);
    setViewCount(newViewCount);
  }, []);

  useEffect(
    () => {
      observer =
        typeof window !== "undefined" &&
        window.IntersectionObserver &&
        new window.IntersectionObserver(
          entries => {
            if (entries[0].isIntersecting) {
              observer.disconnect();
              incrementViewCount(getStorageProvider(), trackingName);
            }
          },
          {
            threshold: 0.5
          }
        );
      if (ref.current) {
        const { current } = ref;
        observer.observe(current);
      }
    },
    [ref]
  );

  const display = hasCookieConsent() && displayFunction(viewCount);

  return <div ref={ref}>{display ? children : null}</div>;
};

ViewCountWrapper.propTypes = {
  displayFunction: PropTypes.func.isRequired,
  trackingName: PropTypes.string.isRequired,
  storageProvider: PropTypes.shape({
    getItem: PropTypes.func.isRequired,
    setItem: PropTypes.func.isRequired
  }).isRequired,
  children: PropTypes.node.isRequired
};

export default ViewCountWrapper;
