import React from 'react'
import style from './AddPodcast.module.scss'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { addNewPodcast } from '../../services/Podcasts'

const AddPodcast = () => {
  const [podcast, setPodcast] = useState({})
  const [returnUrl, setReturnUrl] = useState({})
  const location = useLocation()

  async function createPodcast() {
    try {
      console.log(podcast)
      await addNewPodcast(JSON.parse(JSON.stringify(podcast)))
      setReturnUrl('/podcast')
    } catch (err) {
      setReturnUrl(location.pathname)
      window.alert(`Failed to create podcast please fill all fields`)
      console.error(`${err}`)
    }
  }

  useEffect(() => {
    setReturnUrl(location.pathname)
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setPodcast(prevValue => {
      return {
        [name]: value,
        ...prevValue
      }
    })
  }

  return (
    <div className={style.container}>
      <div className={style.middleContainer}>
        <div className={style.formTitle}>Create New Podcast</div>
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
          <Link to={{ pathname: `${returnUrl}` }} style={{ textDecoration: 'none' }} onClick={createPodcast}>
            <input className={style.editBtn}
                   value='Create Podcast' />
          </Link>
          <Link to={{ pathname: `/podcast` }} style={{ textDecoration: 'none' }}>
            <input className={style.editBtn} value='Cancel' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AddPodcast