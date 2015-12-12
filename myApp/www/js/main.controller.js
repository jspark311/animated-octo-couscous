/**
 * Created by vageeshb on 12/12/15.
 */
'use strict';
angular.module('SimpleRESTIonic.controllers', [])

  .controller('HomeCtrl', function ($rootScope) {
  })
  .controller('CreateCtrl', function (SessionService, $rootScope, $location) {
    var vm = this;

    vm.create = function (object) {
      console.log('create');
      SessionService.create(object)
        .then(function () {
          listSessions();
        });
    }
    function listSessions(){
      $location.path('/main/join');
    }
    vm.cancelCreate = function() {
      $location.path('/main/home');
    };
  })
  .controller('JoinCtrl', function ($rootScope, sessions) {
    var vm = this;
    console.log(sessions);
    vm.sessions = sessions.data.data;
  })
  .controller('ChoirCtrl', function ($rootScope, session) {
    var vm = this;

    console.log(session)
  });
