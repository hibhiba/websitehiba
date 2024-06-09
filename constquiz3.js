const quizData = [
    {
      question: 'what is my favourite song ?',
      options: ['poison', 'all of me', 'open arms', 'love'],
      answer: 'all of me',
    },
    {
      question: 'when is my birthday ',
      options: ['1 august', '8 august', '31 augost', '10 august'],
      answer: '1 august',
    },
    {
      question: 'what my moms name hhhh?',
      options: ['aicha', 'fatiha', 'souad', 'nadia'],
      answer: 'fatiha'
    },
    {
      question: 'do i prefer ?',
      options: ['coffee', 'tea', 'juices', 'energy drinks'],
      answer: 'tea',
    },
    {
      question: 'What is the month that we start talking?',
      options: [
        'march',
        'february',
        'january',
        'december',
      ],
      answer: 'february',
    },
    {
      question: 'my type of musics?',
      options: ['pop', 'rap', 'jazz', 'r&b'] ,
      answer: 'r&b',
    },
    {
      question: 'I dont like a lot of .... ',
      options: [
        'sweet food',
        'asian food',
        'salty food',
        'spicy food',
      ],
      answer: 'spicy food',
    },
    {
      question: 'what the majority of people like about me ?',
      options: ['butt', 'eyes', 'waist', 'feet'],
      answer: 'waist',
    },
    {
      question: 'which day we became official',
      options: [
        '11 march',
        '9 march',
        '10 march',
        '12 march',
      ],
      answer: '10 march',
    },
    {
      question: 'do you like me ?',
      options: ['yes', 'yessss', 'no(yes)', 'kinda yes'],
      answer: 'yessss',
    },
    {
        question: 'whats my fv colore ?',
        options: ['blue', 'black', 'darkblue', 'beige'],
        answer: 'black',
    },
    {
        question: 'what is my happy place ?',
        options: ['gym', 'beach', 'my bedroom', 'school'],
        answer: 'my bedroom',
    },
    {
        question: 'what is my favorite/dream car ?',
        options: ['mercedes gt63s', 'nissan GTR', 'miata', 'mustang'],
        answer: 'nissan GTR',
    },
    {
        question: 'what was my cats name ?',
        options: ['yara', 'maya', 'mimi', 'amy'],
        answer: 'nissan GTR', 
    }
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();



