//var Vesrion="0.1";

var app = angular.module('WebFormApp', ['pascalprecht.translate']);
app.controller('WebFormAppCtrl', WebFormAppCtrl);

/**
* WebFormAppCtrl: Main controller
*/
function WebFormAppCtrl($scope, $http, $timeout, $window,  $translate, $compile) {

	$scope.field = {}; 
	$scope.multipleIndex = 1;
	$scope.ValidationDisabled = false;
	$scope.selectedLanguage = "en";
	$scope.groups =  groups;

	$scope.submit = function(frm) {
		$scope.field[frm.$name].AEAPrice = 11;
		console.log(frm);
		return false;
	};

	$scope.addRow = function(frm, group) {
		$scope.multipleIndex = $scope.groups[frm][group].length;
		var id = ++$scope.multipleIndex;
		$scope.groups[frm][group].push(id);
		$timeout ( () => {
			$(`#group-area-${$scope.multipleIndex}-${group}`).prepend( $compile(`<div class="row"><button type="button"  title="{{'deleterow' | translate}}"class="deleterowbutton" ng-click="deleteRow('${frm}', '${group}', ${id})"></button></div>`)($scope));
		}, 10);
	};

	$scope.deleteRow = function(frm, group, id) {
		$scope.groups[frm][group][$scope.groups[frm][group].indexOf(id)] =  -1;
	};

}

$(document).on("scroll", function() {
	if ($(document).scrollTop() > 40) {
		$("#head").removeClass("tplarge").addClass("tpsmall");
	} else {
		$("#head").removeClass("tpsmall").addClass("tplarge");
	}
});