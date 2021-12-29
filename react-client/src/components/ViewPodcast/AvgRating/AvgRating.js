import React from 'react'
import { useEffect, useState } from 'react'
import style from './AvgRating.module.scss'
import Proptypes from 'prop-types'

const AvgRating = ({ allReviews }) => {
  const [avgRating, setAvgRating] = useState(0)

  const calculateAvg = async () => {
    let totalRating = 0
    allReviews.map((review) => totalRating += review.rating)
    const rating = (totalRating / allReviews.length)
    setAvgRating(rating === 10 ? rating : rating.toFixed(1))
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
    <div>
      {
        <div className={style.avgRateStar}>
          {'\u2605'}</div>
      }
      {
        <div className={style.avgRate}>
          {`${avgRating}`}/10</div>
      }

    </div>
  )
}

AvgRating.propTypes = {
  allReviews: Proptypes.array
}

export default AvgRating