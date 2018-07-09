import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Link from "@times-components/link";
import { withTrackEvents } from "@times-components/tracking";
import { colours, fonts, fontSizes } from "@times-components/styleguide";
import withPageState from "./pagination-wrapper";
import { PreviousPageIcon, NextPageIcon } from "./pagination-icons";
import Results from "./results";
import PaginationBorder from "./pagination-border";
import PaginationContainer from "./pagination-container";
import LinkContainer from "./styles/responsive.web";

const styles = StyleSheet.create({
  arrow: {
    color: colours.functional.action,
    fontFamily: fonts.supporting,
    fontSize: fontSizes.meta
  }
});

const Pagination = ({
  count,
  generatePageLink,
  onNext,
  onPrev,
  page,
  pageSize,
  hideResults
}) => {
  const finalResult = Math.min(count, page * pageSize);
  const startResult = Math.min(finalResult, (page - 1) * pageSize + 1);
  const message = `Showing ${startResult} - ${finalResult} of ${count} results`;

  const prevComponent =
    startResult > pageSize ? (
      <Link
        onPress={e => onPrev(e, page - 1)}
        style={styles.arrow}
        url={generatePageLink(page - 1)}
      >
        <PreviousPageIcon />
      </Link>
    ) : null;

  const nextComponent =
    finalResult < count ? (
      <Link
        onPress={e => onNext(e, page + 1)}
        style={styles.arrow}
        url={generatePageLink(page + 1)}
      >
        <NextPageIcon />
      </Link>
    ) : null;

  const messageComponent = !hideResults ? <Results>{message}</Results> : null;

  return (
    <PaginationContainer hideResults={hideResults}>
      {messageComponent}
      <PaginationBorder hideResults={hideResults}>
        <LinkContainer>{prevComponent}</LinkContainer>
        <LinkContainer>{nextComponent}</LinkContainer>
      </PaginationBorder>
    </PaginationContainer>
  );
};

Pagination.propTypes = {
  count: PropTypes.number,
  generatePageLink: PropTypes.func,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  hideResults: PropTypes.bool
};

Pagination.defaultProps = {
  count: 0,
  generatePageLink: page => `./${page}`,
  onNext: () => {},
  onPrev: () => {},
  page: 1,
  pageSize: 20,
  hideResults: false
};

export default withTrackEvents(Pagination, {
  analyticsEvents: [
    {
      eventName: "onNext",
      actionName: "Pressed",
      getAttrs: (props, [, destinationPage]) => ({
        destinationPage,
        direction: "next"
      })
    },
    {
      eventName: "onPrev",
      actionName: "Pressed",
      getAttrs: (props, [, destinationPage]) => ({
        destinationPage,
        direction: "previous"
      })
    }
  ]
});

export { withPageState };
