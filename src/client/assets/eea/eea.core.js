'use strict';

/**
/ EEA Core
*/
var eea = {
	settings : {
		service_path : "./assets/services/",
		service_ext : ".min.js",
		component_path : "./assets/components/",
		component_ext : ".min.js",
		css_path : "./assets/css/",
		css_ext : ".min.css"
	},	
	Services : {
		get : function(script) {
			eea.Loader.getJS(script, eea.settings.service_path, eea.settings.service_ext, eea.settings.service_type);
		},
		getAll : function(scripts) {
			eea.Loader.getAllJS(scripts, eea.settings.service_path, eea.settings.service_ext, eea.settings.service_type);
		},
	},
	Components : {
		get : function(script) {
			eea.Loader.getJS(script, eea.settings.component_path, eea.settings.component_ext, eea.settings.component_type);
		},
		getAll : function(scripts) {
			eea.Loader.getAllJS(scripts, eea.settings.component_path, eea.settings.component_ext, eea.settings.component_type);
		},
	},
	CSS : {
		get : function(css, freeurl) {
			eea.Loader.getCSS(css, eea.settings.css_path, eea.settings.css_ext, eea.settings.css_type);
		},
		getAll : function(csss, freeurl) {
			eea.Loader.getAllCSS(csss, eea.settings.css_path, eea.settings.css_ext, eea.settings.css_type);
		},
	},
	Loader : {
		getJS : function(script, path, ext, type, freeurl) {
			var path  = path || "";
			var ext  = ext || "";
			var type  = type || "";

			var oXmlHttp = new XMLHttpRequest();
			oXmlHttp.onreadystatechange = function() {
				if (oXmlHttp.readyState == 4) {
					if (oXmlHttp.status == 200 || oXmlHttp.status == 304)
						eea.Loader.includeJS(script, oXmlHttp.responseText, type);
				}
			}
			
			oXmlHttp.open('GET', path+ script + ext, false);
			oXmlHttp.send(null);
		},
		getAllJS : function(scripts, path, ext, type) {
			var path  = path || "";
			var ext  = ext || "";
			var type  = type || "";
			scripts.forEach(function(script) {
				eea.Loader.getJS(script, path, ext, type);
			})
		},
		includeJS : function (fileUrl, source, type) {
			var script = document.createElement("script");
			script.language = "javascript";
			script.type = "text/javascript";
			script.defer = true;
			script.text = source;
			document.getElementsByTagName('HEAD').item(0).appendChild(script);
		}
	}
}