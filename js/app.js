var myApp = angular.module('myApp', [
	'ui.router','myCtrls','myServices','myDirectives'
]);

myApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'tpls/index.html'
                },
                'topbar@index': {
                    templateUrl: 'tpls/topbar.html'
                },
                'main@index': {
                    templateUrl: 'tpls/indexconfig.html'
                },
            }
        })
		//登陆界面
		 .state('login', {
            url: '/login',
            views: {
                '': {
                    templateUrl: 'tpls/login.html'
                }
            }
        }) 
		
		.state('index.main', {
            url: '/main',
            views: {
                'main@index': {
                    templateUrl: 'tpls/indexconfig.html'
                }
            }
        })
		//首页侧边栏
        .state('index.main.welcome', {
            url: '/welcome',
            templateUrl: 'tpls/welcome.html'
        })
		.state('index.main.paragraph', {
            url: '/paragraph',
            templateUrl: 'tpls/paragraph.html'
        })
		 .state('index.main.picture', {
            url: '/picture',
            templateUrl: 'tpls/picture.html'
        })
		
		
		
		
		
		//切换到频道table
		.state('index.search', {
            url: '/search',
             views: {
                'main@index': {
                    templateUrl: 'tpls/search.html'
                }
            }
        })
		//切换到频道文章列表
		.state('index.article', {
            url: '/article',
             views: {
                'main@index': {
                    templateUrl: 'tpls/articlelist.html'
                }
            }
        })
		
		
		//切换到文章列表-写文章
		 .state('index.addbook', {
            url: '/addbook',
            views: {
                'main@index': {
                    templateUrl: 'tpls/addbook.html'
                }
            }
        })
		
		
		//文章发布
        .state('index.write', {
            url: '/write',
            views: {
                'main@index': {
                    templateUrl: 'tpls/write.html'
                }
            }
        })
		
		//文章编辑
        .state('index.rewrite', {
            url: '/rewrite/:bookid',
            views: {
                'main@index': {
                    templateUrl: 'tpls/rewrite.html'
                }
            }
        })
		
		
		
		
		
});
  