// Ionic template App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'SimpleRESTIonic' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('SimpleRESTIonic', ['ionic', 'backand', 'SimpleRESTIonic.controllers', 'SimpleRESTIonic.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })
    .config(function (BackandProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

        BackandProvider.setAppName('animatedoctocouscous'); // change here to your app name
        BackandProvider.setSignUpToken('9f12b8da-0882-4347-a6bf-72728634295f'); //token that enable sign up. see http://docs.backand.com/en/latest/apidocs/security/index.html#sign-up
        BackandProvider.setAnonymousToken('aa863ba0-7be9-4b73-8862-6bb69d10a113'); // token is for anonymous login. see http://docs.backand.com/en/latest/apidocs/security/index.html#anonymous-access

        $stateProvider
            // setup an abstract state for the tabs directive
            .state('main', {
                url: '/main',
                abstract: true,
                templateUrl: 'templates/main.html'
            })
            .state('main.home', {
                url: '/home',
                views: {
                    'main-home': {
                        templateUrl: 'templates/main-home.html',
                        controller: 'HomeCtrl as homeVM'
                    }
                }
            })
            .state('main.create', {
                url: '/create',
                views: {
                    'main-create': {
                        templateUrl: 'templates/main-create.html',
                        controller: 'CreateCtrl as createVM'
                    }
                }
            })
            .state('main.join', {
              url: '/join',
              views: {
                'main-join': {
                  templateUrl: 'templates/main-join.html',
                  controller: 'JoinCtrl as joinVM'
                }
              },
              resolve: {
                sessions: function(SessionService) {
                  return SessionService.all();
                }
              }
            })
          .state('choir', {
            url: '/choir/:id',
            templateUrl: 'templates/choir.html',
            controller: 'ChoirCtrl as choirVM',
            resolve: {
              session: function(SessionService, $stateParams) {
                return SessionService.fetch($stateParams.id);
              }
            }
          });

        $urlRouterProvider.otherwise('/main/home');

        //$httpProvider.interceptors.push('APIInterceptor');
    })

    //.run(function ($rootScope, $state, LoginService, Backand) {
    //
    //    function unauthorized() {
    //        console.log("user is unauthorized, sending to login");
    //        $state.go('tab.login');
    //    }
    //
    //    function signout() {
    //        LoginService.signout();
    //    }
    //
    //    $rootScope.$on('unauthorized', function () {
    //        unauthorized();
    //    });
    //
    //    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
    //        if (toState.name == 'tab.login') {
    //            signout();
    //        }
    //        else if (toState.name != 'tab.login' && Backand.getToken() === undefined) {
    //            unauthorized();
    //        }
    //    });
    //
    //})

