import React from 'react'
import SnakeGame from './game/SnakeGame'
import { NavLink } from 'react-router-dom'
import './linksStyles/game.css'

const Reviews = () => {
  return (
    <div>
      <SnakeGame />
      <button className='button'><NavLink style={{color: "black"}} to="/">←Назад</NavLink></button>
    </div>
  )
}

export default Reviews
