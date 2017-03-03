<?php 
require('connect.php');
$username = $_POST['usrname'];
$pass = sha1($_POST['pass']);
$email = $_POST['mail'];
if(isset($_POST['admin']))
{
	$admin = "1";
}
else {
	$admin = "0";
}

echo ($email);
$newdate = date('Y-m-d H:i:s');
//$query = "INSERT INTO David_Zoltan_Users ('username', 'pass', 'email', 'admin', 'lastlogin', 'reg_date') VALUES ('".$username."','".$pass."','".$email."','".$admin."','".$newdate."','".$newdate."');";
$query = "INSERT INTO `david_zoltan_users` (`id`, `username`, `pass`, `email`, `admin`,`ban`, `lastlogin`, `reg_date`) VALUES (NULL, '" . $username . "', '" . $pass . "', '" . $email . "', '" . $admin . "','" . 0 . "', '" . $newdate . "', '" . $newdate . "');";
mysqli_query($conn,$query);
/*echo $query;
die();*/
mysql_close;
if($admin == "1")
{
header("Location: regidb.php?kesz");

}
else {

header("Location: ../index.php");
die();
}
?>