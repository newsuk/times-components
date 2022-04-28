import '@testing-library/react';

import breakpoints, {
  editionBreakpointWidths,
  editionBreakpoints
} from '../breakpoints';

import {
  getEditionBreakpoint,
  sliceContentMaxWidth,
  editionMaxWidth,
  globalSpacingStyles,
  editionBreakpointWidths as styleguideEditionBreakpointWidths,
  editionBreakpoints as styleguideEditionBreakpoints
} from '../Styleguide';

describe('breakpoints', () => {
  it('should return correct globalSpacingStyles value', () => {
    expect(globalSpacingStyles).toEqual({
      tabletHeadline: { marginBottom: 5 },
      tabletTeaser: { marginTop: 5 }
    });
  });
  it('should return correct sliceContentMaxWidth value', () => {
    expect(sliceContentMaxWidth).toEqual(1180);
  });

  it('should return correct sliceContentMaxWidth value', () => {
    expect(sliceContentMaxWidth).toEqual(1180);
  });

  it('should return correct editionBreakpointWidths value', () => {
    expect(editionBreakpointWidths.wide).toEqual(1024);
    expect(styleguideEditionBreakpointWidths.wide).toEqual(1024);
  });

  it('should return correct editionMaxWidth value', () => {
    expect(editionMaxWidth).toEqual(1366);
  });

  it('should return correct breakpoint width value', () => {
    expect(breakpoints.huge).toEqual(1320);
  });

  it('should retun correct editionBreakpoints value', () => {
    expect(editionBreakpoints.huge).toEqual('huge');
    expect(styleguideEditionBreakpoints.huge).toEqual('huge');
  });

  describe('getEditionBreakpoint()', () => {
    it('should return correct getEditionBreakpoint value', () => {
      expect(getEditionBreakpoint(600)).toEqual('small');
    });

    it('should return correct getEditionBreakpoint value', () => {
      expect(getEditionBreakpoint(900)).toEqual('medium');
    });

    it('should return correct getEditionBreakpoint value', () => {
      expect(getEditionBreakpoint(1100)).toEqual('wide');
    });

    it('should return correct getEditionBreakpoint value', () => {
      expect(getEditionBreakpoint(1500)).toEqual('huge');
    });
  });
});
