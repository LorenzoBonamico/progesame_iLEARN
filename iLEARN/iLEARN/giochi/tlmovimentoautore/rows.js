
const colors = ['green', 'aquamarine', 'yellow', 'orange', 'orangered', 'red'];
var result;
var Movimenti=null;

const onDragOver = (event) => {
  event.preventDefault();
}

const onDrop = (event) => {
  event.preventDefault();
  const draggedCardId = event.dataTransfer.getData('id');
  const draggedCard = document.getElementById(draggedCardId);
  event.target.appendChild(draggedCard);
  console.log('dropped the element');
}



$.get("https://provalbvallauri.altervista.org/progesame_iLEARN/PHP/MovimentoAutorePHP/getMovimentidragandDrop.php.php",{}, function(data){
  result = data;
}).done(function () {
  Movimenti = result;
  Movimenti = JSON.parse(Movimenti).movimenti;
  console.log(Movimenti);
  caricaMovimenti();
});

function caricaMovimenti(){
  Movimenti.forEach(movimento => {
    $("#board").append('<div id="movimento_' + movimento.idMovimento + '" class="row">'+
    '<div class="label">' + movimento.NomeMovimento + '</div>'+
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