export default {
  adjustAnswers : () => {
    setTimeout (()=>{
      let answers = document.querySelectorAll('.reply .answer')
      console.log('start')
      if (answers) {
        answers.forEach(answer => {
          console.log(answer)
          if (answer.clientHeight < 38) {
            let answerPara = answer.querySelector('.answerPara')
            answerPara.classList.add(".answerPara-one-line")
          } else {
            let answerPara = answer.querySelector('.answerPara')
            answerPara.classList.remove(".answerPara-one-line")
          }
        })
      }
    })
  },
}
