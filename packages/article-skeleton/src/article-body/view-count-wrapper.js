import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const STORAGE_KEY = "view-count";

const hasCookieConsent = () =>
  typeof window !== "undefined" &&
  window.document.cookie.indexOf("nuk-consent-personalisation=1") >= 0;

const getStorageProvider = () =>
  typeof window !== "undefined" && window.sessionStorage;

const setCounter = (trackingName, value) => {
  const storageProvider = getStorageProvider();
  if (storageProvider) {
    const viewCounts = JSON.parse(storageProvider.getItem(STORAGE_KEY));
    const newViewCounts = {
      ...(viewCounts || {}),
      [trackingName]: value
    };
    storageProvider.setItem(STORAGE_KEY, JSON.stringify(newViewCounts));
  }
};

const getCounter = trackingName => {
  const storageProvider = getStorageProvider();
  if (storageProvider) {
    const viewCounts = JSON.parse(storageProvider.getItem(STORAGE_KEY));
    return (viewCounts && viewCounts[trackingName]) || 1;
  }
  return null;
};

const getViewCount = trackingName => {
  const count = getCounter(trackingName);
  setCounter(trackingName, count);
  return count;
};

const incrementViewCount = trackingName => {
  const count = getCounter(trackingName);
  setCounter(trackingName, count + 1);
};

const ViewCountWrapper = ({
  displayFunction = () => true,
  trackingName,
  children
}) => {
  const [viewCount, setViewCount] = useState();
  const ref = useRef(null);
  let observer;

  useEffect(() => {
    const newViewCount = getViewCount(trackingName);
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
              incrementViewCount(trackingName);
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

  return (
    <>
      <div className="view-count-observer" ref={ref} />
      <div
        className="view-count"
        style={{ display: display ? "block" : "none" }}
      >
        {children}
      </div>
    </>
  );
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
