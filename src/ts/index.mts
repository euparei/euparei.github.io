import { Utils } from "./lib/Utils.mjs";

(function () {
  interface EuPareiData {
    de: string;
    em: string;
    as: string;
  }

  interface EuPareiEvent extends Event {
    dontSaveCookie?: boolean;
    fromHash?: boolean;
  }

  let frmEuParei: HTMLFormElement;
  let inCopiador: HTMLInputElement;
  let inPareiDe: HTMLInputElement;
  let inPareiEm: HTMLInputElement;
  let inPareiAs: HTMLInputElement;
  let lnkCompartilhar: HTMLElement;
  let lnkNovo: HTMLElement;
  let outResultado: HTMLElement;
  let outResultadoFrase: HTMLElement;
  let outLinkCopiado: HTMLElement;

  // // // // // // // // // // // // // // // // // // // // // // // // //
  function fixPareiDe(str: string): string {
    return str == "" ? "???" : str;
  }
  function fixNumber2(n: number): number | string {
    return n < 10 ? "0" + n : n;
  }
  function fixMonth(n: number): number | string {
    return fixNumber2(n + 1);
  }
  // // // // // // // // // // // // // // // // // // // // // // // // //

  function frmEuParei_Submit(evento: Event): void {
    evento.preventDefault();
    const submitEvent = evento as EuPareiEvent;
    const euParei = euPareiJson();
    exibirResultado(euParei, submitEvent.fromHash);
    if (submitEvent.dontSaveCookie != true) {
      salvarCookie(euParei);
    }
    setTimeout(function () {
      lnkCompartilhar.focus();
    }, 150);
  }

  function lnkNovo_Click(evento: Event): void {
    apagarCookie();
  }

  function lnkCompartilhar_Click(evento: Event): void {
    evento.preventDefault();
    salvarHash(euPareiJson());
    inCopiador.value = document.location.href;
    inCopiador.select();
    document.execCommand("copy");
    setTimeout(function () {
      lnkCompartilhar.focus();
    }, 100);
    Utils.DOM.displayed(outLinkCopiado);
    setTimeout(function () {
      Utils.DOM.undisplayed(outLinkCopiado);
    }, 3000);
  }

  // // // // // // // // // // // // // // // // // // // // // // // // //

  function euPareiJson(): EuPareiData {
    const euParei: EuPareiData = {
      de: inPareiDe.value,
      em: inPareiEm.value,
      as: inPareiAs.value,
    };
    return euParei;
  }

  function salvarCookie(euParei: EuPareiData): void {
    Utils.COOKIES.set("ep", btoa(JSON.stringify(euParei)), 36525);
  }

  function salvarHash(euParei: EuPareiData): void {
    document.location.hash = btoa(JSON.stringify(euParei));
  }

  function apagarCookie(): void {
    Utils.COOKIES.del("ep");
  }

  function restaurarCookie(): EuPareiData | null {
    const cookie = Utils.COOKIES.get("ep");
    return cookie ? restaurarHash(cookie) : null;
  }

  function restaurarHash(hash: string): EuPareiData {
    return JSON.parse(atob(hash)) as EuPareiData;
  }

  function exibirResultado(euParei: EuPareiData, fromHash?: boolean): void {
    const partesEm = euParei.em.split("/");
    const dia = partesEm[0];
    const mes = partesEm[1];
    const ano = partesEm[2];
    const em = new Date(Number(ano), Number(mes) - 1, Number(dia));
    const partesAs = euParei.as.split(":");
    const as = {
      horas: Number(partesAs[0]),
      minutos: Number(partesAs[1]),
    };
    const agora = new Date();
    const resultado = {
      pareiDe: fixPareiDe(euParei.de),
      anos: Utils.DATE.years(agora, em),
      meses: Utils.DATE.months(agora, em),
      dias: Utils.DATE.days(agora, em),
      horas: Utils.DATE.hours(agora, as.horas),
      minutos: Utils.DATE.minutes(agora, as.minutos),
    };
    const sb: string[] = [];
    if (fromHash) {
      sb.push("Quem lhe mandou este link");
    } else {
      sb.push("Voc&ecirc;");
    }
    sb.push(" est&aacute; h&aacute; ");
    if (resultado.anos > 0) {
      sb.push("<b>" + resultado.anos + "</b> ano" + plural(resultado.anos, "s"));
    }
    if (resultado.meses > 0) {
      if (resultado.anos > 0) {
        if (resultado.dias > 0 || resultado.horas > 0 || resultado.minutos > 0) {
          sb.push(", ");
        } else {
          sb.push(" e ");
        }
      }
      sb.push("<b>" + resultado.meses + "</b> m" + plural(resultado.meses, "eses", "&ecirc;s"));
    }
    if (resultado.dias > 0 || (resultado.anos <= 0 && resultado.meses <= 0 && resultado.horas <= 0 && resultado.minutos <= 0)) {
      if (resultado.anos > 0 || resultado.meses > 0) {
        if (resultado.horas > 0 || resultado.minutos > 0) {
          sb.push(", ");
        } else {
          sb.push(" e ");
        }
      }
      sb.push("<b>" + resultado.dias + "</b> dia" + plural(resultado.dias, "s"));
    }
    if (resultado.horas > 0) {
      if (resultado.anos > 0 || resultado.meses > 0 || resultado.dias > 0) {
        if (resultado.minutos > 0) {
          sb.push(", ");
        } else {
          sb.push(" e ");
        }
      }
      sb.push("<b>" + resultado.horas + "</b> hora" + plural(resultado.horas, "s"));
    }
    if (resultado.minutos > 0) {
      if (resultado.anos > 0 || resultado.meses > 0 || resultado.dias > 0 || resultado.horas > 0) {
        sb.push(" e ");
      }
      sb.push("<b>" + resultado.minutos + "</b> minuto" + plural(resultado.minutos, "s"));
    }
    sb.push(" sem <b>" + resultado.pareiDe + "</b>.");
    outResultadoFrase.innerHTML = sb.join("");
    salvarHash(euParei);
    Utils.DOM.visible(outResultado);
  }

  function plural(n: number, strPlural: string, strSingular?: string): string {
    if (n == 1) {
      return strSingular ? strSingular : "";
    } else {
      return strPlural;
    }
  }

  // // // // // // // // // // // // // // // // // // // // // // // // //

  function initGlobals(): void {
    frmEuParei = Utils.$("frm-eu-parei") as HTMLFormElement;
    const frmEuPareiElements = frmEuParei.elements;
    inPareiDe = frmEuPareiElements.namedItem("in-parei-de") as HTMLInputElement;
    inPareiEm = frmEuPareiElements.namedItem("in-parei-em") as HTMLInputElement;
    inPareiAs = frmEuPareiElements.namedItem("in-parei-as") as HTMLInputElement;
    lnkCompartilhar = Utils.$("lnk-compartilhar");
    lnkNovo = Utils.$("lnk-novo");
    outLinkCopiado = Utils.$("out-link-copiado");
    outResultado = Utils.$("out-resultado");
    outResultadoFrase = Utils.$("out-resultado-frase");
    inCopiador = Utils.$("in-copiador") as HTMLInputElement;
  }

  function doDisableAutoComplete(): void {
    inPareiDe.name = "";
    inPareiEm.name = "";
    inPareiAs.name = "";
  }

  function initInputs(): void {
    const agora = new Date();
    inPareiEm.value = fixNumber2(agora.getDate()) + "/" + fixMonth(agora.getMonth()) + "/" + agora.getFullYear();
    inPareiAs.value = fixNumber2(agora.getHours()) + ":" + fixNumber2(agora.getMinutes());
  }

  function initForms(): void {
    frmEuParei.addEventListener("submit", frmEuParei_Submit);
  }

  function initLinks(): void {
    lnkCompartilhar.addEventListener("click", lnkCompartilhar_Click);
    lnkNovo.addEventListener("click", lnkNovo_Click);
  }

  function doRestoring(): void {
    if (Utils.DOM.isVisible(frmEuParei)) {
      let euParei: EuPareiData | null;
      let fromHash: boolean;
      let hash = document.location.hash;
      if (hash) {
        hash = hash.substr(1);
        euParei = restaurarHash(hash);
        fromHash = true;
      } else {
        euParei = restaurarCookie();
        fromHash = false;
      }
      if (euParei) {
        inPareiDe.value = euParei.de;
        inPareiEm.value = euParei.em;
        inPareiAs.value = euParei.as;
        const submitEvent = new Event("submit") as EuPareiEvent;
        submitEvent.dontSaveCookie = true;
        submitEvent.fromHash = fromHash;
        frmEuParei.dispatchEvent(submitEvent);
      }
    }
  }

  function window_Load(): void {
    initGlobals();
    initForms();
    initInputs();
    initLinks();
    doDisableAutoComplete();
    doRestoring();
  }

  function window_HashChange(): void {
    doRestoring();
  }

  window.addEventListener("load", window_Load);
  window.addEventListener("hashchange", window_HashChange);
})();
