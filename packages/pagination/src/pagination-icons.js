import React from "react";
import { TcView, TcText, checkStylesForUnits } from "@times-components/utils";
import { colours, fontFactory, spacing } from "@times-components/ts-styleguide";
import PageLabel from "./page-label";

const textStyle = {
  color: colours.functional.action,
  height: 15,
  ...fontFactory({
    font: "supporting",
    fontSize: "pagingMeta"
  }),
  lineHeight: 13
};

const container = {
  alignItems: "center",
  flexDirection: "row"
};

const styles = {
  nextContainer: Object.assign(
    {
      paddingBottom: "8px",
      paddingTop: "10px"
    },
    container
  ),
  nextText: Object.assign(
    {
      marginRight: spacing(2),
      textAlign: "right"
    },
    textStyle
  ),
  previousContainer: Object.assign(
    {
      paddingBottom: "8px",
      paddingTop: "10px"
    },
    container
  ),
  previousText: Object.assign(
    {
      marginLeft: spacing(2),
      textAlign: "left"
    },
    textStyle
  )
};

export const NextPageIcon = () => (
  <TcView style={styles.nextContainer} data-testid="pagination-button-next">
    <TcText style={checkStylesForUnits(styles.nextText)}>
      <PageLabel direction="Next" />
    </TcText>
    <svg
      aria-label="icon-next-page"
      height={12}
      style={{ marginTop: spacing(-0.5) }}
      viewBox="42 12 60 120"
      width={7}
    >
      <g fill={colours.functional.action}>
        <path d="M45.8,132L42,128.2,74.8,72,42,15.8,45.8,12,102,72Z" />
      </g>
    </svg>
  </TcView>
);

export const PreviousPageIcon = () => (
  <TcView
    style={styles.previousContainer}
    data-testid="pagination-button-previous"
  >
    <svg
      height={12}
      style={{ marginTop: spacing(-0.5) }}
      viewBox="42 12 60 120"
      width={7}
    >
      <g fill={colours.functional.action}>
        <path d="M98.2,12l3.8,3.8L69.2,72,102,128.2,98.2,132,42,72Z" />
      </g>
    </svg>
    <TcText style={checkStylesForUnits(styles.previousText)}>
      <PageLabel direction="Previous" />
    </TcText>
  </TcView>
);
