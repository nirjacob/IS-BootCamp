import { useEffect, useState } from 'react'
import style from './ViewPodcast.module.scss'
import { Link, useLocation } from 'react-router-dom'
import Tag from '../../components/Common/Tags/Tag'
import { getPodcast, getReviews } from '../../services/Podcasts'
import AddButton from '../../components/Common/AddButton/AddButton'
import ReviewCard from '../../components/Podcasts/ReviewCard/ReviewCard'
import PodcastCard from '../../components/Podcasts/PodcastCard/PodcastCard'
import React from 'react'
import LoginBtn from '../../components/Common/Login/LoginBtn/LoginBtn'

const ViewPodcasts = () => {
  const [podcast, setPodcasts] = useState([])
  const [reviews, setReviews] = useState([])
  const location = useLocation()
  const podcastId = location.pathname.replace('/podcast/', '')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  async function fetchData() {
    try {
      setIsLoggedIn(!!localStorage.getItem('jwtLoginToken'))
      const podcastById = await getPodcast(podcastId)
      setPodcasts(podcastById)
      const reviewsByPodcast = await getReviews(podcastId)
      setReviews(reviewsByPodcast)
    } catch (err) {
      console.error(`${err}`)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={style.mainContainer}>
      <Link to={{ pathname: `/podcast/` }} className={style.homeLink} style={{ textDecoration: 'none' }}>
        <div className={style.topContainer}>
          The Podcast Experience You Deserve
        </div>
      </Link>
      <div className={style.leftContainer}>
        <PodcastCard
          key={podcast.id}
          style={style.podcastCard}
          id={podcast.id}
          title={podcast.title}
          imageUrl={podcast.imageUrl}
          description={podcast.description}
        />
      </div>
      <div className={style.middleContainer}>
        <div className={style.tagsContainer}>
          <Tag text={podcast.category} />
          <Tag text={podcast.language} />
        </div>
        <div>
          <div className={style.formTitle}>{podcast.title}</div>
          <label className={style.formAuthor}>By {podcast.author}</label>
          <div className={style.formLabel}>Description</div>
          <div className={style.formDetails}>{podcast.description}</div>
          <div className={style.formLabel}>Number Of Episodes</div>
          <div className={style.formDetails}>{podcast.numberOfEpisodes}</div>
          <div className={style.formLabel}>Average Episode Length</div>
          <div className={style.formDetails}>{`${parseInt(podcast.avgEpisodeLength / 60)}m`}</div>
          <div className={style.btnContainer}>
            <Link to={{ pathname: `/podcast/edit/${podcast.id}` }} style={{ textDecoration: 'inherit' }}>
              {isLoggedIn && <input className={style.editBtn} type='submit' value='Edit Podcast' />}
            </Link>
          </div>
        </div>
      </div>

      <div className={style.rightContainer}>
        <LoginBtn
          isLoggedIn={isLoggedIn}
        />

        {!isLoggedIn && <AddButton
          text={'Add New Review'}
          href={`new-review/${podcastId}`}
        />
        }

        <div className={style.reviewsContainer}>
          {
            reviews.map((review) => {
                return <ReviewCard
                  key={review.id}
                  rating={review.rating}
                  text={review.text}
                />
              }
            )
          }
        </div>

      </div>
    </div>
  )
}

export default ViewPodcasts