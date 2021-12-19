import React from 'react'
import styles from './Podcasts.module.scss'
import PodcastCard from '../../components/Podcasts/PodcastCard/PodcastCard'
import { getBestPodcasts } from '../../services/Podcasts'
import { useState, useEffect } from 'react'
import Search from '../../components/Podcasts/Search/Search'
import AddButton from '../../components/Common/AddButton/AddButton'
import LoginBtn from '../../components/Common/Login/LoginBtn/LoginBtn'

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  async function setData() {
    try {
      setIsLoggedIn(!!localStorage.getItem('jwtLoginToken'))
      setIsLoading(true)
      const podcastsArray = await getBestPodcasts(50)
      setPodcasts(podcastsArray)
      setIsLoading(false)
    } catch (err) {
      console.error(`Error: ${err}`)
      setPodcasts([])
    }
  }

  useEffect(() => {
    setData()
  }, [])

  return (
    <div>
      <div className={styles.titles}>
        The Podcast Experience You Deserve
      </div>
      <LoginBtn
        text={isLoggedIn ? 'Logout' : 'Login'}
      />

      {isLoggedIn && <AddButton
        text={'Add New Podcast'}
        href={'new-podcast'}
      />}

      <Search
        updateSearch={setPodcasts}
        initialData={setData}
      />

      <div className={styles.podcastCardsContainer}>
        {
          podcasts.map((podcast) => {
            return <PodcastCard
              key={podcast.id}
              id={podcast.id}
              title={podcast.title}
              author={podcast.author}
              imageUrl={podcast.imageUrl}
              description={podcast.description}
            />
          })
        }
        <h1>{(podcasts.length === 0 && !isLoading) ? 'Podcast Not Found :(' : ''}</h1>
        <h1>{isLoading ? 'Loading Podcasts...' : ''}</h1>
      </div>
    </div>
  )
}


export default Podcasts