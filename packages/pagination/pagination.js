import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import Link from "@times-components/link";
import { withTrackEvents } from "@times-components/tracking";
import withPageState from "./pagination-wrapper";
import { PreviousPageIcon, NextPageIcon } from "./pagination-icons";
import Results from "./results";

const styles = StyleSheet.create({
  absolute: {
    left: 0,
    position: "absolute",
    right: 0
  },
  arrow: {
    color: "#006699",
    fontFamily: "GillSansMTStd-Medium",
    fontSize: 14
  },
  border: {
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderTopColor: "#dbdbdb",
    borderTopWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40
  },
  container: {
    alignItems: "stretch",
    flexDirection: "column"
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
        style={styles.arrow}
        onPress={e => onPrev(e, page - 1)}
        url={generatePageLink(page - 1)}
      >
        <PreviousPageIcon />
      </Link>
    ) : null;

  const nextComponent =
    finalResult < count ? (
      <Link
        style={styles.arrow}
        onPress={e => onNext(e, page + 1)}
        url={generatePageLink(page + 1)}
      >
        <NextPageIcon />
      </Link>
    ) : null;

  const messageComponent = !hideResults ? <Results>{message}</Results> : null;

  return (
    <View style={styles.container}>
      {messageComponent}
      <View style={styles.border}>
        <View>{prevComponent}</View>
        <View>{nextComponent}</View>
      </View>
    </View>
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
