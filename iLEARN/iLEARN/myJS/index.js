"use strict"
var result = null;
var materie = null;
window.onload=function(){
    $.post("https://provalbvallauri.altervista.org/progesame_iLEARN/PHP/getMaterie.php",{}, function(data){
        result = data;
    }).done(function () {
        materie = result;
        materie = JSON.parse(materie).materie;
        console.log(materie);
        caricaMaterie();
    });
};

function caricaMaterie(){
    for (let i = 0; i < materie.length; i++) {
        var div=$('<div id="materia_'+ materie[i].idMateria + '" class="divmateria col-lg-4 col-md-6 d-flex align-items-stretch aos-init aos-animate" data-aos="fade-up">'
        +'<div class="icon-box">'
        +  '<div class="icon"><i class="bx bxl-dribbble"></i></div>'
        +  '<h4><a>'+ materie[i].Nome + '</a></h4>'
        +  '<p>Scegli i minigiochi della materia:'+ materie[i].Nome + '</p>'
        + '</div>'
        + '</div>');
        div.appendTo('#containerMaterie');
    }

    $(".divmateria").click(function(){
        let idMateria=$(this).attr("id").split("_")[1];
        location.href="giochi.html?idmateria="+idMateria;
    });
}