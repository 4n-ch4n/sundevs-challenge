export class DateFormatter {
  // Definimos las unidades de mayor a menor para un ciclo más limpio
  private static readonly timeUnits: {
    unit: Intl.RelativeTimeFormatUnit;
    seconds: number;
  }[] = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'week', seconds: 604800 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 },
  ];

  static getRelativeTime(date: Date): string {
    const secondsDifference = Math.round((date.getTime() - Date.now()) / 1000);
    const absSeconds = Math.abs(secondsDifference);

    const formatter = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

    // Buscamos la primera unidad que quepa en la diferencia de segundos
    for (const { unit, seconds } of this.timeUnits) {
      if (absSeconds >= seconds || unit === 'second') {
        const value = Math.round(secondsDifference / seconds);
        return formatter.format(value, unit);
      }
    }

    return 'ahora';
  }
}
