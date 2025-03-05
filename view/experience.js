define([
  'jquery',
  'jquery-ui',
  'underscore',
  'backbone',
  'text!../template/experience.html',
  'experience',
  'rivets'
], function($, _$, _, Backbone, template, model, rivets){

    var experienceView = Backbone.View.extend({

      el: 'div',

      template: _.template(template),

      initialize: function(options) {
        this.parent = options;
        this.model = new model();
        var self = this;
        this.model.fetch({
          success: function(){
            self.render();
            PageBus.publish('hide_spinner');
          }, error: function() {
            self.render();
            PageBus.publish('hide_spinner');
          }
        });
      },

      render: function(){
        this.parent.$("#main-content").html(template);
        this.experienceData = this.model.get('experience');
        var placeholder = document.getElementById('experience-component');
        rivets.bind( placeholder , { 
          model : this.model,
          experience : this.experienceData
        } );
      },

      events: {
        
      }

    });

    return experienceView;

});