
const colors = ['green', 'aquamarine', 'yellow', 'orange', 'orangered', 'red'];
var result;
var Fazioni=null;

const onDragOver = (event) => {
  event.preventDefault();
}

const onDrop = (event) => {
  event.preventDefault();
  const draggedCardId = event.dataTransfer.getData('id');
  const draggedCard = document.getElementById(draggedCardId);
  event.target.appendChild(draggedCard);
}



$.get("https://provalbvallauri.altervista.org/progesame_iLEARN/PHP/StatoFazionePHP/getFazionidragandDrop.php",{}, function(data){
  result = data;
}).done(function () {
  Fazioni = result;
  Fazioni = JSON.parse(Fazioni).fazioni;
  caricaFazioni();
});

function caricaFazioni(){
  Fazioni.forEach(fazione => {
    $("#board").append('<div id="fazione_' + fazione.idFazione + '" class="row">'+
    '<div class="label">' + fazione.Nome + '</div>'+
  '</div>')
  });
  const rows = document.querySelectorAll('.row');
  rows.forEach((row, index) => {
    const label = row.querySelector('.label');
    label.style.backgroundColor = colors[index];
    row.ondragover = onDragOver;
    row.ondrop = onDrop;
  })
}