import '@testing-library/jest-dom';
import * as optaFn from '../replaceTeamDetails';

describe('isNationalCompetition', () => {
  afterEach(() => {
    document.body.innerHTML = ''; // Clear the document body after each test
  });

  beforeAll(() => {
    // Mock the global Opta object if needed
    // @ts-ignore
    global.Opta = {
      events: {
        subscribe: jest.fn()
      }
    };
  });

  jest.spyOn(optaFn, 'isNationalCompetition');

  it('should return TRUE if is in array of national competitions', async () => {
    const isNationalCompetition = optaFn.isNationalCompetition('3', 'football');
    expect(optaFn.isNationalCompetition).toHaveBeenCalledWith('3', 'football');
    expect(isNationalCompetition).toBe(true);
  });

  it('should return FALSE if is in array of national competitions', async () => {
    const isNationalCompetition = optaFn.isNationalCompetition('8', 'football');
    expect(optaFn.isNationalCompetition).toHaveBeenCalledWith('8', 'football');
    expect(isNationalCompetition).toBe(false);
  });

  it('should append script to document body', () => {
    optaFn.replaceTeamName();
    const script = document.body.querySelector('script');
    expect(script).toBeTruthy();
    expect(script!.type).toBe('text/javascript');
    expect(script!.innerHTML).toContain(
      'const nationalFootballCompetitions = [3, 235, 941];'
    );
  });
});
