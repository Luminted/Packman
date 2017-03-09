<?php 

$data = explode("\n", file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/david_zoltan/config.ini"));
$text = file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/david_zoltan/config.ini");


$conn = new mysqli($data[0],$data[1],$data[2],$data[3]);
if ($conn->connect_error) {
    die("Csatlakozási hiba: " . $link->connect_error);
} 

?>