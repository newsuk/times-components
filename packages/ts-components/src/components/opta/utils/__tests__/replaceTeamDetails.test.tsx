import '@testing-library/jest-dom';
import * as optaFn from '../replaceTeamDetails';

describe('isNationalCompetition', () => {
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
});
