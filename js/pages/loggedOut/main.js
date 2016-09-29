angular.module('app.controllers')

.controller('LoggedOutCtrl',
function($scope, $user, $ionicModal, $ionicPopup, $state, $ionicHistory,
         AuthenticationService) {

  // Singup Modal ============================

  $ionicModal.fromTemplateUrl('js/pages/loggedOut/signup.html', {
    scope: $scope,
    focusFirstInput: true
  }).then(function(modal) {
    $scope.signup = modal;
  });

  $scope.signupData = {};

  $scope.openSignup = function() { $scope.signup.show(); };

  $scope.closeSignup = function() { $scope.signup.hide(); };

  $scope.doSignup = function() {
    $scope.closeSignup();
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('app.home')
    console.log($state);
  };

  // Login Modal ============================

  $ionicModal.fromTemplateUrl('js/pages/loggedOut/login.html', {
    scope: $scope,
    focusFirstInput: true
  }).then(function(modal) {
    $scope.login = modal;
  });

  $scope.loginData = {};

  $scope.openLogin = function() { $scope.login.show(); };

  $scope.closeLogin = function() { $scope.login.hide(); };

  // Do login on non native devices. This includes the browser and
  // the Ionic View app
  $scope.doLocalLogin = function() {
    console.log('Running local login');

    if ($scope.loading) return;

    $scope.loading = true;
    crud('/turnkey/login').create($scope.loginData, function(e, d) {
      if (e || !d) authFailure();
      else {
        localStorage.setItem('browserAuthToken', d);
        AuthenticationService.checkStatus().then(function(user) {
          $scope.loading = false;
          $scope.closeLogin();
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('app.home')
        }, authFailure);
      }
    });

    function authFailure() {
      $scope.loading = false;
      $ionicPopup.alert({
        title: 'Error',
        template: '<div class="text-center">Invalid username or password.</div>'
      });
    }
  };

  $scope.doLogin = function() {
    var authSettings = { remember: true };

    // If in browser (no InAppBrowser) or on Ionic View (NoCloud)
    if (!_.get(window, 'cordova.InAppBrowser') || /NoCloud/.test(location.href))
      return $scope.doLocalLogin();

    if ($scope.loading) return;
    $scope.loading = true;

    Ionic.Auth.login('custom', authSettings, $scope.loginData)
      .then(authSuccess, authFailure);

    function authSuccess() {
      console.log('success', arguments);
      AuthenticationService.checkStatus().then(function(user) {
        $scope.loading = false;
        $scope.closeLogin();
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('app.home')
      }, authFailure);
    }

    function authFailure() {
      console.log('failure', arguments);
      $scope.loading = false;
      $ionicPopup.alert({
        title: 'Error',
        template: '<div class="text-center">Invalid username or password.</div>'
      });
    }
  };

})
