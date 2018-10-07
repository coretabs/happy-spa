$ = element => document.querySelectorAll (element)

export default {
  adjustAnswers : () => {
    let answers = document.querySelectorAll('.answer')

      if (answers) {
        answers.forEach(answer => {
          let answerPara = answer.querySelector('.answerPara')
          if (answer.clientHeight > 38) {
            answerPara.style.display = 'block'
            answerPara.querySelector('.answerPara-short').classList.replace('answerPara-short' , 'answerPara-long')
          }
        })
      }

  },
}
