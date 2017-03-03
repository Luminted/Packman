<?php
@session_start();
ob_start();
require('connect.php');
$userId = $_GET['userId'];

$query = mysqli_query($conn,"UPDATE David_Zoltan_Users SET admin = 1 WHERE id = '$userId'");
header("Location: ../index.php");

?>