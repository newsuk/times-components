import { formatTodaysSection} from '../formatters';
import { todaysSection } from '../fixtures/fixtures';
describe('latest from section formatters', () => {
  it('formats', () => {
    expect(formatTodaysSection(todaysSection[4])).toMatchSnapshot();
  });
});
