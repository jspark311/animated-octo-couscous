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
  .controller('ConductorCtrl', function ($rootScope, session, SessionService) {
    var vm = this;
    vm.session = session;

    vm.colors = [
      { id: 1, name:'Red' },
      { id: 2, name:'Blue' },
      { id: 3, name:'Green' }
    ];

    vm.update = function() {
      session.data.color = vm.color;
      SessionService.update(session.data.id, session.data)
        .then(function(res) {
          //console.log(res)
        });
    };

  })
  .controller('ChoirCtrl', function ($rootScope, session, $location, Backand) {
    var vm = this;

    vm.goHome = function(){
      $location.path('/main/home');
    };
    Backand.on('color_updated', function(data){
        if (data[0].Value === session.data.id) {
          vm.className = data[3].Value.toLowerCase();
        }
    });
    vm.session = session;
  });
