<?php
header('Access-Control-Allow-Origin: *');
session_start();
require("../config.php");
//autori
	$autori = '{ "autori" : [';
 if($result = $conn->query("SELECT * FROM iLEARN_dragandropAutori"))
    if($result->num_rows){
        while($row = $result->fetch_object()){
           $autori.=' { "idAutore": "'.$row->idAutore.'",';
           $autori.='"Nome": "'.$row->NomeAutore.'",';  
           $autori.='"PercorsoIcona": "'.$row->PercorsoIcona.'",';  
           $autori.='"id_movimento": "'.$row->id_movimento.'"},';
         }
         $autori = substr($autori, 0, -1);
        $result->free();       
    }
         $autori.=']}';
         echo $autori;
?>