import sectionColours, { secondarySectionColours } from "../colours/section";

const sectionColourPicker = (section, template) => {
  switch (template) {
    case "magazinestandard":
    case "magazinecomment":
    case "indepth":
      if (section === "thesundaytimesmagazine") {
        return secondarySectionColours[section];
      }
      return sectionColours[section];

    default:
      return sectionColours[section];
  }
};

export default (section, template) => ({
  sectionColour: sectionColourPicker(section, template)
});
