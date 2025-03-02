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
        'education': 'models/education',
        'skills': 'models/skills',
        'overview': 'models/overview',
        'experience': 'models/experience',
        //'setAccount': 'models/setAccount',
        //'cookwares': 'collections/cookwares',
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
    './view/experience',
    './view/education',
    './view/contact',
    './view/overview',
    './view/skills',

], function(app, experience, education, contact, overview, skills){
    //domReady(function () {
        new app();
        //new landing();
        //new summary();
        //new success();
        //new account();
        //new order();
    //});
});