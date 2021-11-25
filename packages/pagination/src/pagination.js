import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Link from "@times-components/link";
import { withTrackEvents } from "@times-components/tracking";
import styleguide from "@times-components/styleguide";
import withPageState from "./pagination-wrapper";
import { PreviousPageIcon, NextPageIcon } from "./pagination-icons";
import Results from "./results";
import PaginationBorder from "./pagination-border";
import PaginationContainer from "./pagination-container";
import LinkContainer from "./styles/responsive.web";

const { colours, fontFactory } = styleguide();
const styles = StyleSheet.create({
  arrow: {
    color: colours.functional.action,
    ...fontFactory({
      font: "supporting",
      fontSize: "meta"
    })
  }
});

const Pagination = ({
  count,
  generatePageLink,
  hideResults,
  onNext,
  onPrev,
  page,
  pageSize
}) => {
  const finalResult = Math.min(count, page * pageSize);
  const startResult = Math.min(finalResult, (page - 1) * pageSize + 1);
  const message = `Showing ${startResult} - ${finalResult} of ${count} results`;

  const prevComponent =
    startResult > pageSize ? (
      <Link
        onPress={e => onPrev(e, page - 1)}
        style={styles.arrow}
        testID="page-prev"
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
        testID="page-next"
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
  generatePageLink: PropTypes.func.isRequired,
  hideResults: PropTypes.bool,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  page: PropTypes.number,
  pageSize: PropTypes.number
};

Pagination.defaultProps = {
  count: 0,
  hideResults: false,
  onNext: () => {},
  onPrev: () => {},
  page: 1,
  pageSize: 20
};

export default withTrackEvents(Pagination, {
  analyticsEvents: [
    {
      actionName: "Pressed",
      eventName: "onNext",
      getAttrs: (props, [, destinationPage]) => ({
        destinationPage,
        direction: "next"
      })
    },
    {
      actionName: "Pressed",
      eventName: "onPrev",
      getAttrs: (props, [, destinationPage]) => ({
        destinationPage,
        direction: "previous"
      })
    }
  ]
});

export { withPageState };
