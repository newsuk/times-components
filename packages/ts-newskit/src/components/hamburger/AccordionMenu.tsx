import React from 'react';
import { AccordionGroup, Accordion, ThemeProvider } from 'newskit';

import { TimesWebLightTheme } from '../../theme';

export const AccordionMenu: React.FC<{}> = () => {
  const [expandedSingle, toggleExpandedSingle] = React.useState(false);
  return (
    <ThemeProvider theme={TimesWebLightTheme}>
      <AccordionGroup expandSingle defaultExpanded={[0]}>
        <Accordion onChange={toggleExpandedSingle} expanded={expandedSingle} header="News" key="1">Accordion 1</Accordion>
        <Accordion onChange={toggleExpandedSingle} expanded={expandedSingle} header="Sports" key="2">Accordion 2</Accordion>
        <Accordion onChange={toggleExpandedSingle} expanded={expandedSingle} header="Business" key="3">Accordion 3</Accordion>
      </AccordionGroup>
    </ThemeProvider>
  );
};