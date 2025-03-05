define([
    'jquery',
    'jquery-ui',
    'underscore',
    'backbone',
    'text!../template/overview.html',
    'overview',
    'rivets'
], function($, _$, _, Backbone, template, model, rivets){

    var overviewView = Backbone.View.extend({

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
        var placeholder = document.getElementById('overview-component');
        var overviewData = this.model.get('-OKLX-tLeFZM9NcfO0a4');
        rivets.bind( placeholder , { 
          model : this.model ,
          overview : overviewData
        });
      },

      events: {

      }

    });

    return overviewView;

});