import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import PropTypes from "prop-types";
import Link from "@times-components/link";
import { withTrackEvents } from "@times-components/tracking";
import withPageState from "./pagination-wrapper";
import { PreviousPageIcon, NextPageIcon } from "./pagination-icons";

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
    borderTopWidth: 1
  },
  container: {
    alignItems: "stretch",
    flexDirection: "column"
  },
  horizontal: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40
  },
  label: {
    color: "#696969",
    fontFamily: "GillSansMTStd-Medium",
    fontSize: 15,
    ...Platform.select({
      web: {
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale"
      }
    })
  },
  message: {
    justifyContent: "center"
  }
});

const shouldRenderOneLine = width => width >= 700;

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    const {
      count,
      generatePageLink,
      onNext,
      onPrev,
      page,
      pageSize,
      hideResults
    } = props;

    this.state = {
      absolutePosition: false,
      count,
      generatePageLink,
      onNext,
      onPrev,
      page,
      pageSize,
      hideResults
    };

    this.handleLayout = this.handleLayout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      Object.assign({}, nextProps, {
        absolutePosition: this.state.absolutePosition
      })
    );
  }

  handleLayout({ nativeEvent }) {
    const { width } = nativeEvent.layout;

    return this.setState({
      absolutePosition: shouldRenderOneLine(width)
    });
  }

  render() {
    const {
      count,
      generatePageLink,
      onNext,
      onPrev,
      page,
      pageSize,
      hideResults
    } = this.state;

    const startResult = (page - 1) * pageSize + 1;
    const finalResult = Math.min(count, page * pageSize);
    const message = `Showing ${startResult} - ${finalResult} of ${count} results`;
    const previousLabel = this.state.absolutePosition
      ? "Previous Page"
      : "Previous";
    const nextLabel = this.state.absolutePosition ? "Next Page" : "Next";

    const prevComponent =
      startResult > pageSize ? (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link
          style={styles.arrow}
          onPress={e => onPrev(e, page - 1)}
          url={generatePageLink(page - 1)}
        >
          <PreviousPageIcon label={previousLabel} />
        </Link>
      ) : null;

    const nextComponent =
      finalResult < count ? (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link
          style={styles.arrow}
          onPress={e => onNext(e, page + 1)}
          url={generatePageLink(page + 1)}
        >
          <NextPageIcon label={nextLabel} />
        </Link>
      ) : null;

    const messageComponent = !hideResults ? (
      <View
        style={[
          styles.horizontal,
          styles.message,
          this.state.absolutePosition ? styles.absolute : null
        ]}
      >
        <Text style={[styles.label]}>{message}</Text>
      </View>
    ) : null;

    return (
      <View style={styles.container} onLayout={this.handleLayout}>
        {messageComponent}
        <View style={[styles.horizontal, styles.border]}>
          <View>{prevComponent}</View>
          <View>{nextComponent}</View>
        </View>
      </View>
    );
  }
}

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
