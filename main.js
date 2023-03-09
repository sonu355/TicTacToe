const xCLASS = 'x'
const circleClass = 'circle'
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningCombi = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame(){
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(xCLASS)
    cell.classList.remove(circleClass)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick,{ once : true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}
 
function handleClick(e){
  const cell = e.target
  const currentClass = circleTurn ? circleClass : xCLASS
  placeMark(cell, currentClass)
  if(checkWin(currentClass)){
     endGame(false)
  }else if(isDraw()){
    endGame(true)
  }else{
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw){
  if(draw){
    winningMessageTextElement.innerText = 'Draw!'
  }else{ 
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw(){
  return [...cellElements].every(cell => {
    return cell.classList.contains(xCLASS) || cell.classList.contains(circleClass)
  })
}

function placeMark(cell, currentClass){true
  cell.classList.add(currentClass)
}

function swapTurns(){
  circleTurn = !circleTurn
}

function setBoardHoverClass(){
  board.classList.remove(circleClass)
  board.classList.remove(xCLASS)
  if(circleTurn){
    board.classList.add(circleClass)
  }{
    board.classList.add(xCLASS)
  }
}
 function checkWin(currentClass){
  return  winningCombi.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass )
    })
  })
 }