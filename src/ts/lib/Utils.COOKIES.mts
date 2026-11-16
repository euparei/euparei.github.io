"use strict";

import { CookiesJSON } from "./Utils.COOKIES.JSON.mjs";

export class COOKIES {
  static JSON = CookiesJSON;

  static get(cookieName: string): string | null {
    const cookieString = document.cookie;
    const cookies = cookieString.split(/\s*;\s*/);
    const cookiesLength = cookies.length;
    for (let i = 0; i < cookiesLength; i++) {
      const cookie = cookies[i];
      const cookieNameValue = cookie.split(/\s*=\s*/);
      if (cookieNameValue[0] == cookieName) {
        return unescape(cookieNameValue[1]);
      }
    }
    return null;
  }

  static set(cookieName: string, cookieValue: string, days?: number): void {
    let expires: Date;
    if (days) {
      expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    }
    document.cookie = cookieName + "=" + escape(cookieValue) + (days ? ";expires=" + expires!.toUTCString() : "") + ";path=/";
  }

  static del(cookieName: string): void {
    const expires = new Date();
    expires.setTime(expires.getTime() - 1);
    document.cookie = cookieName + "=;expires=" + expires.toUTCString() + ";path=/";
  }
}
