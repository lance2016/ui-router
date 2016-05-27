<?php
//1.连接数据库
try{
	$pdo = new PDO("mysql:host=localhost;dbname=javaweb;","root","5213");
}catch(PDOException $e){
	die("数据库连接失败".$e->getMessage());
}
//2.通过action的值做地应操作
switch($_GET['action']){

//登录验证 
	 case "login":
		$username=$_GET['user'];
		$password=$_GET['password'];
		$pdo->query("SET NAMES utf8");
		$sql="select * from admin where user='".$username."' and password='".$password."'";
		$stmt = $pdo->query($sql);
		if(!empty($stmt) AND $stmt->rowCount() > 0){
			session_start();
			$_SESSION['user']=$username;
			echo("成功登录");
		}
		else 
			echo "用户名或密码错误";
	 break;
	 
//addbook操作
	case "addbook":
	$bookid = $_GET['bookid'];
	$bookname = $_GET['bookname'];
	$author = $_GET['author'];
	$press = $_GET['press'];
	$price = $_GET['price'];
	$memo = $_GET['memo'];
	
		$pdo->query("SET NAMES utf8");
		$sql = "insert into book values('".$bookid."',  '".$bookname."',  '".$author."',  '".$press."', '".$price."', '".$memo."')";
		$rw = $pdo->exec($sql);
		if($rw>0){
				echo ('增加成功');
		}else{
			echo ('增加失败');
		} 
		
	break;
	 
	 

	  
	 
	case "del": //删除操作
		$bookid = $_GET['bookid'];
		$sql = "delete from book where bookid='{$bookid}'";
		$pdo->exec($sql);
		echo "<script>location.href='http://localhost/ui-router/#/index/bookshow';</script>";
	break;
	
	/* case "edit":
	//1.获取表单信息
	$name = $_POST['name'];
	$sex = $_POST['sex'];
	$age = $_POST['age'];
	$classid = $_POST['classid'];
	$id = $_POST['id'];
	
	$sql = "update stu set name='{$name}',sex='{$sex}',age={$age},classid={$classid} where id={$id}"; 
	$rw = $pdo->exec($sql);
	if($rw>0){
			echo "<script>alert('修改成功');window.location='index.php'</script>";
	}else{
		echo "<script>alert('增加失败');window.history.back();</script>";
	}
	break; */
	
	
	case "show"://展示书籍
		$pdo->query("SET NAMES utf8");
		$sql = "select * from book";		
		$data=$pdo->query($sql)->fetchAll();
		$paodata = json_encode($data);
		 echo $paodata;
	break;
	
	
	
	
	case "writearticle"://写文章
		$title=$_GET['title'];
		$author=$_GET['author'];
		$mid=$_GET['mid'];
		$content=$_GET['content'];
		$pdo->query("SET NAMES utf8");
		if($mid=="1") $mid="留言";
		else if($mid=="2") $mid="学术";
		else  $mid="其他";
		
		$sql = "insert into article values('" .$title. "','" .$author. "','" .$mid ."','".$content."')";
		$rw = $pdo->exec($sql);
		if($rw>0){
				echo ('增加成功');
		}else{
			echo ('增加失败');
		} 	
	break;
	
	
	case "search":
		$select = $_GET['select'];
		$keywords = $_GET['keywords'];
		$pdo->query("SET NAMES utf8");
	 	$sql = "select * from book where ".$select." like '%".$keywords."%'";
		  $stmt = $pdo->query($sql);
			if(!empty($stmt) AND $stmt->rowCount() > 0){
				 $datas=$pdo->query($sql)->fetchAll();
				$paodata = json_encode($datas);
				echo $paodata; 
			 }
			 else{
				echo ("失败");
			}    
	break;
	
	
//编辑书籍	
	case "editbook":
		$bookid = $_GET['bookid'];
		$pdo->query("SET NAMES utf8");
		$sql = "select * from book where bookid='".$bookid."'";
		$data=$pdo->query($sql)->fetchAll();
		 $paodata = json_encode($data);
		 echo $paodata;
			
	break;
	
//更新书籍
	case "updatebook":
		$bookid = $_GET['bookid'];
		$bookname = $_GET['bookname'];
		$author = $_GET['author'];
		$press = $_GET['press'];
		$memo = $_GET['memo'];
		$price = $_GET['price'];
		$id = $_GET['id'];
		 $pdo->query("SET NAMES utf8");
		 $sql = "update book set bookid='".$bookid."',bookname='".$bookname."',author='".$author."'press='".$press."',price='".$price."',memo='".$memo."'where bookid='".$id."'"; 
		 $rw = $pdo->exec($sql);
		 if($rw>0){
				 echo ('更新成功');
		 }else{
			 echo ('更新失败');
		 } 
	break;
}



