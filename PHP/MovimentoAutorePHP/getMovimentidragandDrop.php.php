<?php
header('Access-Control-Allow-Origin: *');
session_start();
require("../config.php");
//movimenti
	$movimenti = '{ "movimenti" : [';
 if($result = $conn->query("SELECT * FROM iLEARN_dragandropMovimenti"))
    if($result->num_rows){
        while($row = $result->fetch_object()){
           $movimenti.=' { "idMovimento": "'.$row->idMovimento.'",';
           $movimenti.='"NomeMovimento": "'.$row->NomeMovimento.'"},';
         }
         $movimenti = substr($movimenti, 0, -1);
        $result->free();       
    }
         $movimenti.=']}';
         echo $movimenti;
?>