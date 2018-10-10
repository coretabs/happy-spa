let $ = element => document.querySelectorAll (element)

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
            answerPara.style.display = 'block'
            answerPara.querySelector('p').classList.add('answerPara-short')
          } else {
            let answerPara = answer.querySelector('.answerPara')
            answerPara.querySelector('p').classList.add('answerPara-long')
          }
        })
      }
    })
  },
}
