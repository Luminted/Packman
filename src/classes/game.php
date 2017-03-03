<?php 
ob_start();
session_start();

?>
<!DOCTYPE html>
<html>
<head>
<script   src="https://code.jquery.com/jquery-3.1.1.min.js"   integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="   crossorigin="anonymous"></script>
<script src="js/scriptek.js" ></script>
<link rel="stylesheet" type="text/css" href="template/style.css">
</head>
<body>
<?php 
require('connect.php');
$config = "../config.ini";
if(isset($_GET['logout']))
{
	session_destroy();
	header("Refresh:0; url=index.php");
}

if(file_exists($config)){

if(isset($_SESSION["username"]))
{
echo "<center><h1>Pacman</h1></center>";
echo '<center>Be vagy jelentkezve mint :' ;
echo ($_SESSION["username"]);
echo '<br>';
	if($_SESSION["admin"] == "1")
	{
		echo " Admin vagy.</center>";
		?>
		
		<table width="1024" border="0" cellspacing="0" cellpadding="0" align="center" style="background-color:black">
	<tr>
	<td><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macr...rsion=7,0,19,0" width="1024" height="450">
	<param name="movie" value="http://yourdomain.co...fflashfile.swf" />
	<param name="quality" value="high" />
	<param name="wmode" value="transparent" />
	<embed src="http://www.pacman1.net/pacman.swf" width="1024" height="450" quality="high" pluginspage="http://www.macromedi...getflashplayer" type="application/x-shockwave-flash" wmode="transparent"></embed>
	</object></td>
	</tr>
	</table>
	
	<?php
	}
	echo '<br>';
	echo "<center>Pontos idő: " . date("h:i:sa"). "</center>";
echo '<br><center><a href="index.php?logout">Kijelentkezés</a></center';
}
else {

?>
<h1>Belépés</h1>
<form action="classes/login.php">
Felhasználónév : <input type="text" name="usrname">
Jelszó : <input type="password" name="pass">
<input type="submit" value="Elküld">
</form>
<h3>Nincs felhasználód?<a href="classes/register.php">Regisztrálj</h3>







<?php
}
}
else {
	header("Location: classes/regidb.php");
die();
	}
ob_end_flush();
?>




</body>
</html> 