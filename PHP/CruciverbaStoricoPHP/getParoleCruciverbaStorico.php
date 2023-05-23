<?php
header('Access-Control-Allow-Origin: *');
session_start();
require("../config.php");
//parole
	$parole = '{"parole":[';
 if($result = $conn->query("SELECT * FROM iLEARN_cruciverbaStorico"))
    if($result->num_rows){
        while($row = $result->fetch_object()){
           $parole.=' { "word": "'.$row->Parola.'",';
           $parole.='"clue": "'.$row->Descrizione.'"},';
         }
         $parole = substr($parole, 0, -1);
        $result->free();       
    }
         $parole.=']}';
         echo $parole;
?>