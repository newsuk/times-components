import React from "react";
import PropTypes from "prop-types";
import { Broadcast } from "react-broadcast";

const AdComposer = props => (
  <Broadcast channel="adConfig" value={props.adConfig}>
    {props.children}
  </Broadcast>
);

AdComposer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  adConfig: PropTypes.shape({
    networkId: PropTypes.string.isRequired,
    adUnit: PropTypes.string.isRequired,
    pageTargeting: PropTypes.shape({}),
    slotTargeting: PropTypes.shape({}),
    bidders: PropTypes.shape({})
  })
};

AdComposer.defaultProps = {
  adConfig: {
    networkId: "25436805",
    adUnit: "d.thetimes.co.uk",
    pageTargeting: {
      title: "This is title",
      label: "This is label"
    },
    slotTargeting: {
      section: "news"
    },
    bidders: {
      appnexus: {
        placementId: "5823281"
      },
      rubicon: {
        accountId: "14062",
        siteId: "70608",
        zoneId: "335918"
      },
      amazon: {
        accountId: "3360"
      },
      criteo: {
        zoneMap: {
          "120x600": "764877",
          "160x600": "764878",
          "300x100": "764885",
          "300x250": "764879",
          "300x600": "764880",
          "320x50": "764882",
          "728x90": "764881",
          "970x250": "764883",
          "970x90": "764884"
        }
      },
      pubmatic: {
        accountId: "156034",
        adSlotPrefix: "Thetimes"
      },
      indexExchange: {
        siteId: "188830"
      }
    }
  }
};
export default AdComposer;
