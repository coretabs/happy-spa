let $ = element => document.querySelectorAll (element)

export default {
  adjustAnswers : () => {
    let answers = document.querySelectorAll('.answer')
    console.log('start')
      if (answers) {
        answers.forEach(answer => {
          console.log(answer)
          if (answer.clientHeight > 38) {
            let answerPara = answer.querySelector('.answerPara')
            answerPara.style.display = 'block'
            answerPara.querySelector('.answerPara-short').classList.replace('answerPara-short' , 'answerPara-long')
          }
        })
      }

  },
}
