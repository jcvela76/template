(function() {
  'use strict';

  angular
    .module('template')
    .service('MainControllerDataService', function($firebaseObject, $firebaseArray) {
      var self = this;
      var config = {
        apiKey: "AIzaSyDYP0oGBtqW5arhea6I6G9l2Jp96ItnyfU",
        authDomain: "classproject-fa817.firebaseapp.com",
        databaseURL: "https://classproject-fa817.firebaseio.com",
        storageBucket: "classproject-fa817.appspot.com",
      };
      var myApp = firebase.initializeApp(config);
      var adminRef = myApp.database().ref('admin');
      var topicsRef = myApp.database().ref('topics');

      self.getAdmin = function(scope) {
        var firebaseObject = $firebaseObject(adminRef);
        // return firebaseObject
        firebaseObject.$bindTo(scope, 'ctrl.currentAdmin')
      };

      self.saveAdmin = function(admin) {
        admin.$save().then(function() {
          console.log('Saved the Admin Successfully');
        });
      };

      self.getTopics = function() {
        return $firebaseArray(topicsRef);
      };
    })


    .controller('MainController', function ($scope, MainControllerDataService) {
      var self = this;
      self.greeting = "Hello World";
      
      MainControllerDataService.getAdmin($scope);
      self.currentTopics = MainControllerDataService.getTopics();

      self.saveAdmin = function(admin) {
        MainControllerDataService.saveAdmin(admin);
      };

      self.addTopic = function(topic) {
        self.currentTopics.$add(topic);
      };
    });

})();
