export default ({ children }) => children;

let isTablet = false;

export const mockSetIsTablet = isTabletValue => {
  isTablet = isTabletValue;
};

export const ResponsiveContext = {
  Consumer: ({ children }) => children({ isTablet })
};
