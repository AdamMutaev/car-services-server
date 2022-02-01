import React from 'react'

function GameOver(props) {
  return (
    <div
      id='GameBoard'
      style={{
        width: props.width,
        height: props.height,
        borderWidth: props.width / 50,
      }}>
      <div id='GameOver' style={{ fontSize: props.width / 15 }}>
        <div id='GameOverText'>ИГРА ОКОНЧЕНА</div>
        <div>Твой рекорд: {props.score}</div>
        <div>
          {props.newHighScore}Лучший рекорд:{' '}
          {props.highScore}
        </div>
        <div id='PressSpaceText'>Нажми пробел чтобы начать заново</div>
      </div>
    </div>
  )
}

export default GameOver