define([
  'jquery',
  'jquery-ui',
  'underscore',
  'backbone',
  'text!./template/parent.html',
  'rivets',
  './view/overview',
  './view/experience',
  './view/skills',
  './view/education',
  './view/contact',
], function($, _$, _, Backbone, template, rivets, overview, experience, skills, education, contact){

    rivets.adapters[':'] = {
      subscribe: function(obj, keypath, callback) {
      console.log("obj", obj);
        obj.on('change:' + keypath, callback);
      },
      unsubscribe: function(obj, keypath, callback) {
        obj.off('change:' + keypath, callback);
      },
      read: function(obj, keypath) {
        return obj.get(keypath);
      },
      publish: function(obj, keypath, value) {
        obj.set(keypath, value);
      }
    }

    var parentView = Backbone.View.extend({

        el: '#root',

        template: _.template(template),

        initialize: function() {
          var self = this;
          PageBus.subscribe('show_spinner', null, function(){
              $("#spin").removeClass("hide");
          });
          PageBus.subscribe('hide_spinner', null, function(){
              $("#spin").addClass("hide");
          });
          this.render();
          this.step = "overviewStep";
        },

        render: function(){
          this.$el.html(template);
          var placeholder = document.getElementById('parent-component');
          rivets?.bind( placeholder , {
          });
          PageBus.publish('show_spinner');
          this.overview = new overview(this);
        },

        educationStep: function(e){
          $("#education").css("background-color","white");
          $("#education").css("color","black");

          $("#skills").css("background-color","#00965e");
          $("#skills").css("color","white");
          $("#overview").css("background-color","#00965e");
          $("#overview").css("color","white");
          $("#experience").css("background-color","#00965e");
          $("#experience").css("color","white");
          $("#contact").css("background-color","#00965e");
          $("#contact").css("color","white");

          if(this.education?.el){
            this.education.render();
          } else {
            this.education = new education(this);
            PageBus.publish('show_spinner');
          }
          this.step = "educationStep";
        },

        skillsStep: function(e){
          $("#skills").css("color","black");
          $("#skills").css("background-color","white");

          $("#education").css("background-color","#00965e");
          $("#education").css("color","white");
          $("#overview").css("background-color","#00965e");
          $("#overview").css("color","white");
          $("#experience").css("background-color","#00965e");
          $("#experience").css("color","white");
          $("#contact").css("background-color","#00965e");
          $("#contact").css("color","white");

          if(this.skills?.el){
            this.skills.render();
          } else {
            this.skills = new skills(this);
            PageBus.publish('show_spinner');
          }
          this.step = "skillsStep";
        },

        contactStep: function(e){
          $("#contact").css("background-color","white");
          $("#contact").css("color","black");

          $("#education").css("background-color","#00965e");
          $("#education").css("color","white");
          $("#overview").css("background-color","#00965e");
          $("#overview").css("color","white");
          $("#experience").css("background-color","#00965e");
          $("#experience").css("color","white");
          $("#skills").css("color","white");
          $("#skills").css("background-color","#00965e");

          if(this.contact?.el){
            this.contact.render();
          } else {
            this.contact = new contact(this);
          }
          this.step = "contactStep";
        },

        experienceStep: function(e){
          $("#experience").css("background-color","white");
          $("#experience").css("color","black");

          $("#education").css("background-color","#00965e");
          $("#education").css("color","white");
          $("#overview").css("background-color","#00965e");
          $("#overview").css("color","white");
          $("#contact").css("background-color","#00965e");
          $("#contact").css("color","white");
          $("#skills").css("color","white");
          $("#skills").css("background-color","#00965e");

          if(this.experience?.el){
            this.experience.render();
          } else {
            this.experience = new experience(this);
            PageBus.publish('show_spinner');
          }
          this.step = "experienceStep";
        },

        overviewStep: function(e){
          $("#overview").css("background-color","white");
          $("#overview").css("color","black");

          $("#education").css("background-color","#00965e");
          $("#education").css("color","white");
          $("#experience").css("background-color","#00965e");
          $("#experience").css("color","white");
          $("#contact").css("background-color","#00965e");
          $("#contact").css("color","white");
          $("#skills").css("color","white");
          $("#skills").css("background-color","#00965e");

          if(this.overview?.el){
            this.overview.render();
          }
          this.step = "overviewStep";
        },

        checkStep: function(step, type){
          var steps = ["overviewStep", "experienceStep", "skillsStep", "educationStep", "contactStep"];
          var index = steps.indexOf(step);
          if(type === 'back')
            return steps[index - 1];
          return steps[index + 1];
        },

        back: function(){
          this.step = this.checkStep(this.step, 'back');
          if(this.step === undefined){
            this.step = 'contactStep';
            this['contactStep']();
            return;
          }
          this[this.step]();
        },

        submit: function(){
          if(this.step === 'contactStep'){
            this.contact.checkForm();
            if(this.contact.contact.name && this.contact.contact.email && 
                this.contact.contact.subject && this.contact.contact.description &&
                !$( "#name-error" ).is(':visible') && !$( "#email-error" ).is(':visible') && !$( "#description-error" ).is(':visible')){
              PageBus.publish('show_spinner');
              $.ajax({
                type: "POST",
                data: JSON.stringify({ 
                  "name" : this.contact.contact.name,
                  "email" : this.contact.contact.email,
                  "subject" : this.contact.contact.subject,
                  "description" : this.contact.contact.description
                }),
                url: "https://profile-contact-dd155-default-rtdb.europe-west1.firebasedatabase.app/contact.json",
                crossDomain: true,
                error: function (error) {
                  console.log(error);
                  PageBus.publish('hide_spinner');
                },
                success: function (response) {
                  console.log(response);
                  PageBus.publish('hide_spinner');
                }
              });
            }
          } else {
            this.step = this.checkStep(this.step);
              this[this.step]();
          }
      },

      events: {
        "click #education": "educationStep",
        "click #skills": "skillsStep",
        "click #contact": "contactStep",
        "click #experience": "experienceStep",
        "click #overview": "overviewStep",
        "click #submit": "submit",
        "click #back": "back",
      }

    });

    return parentView;

});