define([
    'jquery',
    'jquery-ui',
    'underscore',
    'backbone',
    //'page',
    //'pagebus',
    'text!../template/overview.html',
    'overview',
    //'setAccount',
    'rivets'
], function($, _$, _, Backbone, /*page, pagebus,*/ template, model, /*setAccount,*/ rivets){

    // rivets.adapters[':'] = {
    //   subscribe: function(obj, keypath, callback) {
    //   console.log("obj", obj);
    //     obj.on('change:' + keypath, callback);
    //   },
    //   unsubscribe: function(obj, keypath, callback) {
    //     obj.off('change:' + keypath, callback);
    //   },
    //   read: function(obj, keypath) {
    //     return obj.get(keypath);
    //   },
    //   publish: function(obj, keypath, value) {
    //     obj.set(keypath, value);
    //   }
    // }


    var overviewView = Backbone.View.extend({

        el: 'div',

        template: _.template(template),

        // selectNavItems: function(e){
        //   console.log("adasd", e.target.text);
        //   if(e.target && e.target.text){
        //       this.selectedSubItems = this.navSubItems[e.target.text]
        //   }
        //   this.render();
        // },

        initialize: function(options) {

          this.parent = options;
          // this.navItems = ["Kitchen and Dining", "Kitchen Storage and Containers",
          //     "Furniture", "Fine Art", "Home Furnishing", "Bedroom Linen", "Home Decor",
          //     "Garden and Outdoors", "Home Storage", "Indoor Lighting",
          //     "Home Improvement", "Sewing & Craft Supplies"];
          // this.navSubItems = {
          //     "Kitchen and Dining": ["Cookware", "Kitchen tools"],
          //     "Kitchen Storage and Containers": ["Storage"]
          // }
          // this.selectedSubItems = [];
          //this.setAccount = new setAccount();
          //this.setAccount.save();
          this.model = new model();
          var self = this;
          // this.account = {
          //   "old_password": "",
          //   "new_password": "",
          //   "street": "",
          //   "area": ""
          // };
          this.model.fetch({
            success: function(){
              // $("#dd").text(r.get("accountNonLocked"));
              //this.indicator = r.get("accountNonLocked");
              //if (r2.readyState != 4 || r2.status != 200) return;
              //var errors = JSON.parse(r2.responseText);
              self.render();
              PageBus.publish('hide_spinner');
            }, error: function() {
              self.render();
              PageBus.publish('hide_spinner');
            }
          })
          // PageBus.subscribe('show_spinner', null, function(){
          //     console.log("asda");
          //     $("#spin").show();
          // });
          // PageBus.subscribe('hide_spinner', null, function(){
          //     console.log("asda");
          //     $("#spin").hide();
          // });
          //$(document).ready(function(){
            // $('#ham').click(function(){
            //     var hidden = $('.hidden');
            //     $('.hidden').toggle('slide', {direction: 'left'}, 1000);
            // });
            // $('.icon_close').click(function(){
            //     var hidden = $('.hidden');
            //     $('.hidden').toggle('slide', {direction: 'left'}, 1000);
            // });
            // $('#sub_mob').click(function(){
            //     var hidden = $('.hidden1');
            //     $('.hidden1').toggle('slide', {direction: 'down'}, 1000);
            // });
            // $('.account_circle').click(function(){
            //     $('#account_options').toggle();
            // });
            // $(window).scroll(function(e){
            //   var $el = $('.fixedElement');
            //   var isPositionFixed = ($el.css('position') == 'fixed');
            //   if ($(this).scrollTop() > 200 && !isPositionFixed ){
            //     $el.css({'position': 'fixed', 'top': '0px'});
            //     $el.css("width", "25%");
            //   }
            //   if ($(this).scrollTop() < 200 && isPositionFixed){
            //     $el.css({'position': 'static', 'top': '0px'});
            //     $el.css("width", "100%");
            //   }
            //   if ($(this).scrollTop() > news){
            //     $el.css({'position': 'static', 'top': '0px'});
            //     $el.css("width", "100%");
            //   }
            // });
          //});
          //this.render();
        },

      // saveAccount: function(){
      //   console.log(this.account)
      //   var data = {
      //     "id": 72,
      //     "name": "xxxx@yyyyssdsf.com",
      //     "email": "xxxx@yyyyssdsf.com",
      //     "oldPassword": this.account["old_password"],
      //     "password": this.account["new_password"],
      //     "street": this.account["street"],
      //     "area": this.account["area"],
      //     "country": "USA"
      //   }
      //   $.ajax({
      //     url: 'http://localhost:8081/account/',
      //     type: 'PUT',
      //     contentType: 'application/json',
      //     crossDomain: true,
      //     data: JSON.stringify(data),
      //     success: function(result) {
      //       console.log(result)
      //     },
      //     error: function(error){
      //       console.log(error)
      //     }
      //   });
      //   this.account["old_password"] = "";
      //   this.account["new_password"] = "";
      //   this.account["street"] = "";
      //   this.account["area"] = "";
      //   this.setAccount.save({
      //       "id": 72,
      //       "name": "xxxx@yyyy.com"
      //     }, 
      //     {
      //       type: 'PUT',
      //       success: function(r){
      //           console.log("r", r)
      //           // $("#dd").text(r.get("accountNonLocked"));
      //           //this.indicator = r.get("accountNonLocked");
      //           //if (r2.readyState != 4 || r2.status != 200) return;
      //           //var errors = JSON.parse(r2.responseText);
      //           self.render();
      //       }, error: function(model, response) {
      //           console.log("aaa", model);
      //           console.log("aa", response);
      //           // self.render();
      //       }
      //     }, 
      //     {
      //       patch: true
      //   })
      // },

      // tryLogin: function(){
      //     console.log("hello", templatee);
      //     $("#slide").slideUp();
      //     PageBus.publish('show_spinner');
      // },

      // tryLoginn: function(){
      //     console.log("hello", templatee);
      //     $("#slide").slideUp();
      //     PageBus.publish('hide_spinner');
      // },

      render: function(){
        // $(window).on('load', function(){
        //   let elemWidth = ( 100 * parseFloat($('.listBox li').css('width')) / parseFloat($('.containerBox').parent().css('width')) );
        //   let elemPerPage = parseInt((100 / elemWidth));
        //   let marginLeft = 0;
        //   let count = 0;
        //   let totalElem = $('.listBox li').length;
        //   let numSlides = Math.ceil(totalElem / elemPerPage);
        //   if ( totalElem > elemPerPage ) {
        //     $('.arrow.back').on('click', function(){
        //       if ( marginLeft < 0 ) {
        //         count--;
        //         marginLeft = marginLeft + 100;
        //         $('ul.listBox').animate({
        //           marginLeft: marginLeft + "%"
        //         }, 1500);
        //       }
        //     });
        //     $('.arrow.forward').on('click', function(){
        //       count++;
        //       if ( count < numSlides ) {
        //         if ( marginLeft <= 0 ) {
        //           marginLeft = marginLeft - 100;
        //           $('ul.listBox').animate({
        //             marginLeft: marginLeft + "%"
        //           }, 1500);
        //         }
        //       } else {
        //         count--;
        //       }
        //     });
        //   }
        //   for (let i = 0; i < $('.listBox li .content').length; i++) {
        //     $($('.listBox li .content')[i]).on('click', function(){
        //       $('.infoBox li').addClass("hidden");
        //       if( $($('.infoBox li')[i]).hasClass("hidden") ) {
        //         $($('.infoBox li')[i]).removeClass("hidden");
        //       } else {
        //         $($('.infoBox li')[i]).addClass("hidden");
        //       }
        //     });
        //   }
        // });
        //rivets.bind(this.el, {test: "asda"});
        //rivets.bind($('#user'), { user:user })
        // var user = new Backbone.Model({name: 'kum'});
        // console.log("sdf", user)
        //this.$el.html(templatee);
        this.parent.$("#main-content").html(template);
        var placeholder = document.getElementById('overview-component');
        //rivets.bind(ell, {user: this.model});
        var overviewData = this.model.get('-OKLX-tLeFZM9NcfO0a4');//this.model.get("data").review;
        //var aarr = [];
        // if(ss){
        //   var gg = parseInt(ss)
        //   for(var i=0 ; i < gg ; i++){
        //       aarr.push(i);
        //   }
        // }
        rivets.bind( placeholder , { 
          model : this.model ,
          overview : overviewData,
          //b : aarr,
          //a : ss,
          //navItems: this.navItems,
          //subItems: this.selectedSubItems,
          //account: this.account
        });

        // $("#scroll_top").click(function(){
        //   window.scrollTo(0, 0);
        // });
        // $('.account_login1').click(function() {
        //     $(".account_login").hide();
        //     $(".account_login1").hide();
        // });
        // $('.popup').click(function(e) {
        //     e.stopPropagation();
        // });
        // $("#checkout").click(function(){
        //   $("#checkout_wrapper").toggle();
        // });
        // $("#filter").click(function(){
        //   var filterWrapper = $("#filter_wrapper");
        //   if($(filter_wrapper).css('display') == "none"){
        //       $("#filter_wrapper").css("display", "inline-block");
        //       $("#items_wrapper").css("width", "58%");
        //   } else {
        //         $("#filter_wrapper").css("display", "none");
        //         $("#items_wrapper").css("width", "78%");
        //   }
        // });

      },

      // themee: function(){
      //   $("body").removeClass("theme_white");
      //   $("body").addClass("theme_black");
      // },

      // attributes: {
      //     class: "test"
      // },

      // showLogin: function(){
      //   $(".account_login").show();
      //   $(".account_login1").show();
      //   var height = $("#root").height()
      //   $(".account_login").css("height", height);
      // },

      events: {
        //"click .try": "tryLogin",
        //"click .tryy": "tryLoginn",
        //"click .themee": "themee",
        //"click .selectNavItems": "selectNavItems",
        //"click .download": "documentDownload",
        //"click .submit": "saveAccount",
        //"click .account_circle": "showLogin"
      }

    });

    return overviewView;

});