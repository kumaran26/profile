
define([
    'jquery',
    'jquery-ui',
    'underscore',
    'backbone',
], function($, _$, _, Backbone){

    var education = Backbone.Model.extend({

        defaults: {},

        initialize: function(){},

        urlRoot: 'https://profile-contact-dd155-default-rtdb.europe-west1.firebasedatabase.app/education.json',

        parse: function(response){
            var items = [];
            items.push(response['-OKMRZ6d6cMfPFWunC0U']);
            items.push(response['-OKMQK3CYnYoA6Lk0MBJ']);
            return {
                education: items
            };
        }

      });

      return education;

})