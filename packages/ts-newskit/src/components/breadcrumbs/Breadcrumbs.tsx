import React from 'react';
import { ThemeProvider, Breadcrumbs as NewskitBreadcrumbs, BreadcrumbItem } from 'newskit';
import { TimesWebLightTheme } from '../../theme';

const NewBreadcrumbs: React.FC<{}> = () => {
  const href = 'javascript:;';

  return (
     <ThemeProvider theme={TimesWebLightTheme}>
        <NewskitBreadcrumbs size="medium">
          <BreadcrumbItem href={href}>Breadcrumb Item</BreadcrumbItem>
          <BreadcrumbItem href={href}>Breadcrumb Item</BreadcrumbItem>
          <BreadcrumbItem selected href={href}>Breadcrumb Item</BreadcrumbItem>
        </NewskitBreadcrumbs>
     </ThemeProvider>
  );
};

export default NewBreadcrumbs;