import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  compact: {
    position: "absolute",
    right: 0,
    left: 0
  },
  container: {
    alignItems: "stretch",
    flexDirection: "column"
  },
  horizontal: {
    flexDirection: "row",
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderTopColor: "#dbdbdb",
    borderTopWidth: 1,
    justifyContent: "space-between"
  },
  arrows: {
    color: "#006699",
    fontFamily: "GillSansMTStd-Medium",
    fontSize: 14,
    lineHeight: 38
  },
  label: {
    color: "#696969",
    fontFamily: "GillSansMTStd-Medium",
    fontSize: 15,
    lineHeight: 20,
    textAlign: "center",
    paddingBottom: 11,
    paddingTop: 11
  }
});

const shouldRenderOneLine = width => width >= 700;

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCompact: false
    };

    this.handleLayout = this.handleLayout.bind(this);
  }

  handleLayout({ nativeEvent }) {
    const { width } = nativeEvent.layout;

    return this.setState({
      isCompact: shouldRenderOneLine(width)
    });
  }

  render() {
    const {
      compact,
      count,
      nextPageLinking,
      page,
      pageSize,
      prevPageLinking,
      onNext,
      onPrev
    } = this.props;

    const startResult = (page - 1) * pageSize + 1;
    const finalResult = Math.min(count, page * pageSize);
    const message = `Showing ${startResult} - ${finalResult} of ${count} results`;

    const prevComponent = startResult > pageSize
      ? <TouchableHighlight>
          <Text
            accessibilityRole="link"
            href={prevPageLinking}
            style={styles.arrows}
            onPress={() => onPrev(prevPageLinking)}
          >
            {"< Previous page"}
          </Text>
        </TouchableHighlight>
      : null;

    const nextComponent = finalResult < count
      ? <TouchableHighlight>
          <Text
            accessibilityRole="link"
            href={nextPageLinking}
            style={styles.arrows}
            onPress={() => onNext(nextPageLinking)}
          >
            {"Next page >"}
          </Text>
        </TouchableHighlight>
      : null;

    const messageComponent = !compact
      ? <Text
          style={[styles.label, this.state.isCompact ? styles.compact : null]}
        >
          {message}
        </Text>
      : null;

    return (
      <View style={styles.container} onLayout={this.handleLayout}>
        {messageComponent}
        <View style={styles.horizontal}>
          <View>{prevComponent}</View>
          <View>{nextComponent}</View>
        </View>
      </View>
    );
  }
}

Pagination.propTypes = {
  compact: PropTypes.bool,
  count: PropTypes.number.isRequired,
  nextPageLinking: PropTypes.string,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  prevPageLinking: PropTypes.string,
  onNext: PropTypes.func,
  onPrev: PropTypes.func
};

Pagination.defaultProps = {
  compact: false,
  nextPageLinking: null,
  page: 1,
  pageSize: 20,
  prevPageLinking: null,
  onNext: () => {},
  onPrev: () => {}
};

export default Pagination;
