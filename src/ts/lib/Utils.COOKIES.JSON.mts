"use strict";

import { COOKIES } from "./Utils.COOKIES.mjs";

export class CookiesJSON {
  static set(cookieName: string, cookieObject: object, days?: number): void {
    COOKIES.set(cookieName, JSON.stringify(cookieObject)!, days);
  }

  static get(cookieName: string): unknown {
    return JSON.parse(COOKIES.get(cookieName)!);
  }
}
