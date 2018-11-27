import PropTypes from "prop-types";

export const propTypes = {
  adConfig: PropTypes.shape({
    adUnit: PropTypes.string.isRequired,
    biddersConfig: PropTypes.shape({}),
    bidderSlots: PropTypes.arrayOf(PropTypes.string),
    networkId: PropTypes.string.isRequired,
    pageTargeting: PropTypes.shape({}),
    slotTargeting: PropTypes.shape({})
  }),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

// @TODO: check these are sensible
export const defaultProps = {
  adConfig: {
    adUnit: "d.thetimes.co.uk",
    biddersConfig: {
      bidders: {
        amazon: {
          accountId: "3360"
        },
        appnexus: {
          placementId: "5823281"
        },
        ix: {
          siteId: "188830"
        },
        rubicon: {
          accountId: "14062",
          siteId: "70608",
          zoneId: "335918"
        }
      },
      bucketSize: 0.25,
      maxBid: 15,
      minPrice: 0.01,
      timeout: 3000
    },
    bidderSlots: ["ad-header", "ad-article-inline"],
    networkId: "25436805",
    pageTargeting: {
      label: "This is label",
      title: "This is title"
    },
    slotTargeting: {
      section: "news"
    }
  }
};
