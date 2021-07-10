const amazonextension = angular.module('amazonextension', ['ui.router'])
.config([
    '$stateProvider',
    '$urlRouterProvider',
    ($stateProvider, $urlRouterProvider) => {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '../html/home.html',
            // controller: 'MainCtrl'
        })

        $urlRouterProvider.otherwise('home')
    }
])
    