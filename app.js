var state = {
 questions: [
   {
     question: 'What is the capital of Italy?',
     choices: ['Rome', 'Zurich', 'Florence', 'Brussels'],
     answer: 'Rome',
   },

   {
     question: 'What is the capital of the USA?',
     choices: ['Bombay', 'Washington\ DC', 'Ottowa', 'Rio\ De\ Janiero'],
     answer: 'Washington\ DC',
   },

   {
     question: 'What is the capital of China',
     choices: ['Hong Kong', 'Beijing', 'Shanghai', 'Guangzhou'],
     answer: 'Beijing',
   },

   {
     question: 'What is the capital of Saudi Arabia?',
     choices: ['Kabul', 'Riyadh', 'Mecca', 'Manama'],
     answer: 'Riyadh',
   },

   {
     question: 'What is the capital of Afghanistan?',
     choices: ['Kabul', 'Riyadh', 'Tehran', 'Manama'],
     answer: 'Kabul',
   },

   {
     question: 'What is the capital of Russia?',
     choices: ['Moscow', 'Novosibirsk', 'St. Petersburg', 'Tomsk'],
     answer: 'Moscow',
   },

   {
     question: 'What is the capital of Belarus?',
     choices: ['Berlin', 'Minsk', 'Zagreb', 'Prague'],
     answer: 'Minsk',
   },

   {
     question: 'What is the capital of the Congo?',
     choices: ['Nairobi', 'Belo Horizonte', 'Kinshasa', 'Pretoria'],
     answer: 'Kinshasa',
   },

   {
     question: 'What is the capital of Honduras?',
     choices: ['Quito', 'Tegucigalpa', 'Chiapas', 'San Jose'],
     answer: 'Tegucigalpa',
   },

   {
     question: 'What is the capital of Venezuela?',
     choices: ['Caracas', 'Bogota', 'Panama City', 'Buenos Aires'],
     answer: 'Caracas',
   }

  ],
  current_question_index: 0,
  questions_answered_correctly: 0,
  question_number: 1
}

// Game Logic Functions


$(document).ready(function (event) {
  console.log('test');
  $('#begin_quiz').on('click', function (event) {
    $('#start_quiz').addClass('hidden');
    $('#quiz_section').removeClass('hidden');
    $('#question_tracker').removeClass('hidden');
  });

  renderState(state);
});

$('.next_question').on('click', function(event) {

  var currentQuestion = state.questions[state.current_question_index];
  var selectedAnswer = $('input[name=quiz]:checked').val();
  var correctAnswer = currentQuestion.answer;
  var response = $('#response');
  var remark = $('#silly_remark');

  if (selectedAnswer === undefined) {
    alert('You have to at least make a guess');
  } else if (selectedAnswer === correctAnswer){
    $('#response').text("smarty pants");
    $('#silly_remark').text('Even a blind squirrel finds a nut every once in awhile.');
    updateCorrectAnswer(state);
  }  else {
    $('#response').text("BRRRRUUUUHHHH!!!! Come on!");
    $('#silly_remark').text('Have you ever looked at a map before?');
    $('.corrected-answer').text('Sorry, the correct answer is ' + currentQuestion.answer);
  }

  if (selectedAnswer !== undefined) {
    if (state.question_number === state.questions.length) {
      displayResultsPage(state);
      resetQuiz(state);
      // playAgain(state);
    } else {
      updateQuestionIndex(state);
      $('.question_choices').empty();
      updateQuestionNumber(state);
      renderState(state);
    }
  }

  $('.start-over').on('click', function(event) {
    playAgain(state);
  });
});

function renderState(state) {
  var question = $('.question_text');
  for (var i = 0; i <= state.questions.length; i++) {
    var questions_text = state.questions[state.current_question_index].question;
    question.text(questions_text);
  }

  for (var i = 0; i < state.questions[state.current_question_index].choices.length; i++ ) {
    var question = state.questions[state.current_question_index].choices[i];
    var choices = '<li><input class="choice" type="radio" name="quiz" value='+ question +'>' + question + '</input></li>';
    $('.question_choices').append(choices);
  }
  $('.current_question_number').text('Question: ' + state.question_number + ' of ' + state.questions.length);
  $('.correct_answers').text('You have: ' + state.questions_answered_correctly + ' question(s) correct');
}


function updateQuestionNumber(state) {
  state.question_number++;
}

function updateQuestionIndex(state) {
 state.current_question_index++;
}

function updateCorrectAnswer(state) {
  state.questions_answered_correctly+=1;
}

function resetQuiz(state) {
  state.question_number = 1;
  state.questions_answered_correctly = 0;
  state.current_question_index = 0;
  $('.question_choices').empty();
  $('#response').empty();
  $('#silly_remark').empty();
}

function displayResultsPage(state) {
  $('#quiz_section').addClass('hidden');
  $('#final_results').removeClass('hidden');
  $('.correct_answers').text('You got: ' + state.questions_answered_correctly + ' question(s) correct');
}

function playAgain(state) {
  $('#quiz_section').addClass('hidden');
  $('#final_results').addClass('hidden');
  $('#start_quiz').removeClass('hidden');
  resetQuiz(state);
  renderState(state);
}
