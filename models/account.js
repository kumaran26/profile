
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

        },

        urlRoot: 'https://jsonplaceholder.typicode.com/users/1',

        parse: function(r){
            console.log("parse")
            console.log(r)
            return r;
        }

      });

      return Tweet;
})