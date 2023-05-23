<?php
header('Access-Control-Allow-Origin: *');
session_start();
require("../config.php");
//stati
	$stati = '{ "stati" : [';
 if($result = $conn->query("SELECT * FROM iLEARN_dragandropStati"))
    if($result->num_rows){
        while($row = $result->fetch_object()){
           $stati.=' { "idStato": "'.$row->id.'",';
           $stati.='  "Nome": "'.$row->Nome.'",';  
           $stati.='  "id_fazione": "'.$row->id_fazione.'",';  
           $stati.='"PercorsoIcona": "'.$row->PercorsoIcona.'"},';
         }
         $stati = substr($stati, 0, -1);
        $result->free();       
    }
         $stati.=']}';
         echo $stati;
?>