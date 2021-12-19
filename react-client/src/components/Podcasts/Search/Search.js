import React, { useEffect, useState } from 'react'
import style from './Search.module.scss'
import { searchPodcasts } from '../../../services/Podcasts'
import Proptypes from 'prop-types'

const Search = (props) => {
  const [searchString, setSearchString] = useState('')

  async function fetchInitialData() {
    return await props.initialData()
  }

  async function updateSearchResults() {
    try {
      const results = await searchPodcasts(searchString)
      props.updateSearch(results)
    } catch (err) {
      console.error(`${err}`)
      searchString === '' ? await fetchInitialData() : props.updateSearch([])
    }
  }

  useEffect(updateSearchResults, [searchString])

  return (
    <div>
      <input className={style.searchBar} type='text' placeholder={'Enter podcast name or author'}
             onChange={(e) => setSearchString(e.target.value)}
      />
      <div>
      </div>
    </div>
  )
}

Search.propTypes = {
  updateSearch: Proptypes.func,
  initialData: Proptypes.func
}

export default Search