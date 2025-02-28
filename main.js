require.config({
    paths: {
        'rivets': 'libs/rivets-min',
        'jquery': 'libs/jquery-min',
        'jquery-ui': 'libs/jquery-ui',
        'underscore': 'libs/underscore-min',
        'backbone': 'libs/backbone-min',
        'templates': '/templates',
        'text': 'libs/text',
        'pagebus': 'libs/pagebus',
        'page': 'libs/page',
        'slick': 'slick',
        'model': 'models/model',
        'orders': 'models/orders',
        'account': 'models/account',
        'setAccount': 'models/setAccount',
        'cookwares': 'collections/cookwares',
        
    },
    shim: {
     'jquery-ui': {
            deps: ['jquery'],
        },
    'rivets': {
            deps: ['jquery'],
        },
    }
});

require([
    //'domReady', // optional, using RequireJS domReady plugin
    'app',
    './view/landing',
    './view/summary',
    './view/success',
    './view/account',
    './view/order',

], function(app, landing, summary, success, account, order){
    //domReady(function () {
        new app();
        //new landing();
        //new summary();
        //new success();
        //new account();
        //new order();
    //});
});