import sectionColours, { secondarySectionColours } from "../colours/section";

const sectionColourPicker = (section, template) => {
  const config = {
    indepth: {
      default: {
        sectionColours
      },
      thesundaytimesmagazine: {
        secondarySectionColours
      }
    },
    magazinecomment: {
      default: {
        sectionColours
      }
    },
    magazinestandard: {
      default: {
        sectionColours
      }
    },
    maincomment: {
      default: {
        sectionColours
      }
    },
    mainstandard: {
      default: {
        sectionColours
      }
    }
  };

  return config[template][section] || config[template].default;
};

export default (section, template) => ({
  sectionColour: sectionColourPicker(section, template)
});
