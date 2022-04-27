import '@testing-library/react';

import breakpoints, {
    editionBreakpoints,
    editionMaxWidth,
    getEditionBreakpoint,
    editionBreakpointWidths,
    sliceContentMaxWidth
  } from '../breakpoints';

describe('breakpoints', () => {
    it('should return correct sliceContentMaxWidth value', () => {
      expect(sliceContentMaxWidth).toBe(1180);
    });

    it('should return correct editionBreakpointWidths value', () => {
      expect(editionBreakpointWidths.wide).toBe(1024);
    });

    it('should return correct editionMaxWidth value', () => {
      expect(editionMaxWidth).toBe(1366);
    });

    it('should return correct breakpoint width value', () => {
      expect(breakpoints.huge).toBe(1320);
    });

    it('should retun correct editionBreakpoints value', () => {
      expect(editionBreakpoints.huge).toBe('huge');
    });

    describe('getEditionBreakpoint()', () => {
      it('should return correct getEditionBreakpoint value', () => {
        expect(getEditionBreakpoint(600)).toBe('small');
      });
  
      it('should return correct getEditionBreakpoint value', () => {
        expect(getEditionBreakpoint(900)).toBe('medium');
      });
  
      it('should return correct getEditionBreakpoint value', () => {
        expect(getEditionBreakpoint(1100)).toBe('wide');
      });
  
      it('should return correct getEditionBreakpoint value', () => {
        expect(getEditionBreakpoint(1500)).toBe('huge');
      })
      });
  })