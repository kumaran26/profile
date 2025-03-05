define([
  'jquery',
  'jquery-ui',
  'underscore',
  'backbone',
  'text!../template/skills.html',
  'skills',
  'rivets'
], function($, _$, _, Backbone, template, model, rivets){

    var skillsView = Backbone.View.extend({

        el: 'div',

        template: _.template(template),

        initialize: function(options) {

          this.parent = options;
          var self = this;
          this.model = new model();
          this.model.fetch({
            success: function(){
              self.render();
              PageBus.publish('hide_spinner');
            },error: function() {
              self.render();
              PageBus.publish('hide_spinner');
            }
          });
        },

         render: function(){
             this.parent.$("#main-content").html(template);
             var placeholder = document.getElementById('skill-component');
             var skillData = this.model.get('-OKL18-DwoORkPjYrVFF');
            rivets.bind( placeholder , { 
              model : this.model ,
              skills : skillData
            });
          },

          events: {

          }

    });

    return skillsView;

});