"use strict"
var result = null;
var giochi = null;
var idmateria = null;
window.onload=function(){

    idmateria=findGetParameter("idmateria");
    console.log(idmateria);
    if(idmateria==null)
        location.href="index.html";
    $.get("https://provalbvallauri.altervista.org/progesame_iLEARN/PHP/getGiochiFromIdMateria.php",{idMateria:idmateria}, function(data){
        result = data;
    }).done(function () {
        giochi = result;
        giochi = JSON.parse(giochi).giochi;
        console.log(giochi);
        caricaGiochi();
    });
};

function caricaGiochi(){
    for (let i = 0; i < giochi.length; i++) {
        var div=$('<div id="gioco_'+ giochi[i].idgioco + '" class="divgioco col-lg-4 col-md-6 d-flex align-items-stretch aos-init aos-animate" data-aos="fade-up">'
        +'<div class="icon-box">'
        +  '<div class="icon"><i class="bx bxl-dribbble"></i></div>'
        +  '<h4><a href="">'+ giochi[i].Nome + '</a></h4>'
        +  '<p>'+giochi[i].Descrizione + '</p>'
        + '</div>'
        + '</div>');
        div.appendTo('#containerGiochi');
    }

    $(".divgioco").click(function(){
        let idgioco=$(this).attr("id").split("_")[1];
        //location.href="giochi.html?idmateria="+idmateria;
    });
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}