"use strict";

import { COOKIES } from "./Utils.COOKIES.mjs";
import { DATE } from "./Utils.DATE.mjs";
import { DOM } from "./Utils.DOM.mjs";

export class Utils {
  static DOM = DOM;
  static DATE = DATE;
  static COOKIES = COOKIES;

  static $(idOrElement: string | HTMLElement): HTMLElement {
    if (typeof idOrElement === "string") {
      return document.getElementById(idOrElement) as HTMLElement;
    } else {
      return idOrElement;
    }
  }
}
