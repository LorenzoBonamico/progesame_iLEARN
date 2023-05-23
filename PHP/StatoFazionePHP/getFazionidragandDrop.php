<?php
header('Access-Control-Allow-Origin: *');
session_start();
require("../config.php");
//fazioni
	$fazioni = '{ "fazioni" : [';
 if($result = $conn->query("SELECT * FROM iLEARN_dragandropFazioni"))
    if($result->num_rows){
        while($row = $result->fetch_object()){
           $fazioni.=' { "idFazione": "'.$row->id.'",';
           $fazioni.='  "Nome": "'.$row->Nome.'",';  
           $fazioni.='"PercorsoIcona": "'.$row->PercorsoIcona.'"},';
         }
         $fazioni = substr($fazioni, 0, -1);
        $result->free();       
    }
         $fazioni.=']}';
         echo $fazioni;
?>