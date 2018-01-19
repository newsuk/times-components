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
    borderStyle: "solid",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50
  },
  borderTop: {
    borderTopColor: "#dbdbdb",
    borderTopWidth: 1
  },
  borderBottom: {
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: 1
  },
  container: {
    alignItems: "stretch",
    flexDirection: "column",
    marginTop: 30
  }
});

const debounceIntervalMs = 250;

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayPage: props.page
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ displayPage: nextProps.page });
  }

  navigate(e, nextPage, direction) {
    if (e) {
      e.preventDefault();
    }
    this.setState({ displayPage: nextPage });
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(
      this.props.onChangePage,
      debounceIntervalMs,
      nextPage,
      direction
    );
  }

  render() {
    const {
      count,
      generatePageLink,
      pageSize,
      hideResults,
      hideTopKeyline,
      hideBottomKeyline
    } = this.props;

    const { displayPage } = this.state;

    const finalResult = Math.min(count, displayPage * pageSize);
    const startResult = Math.min(finalResult, (displayPage - 1) * pageSize + 1);
    const message = `Showing ${startResult} - ${finalResult} of ${
      count
    } results`;

    const prevComponent =
      startResult > pageSize ? (
        <Link
          style={styles.arrow}
          onPress={e => this.navigate(e, displayPage - 1, "previous")}
          url={generatePageLink(displayPage - 1)}
        >
          <PreviousPageIcon />
        </Link>
      ) : null;

    const nextComponent =
      finalResult < count ? (
        <Link
          style={styles.arrow}
          onPress={e => this.navigate(e, displayPage + 1, "next")}
          url={generatePageLink(displayPage + 1)}
        >
          <NextPageIcon />
        </Link>
      ) : null;

    const messageComponent = !hideResults ? <Results>{message}</Results> : null;

    return (
      <View style={styles.container}>
        {messageComponent}
        <View
          style={[
            styles.border,
            !hideTopKeyline && styles.borderTop,
            !hideBottomKeyline && styles.borderBottom
          ]}
        >
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
  onChangePage: PropTypes.func,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  hideResults: PropTypes.bool,
  hideTopKeyline: PropTypes.bool,
  hideBottomKeyline: PropTypes.bool
};

Pagination.defaultProps = {
  count: 0,
  generatePageLink: page => `./${page}`,
  onChangePage: () => {},
  page: 1,
  pageSize: 20,
  hideResults: false,
  hideTopKeyline: false,
  hideBottomKeyline: false
};

export default withTrackEvents(Pagination, {
  analyticsEvents: [
    {
      eventName: "onChangePage",
      actionName: "Pressed",
      getAttrs: (props, [destinationPage, direction]) => ({
        destinationPage,
        direction
      })
    }
  ]
});

export { withPageState, Pagination as PaginationWithoutTrackEvents };
