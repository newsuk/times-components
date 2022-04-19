/* tslint:disable */

import { sectionColours, secondarySectionColours } from './colours/section';

// interface Template {
//   name: string;
//   index: number;
// }

const sectionColourPicker = (section: any, template: any) => {
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
  // @ts-ignore
  return config[template][section];
};

const magazineFontPicker = (defaultFont: any, section: any, template: any) => {
  const magazineSections = {
    culture: 'cultureMagazine',
    Culture: 'cultureMagazine',
    style: 'styleMagazine',
    Style: 'styleMagazine',
    'The Sunday Times Magazine': 'stMagazine',
    thesundaytimesmagazine: 'stMagazine',
    'the sunday times magazine': 'stMagazine'
  };

  const config = {
    indepth: magazineSections,
    magazinecomment: magazineSections,
    magazinestandard: magazineSections,
    maincomment: {},
    mainstandard: {},
    takeoverpage: {}
  };
  // @ts-ignore
  return config[template][section] || defaultFont;
};

const headlineCasePicker = (section: any, template: any) =>
  section &&
  section.toLowerCase() === 'style' &&
  ['indepth', 'magazinestandard', 'magazinecomment'].includes(template)
    ? 'uppercase'
    : null;

export default (sectionParam: any, templateParam: any) => {
  const section = sectionParam || 'default';
  const template = templateParam || 'mainstandard';

  return {
    dropCapFont: magazineFontPicker('dropCap', section, template),
    headlineFont: magazineFontPicker('headline', section, template),
    pullQuoteFont: magazineFontPicker('headlineRegular', section, template),
    sectionColour: sectionColourPicker(section, template),
    headlineCase: headlineCasePicker(section, template)
  };
};
