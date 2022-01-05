import styled from "styled-components";
import { gqlRgbaToStyle } from "@times-components/utils";
import styleguide from "@times-components/styleguide";

const { fontFactory, spacing } = styleguide();

export const Container = styled.div`
  alignItems: center;
  flexDirection: row;
`;

export const IconContainer = styled.div`
  borderRadius: 2.5px;
  height: 5px;
  width: 5px;
  backgroundColor: ${ backgroundColor  => (gqlRgbaToStyle(backgroundColor) || backgroundColor)};
`;

export const TextContainer = styled.div`
...fontFactory({
        font: "bodyRegularSmallCaps",
        fontSize: "cardMetaMobile"
      }),
      fontWeight: 400",
      letterSpacing: 0.6,
      marginLeft: spacing(1)
`
// const styles = {
//   bullet: {
//     borderRadius: 2.5,
//     height: 5,
//     width: 5
//   },
//   flagPadding: {
//     marginRight: spacing(3)
//   },
//   flagsContainer: {
//     marginBottom: spacing(3),
//     marginTop: spacing(1)
//   },
//   flags: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginBottom: spacing(2)
//   },
//   title: {
//     ...fontFactory({
//       font: "bodyRegularSmallCaps",
//       fontSize: "cardMetaMobile"
//     }),
//     fontWeight: "400",
//     letterSpacing: 0.6,
//     marginLeft: spacing(1)
//   },
//   view: {
//     alignItems: "center",
//     flexDirection: "row"
//   }
// };

// export default styles;
