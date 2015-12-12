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
      { id: 1, name: 'Red' },
      { id: 2, name: 'White' },
      { id: 3, name: 'Green' }
    ];

    vm.songs = [
      { url: 'http://www.freexmasmp3.com/files/jingle-bells-country.mp3', title: 'Jingle Bells Country' },
      { url: 'http://www.freexmasmp3.com/files/silent-night-disco.mp3', title: 'Silent Night Disco' }
    ];

    vm.update = function() {
      session.data.color = vm.color;
      SessionService.update(session.data.id, session.data)
        .then(function(res) {
          //console.log(res)
        });
    };

    vm.play = function() {
      vm.songs.forEach(function(song) {
        if(song.url === vm.song) {
          song.isPlaying = true;
          updateSession(song);
        }
      });
    };

    vm.pause = function() {
      vm.songs.forEach(function(song) {
        if(song.url === vm.song) {
          song.isPlaying = false;
          updateSession(song);
        }
      });
    };

    function updateSession(song) {
      session.data.url = song.url;
      session.data.title = song.title;
      session.data.isPlaying = song.isPlaying;
      SessionService.update(session.data.id, session.data)
        .then(function(res) {
          //console.log(res)
        });
    }

  })
  .controller('ChoirCtrl', function ($rootScope, session, $location, Backand) {
    var vm = this;
    var context = new AudioContext();

    vm.goHome = function(){
      $location.path('/main/home');
    };
    Backand.on('color_updated', function(data){
      console.log(data)
        if (data[0].Value === session.data.id) {
          vm.className = data[3].Value.toLowerCase();
        }

    });
    vm.session = session;

    vm.url = 'http://www.freexmasmp3.com/files/silent-night-disco.mp3';

    //load('http://www.freexmasmp3.com/files/silent-night-disco.mp3');
    //play(vm.buffer);

    function load(url) {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';

      request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
          vm.buffer = buffer;
        }, onError);
      }
      request.send();
    }

    function play(buffer) {
      var source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(0);
    }
  });
