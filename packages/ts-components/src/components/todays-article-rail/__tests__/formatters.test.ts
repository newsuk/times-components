import { formatLatestFromSection, getSectionTitle } from '../formatters';
import { latestFromSection } from '../fixtures/fixtures';
describe('latest from section formatters', () => {
  it('formats', () => {
    expect(formatLatestFromSection(latestFromSection[4])).toMatchSnapshot();
  });

  it('getSectionTitle', () => {
    expect(getSectionTitle(latestFromSection[4])).toEqual('Sport');
  });
});
