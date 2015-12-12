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
      SessionService.create(object)
        .then(function (data) {
          var sessionId = data.data.__metadata.id;
          redirect(sessionId);
        });
    }
    function redirect(id) {
      $location.path('/conductor/' + id);
    }
    vm.cancelCreate = function() {
      $location.path('/main/home');
    };
  })
  .controller('JoinCtrl', function ($rootScope, sessions) {
    var vm = this;
    vm.sessions = sessions.data.data;
  })
  .controller('ConductorCtrl', function ($rootScope, session) {
    var vm = this;
    vm.session = session;
  })
  .controller('ChoirCtrl', function ($rootScope, session) {
    var vm = this;
    vm.session = session;
  });
