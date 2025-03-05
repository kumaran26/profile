define([
  'jquery',
  'jquery-ui',
  'underscore',
  'backbone',
  'text!../template/education.html',
  'education',
  'rivets'
], function($, _$, _, Backbone, template, model, rivets){

    var educationView = Backbone.View.extend({

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
          },error: function() {
            self.render();
            PageBus.publish('hide_spinner');
          }
        });
      },

      render: function(){
        this.parent.$("#main-content").html(template);
        var placeholder = document.getElementById('education-component');
        var educationData = this.model.get("education");
        rivets.bind( placeholder , { 
          model : this.model ,
          education: educationData,
        } );
      },

      events: {

      }

    });

    return educationView;

});