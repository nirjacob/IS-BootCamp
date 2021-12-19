import React from 'react'
import style from './EditPodcast.module.scss'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { deletePodcast, getPodcast, updatePodcast } from '../../services/Podcasts'
import { useNavigate } from 'react-router'

const EditPodcast = () => {
  const location = useLocation()
  const podcastId = location.pathname.replace('/podcast/edit/', '')
  const [podcast, setPodcast] = useState({})
  const navigate = useNavigate()

  async function deleteEditedPodcast() {
    try {
      await deletePodcast(podcastId)
    } catch (err) {
      window.alert(`Unable to delete podcast`)
      console.error(`${err}`)
    }
  }

  async function updateEditedPodcast() {
    try {
      await updatePodcast(podcastId, podcast)
      navigate(`/podcast/${podcastId}`)
    } catch (err) {
      window.alert(`Unable to update podcast - Please fill all fields`)
      navigate(`/podcast/edit/${podcastId}`)
    }
  }

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
               value={podcast.title} />
        <label className={style.formLabels}>Author</label>
        <input className={style.formButton} type='text' name='author' value={podcast.author}
               onChange={handleChange} />
        <label className={style.formLabels}>Description</label>
        <textarea className={style.formButton} name='description' onChange={handleChange}
                  value={podcast.description} />
        <label className={style.formLabels}>Html Description</label>
        <textarea className={style.formButton} onChange={handleChange} value={podcast.htmlDescription}
                  name='htmlDescription' />
        <label className={style.formLabels}>Web Url</label>
        <input className={style.formButton} type='text' name='webUrl' onChange={handleChange}
               value={podcast.webUrl} />
        <label className={style.formLabels}>Image Url</label>
        <input className={style.formButton} type='text' name='imageUrl' onChange={handleChange}
               value={podcast.imageUrl} />
        <label className={style.formLabels}>Language</label>
        <input className={style.formButton} type='text' name='language' onChange={handleChange}
               value={podcast.language} />
        <label className={style.formLabels}>Number Of Episodes</label>
        <input className={style.formButton} type='number' name='numberOfEpisodes' onChange={handleChange}
               value={podcast.numberOfEpisodes} />
        <label className={style.formLabels}>Avg Episode Length</label>
        <input className={style.formButton} type='number' name='avgEpisodeLength' onChange={handleChange}
               value={podcast.avgEpisodeLength} />
        <label className={style.formLabels}>Category</label>
        <input className={style.formButton} type='text' name='category' onChange={handleChange}
               value={podcast.category} />
        <div className={style.submitButtonsContainer}>
          <button className={style.editBtn} type='submit'
                  onClick={updateEditedPodcast}>Save
          </button>
          <Link to={{ pathname: '/' }} style={{ textDecoration: 'inherit' }}>
            <button className={style.deleteBtn} type='submit'
                    onClick={deleteEditedPodcast}>Delete Podcast
            </button>
          </Link>
        </div>
        <Link to={{ pathname: `/podcast/${podcastId}` }} style={{ textDecoration: 'inherit' }}>
          <button className={style.editBtn}>Cancel</button>
        </Link>
      </div>
    </div>
  )
}

export default EditPodcast