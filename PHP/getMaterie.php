<?php
header('Access-Control-Allow-Origin: *');
session_start();
require("config.php");
//materie
	$materie = '{ "materie" : [';
 if($result = $conn->query("SELECT * FROM iLEARN_materie"))
    if($result->num_rows){
        while($row = $result->fetch_object()){
           $materie.=' { "idMateria": "'.$row->IdMateria.'",';
           $materie.='  "Nome": "'.$row->Nome.'",';     
           $materie.='"PercorsoIcona": "'.$row->PercorsoIcona.'"},';
         }
         $materie = substr($materie, 0, -1);
        $result->free();       
    }
         $materie.=']}';
         echo $materie;
?>