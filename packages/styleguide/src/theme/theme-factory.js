import sectionColours, { secondarySectionColours } from "../colours/section";

const sectionColourPicker = (section, template) => {
  const config = {
    indepth: {},
    magazinecomment: {
      ...sectionColours,
      ...secondarySectionColours
    },
    magazinestandard: {
      ...sectionColours,
      ...secondarySectionColours
    },
    maincomment: {
      ...sectionColours
    },
    mainstandard: {
      ...sectionColours
    },
    takeoverpage: {}
  };

  return config[template][section];
};

const magazineFontPicker = (defaultFont, section, template) => {
  const magazineSections = {
    culture: "cultureMagazine",
    Culture: "cultureMagazine",
    style: "styleMagazine",
    Style: "styleMagazine",
    "The Sunday Times Magazine": "stMagazine",
    thesundaytimesmagazine: "stMagazine",
    "the sunday times magazine": "stMagazine"
  };

  const config = {
    indepth: magazineSections,
    magazinecomment: magazineSections,
    magazinestandard: magazineSections,
    maincomment: {},
    mainstandard: {},
    takeoverpage: {}
  };

  return config[template][section] || defaultFont;
};

const headlineCasePicker = (section, template) =>
  section &&
  section.toLowerCase() === "style" &&
  ["indepth", "magazinestandard", "magazinecomment"].includes(template)
    ? "uppercase"
    : null;

export default (sectionParam, templateParam) => {
  const section = sectionParam || "default";
  const template = templateParam || "mainstandard";

  return {
    dropCapFont: magazineFontPicker("dropCap", section, template),
    headlineFont: magazineFontPicker("headline", section, template),
    pullQuoteFont: magazineFontPicker("headlineRegular", section, template),
    sectionColour: sectionColourPicker(section, template),
    headlineCase: headlineCasePicker(section, template)
  };
};
