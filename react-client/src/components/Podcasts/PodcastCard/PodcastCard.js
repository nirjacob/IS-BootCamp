import React from 'react'
import defaultStyle from './PodcastCard.module.scss'
import { Link } from 'react-router-dom'
import Proptypes from 'prop-types'

const PodcastCard = ({ id, imageUrl, title, description, style }) => {
  const cardStyle = style ? style : defaultStyle.podcastCard
  return (
    <Link to={{ pathname: `/podcast/${id}` }} style={{ textDecoration: 'inherit' }}>
      <div className={cardStyle}>
        <img src={imageUrl} alt={'img'} />
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </Link>
  )
}

PodcastCard.propTypes = {
  title: Proptypes.string,
  description: Proptypes.string,
  imageUrl: Proptypes.string,
  style: Proptypes.string,
  id: Proptypes.number
}

export default PodcastCard