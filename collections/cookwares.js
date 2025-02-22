
define([
    'jquery',
    'jquery-ui',
    'underscore',
    'backbone',
    './models/model'
], function($, _$, _, Backbone, cookware){

    var Tweet = Backbone.Collection.extend({

    model: cookware,
defaults: {

    },
    initialize: function(){

    },
        url: 'http://localhost:8081/cookwares/',

        parse: function(r){
            console.log("parse")
            console.log(r)
            return r;
        }

      });

      return Tweet;
})