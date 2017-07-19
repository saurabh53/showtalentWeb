var app = angular.module("myApp", ["ngRoute",'ngCookies']);
app.config(['$routeProvider', '$locationProvider',function($routeProvider,$locationProvider) {
    $routeProvider
    .when("/", {
       templateUrl: "../HtmlPages/Main.html",
      controller: "loginController",
    })
    .when("/home", {
      templateUrl: "../Users/saurabharora/Desktop/talent_website/HtmlPages/home.html",
      controller: "loginController"
    })
    .when("/tomato", {
        template : "<h1>Tomato</h1><p>Tomatoes contain around 95% water.</p>"
    });
    $locationProvider.html5Mode(true);

}]);


app.controller("loginController",function($scope,$http,$location,$cookies)
{
     var data = 'username='+$scope.userName+'&password='+$scope.password;

	$scope.httpcall = function()
	{
	$http({
    method: 'POST',
    url: 'http://127.0.0.1:8000/login/',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: 'username='+$scope.userName+'&password='+$scope.password
}).then(function(response) {
	
	if (response['status'] == 200)
	{
	
     $cookies.put("token", response['data'].token); 
     window.location.href = '/Users/saurabharora/Desktop/talent_website/HtmlPages/home.html';
	}

});

}
});


app.controller("listController" , function($scope,$http,$cookies)
{
    $http({
    	method: 'GET',
    	url: 'http://127.0.0.1:8000/posts/',
    	headers:{'Content-Type': 'application/x-www-form-urlencoded', 'Authorization' : 'Token' + " " + $cookies.get("token")},
    }).then(function(response)
    {
    	if (response['status'] == 200)
    	{
    	$scope.list = response["data"];
    }

    });
    $scope.clicked = function(){
       window.location.href = '/Users/saurabharora/Desktop/talent_website/HtmlPages/profile.html';
 }

});


app.controller("profileController" , function($scope,$http,$cookies)

{
	console.log('Authorization: Token' + " " + $cookies.get("token"));
   $http({
    	method: 'GET',
    	url: 'http://127.0.0.1:8000/profile/1/',
    	headers:{'Content-Type': 'application/x-www-form-urlencoded', 'Authorization' : 'Token' + " " + $cookies.get("token")},
    }).then(function(response)
    {
    	if (response['status'] == 200)
    	{
    		console.log(response["data"]);
    	$scope.list = response["data"];
    }

    });
});

app.controller("postController", function($scope,$http,$cookies)
{

  $scope.httpPost = function()
  {
  	var payload = new FormData();
  	payload.append("title",$scope.title);
  	payload.append("description",$scope.title);
  	payload.append("title",$scope.title);
  	payload.append("title",$scope.title);
  	$http(
  	{
  		method: 'POST',
  		url: 'http://127.0.0.1:8000/posts/',
    	headers:{'Content-Type': 'multipart/form-data; boundary=----------------------------4ebf00fbcf09', 'Authorization' : 'Token' + " " + $cookies.get("token")},
    	data: 'title='+$scope.title+'&description='+$scope.description+'&category='+$scope.category+'&mediaFile='+$scope.mediafile
  	}).then(function(response) {
	
	if (response['status'] == 201)
	{
	
     console.log(response["data"]);
	}

});
}
});


