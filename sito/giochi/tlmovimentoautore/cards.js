const cards = document.querySelectorAll('.card');
const addCard = document.querySelector('#addCard');
var result;
var Autori=null;

/* Card Logic */
const createCard = (autore) => {
  $("#btnMostraCorrezioni").hide();
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('draggable', 'true');
  card.id = autore.idAutore;
  card.ondragstart = onDragStart;
  card.ondragend = onDragEnd;
  appendImage(card,autore);
  return card;
}

const appendImage = (card,autore) => {
    const image = new Image(100, 85);
    image.src = autore.PercorsoIcona;
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


$.get("https://provalbvallauri.altervista.org/progesame_iLEARN/PHP/MovimentoAutorePHP/getAutoridragandDrop.php.php",{}, function(data){
  result = data;
}).done(function () {
  Autori = result;
  Autori = JSON.parse(Autori).autori;
  caricaAutori();

  $("#btnFine").click(function(){
    if($("#bank").children().length == 0)
    {
    var cards=$(".card");
    var corretto=true;
    for (let i = 0; i < cards.length; i++) {
      const card = $(cards[i]);
      idautore=card.attr("id");
      idMovimento=card.parent().attr("id").split("_")[1];
      for(let j=0;j<Autori.length;j++){
        const autore=Autori[j];
        if(autore.idAutore==idautore){ 
          if(autore.id_movimento!=idMovimento)
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
  if($("#bank").children().length == 0)
  {
    var cards=$(".card");
    var corretto=true;
    for (let i = 0; i < cards.length; i++) {
      const card = $(cards[i]);
      idautore=card.attr("id");
      idMovimento=card.parent().attr("id").split("_")[1];
      for(let j=0;j<Autori.length;j++){
        const autore=Autori[j];
        if(autore.idAutore==idautore){
          if(autore.id_movimento!=idMovimento)
          {
            $("#" + autore.idAutore).appendTo("#movimento_" + autore.id_movimento);
          }
        }
      }
    }
  }
});

});

function caricaAutori(){
  Autori.forEach(autore => {
    const card = createCard(autore);
    const bank = document.querySelector('#bank');
    bank.appendChild(card);
    $("#" + autore.idAutore).attr("data-hover", autore.Nome);
    $("#" + autore.idAutore).addClass("hovertext");
  });
} 