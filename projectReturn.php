	/*该页面并不用于显示,只是用于返回projectTest数据库的(projectName)等数据*/
	<?php
	$conn = mysqli_connect("localhost","yukishita","happy134");
	mysqli_select_db($conn,"projectTest");
	$query = "select projectName from project";
	$result = mysqli_query($conn,$query);
	$datanum = mysqli_num_rows($result);
	echo "<ul id='projectList'>";
	if( mysqli_num_rows($result) < 1){
		echo "<li> 目前还没有任何项目!</li>";
	}else{
		for($i=0;$i<$datanum;$i++){
			$info = mysqli_fetch_array($result);
			echo "<li>".$info['projectName']."</li>";
		}
	}
	echo "</ul>";
	echo "<ul id='taskList'>";
	$query = "select taskName from task";
	$result = mysqli_query($conn,$query);
	$datanum = mysqli_num_rows($result);
	if( mysqli_num_rows($result) < 1){
		echo "<li> 目前还没有任何任务!</li>";
	}else{
		for($i=0;$i<$datanum;$i++){
			$info = mysqli_fetch_array($result);
			echo "<li>".$info['taskName']."</li>";
		}
	}
	echo "</ul>";
	echo "<ul id='todoList'>";
	$query = "select todoName from schedule";
	$result = mysqli_query($conn,$query);
	$datanum = mysqli_num_rows($result);
	if( mysqli_num_rows($result) < 1){
		echo "<li> 目前还没有任何日程!</li>";
	}else{
		for($i=0;$i<$datanum;$i++){
			$info = mysqli_fetch_array($result);
			echo "<li>".$info['todoName']."</li>";
		}
	}
	echo "</ul>";
	echo "<ul id='personList'>";
	$query = "select pName from person";
	$result = mysqli_query($conn,$query);
	$datanum = mysqli_num_rows($result);
	if( mysqli_num_rows($result) < 1){
		echo "<li> 目前还没有任何成员!</li>";
	}else{
		for($i=0;$i<$datanum;$i++){
			$info = mysqli_fetch_array($result);
			echo "<li>".$info['pName']."</li>";
		}
	}
	echo "</ul>";
	mysqli_close($conn);
	?>