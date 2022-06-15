const radioButtons = document.querySelectorAll('.options')
const options_containers = document.querySelectorAll('.container')
const next_btn = document.querySelector('.right')
const prev_btn = document.querySelector('.left')
const submit_btn = document.querySelector('.submit')

const question_text_box = document.querySelector('.question-text')

const option_text = document.querySelectorAll('.option-text')

const questionNumber = document.querySelector('.question-number')

let data = {};
let resultIndex = 0; //this index is for looping through returned results

let previousRandomValue = 10 //used to make sure the previous random value and the new one are not the same
let correct_answer_index = 0 //this index is used to loop through the correct answer array

let arrayOfAnswers = []

// submit_btn.style.opacity = 0;

const generateRandomValue = () =>{
    let randomNum = Math.floor(Math.random()*4)
    if(randomNum === previousRandomValue){
        randomNum = generateRandomValue()
       return randomNum
    }
    else{
        previousRandomValue = randomNum
        return randomNum
    }
 }

async function getQuestions(){
     const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
     const jsonData = await res.json();
    //  console.log(jsonData)

    // if(jsonData.response_code !== 0){

    //     console.log('yeah')
    //     getQuestions()
       
    // }
     data = jsonData
     arrayOfAnswers.length = data.results.length
 
     let randomValue = generateRandomValue()
    //  generateFirstQuestionAndAnswer(randomValue)
    loopQuestionAndAnswer(randomValue,0)
} 

getQuestions()

next_btn.addEventListener('click',()=>{
 if(resultIndex < data.results.length - 1){
        resultIndex++
        let randomValue = generateRandomValue()
        loopQuestionAndAnswer(randomValue,resultIndex)
    }
    else{
        console.log('end of questions')
    }

    radioButtons.forEach(ele => ele.checked = false)
})

prev_btn.addEventListener('click',()=>{
    if(resultIndex > 0){
        resultIndex--
        let randomValue = generateRandomValue()
        loopQuestionAndAnswer(randomValue,resultIndex)
    }
    else{
        console.log('nowhere to go back to')
    }

    radioButtons.forEach(ele => ele.checked = false)
})

const loopQuestionAndAnswer = (indexOfCorrectAnswer,indexOfCurrRes) =>{

    
    questionNumber.innerText = `${indexOfCurrRes + 1} / ${data.results.length}`

    question_text_box.innerText = data.results[indexOfCurrRes].question // initialize the first question
    
    options_containers.forEach((ele,i)=>{ //initialize the first answers
        if(i === indexOfCorrectAnswer){
           option_text[i].innerText = data.results[indexOfCurrRes].correct_answer
        }
        else{
          option_text[i].innerText = data.results[indexOfCurrRes].incorrect_answers[correct_answer_index] 
          correct_answer_index++
        }
   })
   correct_answer_index = 0 //take back the index for looping through the correct array to 0
  }


//   const thereExistsAnEmptyValueInTheAnswersArray = ()=>{
//     let emptyExists = true
//      for (let i = 0; i < arrayOfAnswers.length; i++) {
         
         
//          if(arrayOfAnswers[i] !== undefined){
//             emptyExists = false
//          }
//          else{
//             emptyExists = true
//             return emptyExists
//          }
         
//     }

//     return emptyExists
// }

  radioButtons.forEach((ele,i)=>{
   ele.addEventListener('change',()=>{
       arrayOfAnswers[resultIndex] = option_text[i].innerText
    //    let bool = thereExistsAnEmptyValueInTheAnswersArray()
       
    //    if(bool === false){
    //        submit_btn.style.opacity = 1
    //     }
    })
})

const calculateScoreAndSave = ()=>{ 
     let score = 0
     arrayOfAnswers.forEach((ele,i)=>{
        if(ele === data.results[i].correct_answer){
           score++ 
        }
     })
     
     let highScoresString = localStorage.getItem('highScores')
     let highScoresObject = JSON.parse(highScoresString) //turn the json to object so we can anipulate it
     
     console.log('highScoreObj => ' + highScoresObject)
     highScoresObject[highScoresObject.length - 1].score = score
     highScoresObject.sort(compare_score);
     highScoresObject.splice(4);
     localStorage.setItem('highScores', JSON.stringify(highScoresObject)); //save manipulated data as json string in local storage
     localStorage.setItem("currentScore",score.toString())
     return score
}

submit_btn.addEventListener('click',()=>{

    calculateScoreAndSave()
    
    window.location.assign("./finish.html");
})

function compare_score( a, b )
  {
  if ( a.score > b.score){
    return -1;
  }
  if ( a.score < b.score){
    return 1;
  }
  return 0;
}


