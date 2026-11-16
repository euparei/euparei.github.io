"use strict";

export class DATE {
  static daysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }

  static month(date: Date): number {
    return date.getMonth() + 1;
  }

  static years(date1: Date, date2: Date): number {
    const month1 = DATE.month(date1);
    const month2 = DATE.month(date2);
    let diff: number;
    if (month1 < month2) {
      diff = 1;
    } else {
      diff = 0;
    }
    return date1.getFullYear() - date2.getFullYear() - diff;
  }

  static months(date1: Date, date2: Date): number {
    const month1 = DATE.month(date1);
    const month2 = DATE.month(date2);
    const day1 = date1.getDate();
    const day2 = date2.getDate();
    let diff: number;
    if (day1 < day2) {
      diff = 1;
    } else {
      diff = 0;
    }
    if (month1 >= month2) {
      return month1 - month2 - diff;
    } else {
      return 12 - month2 + month1 - diff;
    }
  }

  static days(date1: Date, date2: Date): number {
    const day1 = date1.getDate();
    const day2 = date2.getDate();
    if (day1 >= day2) {
      return day1 - day2;
    } else {
      const daysInMonth = DATE.daysInMonth(DATE.month(date2), date2.getFullYear());
      return daysInMonth - day2 + day1;
    }
  }

  static hours(date1: Date, hour2: number): number {
    const hour1 = date1.getHours();
    if (hour1 >= hour2) {
      return hour1 - hour2;
    } else {
      return 24 - hour2 + hour1;
    }
  }

  static minutes(date1: Date, minute2: number): number {
    const minute1 = date1.getMinutes();
    if (minute1 >= minute2) {
      return minute1 - minute2;
    } else {
      return 60 - minute2 + minute1;
    }
  }
}
