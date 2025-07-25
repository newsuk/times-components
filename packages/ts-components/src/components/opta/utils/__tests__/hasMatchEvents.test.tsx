import {
  hasMatchEvents,
  cricketScript,
  footballRugbyScript
} from '../hasMatchEvents';

describe('hasMatchEvents', () => {
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

  it('should append script to document body for football/rugby', () => {
    hasMatchEvents();
    const script = document.body.querySelector('script');
    expect(script).toBeTruthy();
    expect(script!.type).toBe('text/javascript');
    expect(script!.innerHTML.replace(/\s/g, '')).toEqual(
      footballRugbyScript.replace(/\s/g, '')
    );
  });

  it('should append script to document body for cricket', () => {
    hasMatchEvents(true);
    const script = document.body.querySelector('script');
    expect(script).toBeTruthy();
    expect(script!.type).toBe('text/javascript');
    expect(script!.innerHTML.replace(/\s/g, '')).toEqual(
      cricketScript.replace(/\s/g, '')
    );
  });
});
