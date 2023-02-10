import React from 'react';
// import { ThemeProvider } from 'newskit';
import { NewsKitProvider } from 'newskit';

import { TimesWebLightTheme } from '../../theme';

// import { TopNav } from './top-nav';
import { DynamicNav } from './dynamic-nav';


// export const GlobalNav = () => {
//   return (
//     <ThemeProvider theme={TimesWebLightTheme}>
//         <TopNav />
//     </ThemeProvider>
//   );
// };

export const GlobalNav  = () => {
  return (
    <NewsKitProvider theme={TimesWebLightTheme}>
        <DynamicNav />
    </NewsKitProvider>
  );
};