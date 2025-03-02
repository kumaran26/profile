define([
  'jquery',
  'jquery-ui',
  'underscore',
  'backbone',
  'page',
  //'pagebus',
  'text!./template/parent.html',
  //'text!./template/success.html',
  'models/model',
  'rivets',
  './view/overview',
  './view/experience',
  './view/skills',
  './view/education',
  './view/contact',
], function($, _$, _, Backbone, page, /*pagebus,*/ templatee, /*tem,*/ model, rivets, overview, experience, skills, education, contact){

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

        template: _.template(templatee),

        // selectNavItems: function(e){
        //     if(e.target && e.target.text){
        //         this.selectedSubItems = this.navSubItems[e.target.text]
        //     }
        //     this.render();
        // },

        initialize: function() {
            
            this.navItems = ["Kitchen and Dining", "Kitchen Storage and Containers",
                "Furniture", "Fine Art", "Home Furnishing", "Bedroom Linen", "Home Decor",
                "Garden and Outdoors", "Home Storage", "Indoor Lighting",
                "Home Improvement", "Sewing & Craft Supplies"];
            this.navSubItems = {
                "Kitchen and Dining": ["Cookware", "Kitchen tools"],
                "Kitchen Storage and Containers": ["Storage"]
            }
            this.selectedSubItems = [];
            this.model = new model();
            var self = this;
            // this.model.fetch({
            //   success: function(r){
            //       self.render();
            //     },
            //     error: function(model, response) {
            //       self.render();
            //     }
            //  })
            PageBus.subscribe('show_spinner', null, function(){
                console.log("asdasdsdsd");
                $("#spin").removeClass("hide");
            });
            PageBus.subscribe('hide_spinner', null, function(){
                console.log("asda");
                $("#spin").addClass("hide");
            });
            $(document).ready(function(){

                $('.icon_close').click(function(){
                    var hidden = $('.hidden');
                    $('.hidden').toggle('slide', {direction: 'left'}, 1000);
                });
                $('#sub_mob').click(function(){
                    var hidden = $('.hidden1');
                    $('.hidden1').toggle('slide', {direction: 'down'}, 1000);
                });
                $('.account_circle').click(function(){
                    $('#account_options').toggle();
                });
                $(window).scroll(function(e){
                  var $el = $('.fixedElement');
                  var isPositionFixed = ($el.css('position') == 'fixed');
                var news = $("#fea").offset().top;
                var nn = $el.offset().top + $(window).height();
                console.log($el.offset().top + $(window).height());
                //bottom = offset.top - bottom;
                  if ($(this).scrollTop() > 200 && !isPositionFixed ){
                    $el.css({'position': 'fixed', 'top': '0px'});
                    $el.css("width", "25%");
                  }
                  if ($(this).scrollTop() < 200 && isPositionFixed){
                    $el.css({'position': 'static', 'top': '0px'});
                    $el.css("width", "100%");
                  }
                  if ($(this).scrollTop() > (news - 320)){
                      $el.css({'position': 'static', 'top': '0px'});
                      $el.css("width", "100%");
                    }
                });




            });
            this?.render();
            //PageBus.publish('show_spinner');
        },

        tryLogin: function(){
            console.log("hello", templatee);
            $("#slide").slideUp();
            PageBus.publish('show_spinner');
        },

        tryLoginn: function(){
            console.log("hello", templatee);
            $("#slide").slideUp();
            PageBus.publish('hide_spinner');
        },

         render: function(){
            //console.log("hello", template);
            //rivets.bind(this.el, {test: "asda"});
            //rivets.bind($('#user'), { user:user })
             var user = new Backbone.Model({name: 'kum'});
             var templat = _.template(templatee);
             this.$el.html(templat);
             var ell = document.getElementById('product_wrapper_data');
             //rivets.bind(ell, {user: this.model});
             var ss = {}//this.model.get("data").review;
             var aarr = [];
             if(ss){
                var gg = parseInt(ss)
                for(var i=0 ; i < gg ; i++){
                    aarr.push(i);
                }
             }
            //  console.log(aarr);
            //  console.log("sdsfsssssss", ss)
            //  console.log("sdsdssssdd", this.model )
            //  $(document).ready(function(){
            //     // Carousel Slider //
            //     let elemWidth = ( 100 * parseFloat($('.listBox li').css('width')) / parseFloat($('.containerBox').parent().css('width')) ); // Width of each element
            //     let elemPerPage = parseInt((100 / elemWidth)); // Elements per page
            //     let marginLeft = 0;
            //     let count = 0;
            //     let totalElem = $('.listBox li').length; // Number of total elements
            //     let numSlides = Math.ceil(totalElem / elemPerPage); // Number of slides
            //     if ( totalElem > elemPerPage ) {
            //       $('.arrow.back').on('click', function(){ // Go back
            //         if ( marginLeft < 0 ) {
            //           count--;
            //           marginLeft = marginLeft + 100;
            //           $('ul.listBox').animate({
            //             marginLeft: marginLeft + "%"
            //           }, 1500);
            //         }
            //       });
            //       $('.arrow.forward').on('click', function(){ // Go forward
            //         count++;
            //         if ( count < numSlides ) {
            //           if ( marginLeft <= 0 ) {
            //             marginLeft = marginLeft - 100;
            //             $('ul.listBox').animate({
            //               marginLeft: marginLeft + "%"
            //             }, 1500);
            //           }
            //         } else {
            //           count--;
            //         }
            //       });
            //     }
            //     // Open infoBox //
            //     for (let i = 0; i < $('.listBox li .content').length; i++) {
            //       $($('.listBox li .content')[i]).on('click', function(){
            //         $('.infoBox li').addClass("hidden");
            //         if( $($('.infoBox li')[i]).hasClass("hidden") ) {
            //           $($('.infoBox li')[i]).removeClass("hidden");
            //         } else {
            //           $($('.infoBox li')[i]).addClass("hidden");
            //         }
            //       });
            //     }
            //  });
             rivets?.bind( ell , { a : this.model ,
                b : aarr,
                navItems: this.navItems,
                subItems: this.selectedSubItems
             } );
            //  $('.account_login1').click(function() {
            //     $(".account_login").hide();
            //     $(".account_login1").hide();
            // });
            // $('.popup').click(function(e) {
            //     e.stopPropagation();
            // });
            // $(".image_small").click(function(e){
            //     console.log(e.target.src);
            //     $("img.image_wrapper").attr('src', e.target.src)
            // })
            PageBus.publish('show_spinner');
            this.overview = new overview(this);
          },

          // themee: function(){
          //   $("body").removeClass("theme_white");
          //   $("body").addClass("theme_black");
          // },

          attributes: {
            class: "test"
          },

          education: function(e){
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
            }
          },

          skills: function(e){
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
            
          },

          contact: function(e){
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
          },

          experience: function(e){
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

            //PageBus.publish('show_spinner');
            if(this.experience?.el){
              this.experience.render();
            } else {
              this.experience = new experience(this);
            }
          },

          overview: function(e){
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
          },

          contactSubmit: function(){
            //$('.subject').click(function() {
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
            //});
          },

          showLogin: function(){
            $(".account_login").show();
            $(".account_login1").show();
            var height = $("#root").height();
            $(".account_login").css("height", height);//this.$el.html(tem);
            //var childView = new success(this);
            //childView.render(); // Render the child view
            //this.$('#producttt').append(childView.el);
            //self.$("#producttt").append('<p>sdfsdf</p>');
            
          },

          events: {
            //"click .try": "tryLogin",
            //"click .tryy": "tryLoginn",
            //"click .themee": "themee",
            //"click .selectNavItems": "selectNavItems",
            //"click .account_circle": "showLogin",
            "click #education": "education",
            "click #skills": "skills",
            "click #contact": "contact",
            "click #experience": "experience",
            "click #overview": "overview",
            "click #submit": "contactSubmit",
          }

    });

    return parentView;

});