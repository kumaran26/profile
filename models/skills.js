define([
    'jquery',
    'jquery-ui',
    'underscore',
    'backbone',
], function($, _$, _, Backbone){

    var skills = Backbone.Model.extend({

        defaults: {},

        initialize: function(){},

        urlRoot: 'https://profile-contact-dd155-default-rtdb.europe-west1.firebasedatabase.app/skills.json',

        parse: function(response){
            return response;
        }

      });

    return skills;
})