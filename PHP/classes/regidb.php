<!DOCTYPE html>
<html>
<head>
<script   src="https://code.jquery.com/jquery-3.1.1.min.js"   integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="   crossorigin="anonymous"></script>
<script src="../js/scriptek.js" ></script>
<link rel="stylesheet" type="text/css" href="../template/style.css">
</head>
<body>
<?php 

$config = "../config.ini";


if(file_exists($config)){
echo "Van config!";
if(isset($_GET["kesz"]))
{
	echo '<script type="text/javascript">';
		echo '$(".firstpage).hide();';
		echo '$(".thirdpage).hide();';
		echo '</script>';
	echo "<center><h1>Telepítés befejeződött!</h1></center>";
echo "<center><h2>Kérjük töröld a 'regidb.php' filet a classes könytárból!</h2></center>";
echo '<center><a href="../index.php">Vissza a föoldalra</a></center>';

}
if(isset($_GET["reg"]))
	{
		echo '<script type="text/javascript">';
		echo '$(".firstpage").hide();';
		echo '</script>';
		echo '<div class="thirdpage">
<h1>Hozz létre egy Admin fiókot!</h1>
<form action="reguser.php" method="post">
Felhasználónév : <input type="text" name="usrname">
Jelszó : <input type="password" name="pass">
E-Mail: <input type="text" name="mail">
Admin: <input type="checkbox" name="admin">
<input type="submit" value="Elküld">
</form>
</div>';

	}

}
else {
	echo "Nincs!";
	$server = "";
	$dbname = "";
	$user = "";
	$pw ="" ;
	
?>
<div class="firstpage">
<h1>A weboldal PHP,HTML,CSS,JS,JQUERY nyelveken íródott.</h1>
<h2>A sima felhasználó egy üdvözlő feliratot lát belépés után,</h2>
<h2> míg az adminisztrátor a felhasználók listáját és tudja őket adminisztrátori</h2>
<h2> jogokkal felruházni,törölni és bannolni.</h2>
<br>
<h3>A weboldalon számos hibakezelés nem valósult meg.<h3>
<button id="next">Tovább</button>
</div>
<div class="secondpage">
<h1>Kérem regisztrálja az adatbázist: </h1>
<form action="regdb.php" method="get">
  Elérési cím: <input type="text" name="hoszt"><br>
  Adatbázis felhasználónév: <input type="text" name="dbuser"><br>
  Adatbázis jelszó: <input type="password" name="dbpass"><br>
  Adatbázis neve : <input type="text" name="dbname"><br>
  <input type="submit" value="Elküld">
</form>
</div>


<?php } ?>
</body>
</html>