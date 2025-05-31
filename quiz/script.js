// script.js
const quizData = [
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
        answer: "New Delhi"
    },
    {
        question: "Which river is considered the holiest in Hindu tradition and is also India's longest river?",
        options: ["Yamuna", "Brahmaputra", "Ganges", "Godavari"],
        answer: "Ganges"
    },
    {
        question: "Who is known as the 'Father of the Nation' in India?",
        options: ["Jawaharlal Nehru", "Sardar Patel", "Mahatma Gandhi", "Subhas Chandra Bose"],
        answer: "Mahatma Gandhi"
    },
    {
        question: "In which year did India gain independence from British rule?",
        options: ["1942", "1945", "1947", "1950"],
        answer: "1947"
    },
    {
        question: "What is the national animal of India?",
        options: ["Lion", "Tiger", "Elephant", "Leopard"],
        answer: "Tiger"
    },
    {
        question: "What is the national flower of India?",
        options: ["Rose", "Sunflower", "Lotus", "Marigold"],
        answer: "Lotus"
    },
    {
        question: "Which Indian city is famous for its IT industry and is often called the 'Silicon Valley of India'?",
        options: ["Hyderabad", "Pune", "Bengaluru", "Chennai"],
        answer: "Bengaluru"
    },
    {
        question: "What is the currency of India?",
        options: ["Dollar", "Euro", "Rupee", "Yen"],
        answer: "Rupee"
    },
    {
        question: "Which is the highest civilian award in India?",
        options: ["Padma Vibhushan", "Bharat Ratna", "Padma Bhushan", "Param Vir Chakra"],
        answer: "Bharat Ratna"
    },
    {
        question: "Who wrote the Indian National Anthem, 'Jana Gana Mana'?",
        options: ["Bankim Chandra Chatterjee", "Rabindranath Tagore", "Sarojini Naidu", "Muhammad Iqbal"],
        answer: "Rabindranath Tagore"
    },
    {
        question: "Which mountain range forms India's northern border?",
        options: ["Andes", "Rockies", "Alps", "Himalayas"],
        answer: "Himalayas"
    },
    {
        question: "What is the name of India's primary space agency?",
        options: ["NASA", "ESA", "ISRO", "Roscosmos"],
        answer: "ISRO"
    },
    {
        question: "Which of these is a classical dance form originating from Tamil Nadu, India?",
        options: ["Kathak", "Bharatanatyam", "Odissi", "Kuchipudi"],
        answer: "Bharatanatyam"
    },
    {
        question: "The Taj Mahal is located in which Indian city?",
        options: ["Delhi", "Jaipur", "Agra", "Mumbai"],
        answer: "Agra"
    },
    {
        question: "Which festival, widely celebrated in India, is known as the 'Festival of Lights'?",
        options: ["Holi", "Eid", "Diwali", "Navaratri"],
        answer: "Diwali"
    }
];

// DOM Elements
const quizContainer = document.getElementById('quiz-container');
const questionTextElement = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const feedbackMessageElement = document.getElementById('feedback-message');
const questionCounterElement = document.getElementById('question-counter');
const currentScoreElement = document.getElementById('current-score');
const dimOverlay = document.getElementById('dim-overlay');

const scoreCardContainer = document.getElementById('score-card-container');
const finalScoreTextElement = document.getElementById('final-score-text');
const scoreTitleElement = document.getElementById('score-title');
const scoreImageElement = document.getElementById('score-image');
const scoreMessageElement = document.getElementById('score-message');
const restartButton = document.getElementById('restart-button');

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let questions = []; // To store shuffled questions

const NEUTRAL_BG_BODY_CLASSES = 'flex items-center justify-center min-h-screen p-4 bg-slate-100 text-slate-800';
const CORRECT_BG_BODY_CLASSES = 'flex items-center justify-center min-h-screen p-4 bg-green-100 text-slate-800';
const INCORRECT_BG_BODY_CLASSES = 'flex items-center justify-center min-h-screen p-4 bg-red-100 text-slate-800';


// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function setBodyBackground(baseClasses, isWrong = false) {
    // The baseClasses string already contains all necessary Tailwind classes including transitions.
    document.body.className = baseClasses + ' transition-colors duration-300 ease-in-out';
    if (isWrong) {
        dimOverlay.style.opacity = '0.3';
    } else {
        dimOverlay.style.opacity = '0';
    }
}


function loadQuestion() {
    // Reset background for new question
    setBodyBackground(NEUTRAL_BG_BODY_CLASSES); // Use the constant for neutral background
    feedbackMessageElement.textContent = '\u00A0'; // Non-breaking space to maintain height
    feedbackMessageElement.className = 'feedback-message'; // Reset feedback class

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionTextElement.textContent = currentQuestion.question;
        questionCounterElement.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
        currentScoreElement.textContent = `Score: ${score}`;
        
        optionsContainer.innerHTML = ''; // Clear previous options
        const shuffledOptions = shuffleArray([...currentQuestion.options]); // Shuffle options for variety

        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            // Tailwind classes for option buttons
            button.className = 'option-btn w-full text-left p-3 sm:p-4 border-2 border-slate-300 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-700';
            button.addEventListener('click', selectOption);
            optionsContainer.appendChild(button);
        });
        nextButton.classList.add('hidden');
    } else {
        showScoreCard();
    }
}

function selectOption(event) {
    const selectedButton = event.target;
    const correctAnswer = questions[currentQuestionIndex].answer;

    // Disable all option buttons after selection
    Array.from(optionsContainer.children).forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            // Correct class is defined in style.css, but Tailwind handles most styling
            button.classList.add('correct');
        }
    });

    if (selectedButton.textContent === correctAnswer) {
        score++;
        selectedButton.classList.add('correct'); // Defined in style.css
        feedbackMessageElement.textContent = 'Correct! Well done!';
        feedbackMessageElement.className = 'feedback-message text-green-600'; // Tailwind for text color
        setBodyBackground(CORRECT_BG_BODY_CLASSES); // Use constant for correct background
    } else {
        selectedButton.classList.add('incorrect'); // Defined in style.css
        feedbackMessageElement.innerHTML = `Oops! The correct answer was: <strong class="font-semibold">${correctAnswer}</strong>`; // Tailwind for strong
        feedbackMessageElement.className = 'feedback-message text-red-600'; // Tailwind for text color
        setBodyBackground(INCORRECT_BG_BODY_CLASSES, true); // Use constant for incorrect background, true for isWrong
    }
    currentScoreElement.textContent = `Score: ${score}`;
    nextButton.classList.remove('hidden');
}

function showScoreCard() {
    quizContainer.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => { // Wait for quiz container to fade out
        quizContainer.classList.add('hidden');
        scoreCardContainer.classList.remove('hidden');
        scoreCardContainer.classList.add('opacity-100'); // For fade-in animation

        const percentage = (score / questions.length) * 100;
        finalScoreTextElement.textContent = `You scored ${score} out of ${questions.length} (${percentage.toFixed(1)}%)`;

        let message = "";
        let imageSrc = ""; 
        let title = "Quiz Completed!";
        let bodyBgClass = NEUTRAL_BG_BODY_CLASSES; // Default to neutral for scorecard

        if (percentage >= 80) {
            title = "Excellent Knowledge! 🎉";
            message = "You're a true India expert! Outstanding performance.";
            imageSrc = "https://placehold.co/150x150/4CAF50/FFFFFF?text=Expert!";
            bodyBgClass = 'flex items-center justify-center min-h-screen p-4 bg-green-100 text-slate-800'; // Specific for score
        } else if (percentage >= 50) {
            title = "Good Job! 👍";
            message = "Great effort! You know a lot about India.";
            imageSrc = "https://placehold.co/150x150/2196F3/FFFFFF?text=Great!";
            bodyBgClass = 'flex items-center justify-center min-h-screen p-4 bg-blue-100 text-slate-800'; // Specific for score
        } else {
            title = "Keep Learning! 📚";
            message = "Good try! There's always more to learn about incredible India.";
            imageSrc = "https://placehold.co/150x150/FFC107/FFFFFF?text=Practice!";
            bodyBgClass = 'flex items-center justify-center min-h-screen p-4 bg-yellow-100 text-slate-800'; // Specific for score
        }
        
        setBodyBackground(bodyBgClass); // Set background for scorecard view
        dimOverlay.style.opacity = '0'; // Ensure dim overlay is off for scorecard

        scoreTitleElement.textContent = title;
        scoreMessageElement.textContent = message;
        scoreImageElement.src = imageSrc;
        scoreImageElement.alt = title;

    }, 500); // Match quiz-container transition duration
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questions = shuffleArray([...quizData]); // Re-shuffle questions
    
    scoreCardContainer.classList.add('hidden');
    scoreCardContainer.classList.remove('opacity-100');

    quizContainer.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
     // Add a small delay to ensure the fade-in transition works after display:block
    setTimeout(() => {
        quizContainer.classList.add('opacity-100');
    }, 50);

    loadQuestion();
}

// Event Listeners
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion();
});
restartButton.addEventListener('click', restartQuiz);

// Initialize Quiz
function startQuiz() {
    questions = shuffleArray([...quizData]); // Shuffle questions at the start
    loadQuestion();
}

// Wait for the DOM to be fully loaded before starting the quiz
document.addEventListener('DOMContentLoaded', startQuiz);
