import React from 'react'
import style from './EditPodcast.module.scss'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { deletePodcast, getPodcast, updatePodcast } from '../../services/Podcasts'

const EditPodcast = () => {
  const location = useLocation()
  const podcastId = location.pathname.replace('/podcast/edit/', '')
  const [podcast, setPodcast] = useState({})

  async function deleteEditedPodcast() {
    try {
      await deletePodcast(podcastId)
    } catch (err) {
      window.alert(`Unable to delete podcast ${err}`)
      console.error(`${err}`)
    }
  }

  async function updateEditedPodcast() {
    try {
      await updatePodcast(podcastId, podcast)
    } catch (err) {
      window.alert(`Unable to update podcast ${err}`)
      console.error(`${err}`)
    }
  }

  useEffect(() => {
    console.log(podcast)
  }, [podcast])

  async function setData() {
    try {
      const podcastById = await getPodcast(podcastId)
      setPodcast(podcastById)
    } catch (err) {
      console.error(`${err}`)
    }
  }

  function handleChange(event) {
    const { name, value } = event.target
    setPodcast(prevValue => {
      return {
        ...prevValue,
        [name]: value
      }
    })
  }

  useEffect(() => {
    setData()
  }, [])

  return (
    <div className={style.container}>
      <div className={style.middleContainer}>
        <div className={style.formTitle}>Edit Podcast Information</div>
        <label className={style.formLabels}>Title</label>
        <input className={style.formButton} type='text' name='title' onChange={handleChange}
               placeholder={podcast.title} />
        <label className={style.formLabels}>Author</label>
        <input className={style.formButton} type='text' name='author' placeholder={podcast.author}
               onChange={handleChange} />
        <label className={style.formLabels}>Description</label>
        <textarea className={style.formButton} name='description' onChange={handleChange}
                  placeholder={podcast.description} />
        <label className={style.formLabels}>Html Description</label>
        <textarea className={style.formButton} onChange={handleChange} placeholder={podcast.htmlDescription}
                  name='htmlDescription' />
        <label className={style.formLabels}>Web Url</label>
        <input className={style.formButton} type='text' name='webUrl' onChange={handleChange}
               placeholder={podcast.webUrl} />
        <label className={style.formLabels}>Image Url</label>
        <input className={style.formButton} type='text' name='imageUrl' onChange={handleChange}
               placeholder={podcast.imageUrl} />
        <label className={style.formLabels}>Language</label>
        <input className={style.formButton} type='text' name='language' onChange={handleChange}
               placeholder={podcast.language} />
        <label className={style.formLabels}>Number Of Episodes</label>
        <input className={style.formButton} type='number' name='numberOfEpisodes' onChange={handleChange}
               placeholder={podcast.numberOfEpisodes} />
        <label className={style.formLabels}>Avg Episode Length</label>
        <input className={style.formButton} type='number' name='avgEpisodeLength' onChange={handleChange}
               placeholder={podcast.avgEpisodeLength} />
        <label className={style.formLabels}>Category</label>
        <input className={style.formButton} type='text' name='category' onChange={handleChange}
               placeholder={podcast.category} />
        <div className={style.submitButtonsContainer}>
          <Link to={{ pathname: `/podcast/${podcastId}` }} style={{ textDecoration: 'inherit' }}>
            <input className={style.editBtn} type='submit'
                   value='Edit Podcast' onClick={updateEditedPodcast} />
          </Link>
          <Link to={{ pathname: '/' }} style={{ textDecoration: 'inherit' }}>
            <input className={style.deleteBtn} type='submit' value='Delete Podcast'
                   onClick={deleteEditedPodcast} />
          </Link>
        </div>
        <Link to={{ pathname: `/podcast/${podcastId}` }} style={{ textDecoration: 'inherit' }}>
          <input className={style.editBtn} value='Cancel' />
        </Link>
      </div>
    </div>
  )
}

export default EditPodcast