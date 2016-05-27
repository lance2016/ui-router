var myCtrls = angular.module('myCtrls',[]);



//登录

myCtrls.controller('login', function($scope,$http,$state) {

$scope.pageClass="login";
$scope.a=function(){
	if($scope.user==null||$scope.password==null)
						;
	else{
		$http({
					method:'GET',
					url:"php/edit.php",
					params: {action:"login",user:$scope.user,password:$scope.password}//show操作
				}).success(function(data,status,headers,config){
					//data = angular.fromJson(data);	
					//$scope.datas= data;
					if(data=="成功登录")
					{
						alertify.success(data);
						setTimeout(function(){$state.go('index.main.welcome')},500);
					}
					else alertify.error(data);
					
				}).error(function(){

				}); 
}}
});



//增加书籍
myCtrls.controller('AddBook', function($scope,$http) {
		
		$scope.addBook=function(){
		$http({
					method:'GET',
					url:"php/edit.php",
					params: {
								action:"addbook",
								bookid: $scope.bookid,
								bookname: $scope.bookname,
								author:$scope.author,
								press:$scope.press,
								price : $scope.price,
								memo:$scope.memo
							}//addbook操作
				})
		.success(function(data, status) {
			$scope.status = status;
			$scope.data = data;
			$scope.result = data; //双向数据绑定，在前台页面显示result;{{result}}
		if($scope.result=="增加成功")
			alertify.success("增加成功");
		else 
			alertify.error("增加失败");
		})
		.error(function(data, status) {
			$scope.data = data || "Request failed";
			$scope.status = status;			
		});
		}
	});




//搜索
myApp.controller('SearchCtrl',function SearchCtrl($scope, $http) {
		$scope.selectedSite="bookid";
	 // $scope.names = ["编号", "题目", "作者"];
		  $scope.sites = {
	    编号 : "bookid",
	    题目 : "bookname",
	    作者 : "author",
		 价格 : "price",
		出版社 : "press",
	    备注 : "memo"
	}; 
	
	$scope.search = function() {
		
		$http({
					method:'GET',
					url:"php/edit.php",
					params: {
								action:"search",
								select: $scope.selectedSite,
								keywords:$scope.keywords
								
							}//查找操作
				})
		.success(function(data, status) {
			$scope.status = status;
			$scope.data = data;
			$scope.result = data; // Show result from server in our <pre></pre> element
			if($scope.result=="失败")
			{
				$scope.result="";
				alertify.error("查找失败");
			}
				
			else 
			{
				alertify.success("查询完成");
				
			}
		})
		.
		error(function(data, status) {
			$scope.data = data || "Request failed";
			$scope.status = status;			
		});
	};
});

//图书展示
myApp.controller('Bookshow',['$scope','$http','$state',
	function SearchCtrl($scope, $http, $state,$route) {
	
		$scope.getBook = function(){
			$http({
				method:'GET',
				url:"php/edit.php",
				params: {action:"show"}//show操作
			}).success(function(data,status,headers,config){
				data = angular.fromJson(data);	
				$scope.datas= data;
				//alertify.success(data.bookid);
			}).error(function(){

			}); 
		}
	$scope.getBook();
	//删除书籍
	$scope.DeleteBook = function(id){
		//	reset();
			var r = alertify.confirm("确定要删除 <strong>"+id+"</strong> 吗?",function (e){
				if (e) {
					$http({
						method:'GET',
						url:'php/edit.php',
						params: {action:"del",bookid:id}
					}).success(function(data,status,headers,config){
						$scope.getBook();
						alertify.success("删除成功");						
					}).error(function(data,status,headers,config){
						alertify.error("删除失败,请检查网络连接");
					});						
				} else {
					alertify.error("操作取消");
				}
			}); 			
		}
}]);

//写文章
myCtrls.controller('WriteArticle',['$scope','$http','$state','msgBox',
	function($scope,$http,$state,msgBox){
		CKEDITOR.replace('WriteArticleEditor');	
		//文章提交
		$scope.Submit = function(title,author,mid){			
			$scope.content = $('.cke_wysiwyg_frame').contents().find('.cke_editable').html();
			$http({
						method:'GET',
						url:'php/edit.php',
						params: {action:"writearticle",title:title,author:author,mid:mid,content:$scope.content}
				})
				.success(function(data,status,headers,config){
					msgBox.msg(data);
					setTimeout(function(){$state.go('index.write')},500);
				}).error(function(data,status,headers,config){
				}); 
		}

	}
]);

//编辑文章
myCtrls.controller('ReWriteArticle',['$stateParams','$scope','$http','$state','msgBox',
	function($stateParams,$scope,$http,$state,msgBox){
	// $scope.url="php/find.php";
		/* $http.post($scope.url, { 
			"bookid" : $stateParams.bookid
		}) */
		$http({
						method:'GET',
						url:'php/edit.php',
						params: {action:"editbook",bookid : $stateParams.bookid}
				})
		.success(function(data, status) {
			data = angular.fromJson(data);	
			$scope.bookid=$stateParams.bookid;
			$scope.status = status;
			$scope.bookid=data[0].bookid;
				$scope.bookname=data[0].bookname;
				$scope.author=data[0].author;
				$scope.press=data[0].press;
				$scope.price=data[0].price;
				$scope.memo=data[0].memo;
				$scope.id=data[0].bookid;//用于更改bookid，在前台隐藏
				alertify.success("加载完成");
		})
		.
		error(function(data, status) {
			$scope.data = data || "Request failed";
			$scope.status = status;			
		});
		 

//文章提交(编辑后进行更新)
		$scope.Submit = function(bookid,bookname,author,press,price,memo){			
			
			/* $http.post("php/update.php",
			{"bookid" : $scope.bookid,
			"bookname" : $scope.bookname,
			"author":$scope.author,
			"press":$scope.press,
			"price" : $scope.price,
			"memo":$scope.memo ,
			"id":$scope.id
			},
				{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
				
			}) */
			$http({
						method:'GET',
						url:'php/edit.php',
						params: {action:"updatebook",
							bookid : $scope.bookid,
							bookname : $scope.bookname,
							author:$scope.author,
							press:$scope.press,
							price : $scope.price,
							memo:$scope.memo ,
							id:$scope.id	
							}		
				})
			.success(function(data,status,headers,config){
				if(data=="更新成功")
					alertify.success(data);
				else
					alertify.error(data);
				setTimeout(function(){$state.go('index.article')},500);
			}).error(function(data,status,headers,config){
			}); 
		}

	}
]);




//改变a标签的颜色(仅用于本项目，由于bootstrap的样式冲突，所以很捉急-_-!)
myCtrls.controller('changeColor',['$scope',
	function($scope){
		$scope.change = function($event){
			$($event.target).parent().siblings().find('a').removeClass("a-color-active");
			$($event.target).parent().siblings().find('a').addClass("a-color");
			$($event.target).addClass("a-color-active");
		}
	}
]);
//改变a标签的背景颜色(仅用于本项目，由于bootstrap的样式冲突，所以很捉急-_-!)
myCtrls.controller('changeBgColor',['$scope',
	function($scope){
		$scope.change = function($event){
			$($event.target).siblings().removeClass("a-bgcolor-active");
			$($event.target).siblings().addClass("a-bgcolor");
			$($event.target).addClass("a-bgcolor-active");
		}	
	}
]); 
 
