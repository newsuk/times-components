export const nativeStyles = {
  byline: {
    color: "#696969",
    fontSize: 13,
    fontFamily: "GillSansMTStd-Medium"
  },
  link: {
    color: "#069"
  }
};

export const webStyles = {
  ...nativeStyles
};

webStyles.link.textDecorationLine = "none";
