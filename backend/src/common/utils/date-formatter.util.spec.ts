import { DateFormatter } from './date-formatter.util';

describe('date-formatter.util.ts', () => {
  it('should return "hace 1 minuto" for a date 1 minute ago', () => {
    const date = new Date(Date.now() - 60 * 1000);

    const result = DateFormatter.getRelativeTime(date);

    expect(result).toBe('hace 1 minuto');
  });

  it('should return "hace 2 horas" for a date 2 hours ago', () => {
    const date = new Date(Date.now() - 2 * 60 * 60 * 1000);

    const result = DateFormatter.getRelativeTime(date);

    expect(result).toBe('hace 2 horas');
  });

  it('should return "hace 3 días" for a date 3 days ago', () => {
    const date = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

    const result = DateFormatter.getRelativeTime(date);

    expect(result).toBe('hace 3 días');
  });
});
