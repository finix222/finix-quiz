const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: 0,
        name: username.value,
    };
    highScores.push(score);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    localStorage.setItem('currentUser',score.name)//store name of user currentlly playing
    window.location.assign("./index.html");
};
