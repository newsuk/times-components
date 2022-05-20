import { formatTodaysSection, getSectionTitle } from '../formatters';
import { todaysSection } from '../fixtures/fixtures';
describe('latest from section formatters', () => {
  it('formats', () => {
    expect(formatTodaysSection(todaysSection[4])).toMatchSnapshot();
  });

  it('getSectionTitle', () => {
    expect(getSectionTitle(todaysSection[4])).toEqual('Sport');
  });
});
