'use strict';
//TODO - Inform the form user regarding remaining fields to be completed and its requirements.
app.component("eeaFormValidation", {
	template: '<div id="eeavalidation" style="position:fixed;right:0;bottom:0;z-index:999;background-color:#f1f1f1;width:400px;height:300px;padding:10px;overflow-y:auto;font-size:12px;"></div>',
	bindings: {
		scp: '='
	},
	controller: ['$translate', function($translate) {
		var parent = this;
		this.$onInit = function() {
			// TESTING: Should be activated on form inputs change
			setTimeout(
				function() {parent.validate($translate);}
				, 4000);
		};
		this.validate = function($translate) {
			var content = '<ul>';				
			$("form.eeaform").each(function($b, $a){
				$(this).find('.formitem :input').each(function(index, item) {
					var itype = item.type;
					if (!itype || itype === "submit") return;
					
					item = $(item);
					var val = item.val();
					if (val) return;
					
					var name = item.attr("name");
					var aname = name.split("$");
					var arr = aname[1];
					var nme = aname[0];
					
					content += "<li>Group <b>[" + arr + "]</b><br>";
					content += "<b>[" + nme + "]</b><br>";
					content += ($translate.instant($(item).attr("def"))  || "" )+ "<br>";
					content += "<button style=\"padding:4px;min-width:auto;width:30px;max-width:30px;height:30px;\" onclick='" + name + ".focus()'>Go</button><br><br>";

				});
				console.log(content);
				$("#eeavalidation").html(content + "</ul>");
			});
		};
	}]
});