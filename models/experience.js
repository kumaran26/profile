define([
    'jquery',
    'jquery-ui',
    'underscore',
    'backbone',
], function($, _$, _, Backbone){

    var experience = Backbone.Model.extend({

        defaults: {},

        initialize: function(){},

        urlRoot: 'https://profile-contact-dd155-default-rtdb.europe-west1.firebasedatabase.app/experience.json',

        parse: function(response){
            var items = [];
            items.push(response['-OKMaQsxm2DQahx8dyR9']);
            items.push(response['-OKMdEBIlXo6GjlpqWXz']);
            items.push(response['-OKN82PqR3mq-67Q0Ae0']);
            items.push(response['-OKN8mvhHXMfJBr4Qt-F']);
            return {
                experience: items
            };
        }

      });

      return experience;

})