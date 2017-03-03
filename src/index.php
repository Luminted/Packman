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
require('classes/connect.php');
$config = "config.ini";
if(isset($_GET['logout']))
{
	session_destroy();
	header("Refresh:0; url=index.php");
}

if(file_exists($config)){

if(isset($_SESSION["username"]))
{
echo "<center><h1>Üdvözöljük az oldalon</h1></center>";
echo '<center>Be vagy jelentkezve mint :' ;
echo ($_SESSION["username"]);
echo '<br>';
	if($_SESSION["admin"] == "1")
	{
		echo " Admin vagy.</center>";
		

echo '<table align="center" border="1px;">'; ?>
	<tr>
		<td>
		<span>ID</span>
		</td>
		<td width="400px" style="text-align: center;">
		Felasználó neve
		</td>
		<td width="80px" style="text-align: center;">
		LEgutóbbi belépés
		</td>
		<td width="80px" style="text-align: center;">
		Regisztráció ideje
		</td>
		<td width="80px" style="text-align: center;">
		Admin-e
		</td>
		<td width="80px" style="text-align: center;">
		Legyen-e admin
		</td>
		<td width="80px" style="text-align: center;">
		Banolva van-e
		</td>
		<td width="80px" style="text-align: center;">
		Ban
		</td>
		<td width="80px" style="text-align: center;">
		Felhasználó törlése
		</td>
	</tr>
</center>
<body>


</body>
</html>


<?php
	$check = mysqli_query($conn,"SELECT * FROM david_zoltan_users");
	
	if(mysqli_num_rows($check) !=0) {
		while ($row = mysqli_fetch_assoc($check)){
		echo "<tr>";
		$admin ="";
		if($row['admin'] == 1) {
			$admin = "Admin";
		}
		else{
			$admin = "Nem admin";
		}
		
		$ban = $row['ban'];
		if($ban) {
			$ban = "Banolva";
		} else {
			$ban = "Nincs banolva";
		}
		echo "<td>".$row['id']."</td>";
		echo "<td> ".$row['username']."</td>";
		echo "<td>".$row['lastlogin']."</td>";
		echo "<td>".$row['reg_date']."</td>";
		echo "<td>".$admin."</td>";
		echo "<td> <a href='classes/admin_add.php?userId=".$row['id']."'>Legyen </a></td>";
		echo "<td>".$ban."</td>";
		echo "<td> <a href='classes/ban.php?userId=".$row['id']."'>Ban </a></td>";
		echo "<td> <a href='classes/delete.php?userId=".$row['id']."'>Törlés</a></td>";
		echo "</tr>";
		}
	}else{
	echo "no users found";
	}
	echo "</table>";
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