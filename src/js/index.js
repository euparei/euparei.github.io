(function() {

	var frmEuParei;
	var inCopiador, inPareiDe, inPareiEm, inPareiAs;
	var lnkCompartilhar, lnkNovo;
	var outResultado, outResultadoFrase, outLinkCopiado;

// // // // // // // // // // // // // // // // // // // // // // // // //
	function fixPareiDe(str) { return str == '' ? '???' : str; }
	function fixNumber2(n) { return n < 10 ? '0' + n : n; }
	function fixMonth(n) { return fixNumber2(n + 1); }
// // // // // // // // // // // // // // // // // // // // // // // // //

	function frmEuParei_Submit(evento) {
		evento.preventDefault();
		var euParei = euPareiJson();
		exibirResultado(euParei, evento.fromHash);
		if (evento.dontSaveCookie != true) {
			salvarCookie(euParei);
		}
		setTimeout(
			function() { lnkCompartilhar.focus(); }, 150
		);
	}

	function lnkNovo_Click(evento) {
		apagarCookie();
	}

	function lnkCompartilhar_Click(evento) {
		evento.preventDefault();
		salvarHash(euPareiJson());
		inCopiador.value = document.location.href;
		inCopiador.select();
		document.execCommand('copy');
		setTimeout(
			function() { lnkCompartilhar.focus(); }, 100
		);
		Utils.DOM.displayed(outLinkCopiado);
		setTimeout(
			function() { Utils.DOM.undisplayed(outLinkCopiado); }, 3000
		);
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	function euPareiJson() {
		var euParei = {
			de: inPareiDe.value,
			em: inPareiEm.value, 
			as: inPareiAs.value
		};
		return euParei;
	}

	function salvarCookie(euParei) {
		Utils.COOKIES.set('ep', btoa(JSON.stringify(euParei)), 36525);
	}

	function salvarHash(euParei) {
		document.location.hash = btoa(JSON.stringify(euParei));
	}

	function apagarCookie() {
		Utils.COOKIES.del('ep');
	}

	function restaurarCookie() {
		var cookie = Utils.COOKIES.get('ep');
		return cookie ? restaurarHash(cookie) : null;
	}

	function restaurarHash(hash) {
		return JSON.parse(atob(hash));
	}

	function exibirResultado(euParei, fromHash) {
		var partesEm = euParei.em.split('/');
		var dia = partesEm[0];
		var mes = partesEm[1];
		var ano = partesEm[2];
		var em = new Date(ano, mes - 1, dia);
		var partesAs = euParei.as.split(':');
		var as = {
			horas: partesAs[0],
			minutos: partesAs[1]
		};
		var agora = new Date();
		var resultado = {
			pareiDe: fixPareiDe(euParei.de),
			anos: Utils.DATE.years(agora, em),
			meses: Utils.DATE.months(agora, em),
			dias: Utils.DATE.days(agora, em),
			horas: Utils.DATE.hours(agora, as.horas),
			minutos: Utils.DATE.minutes(agora, as.minutos)
		};
		var sb = [];
		if (fromHash) {
			sb.push('Quem lhe mandou este link');
		} else {
			sb.push('Voc&ecirc;');
		}
		sb.push(' est&aacute; h&aacute; ');
		if (resultado.anos > 0) {
			sb.push('<b>' + resultado.anos + '</b> ano' + plural(resultado.anos, 's'));
		}
		if (resultado.meses > 0) {
			if (resultado.anos > 0) {
				if (resultado.dias > 0 || resultado.horas > 0 || resultado.minutos > 0) {
					sb.push(', ');
				} else {
					sb.push(' e ');					
				}
			}
			sb.push('<b>' + resultado.meses + '</b> m' + plural(resultado.meses, 'eses', '&ecirc;s'));
		}
		if (resultado.dias > 0 || (resultado.anos <= 0 && resultado.meses <= 0 && resultado.horas <= 0 && resultado.minutos <= 0)) {
			if (resultado.anos > 0 || resultado.meses > 0) {
				if (resultado.horas > 0 || resultado.minutos > 0) {
					sb.push(', ');
				} else {
					sb.push(' e ');					
				}
			}
			sb.push('<b>' + resultado.dias + '</b> dia' + plural(resultado.dias, 's'));
		}
		if (resultado.horas > 0) {
			if (resultado.anos > 0 || resultado.meses > 0 || resultado.dias > 0) {
				if (resultado.minutos > 0) {
					sb.push(', ');
				} else {
					sb.push(' e ');					
				}
			}
			sb.push('<b>' + resultado.horas + '</b> hora' + plural(resultado.horas, 's'));
		}
		if (resultado.minutos > 0) {
			if (resultado.anos > 0 || resultado.meses > 0 || resultado.dias > 0 || resultado.horas > 0) {
				sb.push(' e ');					
			}
			sb.push('<b>' + resultado.minutos + '</b> minuto' + plural(resultado.minutos, 's'));
		}
		sb.push(' sem <b>' + resultado.pareiDe + '</b>.');
		outResultadoFrase.innerHTML = sb.join('');
		salvarHash(euParei);
		Utils.DOM.visible(outResultado);
	}

	function plural(n, strPlural, strSingular) {
		if (n == 1) {
			return strSingular ? strSingular : '';
		} else {
			return strPlural;
		}
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	function initGlobals() {
		frmEuParei = Utils.$('frm-eu-parei');
		var frmEuPareiElements = frmEuParei.elements;
		inPareiDe = frmEuPareiElements['in-parei-de'];
		inPareiEm = frmEuPareiElements['in-parei-em'];
		inPareiAs = frmEuPareiElements['in-parei-as'];
		lnkCompartilhar = Utils.$('lnk-compartilhar');
		lnkNovo = Utils.$('lnk-novo');
		outLinkCopiado = Utils.$('out-link-copiado');
		outResultado = Utils.$('out-resultado');
		outResultadoFrase = Utils.$('out-resultado-frase');
		inCopiador = Utils.$('in-copiador');
	}

	function doDisableAutoComplete() {
		inPareiDe.name = '';
		inPareiEm.name = '';
		inPareiAs.name = '';
	}

	function initInputs() {
		var agora = new Date();
		inPareiEm.value = fixNumber2(agora.getDate()) + '/' + fixMonth(agora.getMonth()) + '/' + agora.getFullYear();
		inPareiAs.value = fixNumber2(agora.getHours()) + ':' + fixNumber2(agora.getMinutes());
	}

	function initForms() {
		frmEuParei.addEventListener('submit', frmEuParei_Submit);
	}

	function initLinks() {
		lnkCompartilhar.addEventListener('click', lnkCompartilhar_Click);
		lnkNovo.addEventListener('click', lnkNovo_Click);
	}

	function doRestoring(evento) {
		if (Utils.DOM.isVisible(frmEuParei)) {
			var euParei, fromHash;
			var hash = document.location.hash;
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
				var evento = new Event('submit');
				evento.dontSaveCookie = true;
				evento.fromHash = fromHash;
				frmEuParei.dispatchEvent(evento);
			}
		}
	}

	function window_Load() {
		initGlobals();
		initForms();
		initInputs();
		initLinks();
		doDisableAutoComplete();
		doRestoring();
	}

	function window_HashChange() {
		doRestoring();
	}

	window.addEventListener('load', window_Load);
	window.addEventListener('hashchange', window_HashChange);

})();