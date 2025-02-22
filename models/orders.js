
define([
    'jquery',
    'jquery-ui',
    'underscore',
    'backbone',
], function($, _$, _, Backbone){

    var Tweet = Backbone.Model.extend({
defaults: {

    },
    initialize: function(){

    },
        urlRoot: 'http://localhost:8081/orders/',

        parse: function(r){
            console.log("parse")
            console.log(r)
            return r;
        }

      });

      return Tweet;
})