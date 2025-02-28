// app.js
define([
    'jquery',
    'jquery-ui',
    'underscore',
    'backbone',
    'page',
    'pagebus',
    'text!../template/product.html',
    'models/model',
    'rivets'

], function($, _$, _, Backbone, page, pagebus, templatee, model, rivets){

//Rivets Configuration with backbone
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


    var firstView = Backbone.View.extend({
        el: '#root',

        template: _.template(templatee),

        selectNavItems: function(e){
            console.log("adasd", e.target.text);
            if(e.target && e.target.text){
                this.selectedSubItems = this.navSubItems[e.target.text]
            }
this.render();
        },

        initialize: function() {
            console.log("rv", rivets);
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
            console.log("rvv", model);
            this.model.fetch({
                 success: function(r){
                     console.log("r", r)
                    // $("#dd").text(r.get("accountNonLocked"));
                     //this.indicator = r.get("accountNonLocked");
                     //if (r2.readyState != 4 || r2.status != 200) return;
                     //var errors = JSON.parse(r2.responseText);
                    self.render();
                 },error: function(model, response) {
                       console.log("aaa", model);
                       console.log("aa", response);
                       self.render();
                   }
             })
            console.log("hellosss", templatee);
            console.log("page", page);
            console.log("page", pagebus);
            console.log("sdfs", PageBus);
            PageBus.subscribe('show_spinner', null, function(){
                console.log("asda");
                $("#spin").show();
            });
            PageBus.subscribe('hide_spinner', null, function(){
                console.log("asda");
                $("#spin").hide();
            });
            $(document).ready(function(){
                $('#ham').click(function(){
                    var hidden = $('.hidden');
                    $('.hidden').toggle('slide', {direction: 'left'}, 1000);
                });
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
                  if ($(this).scrollTop() > 200 && !isPositionFixed ){
                    $el.css({'position': 'fixed', 'top': '0px'});
                    $el.css("width", "25%");
                  }
                  if ($(this).scrollTop() < 200 && isPositionFixed){
                    $el.css({'position': 'static', 'top': '0px'});
                    $el.css("width", "100%");
                  }
                  if ($(this).scrollTop() > news){
                      $el.css({'position': 'static', 'top': '0px'});
                      $el.css("width", "100%");
                    }
                });
            });
            //this.render();
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
             $(window).on('load', function(){
               // Carousel Slider //
               let elemWidth = ( 100 * parseFloat($('.listBox li').css('width')) / parseFloat($('.containerBox').parent().css('width')) ); // Width of each element
               let elemPerPage = parseInt((100 / elemWidth)); // Elements per page
               let marginLeft = 0;
               let count = 0;
               let totalElem = $('.listBox li').length; // Number of total elements
               let numSlides = Math.ceil(totalElem / elemPerPage); // Number of slides
               if ( totalElem > elemPerPage ) {
                 $('.arrow.back').on('click', function(){ // Go back
                   if ( marginLeft < 0 ) {
                     count--;
                     marginLeft = marginLeft + 100;
                     $('ul.listBox').animate({
                       marginLeft: marginLeft + "%"
                     }, 1500);
                   }
                 });
                 $('.arrow.forward').on('click', function(){ // Go forward
                   count++;
                   if ( count < numSlides ) {
                     if ( marginLeft <= 0 ) {
                       marginLeft = marginLeft - 100;
                       $('ul.listBox').animate({
                         marginLeft: marginLeft + "%"
                       }, 1500);
                     }
                   } else {
                     count--;
                   }
                 });
               }
               // Open infoBox //
               for (let i = 0; i < $('.listBox li .content').length; i++) {
                 $($('.listBox li .content')[i]).on('click', function(){
                   $('.infoBox li').addClass("hidden");
                   if( $($('.infoBox li')[i]).hasClass("hidden") ) {
                     $($('.infoBox li')[i]).removeClass("hidden");
                   } else {
                     $($('.infoBox li')[i]).addClass("hidden");
                   }
                 });
               }
             });
            //rivets.bind(this.el, {test: "asda"});
            //rivets.bind($('#user'), { user:user })
             var user = new Backbone.Model({name: 'kum'});
             console.log("sdf", user)
             this.$el.html(templatee);
             var ell = document.getElementById('product_wrapper_data');
             //rivets.bind(ell, {user: this.model});
             var ss = this.model.get("data").review;
             var aarr = [];
             if(ss){
                var gg = parseInt(ss)
                for(var i=0 ; i < gg ; i++){
                    aarr.push(i);
                }
             }
             console.log(aarr);
             console.log("sdsdssssdd", this.model )
             rivets.bind( ell , { a : this.model ,
                b : aarr,
                navItems: this.navItems,
                subItems: this.selectedSubItems
             } );

             $('.account_login1').click(function() {

                                               $(".account_login").hide();
                                                                             $(".account_login1").hide();

                                           });

                                           $('.popup').click(function(e) {
                                               e.stopPropagation();
                                           });
          },

          themee: function(){
            $("body").removeClass("theme_white");
            $("body").addClass("theme_black");
          },

          attributes: {
                  class: "test"
              },

              showLogin: function(){
                              $(".account_login").show();
                              $(".account_login1").show();
                              var height = $("#root").height();

              $(".account_login").css("height", height);
                            },

          events: {
                      "click .try":          "tryLogin",
                      "click .tryy":          "tryLoginn",
                      "click .themee": "themee",
                      "click .selectNavItems": "selectNavItems",
                      "click .account_circle": "showLogin"
                    }

    });


    return firstView;
});