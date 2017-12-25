/*
1 set AngularJS attribute ng-app on <body> element.
2 add <script src=" ...../dndDirectives.js"></script> at the end of your html document before closing </body>
..... - the path to the dndDirectives.js file
3.1 set attribute dnd-elem="copy" for element movement in case when you move element copy
3.2 set attribute dnd-elem="move"> for element movement in case when you move origin element

4 set attribute dnd-elem="targetArea"> for element where you create or move element
4.1 in case if attribute dnd-elem="targetArea" is not set, area for movement will be all <body> </body>
*/

(function() {
	var MODULE_NAME = document.querySelector("body").getAttribute("ng-app");
	angular.module(MODULE_NAME).directive('dndElem',['$rootScope', function($rootScope) {
		return {
			link: function(scope, element, attr) {
				var dndMouseDown = false;
				var status;

				var transferArea = angular.element(document.querySelector("body"));
				var transferElementAvatar = {
					elementWidth: null,
					elementHeight: null,
					startPosX: null,
					startPosY: null,
					currentPosX: null,
					currentPosY: null
				};
				if (attr.dndElem == "targetArea") {
							$rootScope.targetArea = angular.element(element)[0];
							$rootScope.isTargetArea = true;
						} else {
							$rootScope.isTargetArea = false;
						}

				if (attr.dndElem == "copy" || attr.dndElem == "move") {
					angular.element(element).css("cursor", "move");
				}

				function mouseDown(e) {
					status = Array.from(e.target.attributes)
						.find( item => item.value === "copy" || "move").value;
					(status === "copy" || status === "move") ? dndStart(e) : dndStop();
					scope.$apply();
				}

				function dndStart(e) {
					dndMouseDown = true;
					transferElementAvatar.elementWidth = e.target.clientWidth;
					transferElementAvatar.elementHeight = e.target.clientHeight;
					transferElementAvatar.startPosX = e.clientX - transferElementAvatar.elementWidth / 2;
					transferElementAvatar.startPosY = e.clientY - transferElementAvatar.elementHeight / 2;
					transferElementAvatar.currentPosX = transferElementAvatar.startPosX;
					transferElementAvatar.currentPosY = transferElementAvatar.startPosY;

					if (status === "copy") {
						$rootScope.transferElement = angular.element(element).clone();
					} else if (status === "move") {
						$rootScope.backupCopy = angular.element(element);
						$rootScope.transferElement = $rootScope.backupCopy.clone();
						$rootScope.backupCopy.css("opacity", "0");
					} else {
						dndStop();
					}

					addAvatarClass($rootScope.transferElement);
					transferArea.append($rootScope.transferElement);
					document.addEventListener('mousemove', dndMouseMove);
					document.addEventListener('mouseup', dndMouseUp);
				}

				function addAvatarClass(element) {
					element.css("position", "absolute");
					element.css("opacity", "0.5");
					element.css("box-shadow", "0px 0px 5px");
					element.css("left", transferElementAvatar.startPosX + "px");
					element.css("top", transferElementAvatar.startPosY + "px");

					return element;
				}

				function dndMouseMove(e) {
					transferElementAvatar.currentPosX = e.clientX - transferElementAvatar.elementWidth / 2;
					transferElementAvatar.currentPosY = e.clientY - transferElementAvatar.elementHeight / 2;
					$rootScope.transferElement.css("left", transferElementAvatar.currentPosX + "px");
					$rootScope.transferElement.css("top", transferElementAvatar.currentPosY + "px");
					scope.$apply();
				}

				function dndMouseUp() {
					removeAvatarClass($rootScope.transferElement);
					dndEnd();
					dndStop ();
					scope.$apply();
				}

				function removeAvatarClass(element) {
					element.css("opacity", "1");
					element.css("box-shadow", "0 0 0");
					element.css("cursor", "default");
					element.css("left", transferElementAvatar.currentPosX + "px");
					element.css("top", transferElementAvatar.currentPosY + "px");
					element.removeAttr("dnd-elem");

					return element;
				}

				function dndEnd() {
					var tmpElem;
					if (!$rootScope.isTargetArea) {
						transferArea.append($rootScope.transferElement[0]);
					} else if ($rootScope.isTargetArea && collision($rootScope.targetArea, $rootScope.transferElement[0])) {
						$rootScope.transferElement.css("position", "static");
						$rootScope.targetArea.append($rootScope.transferElement[0]);
						if (status === "move") {
							$rootScope.backupCopy.remove();
						}
					} else {
							$rootScope.transferElement[0].remove();
						 if (status === "move") {
							$rootScope.backupCopy.css("opacity", "1");
						}

					}
					transferElementAvatar = {
							elementWidth: null,
							elementHeight: null,
							startPosX: null,
							startPosY: null,
							currentPosX: null,
							currentPosY: null
						};
				}

				function collision(obj1, obj2) {
					var x1 = obj1.offsetLeft + obj2.offsetWidth; //left
					var x2 = x1 + obj1.offsetWidth - (obj2.offsetWidth * 2); //right
					var y1 = obj1.offsetTop + obj2.offsetHeight; //top
					var y2 = y1 + obj1.offsetHeight - (obj2.offsetHeight * 2); // down

					var a1 = obj2.offsetLeft;
					var a2 = a1 + obj2.offsetWidth;
					var b1 = obj2.offsetTop;
					var b2 = b1 + obj2.offsetHeight;

					if (x1 > a2 == true || x2 < a1 == true ||
						y1 > b2 == true || y2 < b1 == true) {
							return false;
					} else {
							return true;
					}
				}

				function dndStop() {
					console.log('DND stopped');
					dndMouseDown = false;
					document.removeEventListener('mousemove', dndMouseMove);
					document.removeEventListener('mouseup', dndMouseUp);
					return;
				}

				element[0].addEventListener('mousedown', mouseDown);
			},
			restrict: 'A'
		};
	}]);
})();