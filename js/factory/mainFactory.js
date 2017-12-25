angular.module('app').factory('mainFactory',['$http', function($http){
	var service = {};
	var newBox = {};
	var boxes = [];
	var k;

	service.request = function () {
		return $http.get('https://google.com')
			.then(function(data){
				console.log(data)
			})
			.catch(function(){
				return $http.get('https://dl.dropboxusercontent.com/s/d3nwy8q7k7vvo9q/telemundo-east.json');
    		})
    		.then(function(data){
				return data.data
			})
	}


	for (var i = 0; i < localStorage.length; i++) {
		var box = localStorage.getItem(localStorage.key(i));
		boxes[i] = JSON.parse(box)
	}

	service.getBoxes = function(){
		return boxes
	}

	service.comeBack = function($scope){
		$scope.showForm = !$scope.showForm;
		$scope.showGlobalAllBox = !$scope.showGlobalAllBox;
		$scope.showCreateNewBox = !$scope.showCreateNewBox;
	}

	service.createNewBox = function($scope){
		$scope.showForm = !$scope.showForm;
		$scope.showCreateNewBox = !$scope.showCreateNewBox;
		$scope.showGlobalAllBox = !$scope.showGlobalAllBox;
	}

	service.addNewBox = function($scope, newBox){
		if (newBox.priority === 'high') {
			k = 1;
		}else if (newBox.priority === 'middle') {
			k = 2;
		}else {
			k = 3;
		}

		newBox.id = 'box' + Date.now();
		newBox = {
			name: newBox.name,
			property: newBox.property,
			dataCreate: newBox.dataCreate,
			priority: newBox.priority,
			priorityNumber: k,
			id: newBox.id,
			status: 'begin'
		};

		localStorage.setItem(newBox.id, JSON.stringify(newBox));
		boxes.push(newBox);

		$scope.showGlobalAllBox = !$scope.showGlobalAllBox;
		$scope.showForm = !$scope.showForm;
		$scope.showCreateNewBox = !$scope.showCreateNewBox;
	};

	service.removeBox = function (value) {
		boxes.splice(boxes.indexOf(value), 1)
		localStorage.removeItem(value.id)
	}

	service.changeThisBox = function(box){

		var changeBox = {
			name: box.name,
			property: box.property,
			priority: box.priority,
			priorityNumber: box.priorityNumber,
			dataCreate: box.dataCreate,
			status: box.status,
			id: box.id
		};
		return changeBox
	}

	service.saveChangeForBox = function(){

	}

	service.moveBoxUp = function(box){
		if (box.status === 'end' ) {
   		box.status = 'working'
   	}else if (box.status === 'working') {
   		box.status = 'process'
   	}else {
   		box.status = 'begin'
   	}
   	localStorage.setItem(box.id, JSON.stringify(box));
	}

	service.moveBoxDown = function(box){
      if (box.status === 'begin' ) {
   		box.status = 'process'
   	}else if (box.status === 'process') {
   		box.status = 'working'
   	}else {
   		box.status = 'end'
   	}
   	localStorage.setItem(box.id, JSON.stringify(box));
	}


	return service

}])