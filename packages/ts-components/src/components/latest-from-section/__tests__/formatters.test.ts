import { formatLatestFromSection, getSectionTitle } from '../formatters';
import { latestFromSection } from '../fixtures/fixtures';
describe('latest from section formatters', () => {
  it('formats', () => {
    expect(
      formatLatestFromSection(latestFromSection, 'sport')
    ).toMatchSnapshot();
  });

  it('getSectionTitle', () => {
    expect(getSectionTitle(latestFromSection, 'sport')).toEqual('Sport');
  });
});
