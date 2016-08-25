// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(false);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    resolve: { $user: resolveUser },
    templateUrl: 'shells/menu.html',
    controller: 'AppCtrl',
  })

  .state('app.loggedOut', {
    url: '/loggedOut',
    views: {
      'menuContent': {
        templateUrl: 'js/pages/loggedOut/template.html',
        controller: 'LoggedOutCtrl'
      }
    }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'js/pages/home/template.html',
        controller: 'HomeCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

  function resolveUser(AuthenticationService) {
    return AuthenticationService.checkStatus().then(function(user) {
      return user;
    }, function() { return null; });
  }
})

.controller('AppCtrl', function($scope, $user, appConfig, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  if ((_.get($state, 'current.name') != 'app.loggedOut') && !$user) {
    $state.go('app.loggedOut');
  }

  $scope.logout = function() {
    Ionic.Auth.logout();
    localStorage.removeItem('browserAuthToken');
    appConfig.browserAuthToken = null;
    crud.configure({ defaultQuery: { turnkeyAuth: '' } });
    location.reload();
  };

});

angular.module('starter.controllers', [])
