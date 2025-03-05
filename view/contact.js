define([
  'jquery',
  'jquery-ui',
  'underscore',
  'backbone',
  'text!../template/contact.html',
  'rivets'
], function($, _$, _, Backbone, template, rivets){

    var contactView = Backbone.View.extend({

      el: 'div',

      template: _.template(template),

      initialize: function(options) {
        this.parent = options;
        this.render();
      },

      render: function(){
        this.parent.$("#main-content").html(template);
        var placeholder = document.getElementById('contact-component');
        var self = this;
        self.contact = {};
        self.contact.subject = "general";
        rivets.bind( placeholder , { 
          model : this.model
        });
        $("#name").css("margin-bottom", "20px");
        $("#email").css("margin-bottom", "20px");
        $("#description").css("margin-bottom", "20px");
        $('#name').on('blur', function() {
          self.contact.name = $("#name").val();
          var emptyCheck = empty(this.value);
          if(emptyCheck){
            $("#name-error").show();
            $("#name").css("margin-bottom", "0px");
          } else{
            $("#name-error").hide();
            $("#name").css("margin-bottom", "20px");
          }
        });
        $('#email').on('blur', function() {
          self.contact.email = $("#email").val();
          var emptyCheck = empty(this.value);
          var emailCheck = email(this.value);
          if(emptyCheck || !emailCheck){
            $("#email-error").show();
            $("#email").css("margin-bottom", "0px");
          } else{
            $("#email-error").hide();
            $("#email").css("margin-bottom", "20px");
          }
        });
        $('#subject').on('change', function() {
          self.contact.subject = this.value;
        });
        $('#description').on('blur', function() {
          self.contact.description = $("#description").val();
          var emptyCheck = empty(this.value);
          if(emptyCheck){
            $("#description-error").show();
            $("#description").css("margin-bottom", "0px");
          } else{
            $("#description-error").hide();
            $("#description").css("margin-bottom", "20px");
          }
        });
      },

      checkForm: function(){
        
      },

      events: {

      }

    });

    return contactView;

});