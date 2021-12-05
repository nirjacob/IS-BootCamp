import React from 'react'
import style from './ReviewCard.module.scss'
import Star from '../../Common/Star/Star'
import Proptypes from 'prop-types'

const ReviewCard = ({ rating, text }) => {
  return (
    <div className={style.reviewCard}>
      <Star
        rating={rating}
      />
      <div>{text}</div>
    </div>
  )
}


ReviewCard.propTypes = {
  rating: Proptypes.number,
  text: Proptypes.string
}

export default ReviewCard