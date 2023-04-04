const cards = document.querySelectorAll('.card');
const addCard = document.querySelector('#addCard');
var result;
var Autori=null;

/* Card Logic */
const createCard = (autore) => {
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
    console.log(autore);
    image.src = autore.PercorsoIcona;
    image.style.pointerEvents = 'none';
    card.appendChild(image);
}

const onDragStart = (event) => {
  console.log('dragging the element');
  event.dataTransfer.setData('id', event.target.id);
  setTimeout(() => {
    event.target.style.visibility = 'hidden';
  }, 50)
}

const onDragEnd = (event) => {
  event.target.style.visibility = 'visible';
  console.log('ended the drag');
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
  console.log(Autori);
  caricaAutori();

  $("#btnFine").click(function(){
    if($("#bank").children().length == 0)
    {
    var cards=$(".card");
    console.log(cards);
    var corretto=true;
    for (let i = 0; i < cards.length; i++) {
      const card = $(cards[i]);
      idautore=card.attr("id");
      idMovimento=card.parent().attr("id").split("_")[1];
      console.log(idautore+"-"+idMovimento);
      for(let j=0;j<Autori.length;j++){
        const autore=Autori[j];
        if(autore.idautore==idautore){
          if(autore.id_fazione!=idMovimento)
          corretto=false;
        }
      }
    }
    if(corretto==false)
    alert("hai perso");
    else
    alert("hai vinto");
  }
  else
  {
    alert("finisci di giocare");
  }
});
});

function caricaAutori(){
  Autori.forEach(autore => {
    const card = createCard(autore);
    const bank = document.querySelector('#bank');
    bank.appendChild(card);
  });
}