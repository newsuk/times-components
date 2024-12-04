import { formatTime } from '../utils';

describe('formatTime', () => {
  test('formats seconds less than 60 correctly', () => {
    expect(formatTime(5)).toBe('0:05');
    expect(formatTime(59)).toBe('0:59');
  });

  test('formats exactly 60 seconds correctly', () => {
    expect(formatTime(60)).toBe('1:00');
  });

  test('formats minutes and seconds correctly', () => {
    expect(formatTime(65)).toBe('1:05');
    expect(formatTime(125)).toBe('2:05');
    expect(formatTime(360)).toBe('6:00');
  });

  test('handles zero seconds correctly', () => {
    expect(formatTime(0)).toBe('0:00');
  });

  test('formats large numbers of seconds correctly', () => {
    expect(formatTime(3600)).toBe('60:00'); // 1 hour
    expect(formatTime(7325)).toBe('122:05'); // 2 hours, 2 minutes, and 5 seconds
  });

  test('handles seconds less than 10 by adding a leading zero', () => {
    expect(formatTime(61)).toBe('1:01');
    expect(formatTime(9)).toBe('0:09');
  });

  test('handles non-integer seconds by flooring the value', () => {
    expect(formatTime(65.9)).toBe('1:05');
    expect(formatTime(0.9)).toBe('0:00');
  });
});
