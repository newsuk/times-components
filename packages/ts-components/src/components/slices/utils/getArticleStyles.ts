import get from 'lodash.get';

import { DisplaySchema } from '../types/styles';

type ImageRatioSchemaType = {
  sm?: string[];
  md?: string[];
  lg?: string[];
  xlg?: string[];
};

const breakpoints = ['sm', 'md', 'lg', 'xlg'];
const horizontalPadding = 12;

export const setDisplaySchema = (schema?: DisplaySchema) => {
  if (schema) {
    let previous = {};
    return breakpoints.reduce((acc: DisplaySchema, breakpoint: string) => {
      const current = { ...previous, ...get(schema, breakpoint) };
      previous = current;
      return { ...acc, [breakpoint]: current };
    }, {});
  }

  return;
};

export const getImageRatioSchema = (schema?: DisplaySchema) => {
  if (!schema) {
    return {};
  }

  let previous: string;
  return Object.entries(schema).reduce(
    (acc: ImageRatioSchemaType, [key, value]) => {
      const ratio = get(value, 'imageRatio', previous);
      previous = ratio;
      return ratio && !get(value, 'isImageHidden')
        ? { ...acc, [ratio]: [...get(acc, ratio, []), key] }
        : acc;
    },
    {}
  );
};

export const isSideBySide = (breakpoint: string, schema?: DisplaySchema) =>
  get(get(schema, breakpoint), 'isSideBySide') === true;

export const isImageHidden = (breakpoint: string, schema?: DisplaySchema) =>
  get(get(schema, breakpoint), 'isImageHidden') === true;

export const isCentered = (breakpoint: string, schema?: DisplaySchema) =>
  get(get(schema, breakpoint), 'isCentered') === true;

const calculateSlotPadding = (numberOfColumns: number) =>
  ((numberOfColumns * 2 - 2) * horizontalPadding) / numberOfColumns;

export const calculateSlotWidth = (
  widthAsPercent: number,
  numberOfColumns: number
) => `calc(${widthAsPercent}% - ${calculateSlotPadding(numberOfColumns)}px)`;
