import React from 'react'
import style from './AddReview.module.scss'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { addNewReview } from '../../services/Podcasts'

const AddReview = () => {
  const location = useLocation()
  const podcastId = location.pathname.replace('/podcast/new-review/', '')
  const [ratingStars, setRatingStars] = useState(0)
  const [rating, setRating] = useState({})
  const [text, setText] = useState({})

  async function setStars(event) {
    const selectedRating = parseInt(event.target.id.replace('star', ''))
    setRating(selectedRating * 2)
    setRatingStars(selectedRating)
  }

  const displayStarsArray = () => {
    return Array(5).fill('\u2606').map((star, index) => {
      return (<span id={`star${index + 1}`}
                    key={index}>{ratingStars < (index + 1) ? '\u2606' : '\u2605'}</span>)
    }).reverse()
  }

  async function ratePodcast() {
    const review = {
      podcastId: podcastId,
      text: text,
      rating: rating
    }
    await addNewReview(review)
  }

  return (
    <div className={style.container}>
      <div className={style.box}>
        <form>
          <div className={style.formTitle}>Rate This Podcast</div>
          <div className={style.rating} onClick={setStars}> {displayStarsArray()}
          </div>

          <textarea className={style.formButton} id='text' placeholder='Write a review'
                    onChange={e => setText(e.target.value)} />
          <Link to={{ pathname: `/podcast/${podcastId}` }} style={{ textDecoration: 'inherit' }}>
            <input className={style.submitButton} placeholder='Add Review' onClick={ratePodcast} />
          </Link>
          <Link to={{ pathname: `/podcast/${podcastId}` }} style={{ textDecoration: 'inherit' }}>
            <input className={style.submitButton} placeholder='Cancel' />
          </Link>
        </form>

      </div>

    </div>
  )
}

export default AddReview