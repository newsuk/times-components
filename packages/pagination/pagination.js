import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    color: "#006699",
    display: "flex",
    flexDirection: "row",
    fontFamily: "GillSansMTStd-Medium",
    justifyContent: "center",
    lineHeight: 22
  },
  label: {
    flexGrow: 1,
    textAlign: "center"
  },
  pageChange: {
    flexShrink: 1,
    fontWeight: "400"
  },
  pageChangeHidden: {
    textIndent: 999
  }
});

const Pagination = props => {
  const firstResult = props.page * props.pageSize + 1;
  const lastResult = Math.min(props.total, (props.page + 1) * props.pageSize);
  const message = `Showing ${firstResult} - ${lastResult} of ${props.total} results`;

  const prevComponentStyle = [style.pageChange];
  if (firstResult < props.pageSize) {
    prevComponentStyle.push(style.pageChangeHidden);
  }

  const nextComponentStyle = [style.pageChange];
  if (lastResult >= props.total) {
    nextComponentStyle.push(style.pageChangeHidden);
  }

  return (
    <View style={style.container}>
      <Text style={prevComponentStyle}>
        Previous page
      </Text>
      <Text style={style.label}>{message}</Text>
      <Text style={nextComponentStyle}>
        Next page
      </Text>
    </View>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number.isRequired
};

Pagination.defaultProps = {
  page: 0,
  pageSize: 20
};

export default Pagination;
