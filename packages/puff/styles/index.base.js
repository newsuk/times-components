// @flow

type SectionColors = { [string]: string };
type SectionColorStyles = {
  [string]: {
    [string]: string
  }
};
type CreateSectionStyles = SectionColors => SectionColorStyles;
const createSectionStyles: CreateSectionStyles = sections =>
  Object.keys(sections).reduce(
    (acc, key) => ({
      ...acc,
      [`section${key}`]: {
        borderTopColor: sections[key]
      }
    }),
    {}
  );

export default {
  root: {
    backgroundColor: "#F9F8F3",
    borderStyle: "solid",
    borderTopWidth: 8,
    borderTopColor: "#000000"
  },
  link: {
    color: "#CD0000",
    fontFamily: "GillSansMTStd-Medium",
    fontSize: 13,
    lineHeight: 13,
    textDecorationColor: "transparent"
  },
  ...createSectionStyles({
    News: "#13354E",
    Comment: "#850029",
    Sport: "#008347"
  })
};
