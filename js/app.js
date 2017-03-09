"use strict";

(function(){
  angular
    .module("wdinstagram", [
      "ui.router"
    ])
    .config([
      "$stateProvider",
      RouterFunction
    ])
    .controller("PostsIndexController", [
      PostsIndexControllerFucntion
    ])
    .controller("PostsShowController", [
      "$stateParams",
      PostsShowControllerFunction
    ])

    function RouterFunction($stateProvider){
      $stateProvider
        .state("postsIndex", {
          url: "/posts",
          templateUrl: "js/ng-views/index.html",
          controller: "PostsIndexController",
          controllerAs: "vm"
        })
        .state("postShow", {
          url: "posts/:id",
          templateUrl: "js/ng-views/show.html",
          controller: "PostsShowController",
          controllerAs: "vm"
        })
    }

    function PostsIndexControllerFucntion(){
      this.posts = seedData;
    }

    PostsShowControllerFunction.$inject = ["$stateParams"]
    function PostsShowControllerFunction($stateParams){
      this.post = seedData[$stateParams.id]
    }
})();
