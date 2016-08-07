(function() {
  'use strict';

  angular
    .module('template')

    .service('MainControllerDataService',function($resource){
      var self = this;

      var myResourceObject = $resource('assets/json/people.json', {
          limit:100
        }, {

            getThelistOfPeople:{
              method: 'GET',
              isArray: true,
              headers:{
                accept: 'application/json',
                userToken: 'abcdefg'
              }
            },
            saveListOfPeople:{
              method: 'POST',
              isArray: false
            }

        });//declareted myResourceObject

      var myFriendsResourse = $resource('assets/json/:userId/profile.json')

        self.getPeople = function(){
          return myResourceObject.getThelistOfPeople({
            page:1,
            search: 'name',
            limit: 5
          })
          .$promise
        };// get people

        self.getFriends = function(friend){
          return myFriendsResourse.query({
            userId: friend._id
          }).$promise
        };// get friends


    })

    .controller('MainController', function (MainControllerDataService) 
      {
        var self = this;
        self.greeting = "Hello World";

        MainControllerDataService.getPeople()
        .then(function onSuccess(response){
          console.log(response);
          self.people = response;
        });// put the people en index

        self.showFriend = function(person){
          MainControllerDataService.getFriends(person)
          .then(function(response){
            person.friends = response;
          })
        }

        

        
      });


  
})();
