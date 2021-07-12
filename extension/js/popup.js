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
    $scope.username = "";
    $scope.password = "";
    $scope.login = function() {
        console.log($scope.username, $scope.password);
        const creds = {
            username : $scope.username,
            password : $scope.password
        }
        chrome.runtime.sendMessage(creds)
        $scope.username = "";
        $scope.password = "";
    }
})
