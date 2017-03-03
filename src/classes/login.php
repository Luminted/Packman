<?php
@session_start();
ob_start();
require('connect.php');
$username = $_GET['usrname'];
$pass = sha1($_GET['pass']);

$query = mysqli_query($conn,"SELECT * FROM `David_Zoltan_Users` WHERE username='$username' AND pass='" . $pass . "' AND ban=0");
$count = mysqli_num_rows($query);
if ($count == 1){
	while($row = mysqli_fetch_assoc($query))
	{

		if($pass == $row['pass'])
			{ 
				$_SESSION['username'] = $username;
				$_SESSION['admin'] = $row['admin'];
				$newdate = date('Y-m-d H:i:s');
				
				$q_msg = "UPDATE David_Zoltan_Users SET lastlogin = '" . $newdate . "' WHERE username='" . $username . "'";
				$query = mysqli_query($conn,$q_msg);
				/*echo $q_msg.'<br/>';
				var_dump($query);
				die();*/
				
echo "Sikeres bejelentkezés";
header("Location: ../index.php");
die();
}
	}


}else{
//3.1.3 If the login credentials doesn't match, he will be shown with an error message.
$fmsg = "Invalid Login Credentials / banned.";
echo($fmsg);
}

?>