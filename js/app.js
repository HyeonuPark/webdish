angular.module('webdish', ['ui.router', 'ui.bootstrap', 'webdish.controller'])

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('main', {
                url : '/',
                views : {
                    sidemenu : {
                        templateUrl : 'template/main_sidemenu.html',
                        controller : 'mainSidemenuCtrl'
                    },
                    center : {
                        templateUrl : 'template/main_center.html',
                        controller : 'mainCenterCtrl'
                    }
                }
            })

            .state('blog', {
                url : '/blog/:userId',
                views : {
                    sidemenu : {
                        templateUrl : 'template/blog_sidemenu.html',
                        controller : 'blogSidemenuCtrl'
                    },
                    center : {
                        templateUrl : 'template/blog_center.html',
                        controller : 'blogCenterCtrl'
                    }
                }
            })

            .state('posting', {
                url : '/blog/:userId/:postingId',
                views : {
                    sidemenu : {
                        templateUrl : 'template/posting_sidemenu.html',
                        controller : 'postingSidemenuCtrl'
                    },
                    center : {
                        templateUrl : 'template/posting_center.html',
                        controller : 'postingCenterCtrl'
                    }
                }
            })

            .state('wiki', {
                url : '/wiki/',
                views : {
                    sidemenu : {
                        templateUrl : 'template/wiki_sidemenu.html',
                        controller : 'wikiSidemenuCtrl'
                    },
                    center : {
                        templateUrl : 'template/wiki_center.html',
                        controller : 'wikiCenterCtrl'
                    }
                }
            })

        $urlRouterProvider.otherwise('/');
    }])