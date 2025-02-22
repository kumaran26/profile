
define([
    'jquery',
    'jquery-ui',
    'underscore',
    'backbone',
], function($, _$, _, Backbone){

    var Tweet = Backbone.Model.extend({

        defaults: {

        },

        initialize: function(data){
            console.log("ad", data)
        },

        urlRoot: 'http://localhost:8081/account/',

        parse: function(r){
            console.log("parse")
            console.log(r)
            return r;
        }

      });

      return Tweet;
})