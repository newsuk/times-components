import '@testing-library/jest-dom';
import { getBreakpoint } from '../getBreakPoint';
import { mainMenuItems } from '../../secondary-menu/fixtures/menu-items.json';
import { useBreakpointKey } from 'newskit';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('md')
}));

describe('getBreakpoint', () => {
  it('should return right navitems length', () => {
    (useBreakpointKey as any).mockReturnValue('md');

    const { menuItems } = getBreakpoint(mainMenuItems);
    expect(menuItems).toBe(7);
  });
  it('should return right navitems length', () => {
    (useBreakpointKey as any).mockReturnValue('lg');

    const { menuItems } = getBreakpoint(mainMenuItems);
    expect(menuItems).toBe(9);
  });
});
