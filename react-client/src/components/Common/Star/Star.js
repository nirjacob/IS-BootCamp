import React from 'react'
import { useEffect, useState } from 'react'
import style from './Star.module.scss'
import Proptypes from 'prop-types'

const Star = ({ rating }) => {
  const [stars, setStars] = useState([])

  async function setData() {
    try {
      const starsArray = Array(5).fill('\u2606')
      setStars(starsArray.fill('\u2605', 0, rating / 2))
    } catch (err) {
      console.error(`Error: ${err}`)
      setStars([])
    }
  }

  useEffect(() => {
    setData()
  }, [])

  return (
    <div>
      {
        stars.map((star, index) => {
          return <span key={index} className={style.star}> {star}</span>
        })
      }
    </div>
  )
}

Star.propTypes = {
  rating: Proptypes.number
}

export default Star