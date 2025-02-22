// app.js
define([
    'jquery',
    'jquery-ui',
    'underscore',
    'backbone',
    'page',
    'pagebus',
    'text!../template/landing.html',
    'cookwares',
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

    rivets.formatters.or = function (value, args)  {
    console.log(value, args)

             //return value || args;
    };

    rivets.formatters.actualPrice = function(value, val) {

    console.log(value, val)
    return 0;
      //return moment(value).tz(timezone).format(format)
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
            this.brandFilter = [];
            this.sellerFilter = [];
            this.typeFilter = [];
            this.uniqType = [{"name": "New", "value": "N"}, {"name": "Old", "value": "O"}]
            var self = this;
            console.log("rvv", model);
            this.model.fetch({
                 success: function(r){
                     //console.log("r", r);
                    // $("#dd").text(r.get("accountNonLocked"));
                     //this.indicator = r.get("accountNonLocked");
                     //if (r2.readyState != 4 || r2.status != 200) return;
                     //var errors = JSON.parse(r2.responseText);
                     var un = r.at(0).get('data');
                      self.uniqBrand = _.uniq(un, function(x){
                                                   return x.brand;
                                               });
                       self.uniqSeller = _.uniq(un, function(x){
                          return x.seller;
                      });



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
                //var news = $("#fea").offset().top;
                  if ($(this).scrollTop() > 200 && !isPositionFixed ){
                    $el.css({'position': 'fixed', 'top': '0px'});
                    $el.css("width", "25%");
                  }
                  if ($(this).scrollTop() < 200 && isPositionFixed){
                    $el.css({'position': 'static', 'top': '0px'});
                    $el.css("width", "100%");
                  }
//                  if ($(this).scrollTop() > news){
//                      $el.css({'position': 'static', 'top': '0px'});
//                      $el.css("width", "100%");
//                    }
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

        filterProducts: function(e){
                    PageBus.publish('show_spinner');
                    console.log("e", )
                    var range;
                    var disRange;
                    if(event.target.getAttribute("data-filterType") === "seller"){
                        if(e.currentTarget.checked){
                            if(!_.contains(this.sellerFilter, e.currentTarget.value)){
                                this.sellerFilter.push(e.currentTarget.value);
                            }
                        } else {
                            this.sellerFilter = _.without(this.sellerFilter, e.currentTarget.value);
                        }
                    } else if(event.target.getAttribute("data-filterType") === "brand"){
                        if(e.currentTarget.checked){
                            if(!_.contains(this.brandFilter, e.currentTarget.value)){
                                this.brandFilter.push(e.currentTarget.value);
                            }
                        } else {
                            this.brandFilter = _.without(this.brandFilter, e.currentTarget.value);
                        }
                    } else if (event.target.getAttribute("data-filterType") === "type"){
                        if(e.currentTarget.checked){
                            if(!_.contains(this.typeFilter, e.currentTarget.value)){
                                this.typeFilter.push(e.currentTarget.value);
                            }
                        } else {
                            this.typeFilter = _.without(this.typeFilter, e.currentTarget.value);
                        }
                    } else if (event.target.getAttribute("data-filterType") === "priceRange"){
                        range = parseInt(event.target.getAttribute("data-range"));
//                         if(e.currentTarget.checked){
//                             if(!_.contains(this.typeFilter, e.currentTarget.value)){
//                                 this.typeFilter.push(e.currentTarget.value);
//                             }
//                         } else {
//                             this.typeFilter = _.without(this.typeFilter, e.currentTarget.value);
//                         }
                     } else if (event.target.getAttribute("data-filterType") === "discountRange"){
                                              disRange = parseInt(event.target.getAttribute("data-range"));
                      //                         if(e.currentTarget.checked){
                      //                             if(!_.contains(this.typeFilter, e.currentTarget.value)){
                      //                                 this.typeFilter.push(e.currentTarget.value);
                      //                             }
                      //                         } else {
                      //                             this.typeFilter = _.without(this.typeFilter, e.currentTarget.value);
                      //                         }
                                           }

                    var mini;
                    var copyData = Object.assign({}, this.productData);
                        var self = this;
                       mini = _.filter(this.products, function (obj) {
                        return self.brandFilter.includes(obj.brand) || self.sellerFilter.includes(obj.seller) || self.typeFilter.includes(obj.type) ||  ((parseInt(obj.price)) <= (range + 500)) || ((parseInt(obj.offer)) >= disRange)
                    });
                    if(mini && mini.length > 0){
this.render(mini);
                    } else {
                    this.render(this.productData);
                    }

                    $("#filter_wrapper").css("display", "inline-block");
                    $("#items_wrapper").css("width", "58%");
                    var $list = $('.brandSelector');
                    var $listSeller = $('.sellerSelector');
                    var $listType = $('.typeSelector');
                    $listType.each( function() {
                        var ff = $(this).children();
                        if(self.typeFilter.includes($(ff).attr('data-type'))){
                            $(ff).attr('checked', true);
                        } else {
                            $(ff).attr('checked', false);
                        }
                    });
                    $listSeller.each( function() {
                        var ff = $(this).children();
                        if(self.sellerFilter.includes($(ff).attr('name'))){
                            $(ff).attr('checked', true);
                        } else {
                            $(ff).attr('checked', false);
                        }
                    });
                    $list.each( function() {
                        var ff = $(this).children();
                        if(self.brandFilter.includes($(ff).attr('name'))){
                            $(ff).attr('checked', true);
                        } else {
                            $(ff).attr('checked', false);
                        }
                    });
                    PageBus.publish('hide_spinner');
                },

         render: function(filter){
                this.$el.html(templatee)
                this.products = this.model.at(0).get('data');
                this.products.forEach(function(e){
                    var view = parseInt(e.review);
                    var reviewStar = [];
                    for(var i=0 ; i < view ; i++){
                        reviewStar.push(i);
                    }
                    e.reviews = reviewStar;
                    e.discountedPrice = (parseInt(e.price) + ((parseInt(e.price) / 100) * parseInt(e.offer)) ).toFixed(2);
                })


                var ell = document.getElementById('product_wrapper_data');
                rivets.bind( ell , { a : this.model ,
                    products : this.products,
                    filteredProducts: filter ? filter : this.products,
                    navItems: this.navItems,
                    subItems: this.selectedSubItems,
                    checkedItem: this.checkedItem,
                    brand: this.uniqBrand,
                    seller: this.uniqSeller,
                    type: this.uniqType
                 } );
                 this.afterHandlers();

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

          afterHandlers: function(){

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
            $("#scroll_top").click(function(){
                                   window.scrollTo(0, 0);
                                 });
                                  $("#checkout").click(function(){
                                     $("#checkout_wrapper").toggle();
                                   });
                                  $("#filter").click(function(){
                                        var filterWrapper = $("#filter_wrapper");
                                        //console.log("dsfdssdssd", filterWrapper, filter_wrapper.css('display'));
                                        if($(filter_wrapper).css('display') == "none"){
                                            $("#filter_wrapper").css("display", "inline-block");
                                            $("#items_wrapper").css("width", "58%");
                                        } else {
                                             $("#filter_wrapper").css("display", "none");
                                             $("#items_wrapper").css("width", "78%");
                                        }
                                 });
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
              "click .filterProducts": "filterProducts",
              "click .priceRange": "filterProducts",
              "click .discountRange": "filterProducts",
              "click .account_circle": "showLogin"
            }



    });


    return firstView;
});