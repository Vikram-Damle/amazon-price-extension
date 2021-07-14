const amazonextension = angular.module('amazonextension', ['ui.router'])
.config([
    '$stateProvider',
    '$urlRouterProvider',
    ($stateProvider, $urlRouterProvider) => {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '../html/home.html',
            // controller: 'MainCtrl'
        }).state('login', {
            url: '/login',
            templateUrl: '../html/login.html'
        }).state('signup', {
            url: '/signup',
            templateUrl: '../html/signup.html'
        })

        $urlRouterProvider.otherwise('login')
    }
])
.controller('LoginController', function($scope) {
    $scope.email = "";
    $scope.password = "";
    $scope.email = "example@example.com";
    $scope.username = "username111";
    $scope.password = "12345678";
    $scope.login = function() {
        console.log($scope.email, $scope.password);
        const creds = {
            destination: 'login',
            email : $scope.email,
            password : $scope.password
        }
        chrome.runtime.sendMessage(creds)
        $scope.email = "";
        $scope.password = "";
    }
})
.controller('SignupController', function($scope) {
    $scope.email = "example@example.com";
    $scope.username = "username111";
    $scope.password = "12345678";
    
    $scope.signup = () => {
        console.log($scope.username, $scope.email, $scope.password);
        const creds = {
            destination: 'signup',
            email: $scope.email,
            username: $scope.username,
            password : $scope.password
        }
        
        chrome.runtime.sendMessage(creds)
        $scope.email = "";
        $scope.username = "";
        $scope.password = "";
    }
})
