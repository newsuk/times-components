const horizontalStyles = {
  container: {
    flexDirection: "row"
  },
  flagStyle: {
    alignItems: "flex-start",
    width: "75%"
  },
  starButton: {
    alignItems: "flex-end",
    flex: 1,
    marginTop: -5,
    width: "25%"
  }
};

const verticalStyles = {
  container: {
    flexDirection: "column"
  },
  flagStyle: {},
  starButton: {
    alignItems: "center",
    marginTop: 10
  }
};

export { horizontalStyles, verticalStyles };
