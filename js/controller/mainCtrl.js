angular.module('app').controller('mainCtrl',['$scope', 'mainFactory', function($scope, mainFactory){

	$scope.thisBox;
	console.log(mainFactory)

   $scope.blabla = function(){
      mainFactory.request().then(function(data){
         console.log(data)
      });


   }

	$scope.createNewBox = function(){
		mainFactory.createNewBox($scope);
	}

	$scope.comeBack = function () {
		mainFactory.comeBack($scope);
	}

	$scope.addNewBox = function(newBox){
		mainFactory.addNewBox($scope, newBox);
		newBox = {};
	}

	this.getBoxes = function () {
       return mainFactory.getBoxes();
   }

   $scope.removeBox = function(value){
   	mainFactory.removeBox(value);
   }

   $scope.changeThisBox = function(box){
   	$scope.thisBox = box;


		$scope.changeBoxy = mainFactory.changeThisBox(box);

		$scope.showAllBlock = !$scope.showAllBlock;
		$scope.showChangeBox = !$scope.showChangeBox;
   	$scope.showCreateNewBox = !$scope.showCreateNewBox;
   }

   $scope.saveChangeForBox = function(){
   	$scope.num;
   	if ($scope.changeBoxy.priority === 'high') {
   		$scope.num = 1;
   	}else if ($scope.changeBoxy.priority === 'middle') {
   		$scope.num = 2;
   	}else{
   		$scope.num = 3;
   	};

   	$scope.thisBox.name = $scope.changeBoxy.name;
   	$scope.thisBox.property = $scope.changeBoxy.property;
   	$scope.thisBox.priority = $scope.changeBoxy.priority;
   	$scope.thisBox.priorityNumber = $scope.num;
   	$scope.thisBox.status = $scope.changeBoxy.status;
   	$scope.thisBox.dataCreate = $scope.changeBoxy.dataCreate;

   	localStorage.setItem($scope.thisBox.id, JSON.stringify($scope.thisBox))

   	$scope.showAllBlock = !$scope.showAllBlock;
   	$scope.showChangeBox = !$scope.showChangeBox;
   	$scope.showCreateNewBox = !$scope.showCreateNewBox;
   	$scope.changeBoxy = {};
   }

   $scope.moveBoxDown = function(box){
   	mainFactory.moveBoxDown(box);
   }

   $scope.moveBoxUp = function(box){
      mainFactory.moveBoxUp(box);
   }
}])