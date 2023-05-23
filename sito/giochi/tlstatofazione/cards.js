const cards = document.querySelectorAll('.card');
const addCard = document.querySelector('#addCard');
var result;
var Stati=null;

/* Card Logic */
const createCard = (stato) => {
  $("#btnMostraCorrezioni").hide();
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('draggable', 'true');
  card.id = stato.idStato;
  card.ondragstart = onDragStart;
  card.ondragend = onDragEnd;
  appendImage(card,stato);
  return card;
}

const appendImage = (card,stato) => {
    const image = new Image(100, 85);
    image.src = stato.PercorsoIcona;
    image.style.pointerEvents = 'none';
    card.appendChild(image);
}

const onDragStart = (event) => {
  event.dataTransfer.setData('id', event.target.id);
  setTimeout(() => {
    event.target.style.visibility = 'hidden';
  }, 50)
}

const onDragEnd = (event) => {
  event.target.style.visibility = 'visible';
}

cards.forEach((card, index) => {
  card.ondragstart = onDragStart;
  card.ondragend = onDragEnd;
})


$.get("https://provalbvallauri.altervista.org/progesame_iLEARN/PHP/StatoFazionePHP/getStatodragandDrop.php",{}, function(data){
  result = data;
}).done(function () {
  Stati = result;
  Stati = JSON.parse(Stati).stati;
  caricaStati();

  $("#btnFine").click(function(){
    if($("#bank").children().length == 0)
    {
    var cards=$(".card");
    var corretto=true;
    for (let i = 0; i < cards.length; i++) {
      const card = $(cards[i]);
      idStato=card.attr("id");
      idFazione=card.parent().attr("id").split("_")[1];
      for(let j=0;j<Stati.length;j++){
        const stato=Stati[j];
        if(stato.idStato==idStato){
          if(stato.id_fazione!=idFazione)
          corretto=false;
        }
      }
    }
    if(corretto==false)
    alert("hai perso");
    else
    alert("hai vinto");

    $("#btnMostraCorrezioni").show();

  }
  else
  {
    alert("finisci di giocare");
  }
});

$("#btnMostraCorrezioni").click(function () {
  var cards=$(".card");
  for (let i = 0; i < cards.length; i++) {
    const card = $(cards[i]);
    idStato=card.attr("id");
    idFazione=card.parent().attr("id").split("_")[1];
    for(let j=0;j<Stati.length;j++){
      const stato=Stati[j];
      if(stato.idStato==idStato){
        if(stato.id_fazione!=idFazione)
        {
          $("#" + stato.idStato).appendTo("#fazione_" + stato.id_fazione);
        }
      }
    }
  }
});
});



function caricaStati(){
  Stati.forEach(stato => {
    const card = createCard(stato);
    const bank = document.querySelector('#bank');
    bank.appendChild(card);
    $("#" + stato.idStato).attr("data-hover", stato.Nome);
    $("#" + stato.idStato).addClass("hovertext");
  });
}