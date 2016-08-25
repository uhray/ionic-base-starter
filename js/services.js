

angular.module('starter')
.factory('AuthenticationService', function($q, appConfig, $ionicPlatform) {
  var self = {};

  console.log('appConfig', appConfig);

  self.currentUser = null;

  crud.configure({
    base: appConfig.apiURL,
    protocol: appConfig.apiProtocol
  });

  self.checkStatus = function() {
    var deferred = $q.defer();
    $ionicPlatform.ready(function() {
      var user = Ionic.User.current(),
          authToken = user.get('authToken');

      // already know it
      if (self.currentUser) {
        return setTimeout(function() {
          deferred.resolve(self.currentUser);
        });
      }

      // for local testing on browser or Ionic View
      if (!_.get(window, 'cordova.InAppBrowser') ||
          /NoCloud/.test(location.href)) {
        authToken = authToken || localStorage.getItem('browserAuthToken') ||
                    appConfig.browserAuthToken;
      } else if (!user.isAuthenticated()) authToken = null;

      // get user info
      if (!authToken) setTimeout(function() { deferred.reject(); });
      else {
        crud.configure({
          defaultQuery: { turnkeyAuth: authToken }
        });

        crud('/api/users/me').read(function(e, user) {
          if (e || !user) deferred.reject();
          else deferred.resolve(self.currentUser = user);
        });
      }
    });

    return deferred.promise;
  };

  return self;
});
