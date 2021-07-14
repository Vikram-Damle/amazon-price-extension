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
    $scope.password = "12345678";
    $scope.login = function() {
        console.log($scope.email, $scope.password);
        const creds = {
            destination: 'login',
            email : $scope.email,
            password : $scope.password
        }
        chrome.runtime.sendMessage(creds, function(response) {
            console.log(response);
            if(response.status === 'success') {
                $scope.email = "";
                $scope.password = "";
                window.location.href = "#!/home"
            }
        })
    }
})
.controller('SignupController', function($scope) {
    $scope.email = "example@example.com";
    $scope.username = "username111";
    $scope.password = "12345678";
    $scope.message = ""
    
    $scope.signup = () => {
        console.log($scope.username, $scope.email, $scope.password);
        $scope.message = "";
        const creds = {
            destination: 'signup',
            email: $scope.email,
            username: $scope.username,
            password : $scope.password
        }
        
        chrome.runtime.sendMessage(creds, function(response) {
            console.log(response);
            if(response.status === 'success') {
                $scope.email = "";
                $scope.username = "";
                $scope.password = "";
                window.location.href = "#!/home"
            } else if(response.action === 'Retry') {
                $scope.message = ('Encountered an error. Please try again later')
            } else if(response.action === 'Redirect Login') {
                $scope.message = ('This email is already registered with a user')
            } else if(response.errors) {
                $scope.message = 'Please enter valid credentials\n';
            } else {
                $scope.message = ('Please try again')
            }
        })
    }
})
.controller('HomeController', function($scope) {
    $scope.fetching = false;
    $scope.itemList = [];
    $scope.showTracked = function() {
        chrome.runtime.sendMessage({
            destination: 'Show Tracked'
        }, function(response) {
            $scope.itemList = response.itemList;
        })
    };
    
    $scope.trackItem = () => {
        chrome.runtime.sendMessage({
            destination: 'track current'
        }, (response) => {
            if(response.status === 'success') {
                $scope.message = "Success"
            } else {
                $scope.message = "Encountered error \n Please try again later"
            }
        })
    }
})
