"use strict";

import { Utils } from "./Utils.mjs";

export class DOM {
  static visible(element: string | HTMLElement): void {
    Utils.$(element).style.visibility = "initial";
  }

  static invisible(element: string | HTMLElement): void {
    Utils.$(element).style.visibility = "hidden";
  }

  static isVisible(element: string | HTMLElement): boolean {
    return getComputedStyle(Utils.$(element)).visibility != "hidden";
  }

  static displayed(element: string | HTMLElement): void {
    Utils.$(element).style.display = "initial";
  }

  static undisplayed(element: string | HTMLElement): void {
    Utils.$(element).style.display = "none";
  }

  static isDisplayed(element: string | HTMLElement): boolean {
    return getComputedStyle(Utils.$(element)).display != "none";
  }
}
