define([
  'jquery',
  'jquery-ui',
  'underscore',
  'backbone',
  'text!../template/education.html',
  'education',
  'rivets'
], function($, _$, _, Backbone, template, model, rivets){

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

    // rivets.formatters["args"] = function (fn) {
    //   var args = Array.prototype.slice.call(arguments, 1);
    //   return function () {
    //     return fn.apply(null, args);
    //   };
    // };

    var educationView = Backbone.View.extend({

      el: '#root',

      template: _.template(template),

      // selectNavItems: function(e){
      //   console.log("adasd", e.target.text);
      //   if(e.target && e.target.text){
      //       this.selectedSubItems = this.navSubItems[e.target.text]
      //   }
      //   this.render();
      // },

      // incrementQuantity: function(item){
      //   var counter = $(item.currentTarget).parent();
      //   var id = $(counter).attr("data-identification");
      //   var counterField = $(item.currentTarget).next();
      //   var counterFieldValue = $(counterField).val();
      //   console.log(counterField, counterFieldValue);
      //   if(parseInt(counterFieldValue) !== NaN){
      //     $(counterField).val(parseInt(counterFieldValue) + 1)
      //     var self = this;
      //     this.orders.items.forEach(function(order){
      //       if(order.id === id){
      //         order.priceQuantity = order.price * (parseInt(counterFieldValue) + 1);
      //         self.totalPrice.val = self.totalPrice.val + parseInt(order.price);
      //         //self.render();
      //         //$(counterField).val(parseInt(counterFieldValue) + 1)
      //       }
      //     });
      //   }
      //   console.log($(counter).attr("data-identification"));
      // },

      // decrementQuantity: function(item){
      //   var counter = $(item.currentTarget).parent();
      //   var id = $(counter).attr("data-identification");
      //   var counterField = $(item.currentTarget).prev();
      //   var counterFieldValue = $(counterField).val();
      //   console.log(counterField, counterFieldValue);
      //   if(parseInt(counterFieldValue) !== NaN && parseInt(counterFieldValue) > 1){
      //     $(counterField).val(parseInt(counterFieldValue) - 1)
      //     var self = this;
      //     this.orders.items.forEach(function(order){
      //         if(order.id === id){
      //             order.priceQuantity = order.price * (parseInt(counterFieldValue) - 1);
      //             self.totalPrice.val = self.totalPrice.val - parseInt(order.price);
      //         }
      //     });
      //   }
      //   if(parseInt(counterFieldValue) == 1){
      //       var obj = this.orders.items.slice();
      //       var self = this;
      //       this.orders.items.forEach(function(order){
      //       if(order.id === id){
      //           self.totalPrice.val =  self.totalPrice.val - parseInt(order.price);
      //       }
      //     });
      //     obj = obj.filter((item) => item.id !== id);
      //     this.orders.items = obj;
      //     //this.render();
      //   }
      //   console.log($(counter).attr("data-identification"));
      // },

      initialize: function(options) {

        this.parent = options;
        // this.navItems = ["Kitchen and Dining", "Kitchen Storage and Containers",
        //   "Furniture", "Fine Art", "Home Furnishing", "Bedroom Linen", "Home Decor",
        //   "Garden and Outdoors", "Home Storage", "Indoor Lighting",
        //   "Home Improvement", "Sewing & Craft Supplies"
        // ];
        // this.navSubItems = {
        //   "Kitchen and Dining": ["Cookware", "Kitchen tools"],
        //   "Kitchen Storage and Containers": ["Storage"]
        // }
        // this.selectedSubItems = [];
        this.model = new model();
        var self = this;
        // this.orders = {"items": [{
        //   "name": "pressure cooker by Favourite Outer Lid Non Induction Aluminium Pressure Cooker, 3 Litres, Silver",
        //   "brand": "Butterfly 1",
        //   "price": "2000",
        //   "id": "1",
        //   "priceQuantity": "2000"
        // }, {
        //   "name": "pressure cooker by Favourite Outer Lid Non Induction Aluminium Pressure Cooker, 3 Litres, Silver",
        //   "brand": "Butterfly 2",
        //   "price": "2000",
        //   "id": "2",
        //   "priceQuantity": "2000"
        // }, {
        //   "name": "pressure cooker by Favourite Outer Lid Non Induction Aluminium Pressure Cooker, 3 Litres, Silver",
        //   "brand": "Butterfly 3",
        //   "price": "2000",
        //   "id": "3",
        //   "priceQuantity": "2000"
        // }]};
        // this.totalPrice = {
        //     "val": 0
        // };
        // this.orders.items.forEach(function(order){
        //     self.totalPrice.val = self.totalPrice.val + parseInt(order.price);
        // });
        // this.address = {
        //   "area": "xxxx",
        //   "street": "xxxx",
        //   "country": "xxxx"
        // }
        this.model.fetch({
          success: function(){
            // console.log("r", r)
            // $("#dd").text(r.get("accountNonLocked"));
            // this.indicator = r.get("accountNonLocked");
            // if (r2.readyState != 4 || r2.status != 200) return;
            // var errors = JSON.parse(r2.responseText);
            self.render();
            PageBus.publish('hide_spinner');
          },error: function() {
            // console.log("aaa", model);
            // console.log("aa", response);
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
          //   //var news = $("#fea").offset().top;
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
        // this.incrementQuantity = this.incrementQuantity.bind(this);
        // this.decrementQuantity = this.decrementQuantity.bind(this);
      },

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
        // this.disclaimer = {
        //   "address": "The product will be delivered to the default address, If you wish to change you can change it in your account or you can change it from the above link temporary",
        //   "time": "The product will be delivered with in the mentioned period, it may take some time longer depending upon the whether conditions and the transport facility",
        //   "gift": "Default the gift packing option is not added, you may add it from above. Gift pack customization is not available and if it is damaged or misplaced it can be repacked again"
        // }
        var placeholder = document.getElementById('education-component');
        //rivets.bind(ell, {user: this.model});
        var educationData = this.model.get("education");//this.model.at(0).get('data');
        // var aarr = [];
        // if(ss){
        //   var gg = parseInt(ss)
        //   for(var i=0 ; i < gg ; i++){
        //       aarr.push(i);
        //   }
        // }
        // console.log(aarr);
        // console.log("sdsdssssdd", this.model )
        rivets.bind( placeholder , { 
          model : this.model ,
          education: educationData,
          //b : aarr,
          //a : ss,
          // navItems: this.navItems,
          // subItems: this.selectedSubItems,
          // address: this.address,
          // orders: this.orders,
          // incrementQuantity: this.incrementQuantity,
          // decrementQuantity: this.decrementQuantity,
          // totalPrice: this.totalPrice,
          // disclaimer: this.disclaimer
        } );
        // $('.account_login1').click(function() {
        //     $(".account_login").hide();
        //     $(".account_login1").hide();
        // });
        // $('.popup').click(function(e) {
        //     e.stopPropagation();
        // });
        // var counterValue = document.querySelector("#counter-value");
        // var counterIncrement = document.querySelector("#counter-increment");
        // var counterDecrement = document.querySelector("#counter-decrement");
        // var count = 0;
        // counterIncrement.addEventListener('click', function() {
        //   count++
        //   counterValue.setAttribute("value", count);
        // });
        // counterDecrement.addEventListener('click', function() {
        //   count--
        //   counterValue.setAttribute("value", count);
        // });
        // Get the modal
        // var modal = document.getElementById("myModal");
        // Get the button that opens the modal
        // var btn = document.getElementById("myBtn");
        // Get the <span> element that closes the modal
        // var span = document.getElementsByClassName("close")[0];
        // When the user clicks the button, open the modal
        // btn.onclick = function() {
        //   modal.style.display = "block";
        // }
        // When the user clicks on <span> (x), close the modal
        // span.onclick = function() {
        //   modal.style.display = "none";
        // }
        // When the user clicks anywhere outside of the modal, close it
        // window.onclick = function(event) {
        //   if (event.target == modal) {
        //     modal.style.display = "none";
        //   }
        // }
        // $("#scroll_top").click(function(){
        //   window.scrollTo(0, 0);
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
        //       $("#filter_wrapper").css("display", "none");
        //       $("#items_wrapper").css("width", "78%");
        //   }
        // });

      },

      // changeAddress: function(){
      //   var area = $("#area").val();
      //   var street = $("#street").val();
      //   var obj = {};
      //   obj.area = area,
      //   obj.street = street;
      //   obj.country = "USA";
      //   this.address = obj;
      //   this.render();
      // },

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
      //   var height = $("#root").height();
      //   $(".account_login").css("height", height);
      // },

      events: {
        //"click .try": "tryLogin",
        //"click .tryy": "tryLoginn",
        //"click .themee": "themee",
        //"click .selectNavItems": "selectNavItems",
        //"click .incrementQuantity": "incrementQuantity",
        //"click .changeAddress": "changeAddress",
        //"click .account_circle": "showLogin"
      }

    });

    return educationView;

});