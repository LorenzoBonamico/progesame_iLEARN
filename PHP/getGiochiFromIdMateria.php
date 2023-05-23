<?php
header('Access-Control-Allow-Origin: *');
session_start();
require("config.php");
//idmateria
$idmateria = mysqli_real_escape_string($conn, $_GET['idMateria']);
$entrato = false;
//giochi
	$giochi = '{ "materia" : {';
 if($result = $conn->query("SELECT iLEARN_Giochi.IdGioco, iLEARN_Giochi.Nome, iLEARN_Giochi.Descrizione, iLEARN_Giochi.PercorsoGioco, iLEARN_Giochi.PercorsoIcona, iLEARN_materie.Nome as 'NomeMateria', iLEARN_materie.Descrizione as 'DescrizioneMateria', iLEARN_materie.Foto FROM iLEARN_Giochi, iLEARN_materie where  iLEARN_Giochi.idMateria=iLEARN_materie.IdMateria AND iLEARN_Giochi.idMateria=$idmateria"))
    if($result->num_rows){
        while($row = $result->fetch_object()){
          if($entrato == false)
          {
            $giochi.='"Nome": "'.$row->NomeMateria.'",';
            $giochi.='"Foto": "'.$row->Foto.'",';
            $giochi.='"Descrizione": "'.$row->DescrizioneMateria.'"}';
            $giochi.=', "giochi" : [';
            $entrato = true;
          } 
          $giochi.=' { "idGioco": "'.$row->IdGioco.'",';
           $giochi.='  "Nome": "'.$row->Nome.'",';   
           $giochi.='  "Descrizione": "'.$row->Descrizione.'",';   
           $giochi.='  "PercorsoGioco": "'.$row->PercorsoGioco.'",';   
           $giochi.='"PercorsoIcona": "'.$row->PercorsoIcona.'"},';
         }
         $giochi = substr($giochi, 0, -1);
        $result->free();       
    }
         $giochi.=']}';
         header("Content-Type: application/json");
         echo $giochi;
?>