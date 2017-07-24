import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  compact: {
    position: "absolute",
    right: 0,
    left: 0
  },
  container: {
    alignItems: "stretch",
    display: "flex",
    flexDirection: "column"
  },
  horizontal: {
    display: "flex",
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
    paddingBottom: 10,
    paddingTop: 10
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
    const { count, page, pageSize } = this.props;

    const startResult = (page - 1) * pageSize + 1;
    const finalResult = Math.min(count, page * pageSize);
    const message = `Showing ${startResult} - ${finalResult} of ${count} results`;

    const prevComponent = startResult > pageSize
      ? <Text style={styles.arrows}>
          {"< Previous page"}
        </Text>
      : null;

    const nextComponent = finalResult < count
      ? <Text style={styles.arrows}>
          {"Next page >"}
        </Text>
      : null;

    return (
      <View style={styles.container} onLayout={this.handleLayout}>
        <Text
          style={[styles.label, this.state.isCompact ? styles.compact : null]}
        >
          {message}
        </Text>
        <View style={styles.horizontal}>
          <View>{prevComponent}</View>
          <View>{nextComponent}</View>
        </View>
      </View>
    );
  }
}

Pagination.propTypes = {
  page: PropTypes.number,
  pageSize: PropTypes.number,
  count: PropTypes.number.isRequired
};

Pagination.defaultProps = {
  page: 1,
  pageSize: 20
};

export default Pagination;
