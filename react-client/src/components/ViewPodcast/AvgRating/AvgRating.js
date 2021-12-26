import React from 'react'
import { useEffect, useState } from 'react'
import style from './AvgRating.module.scss'
import Proptypes from 'prop-types'

const AvgRating = ({ allReviews }) => {
  const [avgRating, setAvgRating] = useState(0)

  const calculateAvg = async () => {
    let totalRating = 0
    allReviews.map((review) => totalRating += review.rating)
    setAvgRating(Math.round(totalRating / allReviews.length))
  }

  async function setData() {
    try {
      await calculateAvg()
    } catch (err) {
      console.error(`Error: ${err}`)
      setAvgRating('')
    }
  }

  useEffect(() => {
    setData()
  }, [avgRating])

  return (
    <div className={style.avgRate}>
      {
        <span key={1} className={style.avgRate}>
          {'\u2605'}
          {avgRating}/10</span>
      }
    </div>
  )
}

AvgRating.propTypes = {
  allReviews: Proptypes.array
}

export default AvgRating