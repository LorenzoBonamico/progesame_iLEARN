var result;
let startButton;
let nextButton;
let questionContainerElement;
let questionElement;
let answerButtonsElement;
let shuffledQuestions, currentQuestionIndex;
let questions;
let punteggio = 0;
let cont = 0;

window.onload = function(){
    $.get("https://provalbvallauri.altervista.org/progesame_iLEARN/PHP/QuizStoricoPHP/getDomandeRisposteQuizStorico.php",{}, function(data){
        result = data;
    }).done(function () {
      $("#punteggio").hide();
        questions = JSON.parse(result).quiz;
        startButton = document.getElementById('start-btn');
        nextButton = document.getElementById('next-btn');
        questionContainerElement = document.getElementById('question-container');
        questionElement = document.getElementById('question');
        answerButtonsElement = document.getElementById('answer-buttons');

        startButton.addEventListener('click', startGame)
        nextButton.addEventListener('click', () => {
          currentQuestionIndex++
          setNextQuestion()
        })
    });
}

function mescolaQuiz(_questions){
    let currentIndex = _questions.length,  randomIndex;
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            // And swap it with the current element.
            [_questions[currentIndex], _questions[randomIndex]] = [
                _questions[randomIndex], _questions[currentIndex]];
          }
    for (let i = 0; i < _questions.length; i++) {
        const answers = _questions[i].answers;        
        let currentIndex = answers.length,  randomIndex;
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            // And swap it with the current element.
            [answers[currentIndex], answers[randomIndex]] = [
                answers[randomIndex], answers[currentIndex]];
          }
          _questions[i].answers = answers;
    }
    return _questions;
}

function startGame() {
  $("#punteggio").text("0/" + questions.length);
  $("#punteggio").show();
    mescolaQuiz(questions);
    punteggio = 0;
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
    if(!$("body").hasClass("wrong") && !$("body").hasClass("correct")  )
    {
        const selectedButton = e.target
        const correct = selectedButton.dataset.correct;
        if(correct)
            punteggio++;
        cont++;
        $("#punteggio").text(cont + "/" + questions.length);
        setStatusClass(document.body, correct)
        Array.from(answerButtonsElement.children).forEach(button => {
          setStatusClass(button, button.dataset.correct)
        })
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
          nextButton.classList.remove('hide')
        } else {
          startButton.innerText = 'Restart';
          startButton.classList.remove('hide');setTimeout(function(){ alert("Hai fatto " + punteggio + "/" + questions.length); }, 1);
        }
    }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}