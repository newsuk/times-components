import styled from 'styled-components';

export const styleMap = {
  colors: {
    blue070: '#006699',
    inkContrast: '#01000d',
    inkSubtle: '#696969',
    inkNonEssential: '#aaaaaa',
  },
};

export const BreadcrumbItem = styled.a<{ selected: boolean }>`
color: inherit;
text-decoration: none;
display: inline-grid;
font-family: Roboto-Regular;
font-size: 12px;
font-weight: 500;
line-height: 1.250;
letter-spacing: 0%;
font-stretch: normal
display: inline-grid;
background-color: transparent;
min-height: 32px;
border: none;
place-content: center;
color: ${({ selected }) =>
  selected ? styleMap.colors.inkContrast : styleMap.colors.inkSubtle};
&:hover {
  color: ${styleMap.colors.blue070}
};
`;

export const Breadcrumbs = styled.nav`
  display: flex;
`;

export const IconContainer = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  padding-inline: 8px;
`;
