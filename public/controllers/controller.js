var myApp=angular.module("myApp", []);
// clientside
//interact with API on the server
myApp.controller('AppCtrl',[ '$scope','$http', function($scope,$http){
	console.log("Hello World from controller");

	var refresh=function(){
		$http.get('/contactlist').success(function(response){
			$scope.contactlist=response;
			$scope.contact="";
		});
	};
	refresh();

	var skills=function(){
		$http.get('/skills').success(function(response){
			$scope.skills=response;
			$scope.skill="";
		});
	};
	skills();

	var edus=function(){
		$http.get('/edu').success(function(response){
			$scope.edus=response;
			$scope.edu="";
		});
	};
	edus();
	var projects=function(){
		$http.get('/project').success(function(response){
			$scope.projects=response;
			$scope.project="";
		});
	};
	projects();

	$scope.addContact=function(){
		$http.post('/contactlist', $scope.contact)
		.success(function(response){
			refresh();
		});
	};
// asks the server to delete from the database
// makes http request to the path
	$scope.remove=function(id){
		$http.delete('/contactlist/'+id).success(function(response){
			refresh();
		});
	};

	$scope.edit=function(id){
		$http.get('/contactlist/' + id).success(function(response){
			$scope.contact=response;
		});
	};

	$scope.update=function(){
		$http.put('/contactlist/'+$scope.contact._id, $scope.contact).success(function(response){
			refresh();
		})
	};

	$scope.deselect=function(){
		$scope.contact="";
	}
	// handle post at this path

	//good for single page applications

	// person1={
	// 	name: "Brian",
	// 	email: "thisemail",
	// 	number: "123"
	// };	

	// person2={
	// 	name: "Brian",
	// 	email: "thisemail",
	// 	number: "123"
	// };	

	// person3={
	// 	name: "Brian",
	// 	email: "thisemail",
	// 	number: "123"
	// };

	// var contactlist=[person1,person2,person3];

	// $scope.contactlist=contactlist;

}]);