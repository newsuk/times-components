import { StyleSheet } from "react-native";

export default StyleSheet.create({
  Container: {},
  ArticleContainer: {
    flexDirection: "column",
    boxSizing: "border-box",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15
  },
  LeadAsset: {
    position: "relative",
    boxSizing: "border-box",
    marginBottom: 30
  },
  ArticleMiddleContainer: {
    flexDirection: "row",
    width: "58.33%",
    marginTop: 30,
    marginRight: "auto",
    marginBottom: 0,
    marginLeft: "auto"
  },
  ArticleBody: {
    flexDirection: "row",
    width: "58.33%",
    marginRight: "auto",
    marginBottom: 0,
    marginLeft: "auto"
  },
  ArticleBodyChildContainer: {
    boxSizing: "border-box"
  },
  ArticleHeader: {
    width: "58.33333%",
    margin: "auto"
  },
  ArticleHeadline: {},
  ArticleFlag: {
    marginTop: 6,
    marginBottom: 3
  },
  ArticleLabel: {},
  ArticleMeta: {
    flex: 1,
    width: "35.71429%",
    boxSizing: "border-box",
    top: 0,
    left: "-35.714%",
    position: "absolute",
    paddingRight: 20
  },
  DatePublication: {
    width: "90%",
    borderTopColor: "#DBDBDB",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    paddingTop: 6,
    paddingBottom: 6
  },
  Byline: {
    width: "90%",
    borderTopColor: "#DBDBDB",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    paddingTop: 6,
    paddingBottom: 6
  },
  ArticleContent: {
    flex: 3,
    flexDirection: "column"
  },
  ArticleAd: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    paddingBottom: 15,
    paddingTop: 15,
    boxSizing: "border-box",
    borderBottomColor: "#DBDBDB"
  },
  ArticleMedia: {
    backgroundColor: "#EFEFEF"
  },
  ArticleCaption: {}
});
