"use strict";

  angular
    .module("wdinstagram", [
      "ui.router",
      "ngResource"
    ])
    .config([
      "$stateProvider",
      RouterFunction
    ])
    .factory("PostFactory", [
      "$resource",
      PostFactoryFunction
    ])
    .controller("PostsIndexController", [
      "PostFactory",
      PostsIndexControllerFucntion
    ])
    .controller("PostsShowController", [
      "PostFactory",
      "$stateParams",
      PostsShowControllerFunction
    ])
    .controller("PostsEditController", [
      "PostFactory",
      "$stateParams",
      "$state",
      PostsEditControllerFunction
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
        .state("postEdit", {
          url: "/grams/:id/edit",
          templateUrl: "js/ng-views/edit.html",
          controller: "PostsEditController",
          controllerAs: "vm"
        })
    }

    function PostFactoryFunction($resource){
      return  $resource("http://localhost:3000/entries/:id", {}, {
        update: {method: "PUT"}
      })
    }

    function PostsIndexControllerFucntion(PostFactory, $state){
      this.posts = PostFactory.query();

      this.post = new PostFactory();
      this.create = function(){
        this.post.$save(function(post) {
          $state.go("postShow", {id: post.id})
        })
      }
    }

    function PostsShowControllerFunction(PostFactory, $stateParams){
      this.post = PostFactory.get({id: $stateParams.id});
    }

    function PostsEditControllerFunction(PostFactory, $stateParams, $state) {
      this.post = PostFactory.get({id: $stateParams.id})
      this.update = function(){
        this.post.$update({id: $stateParams.id}, function(gram) {
          $state.go("postShow", {id: post.id})
        })
      }
      this.destroy = function(){
        this.post.$delete({id: $stateParams.id}, function() {
          $state.go("postsIndex")
        })
      }
    }
