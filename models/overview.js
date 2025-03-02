define([
    'jquery',
    'jquery-ui',
    'underscore',
    'backbone',
], function($, _$, _, Backbone){

    var overview = Backbone.Model.extend({

        defaults: {},

        initialize: function(data){},

        urlRoot: 'https://profile-contact-dd155-default-rtdb.europe-west1.firebasedatabase.app/overview.json',

        parse: function(response){
            return response;
        }

    });

    return overview;

})