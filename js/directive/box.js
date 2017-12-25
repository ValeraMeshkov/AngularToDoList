angular.module('app').directive('thisBox', function(){
	return {
		template:
			'<div  dnd-elem="copy" >'+
			'<li>name: {{box.name}}</li>'+
			'<li>property: {{box.property}}</li>'+
			'<li>date: {{box.dataCreate | date}}</li>'+
			'<li>priority: {{box.priority}}</li>'+
			'<li>'+
				'<i ng-click="removeBox(box)" class="fa fa-bomb" title="delete box"></i>'+
				'<i ng-click="changeThisBox(box)" class="fa fa-pencil" title="change box"></i>'+
				'<i ng-if="!iUp" ng-click="moveBoxUp(box)" class="fa fa-hand-o-up" title="move box"></i>'+
				'<i ng-if="!iDown" ng-click="moveBoxDown(box)" class="fa fa-hand-o-down" title="move box"></i>'+
			'</li>'+
			'</div>',
		link: function(scope, Elm, Attrs, controller) {
			if (scope.box.status === 'begin') {
				scope.iUp = true;
			}else if (scope.box.status === 'end') {
				scope.iDown = true;
			}
		}
	};
});