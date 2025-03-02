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
    'app'
], function(app){
    new app();
});