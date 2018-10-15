export default {
  adjustAnswers : () => {
    setTimeout (()=>{
      let answers = document.querySelectorAll('.reply .answer')
      console.log('start')
      if (answers) {
        answers.forEach(answer => {
          let answerPara = answer.querySelector('.answerPara')
          answerPara.clientHeight < 20 ? answerPara.classList.add("answerPara-one-line") : ''
        })
      }
    })
  },
}
