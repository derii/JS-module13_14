/* ================================================= Test questions and answers ================================== */
var test = {
  testTitle: 'Programming test',
  btnTestResult: 'Review my answers',
  testQuestions: [
    {
      title: 'Question №1',
      answer: [
        {
          text: 'Answer №1 - false',
          correct: false
        },
        {
          text: 'Answer №2 - false',
          correct: false
        },
        {
          text: 'Answer №3 - true',
          correct: true
        }
      ]
    },
    {
      title: 'Question №2',
      answer: [
        {
          text: 'Answer №1 - false',
          correct: false
        },
        {
          text: 'Answer №2 - false',
          correct: false
        },
        {
          text: 'Answer №3 - true',
          correct: true
        }
      ]
    },
    {
      title: 'Question №3',
      answer: [
        {
          text: 'Answer №1 - true',
          correct: true
        },
        {
          text: 'Answer №2 - false',
          correct: false
        },
        {
          text: 'Answer №3 - true',
          correct: true
        }
      ]
    },
    {
      title: 'Question №4',
      answer: [
        {
          text: 'Answer №1 - false',
          correct: false
        },
        {
          text: 'Answer №2 - true',
          correct: true
        },
        {
          text: 'Answer №3 - true',
          correct: true
        }
      ]
    }
  ]
};

/* ================================================= localStorage, JSON, review correct answers ================================== */
var str = JSON.stringify(test);
localStorage.setItem('str', str);

$(function () {
  'use strict';
  var testData = JSON.parse(localStorage.getItem('str'));
  var html = $('.form-test').html();
  var content = tmpl(html, testData);
  var $body = $('body');

  $body.append(content);

  var rightAnswer = 0;
  var incorrectAnswer = 0;
  var $modal;
  var $overlay;

  $('.test-result-btn').on('click', function (e) {

    var rightAnswerAnswers = 0;
    var amountCorrectAnswers =0;

    e.preventDefault();
    showModal();
    $overlay.one('click', hideModal);

    for (var i = 0; i < testData.testQuestions.length; i++) {
      var input = $('input[data-index=' + i + ']');
      var question = testData.testQuestions[i].title;
      var correctAmount = 0;
      var checkedElem = 0;

      for (var j = 0; j < testData.testQuestions[i].answer.length; j++) {
        var elem = input[j];
        var answerVar = testData.testQuestions[i].answer[j].correct;

        if (answerVar === true) {
          correctAmount += 1;
        }
        if ( elem.checked ) {
          if ( answerVar === true ) {
            rightAnswer += 1;
          } else {
            incorrectAnswer += 1;
          }
          checkedElem += 1;
        } else {
          incorrectAnswer += 1;
        }
        $(elem).removeAttr("checked");
      }

        if(correctAmount == rightAnswer && rightAnswer !== 0 &&
            incorrectAnswer != testData.testQuestions[i].answer.length &&
            correctAmount == checkedElem) {
          $modal.append('<div class="answer-right"><h2>' + question + '</h2></div>');
          rightAnswerAnswers += rightAnswer;
        } else {
          $modal.append('<div class="answer-error"><h2>' + question + '</h2></div>');
        }

        amountCorrectAnswers += correctAmount;
        correctAmount = 0;
        rightAnswer = 0;
        incorrectAnswer = 0;

    }

    var rightStatistic = Math.round((rightAnswerAnswers/amountCorrectAnswers)*100);
	if (rightStatistic == 100) {
		$modal.append('<div class="congratulations"><h2>Congratulations! Yor score is 100%</h2></div>');
	} else if (rightStatistic <= 50){
    $modal.append('<div class="bad"><h2>Bad news! You dont redy for this test. Try again. Your result is - ' + rightStatistic + '%</h2></div>');
	} else {
		$modal.append('<div class="not-bad"><h2>Not bad, please try again. Right answers - ' + rightStatistic + '%</h2></div>');
	}
  });

/* ================================================= Modal window ================================== */
  function showModal () {
    $modal = $('<div class="modal-test"><h1>Your result:</h1></div>');
    $overlay = $('<div class="modal-overlay" title="Close results!"></div>');
    $body.append($overlay);
    $body.append($modal);
    $modal.animate({ top: "50%" }, 800);
  }
  function hideModal () {
    $modal.animate({ top: "-50%" }, 800, function () {
      $modal.remove();
      $overlay.remove();
    });
  }

});