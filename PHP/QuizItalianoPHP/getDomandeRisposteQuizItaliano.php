<?php
header('Access-Control-Allow-Origin: *');
session_start();
require("../config.php");
//Quiz
	$quiz = '{"quiz":[';
 if($result = $conn->query("SELECT * FROM iLEARN_quizItaliano"))
    if($result->num_rows){
        while($row = $result->fetch_object()){
        	$risposta = $row->RispostaCorretta;
           $quiz.=' { "question": "'.$row->Domanda.'",';
           $quiz.=' "answers": [ ';
           $quiz.='{ "text": "'.$row->Risposta1.'", "correct": '.(($risposta == "1")?"true":"false").'},';
           $quiz.='{ "text": "'.$row->Risposta2.'", "correct": '.(($risposta == "2")?"true":"false").'},';
           $quiz.='{ "text": "'.$row->Risposta3.'", "correct": '.(($risposta == "3")?"true":"false").'},';
           $quiz.='{ "text": "'.$row->Risposta4.'", "correct": '.(($risposta == "4")?"true":"false").'}]},';
         }
         $quiz = substr($quiz, 0, -1);
        $result->free();       
    }
         $quiz.=']}';
         echo $quiz;
?>