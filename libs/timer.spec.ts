import FormatMsToTime from './timer';

describe('FormatMsToTime', () => {
  test('returns "00:00:00" when given 0 milliseconds', () => {
    expect(FormatMsToTime(0)).toBe('00:00:00');
  });

  test('returns "00:00:01" when given 1000 milliseconds', () => {
    expect(FormatMsToTime(1000)).toBe('00:00:01');
  });

  test('returns "00:01:00" when given 60000 milliseconds', () => {
    expect(FormatMsToTime(60000)).toBe('00:01:00');
  });

  test('returns "01:00:00" when given 3600000 milliseconds', () => {
    expect(FormatMsToTime(3600000)).toBe('01:00:00');
  });

  test('returns "23:59:59" when given 86,399,000 milliseconds', () => {
    expect(FormatMsToTime(86399000)).toBe('23:59:59');
  });
});
