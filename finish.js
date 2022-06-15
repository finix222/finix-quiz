let userScoreBoard = document.querySelector('.box')
let otherScoreBoards = document.querySelectorAll('.top')
let highScoresString = localStorage.getItem('highScores')
let highScoresObject = JSON.parse(highScoresString)
let currentScore = localStorage.getItem('currentScore')
let alreadyAddedToOne = false
const restart = document.querySelector('#restart')


userScoreBoard.children[1].innerText = currentScore

otherScoreBoards.forEach((ele,i)=>{

   ele.children[0].innerText = highScoresObject[i].name 
   ele.children[1].innerText = highScoresObject[i].score
   
   if(ele.innerText !== undefined){
       ele.style.opacity = 1;
   }
   if(alreadyAddedToOne === false){
    if(ele.children[0].innerText === localStorage.getItem('currentUser') && ele.children[1].innerText === localStorage.getItem('currentScore')){
        ele.classList.add('current')
        alreadyAddedToOne = true;
    }
   }
  
})
restart.addEventListener('click',()=>{
    window.location.assign("./start.html")
})




