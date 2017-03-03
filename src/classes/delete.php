<?php
@session_start();
ob_start();
require('connect.php');
$userId = $_GET['userId'];
$query = mysqli_query($conn,"DELETE FROM David_Zoltan_Users WHERE id = '$userId'");
header("Location: ../index.php");

?>