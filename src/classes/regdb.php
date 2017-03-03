<?php
 $dbhost = $_GET["hoszt"];
 $dbuser = $_GET["dbuser"];
 $dbpass = $_GET["dbpass"];
 $dbname = $_GET["dbname"];
 

 echo  "Ez jött át: $dbhost ";
$cfg = fopen($_SERVER['DOCUMENT_ROOT'] . "/david_zoltan/config.ini","wb");

$str = "$dbhost\n";
fwrite($cfg, $str);
$str = "$dbuser\n";
fwrite($cfg, $str);
$str = "$dbpass\n";
fwrite($cfg, $str);
$str = "$dbname\n";
fwrite($cfg, $str);
fclose($cfg);

$link = new mysqli($dbhost, $dbuser, $dbpass , $dbname);
if ($link->connect_error) {
    die("Connection failed: " . $link->connect_error);
} 


$sql = "CREATE TABLE David_Zoltan_Users (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
username VARCHAR(30) NOT NULL,
pass VARCHAR(500) NOT NULL,
email VARCHAR(50),
admin TINYINT(1),
ban TINYINT(1),
lastlogin TIMESTAMP,
reg_date TIMESTAMP
)";
if ($link->query($sql) === TRUE) {
    echo "Sikeres";
} else {
    echo "Hiba: " . $link->error;
}

header("Location: regidb.php?reg");
 

 ?>