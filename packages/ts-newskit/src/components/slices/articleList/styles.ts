import { styled, getColorCssFromTheme, TextBlock } from 'newskit';

// export const ArticleListFooterWrapper = styled.div`
//   span {
//     border-left: 1px solid #ccc;
//     padding: 0 10px;
//     font-weight: 400;

//     &:first-child {
//       border-left: none;
//       padding-left: 0;
//       font-weight: 700;
//     }
//   }
// `;

export const ArticleListType = styled(TextBlock)`
  color: ${({ color }) => color};
  border-left: 1px solid #ccc;
`;

export const TimeToRead = styled.span`
  ${getColorCssFromTheme('color', 'inkSubtle')};
`;
