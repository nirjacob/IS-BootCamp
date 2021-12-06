import React from 'react'
import styles from './Podcasts.module.scss'
import PodcastCard from '../../components/Podcasts/PodcastCard/PodcastCard'
import { getBestPodcasts } from '../../services/Podcasts'
import { useState, useEffect } from 'react'
import Search from '../../components/Podcasts/Search/Search'
import AddButton from '../../components/Common/AddButton/AddButton'


const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([])

  async function setData() {
    try {
      const podcastsArray = await getBestPodcasts(50)
      setPodcasts(podcastsArray)
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
      <AddButton
        text={'Add New Podcast'}
        href={'new-podcast'}
      />

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
              imageUrl={podcast.imageUrl}
              description={podcast.description}
            />
          })
        }
        <h1>{podcasts.length === 0 ? 'Podcast Not Found :(' : ''}</h1>
      </div>
    </div>
  )
}


export default Podcasts