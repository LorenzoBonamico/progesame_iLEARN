<?php
header('Access-Control-Allow-Origin: *');
$hostname = "localhost";
$username = "provalbvallauri";
$password = "";
$dbname = "my_provalbvallauri";

$conn = mysqli_connect($hostname, $username, $password, $dbname);
if(!$conn){
    echo "Database connection error".mysqli_connect_error();
}
?>